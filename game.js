let game = {

    lockMode : false,
    firstCard : null,
    secondCard : null,

    setCard: function(id) {
    
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true
            return true;
        }
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    techs : [
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
    ],
    
    cards : null,
    
    creatCardsFronTechs: function () {

        this.cards = [];
    
        this.techs.forEach(tech => {
            this.cards.push(this.creatPairFromCards(tech));
        });
    
        this.cards = this.cards.flatMap(pair => pair);
        this.suflleCards()

        return this.cards
    },
    
    creatPairFromCards: function (tech) {
        
        return [{
            id : this.creatIdFromCard(tech),
            flipped : false,
            icon : tech
        },{
            id : this.creatIdFromCard(tech),
            flipped : false,
            icon : tech
        }];
    },
    
    creatIdFromCard: function (tech) {
        return tech + Math.floor(Math.random() * 100000);
    },


    suflleCards: function (cards) { //Embaralhando as Cartas
    
        currentIndex = this.cards.length;
        randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    },






}


