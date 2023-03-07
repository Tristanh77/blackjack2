console.log("hello");

let winner;
let dealerCards = [];
let playerCards = [];
let shuffle = [];
let playerValue=0;
let dealerValue=0;
let currentIndex = 0
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







const scoreEls = {
    player: document.querySelector("#p-score"),
    Dealer: document.querySelector("#d-score"),
    tie: document.querySelector("#t-score"),
  };

const dealButton = document.querySelector("#deal");
dealButton.addEventListener('click', playBJ);

const hitButton = document.querySelector("#hit");
hitButton.addEventListener('click', hit);

const standButton = document.querySelector("#stand");
standButton.addEventListener('click', stand);

init();


function playBJ(){
    playerDraw();
    dealerDraw();
    playerDraw();
    checkPlayerScore();
    checkDealerScore();
}

function hit(){
    playerDraw();
    checkPlayerScore();
}


function checkPlayerScore() {
    if (playerValue > 21) {
        console.log("Bust, You Lost");
        scores.dealer += 1;
        console.log(scores.dealer);
    }
    else if (playerValue == 21) {
        console.log("Blackjack");
        scores.player += 1;
        console.log(scores.player);
    }
}

function checkDealerScore() {
    if (dealerValue > 21) {
        console.log("you win");
        scores.player += 1;
        console.log(scores.player);
    }
}

function compareScores() {
    if ((21 - playerValue) < (21 - dealerValue)){
        console.log("player wins");
    }
    else if ((21 - playerValue) > (21 - dealerValue)){
        console.log("dealer wins");
    }
    else {
        console.log("push");
    }
}

function playerDraw(){
    playerCards.push(shuffledDeck[currentIndex]);
    shuffledDeck.pop();
    let length = playerCards.length;
    playerValue += playerCards[length - 1].value;
    console.log(playerCards);
    console.log(playerValue);
    newIndex();
}
function dealerDraw() {
    dealerCards.push(shuffledDeck[currentIndex]);
    shuffledDeck.pop();
    let length = dealerCards.length;
    dealerValue += dealerCards[length - 1].value;
    newIndex();
    console.log(dealerCards);
    console.log(dealerValue);   
}
function stand(){
    dealerDraw();
    checkDealerScore();
    while (dealerValue < 16) {
        dealerDraw();
        checkDealerScore();
    }
    compareScores();
}

function init(){
    
    scores.player=0;
    scores.push = 0;
    scores.dealer=0;
    masterDeck = buildMasterDeck()
    shuffledDeck = getNewShuffledDeck();
    

}

function newIndex(){
    return currentIndex += 1;
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
  // renderDeckInContainer(shuffledDeck, shuffledContainer);
}

// function renderDeckInContainer(deck, container) {
//   container.innerHTML = '';
//   // Let's build the cards as a string of HTML
//   let cardsHtml = '';
//   deck.forEach(function(card) {
//     cardsHtml += `<div class="card ${card.face}"></div>`;
//   });
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
//   // const cardsHtml = deck.reduce(function(html, card) {
//   //   return html + `<div class="card ${card.face}"></div>`;
//   // }, '');
//   container.innerHTML = cardsHtml;
// }

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