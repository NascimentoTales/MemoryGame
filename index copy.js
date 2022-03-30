const CARD = "card";
const FRONT = "front";
const BACK = "back";
const FLIP = "flip";
const ICON = "icon";
const EXTENSSION = ".png"

let cards = null;

lockMode =  false;
firstCard = false;
secondCard = false;


const techs = [
    "c-sharp",
    "database",
    "git",
    "github",
    "html-5",
    "java-script",
    "letter-c",
    "php",
    "python",
    "sass"
];


init();

function init() {
    cards = creatCardsFronTechs(techs);
    suflleCards(cards);
    // console.log(cards);
    initialize(cards)
}

function initialize(cards) {
    
    let gameBoard = document.getElementById("gameBoard")
    // console.log(gameBoard);

    cards.forEach(card => {
        
        let cardElement = document.createElement("div");
        cardElement.classList.add(CARD);
        cardElement.id = card.id;
        cardElement.dataset = card.icon

        creatCardContent(card, cardElement)

        cardElement.addEventListener("click", flipcard)
        gameBoard.appendChild(cardElement)
    });
}

function creatCardContent(card, cardElement) {
    
    creatCardFace(FRONT, card, cardElement);
    creatCardFace(BACK, card, cardElement);
}

function creatCardFace(face, card, element) {
    
    let cardElementFace = document.createElement("div")
    cardElementFace.classList.add(face)

    if (face === FRONT) {
        let iconElement = document.createElement("img")
        iconElement.classList.add(ICON)
        iconElement.src = "images/" + card.icon + EXTENSSION;
        cardElementFace.appendChild(iconElement)
    }else{
        // let span = document.createElement("span");
        cardElementFace.innerHTML = "&gt;/&lt";
    }
    element.appendChild(cardElementFace)
}

function suflleCards(cards) { //Embaralhando as Cartas
    
    currentIndex = cards.length;
    randomIndex = 0;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];
    }
}

function creatCardsFronTechs(techs) {

    let cards = [];

    techs.forEach(tech => {
        cards.push(creatPairFromCards(tech));
    });

    return cards.flatMap(pair => pair);
    // console.log(cards.flatMap(pair => pair));
}

function creatPairFromCards(tech) {
    
    return [{
        id : creatIdFromCard(tech),
        flipped : false,
        icon : tech
    },{
        id : creatIdFromCard(tech),
        flipped : false,
        icon : tech
    }];
}

function creatIdFromCard(tech) {
    return tech + Math.floor(Math.random() * 100000);
}

function setCard(id) {
    
    let card = cards.filter(card => card.id === id)[0];
    
    if (card.flipped || this.lockMode) {
        return false;
    }
    if (!this.firstCard) {
        this.firstCard = card;
        return true;
    }else{
        this.secondCard = card;
        this.lockMode = true
        return true;
    }
}

function checkMatch() {
    return this.firstCard.icon === this.secondCard.icon;
}

function clearCards() {
    firstCard = null;
    secondCard = null;
    lockMode = false;
}

function flipcard() {
    // let potuacao = 0;

    if (setCard(this.id)) {

        this.classList.add(FLIP)
        if (checkMatch()) {
            clearCards();
        }else{
            setTimeout(() => {
                
                let firstCardView = document.getElementById(firstCard);
                let secondCardView = document.getElementById(secondCard);

                firstCardView.classList.remove("flip");
                secondCardView.classList.remove("flip");
                clearCards();

            }, 1000);
            
        } 
    }  
  

}
