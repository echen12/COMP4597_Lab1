const CARD_CONTAINER_ID = 'cardContainer';
const CARD_TEXT_CONTENT_ID = 'cardTextContent';
const UPDATED_TEXT_ID = 'updatedText';
const UPDATED_AT_TEXT = 'updated at: ';
const STORAGE_KEY = 'testArray';
const CARD_CLASS_NAME = 'card';
const CARD_BODY_CLASS_NAME = 'card-body';
const CARD_TEXT_CLASS_NAME = 'card-text';
const CARD_WIDTH = '18rem';
const INTERVAL_DELAY_MS = 2000;

function createCard(key, value) {
    let card = document.createElement('div');
    card.id = key;
    card.className = CARD_CLASS_NAME;
    card.style.width = CARD_WIDTH;

    // Create card body element
    let cardBody = document.createElement('div');
    cardBody.className = CARD_BODY_CLASS_NAME;

    // Create card text element
    let cardText = document.createElement('p');
    cardText.id = CARD_TEXT_CONTENT_ID;
    cardText.className = CARD_TEXT_CLASS_NAME;
    cardText.textContent = value;

    cardBody.appendChild(cardText);

    card.appendChild(cardBody);

    // Append the card to the cardContainer div
    let cardContainer = document.getElementById(CARD_CONTAINER_ID);
    cardContainer.appendChild(card);
}

function displayCards() {
    let updatedText = document.getElementById(UPDATED_TEXT_ID);
    let currentTime = new Date();
    updatedText.textContent = UPDATED_AT_TEXT + currentTime.toLocaleTimeString();
    
    let arrayToIterate = JSON.parse(localStorage.getItem(STORAGE_KEY));

    let cardContainer = document.getElementById(CARD_CONTAINER_ID);
    cardContainer.innerHTML = '';

    arrayToIterate.forEach(element => {
        createCard(element.key, element.userText);
    });
}

function fetchEveryTwoSeconds() {
    setInterval(displayCards, INTERVAL_DELAY_MS);
}
