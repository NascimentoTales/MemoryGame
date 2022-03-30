const CARD = "card";
const FRONT = "front";
const BACK = "back";
const FLIP = "flip";
const ICON = "icon";
const EXTENSSION = ".png";


startGame();

function startGame () {
    
    initialize(game.creatCardsFronTechs());
};

function initialize(cards) {
    
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = '';
    let h1 = document.createElement("h1")
    h1.innerHTML = 'Memory Game'
    gameBoard.appendChild(h1)

    game.cards.forEach(card => {
        
        let cardElement = document.createElement("div");
        cardElement.classList.add(CARD);
        cardElement.id = card.id;
        cardElement.dataset = card.icon

        creatCardContent(card, cardElement)

        cardElement.addEventListener("click", flipcard)
        gameBoard.appendChild(cardElement)
    });
};

function creatCardContent(card, cardElement) {
    
    creatCardFace(FRONT, card, cardElement);
    creatCardFace(BACK, card, cardElement);
};

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
};

function flipcard() {
    // let potuacao = 0;

    if (game.setCard(this.id)) {

        this.classList.add(FLIP)
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()){
                    setTimeout(() => {
                        let gameOverLayer = document.getElementById("gameOver")
                        gameOverLayer.style.display = "flex";
                    }, 500);
                }
            }else{
                setTimeout(() => {
                    
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);
    
                    firstCardView.classList.remove(FLIP);
                    secondCardView.classList.remove(FLIP);
                    game.unflipCards();
    
                }, 1000);
            }; 
        }
        
    };  
};

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none";
}