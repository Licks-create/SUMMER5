
    // card
    class Card {
      #startPoint;
      #offSetX;
      #offSetY;
      constructor({ imageUrl,onLike,ondisLike }) {
        this.imageUrl = imageUrl;
        this.#init();
        this.#startPoint = 23;
        this.onLike=onLike;
        this.ondisLike=ondisLike
      }

      // private prop
      #ck;
      // private methods
      #init = () => {
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.src = this.imageUrl;
        card.append(img);
        this.element = card;
        this.#listenEvents();
      };
      #listenEvents = () => {
        var sp;
        var lsp;
        var oX;
        var oY;
        const elem = this;

        // elemen move only when mouse is down
        this.element.addEventListener("mousedown", function (e) {
        //   console.log("mouse down");
          const { clientX: cx, clientY: cy } = e;
          sp = { x: cx, y: cy };
          // no transition when moving
          elem.element.style.transition = ``;
          lsp = sp;
          document.addEventListener("mousemove", function (e) {
            if (!sp) return;
            // console.log(elem);
            // console.log(sp);
            const { clientX: cx, clientY: cy } = e;
            oX = cx - sp.x;
            oY = cy - sp.y;
            // console.log(oX, oY);
            elem.element.style.transform = `translate(${oX}px,${oY}px)rotate(${oX * 0.1}deg)`;

            // when element is too far
            if(Math.abs(oX)>elem.element.clientWidth*0.9)
            {

                const direction=oX>0?1:-1;
                // console.log(direction)
                // document
                // console.log(Math.abs(oX),elem.element.clientWidth*.9);    
                // console.log(getComputedStyle(elem.element).transition);
                elem.element.style.transition='all 1s';
                // console.log(getComputedStyle(elem.element).transition);
                elem.element.style.transform=`translate(${direction * window.innerWidth}px,${oY}px) rotate(${90* direction}deg)`;
                setTimeout(()=>{
                    elem.element.remove()
                },500)
                // console.log(cardCount)
                elem.element.classList.add('.dismiss')
                console.log(elem.element);
                sp=null;
                // if(typeof elem.dismissing==='function' )
                // elem.dismissing()
                firstTime=false;
                appendNewCard()
                if(direction==1)
                {elem.onLike()
                console.log("like")}
                if(direction==-1){
                    console.log("dislike")
                    elem.ondisLike()
            }
            }
          });
        });

        // back
        this.element.addEventListener("mouseup", function (e) {
          this.style.transform = ``;
          this.style.transition = "transform .5s";
          sp = null;
        });

        // drag (helping in draging only when mouse down)
        this.element.addEventListener("dragstart", (e) => {
          e.preventDefault();
        });
      };







      #handleMouseMove = (e) => {
        if (!this.#startPoint) return;
        const { clientX: cx, clientY: cy } = e;
        console.log(cx, cy);

        this.#offSetX = cx - this.#startPoint.x;
        this.#offSetY = cy - this.#startPoint.y;
        this.element.style.transform = `translate(${this.#offSetX}px,${
          this.#offSetY
        }px)`;
      };

      #handleMouseUp = (e) => {
        this.#startPoint = null;
        document.removeEventListener("mousemove");
        this.element.style.transform = "";
      };

      #dismiss=(dirextion)=>{
        sp=null
      }
    }

    //  script
    // Dom
    const swiper = document.querySelector("#swiper");
    const like=document.getElementById('icon2')
    const dislike=document.getElementById('icon1')
    // constants
    const urls = [
      "http://source.unsplash.com/random/1000x1000?sky",

      "http://source.unsplash.com/random/1000x1000?land",

      "http://source.unsplash.com/random/1000x1000?landscape",

      "http://source.unsplash.com/random/1000x1000?mountain",

      "http://source.unsplash.com/random/1000x1000?ocean",

      "http://source.unsplash.com/random/1000x1000?forest",
    ];
    // variables
    let cardCount = 0,firstTime=true;
    // functions
    function appendNewCard() {
      const card = new Card({ imageUrl: urls[cardCount % 6] ,
        onLike:()=>{
        like.style.animationPlayState='running';
        console.log("onlike");
        
        like.classList.toggle('trigger');
      },
        ondisLike:()=>{
        dislike.style.animationPlayState='running';
        console.log("ondislike");
        dislike.classList.toggle('trigger');
      }
    });
    //   console.log(card.element);
      
      swiper.append(card.element);
      card.element.style.transition="transform .5s"
    //   card.element.style.setProperty("--i", cardCount % 6);
      cardCount++;

      const cards=document.querySelectorAll('.card:not(.dismiss)');

      if(firstTime)
      cards.forEach((card,index)=>{
        card.style.setProperty("--i", index)
      })
      else{
        cards.forEach((card,index)=>{
        card.style.setProperty("--i", index-1)
      })
      }
      
    }
    // first 6 cards
    for (let i = 0; i < 6; i++) {
      appendNewCard();
    }
  