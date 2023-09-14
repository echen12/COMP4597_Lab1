function createCard(key, value) {
    
    var card = document.createElement('div');
    card.id = key;
    card.className = 'card';
    card.style.width = '18rem';

    // Create card body element
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create card text element
    var cardText = document.createElement('p');
    cardText.id = 'cardTextContent';
    cardText.className = 'card-text';
    cardText.textContent = value;

    cardBody.appendChild(cardText);
    // cardBody.appendChild(buttonContainer);

    card.appendChild(cardBody);

    // Append the card to the cardContainer div
    var cardContainer = document.getElementById('cardContainer');
    cardContainer.appendChild(card);
}

function displayCards() {
    let updatedText = document.getElementById("updatedText")
    var currentTime = new Date();
    updatedText.textContent = "updated at: " + currentTime.toLocaleTimeString();
    let arrayToIterate = JSON.parse(localStorage.getItem("testArray"));

    var cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    arrayToIterate.forEach(element => {
        createCard(element.key, element.userText)
    });
}

function fetchEveryTwoSeconds() {
    setInterval(displayCards, 2000)
}



