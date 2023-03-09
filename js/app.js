console.log("hello");
console.log("test");
console.log("test2");

let dealerCards = [];
let playerCards = [];
let shuffle = [];
let playerValue=0;
let dealerValue=0;

const scores = {
    player: 0,
    dealer: 0,
    push: 0
}


const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
let masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

let winner = document.querySelector("#message");

const valueEls = {
    player: document.querySelector("#playerValue"),
    dealer: document.querySelector("#dealerValue")
}



const scoreEls = {
    player: document.querySelector("#p-score"),
    dealer: document.querySelector("#d-score"),
    push: document.querySelector("#t-score"),
  };

const dealButton = document.querySelector("#deal");
dealButton.addEventListener('click', playBJ);

const hitButton = document.querySelector("#hit");
hitButton.addEventListener('click', hit);

const standButton = document.querySelector("#stand");
standButton.addEventListener('click', stand);


const handEls = {
    player: {
      cardEl: document.querySelector("#player"),
    },
    dealer: {
      cardEl: document.querySelector("#dealer"),
    },
  };


init();


function playBJ(){
    playerValue = 0;
    dealerValue = 0;
    playerCards = [];
    dealerCards = [];
    winner.textContent = "";
    shuffleCards();
    playerDraw();
    dealerDraw();
    playerDraw();
    checkPlayerScore();
    render();
    currentIndex = 0;
}

function hit(){
    playerDraw();
    checkPlayerScore();
    render();
}


function checkPlayerScore() {
    if (playerValue > 21) {
        console.log("Bust, You Lost");
        scores.dealer += 1;
        winner.textContent = "Bust, You Lost";
        console.log(scores.dealer);
    }
    else if(playerValue === 21){
        scores.player += 1;
        console.log("blackjack");
        winner.textContent = "Blackjack, You Win!";
    }

}

function checkDealerScore() {
    if (dealerValue > 21) {
        console.log("you win");
        scores.player += 1;
        winner.textContent = "Dealer Bust, You Win!"
        console.log(scores.player);
    }
    else if (dealerValue === 21){
        scores.dealer +=1;
        winner.textContent = "Dealer Blackjack, You Lost"
        console.log("dealer blackjack");
    }
}

function compareScores() {
    if (checkDealerScore()){
        checkDealerScore()
        return
    }
    else if (checkPlayerScore()){
        checkPlayerScore();
    }
    else if ((21 - playerValue) < (21 - dealerValue)){
        scores.player += 1
        winner.textContent = "You Win!";
        console.log("player wins");
    }
    else if (((21 - playerValue) > (21 - dealerValue)) && (dealerValue < 21)){
        scores.dealer += 1
        winner.textContent = "Dealer Win, You Lost";
        console.log("dealer wins");
    }
    else if (playerValue === dealerValue) {
        scores.push += 1
        winner.textContent = "Push";
        console.log("push");
    }
}

function playerDraw(){
    //const player1Card = shuffledDeck[currentIndex];
    playerCards.unshift(shuffledDeck[0]);
    let drawnCard = shuffledDeck.shift();
    shuffledDeck.push(drawnCard);

    //let length = (playerCards.length - 1) ;
    //console.log(playerCards[length],"This is the error");
    playerValue += playerCards[0].value;
    //playerValue += player1Card.value;

    //const player2Card = shuffledDeck[currentIndex];
    //playerCards.push(shuffledDeck[currentIndex]);
    //shuffledDeck.pop();
    //playerValue += player2Card.value;
    console.log(playerCards, "playercards");
    console.log(playerValue, "playervalue");

    //newIndex();
}
function dealerDraw() {
    //const dealer1Card = shuffledDeck[currentIndex];
    dealerCards.unshift(shuffledDeck[0]);
    let drawnCard = shuffledDeck.shift();
    shuffledDeck.push(drawnCard);
    // dealerCards.push(shuffledDeck[currentIndex]);
    // shuffledDeck.slice(1);
    // dealerValue += dealer1Card.value;
    // console.log(dealer1Card.value, "dealer value");
    //let length = dealerCards.length - 1;
    dealerValue += dealerCards[0].value;
    //newIndex();
    console.log(dealerCards, "dealer cards");
    console.log(dealerValue, "dealer value");   
   //onsole.log(length);
}
function stand(){
    dealerDraw();
    while (dealerValue < 17) {
        dealerDraw();
    }
    compareScores();
    render();
}

function shuffleCards(){
    buildMasterDeck()
    getNewShuffledDeck();
}
function init(){
    
    scores.player=0;
    scores.push = 0;
    scores.dealer=0;
    shuffleCards();
    render()
}


function render(){
    scoreEls.player.textContent = scores.player;
    scoreEls.dealer.textContent = scores.dealer;
    scoreEls.push.textContent = scores.push;

    valueEls.player.textContent = playerValue;
   //console.log(playerValue, "player Value");
    valueEls.dealer.textContent = dealerValue;
  
    renderDeckInContainer(playerCards, handEls.player.cardEl);
    renderDeckInContainer(dealerCards, handEls.dealer.cardEl);

}





/*----- functions -----*/
function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, handEls.player);
}

function renderDeckInContainer(deck, container) {
    container.innerHTML = '';
    // Let's build the cards as a string of HTML
    //let cardsHtml = '';
//   deck.forEach(function(card) {
//     cardsHtml += `<div class="card ${card.face}"></div>`;
//   });
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
    const cardsHtml = deck.reduce(function(html, card) {
        return html + `<div class="card ${card.face}"></div>`;
        }, '');
    container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();