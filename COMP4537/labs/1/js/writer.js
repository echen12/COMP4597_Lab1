const STORAGE_KEY = "testArray";
const EDIT_TEXT_ID = "editText";
const USER_INPUT_EDIT_TEXT_ID = "userInputEditText";
const CARD_CONTAINER_ID = "cardContainer";
const EDIT_CONTAINER_ID = "editContainer";
const STORE_UPDATE_TEXT_ID = "storeUpdateText";

const EDIT_NOTE_TEXT = "Edit your notes here";
const ENTER_NOTE_TEXT = "Enter your notes here";
const SUBMIT_TEXT = "Submit";
const EDIT_BUTTON_TEXT = "Edit";
const DELETE_BUTTON_TEXT = "Delete";
const STORED_AT_TEXT = "stored at: ";
const UPDATED_AT_TEXT = "updated at: ";

function initializeArrayIntoLocalStorage() {
    let updatedText = document.getElementById(STORE_UPDATE_TEXT_ID)
    let currentTime = new Date();
    let userArray = []

    updatedText.innerText = STORED_AT_TEXT + currentTime.toLocaleTimeString();
    if (localStorage.getItem(STORAGE_KEY) == null) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userArray));
    }

    displayCards()
}

function editCard(e) {
    displayEditFields(e.target.id)
}

function displayEditFields(key) {
    // Create a form element
    let form = document.createElement("form");
    form.action = "/url"; // Set the action attribute
    form.method = "GET";  // Set the method attribute

    // Create a paragraph element with an ID
    let paragraph = document.createElement("p");
    paragraph.id = EDIT_TEXT_ID;
    paragraph.textContent = EDIT_NOTE_TEXT;

    // Create an input element
    let input = document.createElement("input");
    input.type = "text";
    input.id = USER_INPUT_EDIT_TEXT_ID;

    // Create a button element with an onclick event
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = SUBMIT_TEXT;
    button.id = key;
    button.onclick = getEditTextFromUser;

    // Append the elements to the form
    form.appendChild(paragraph);
    form.appendChild(input);
    form.appendChild(button);

    // Append the form to the container
    let formContainer = document.getElementById(EDIT_CONTAINER_ID);
    formContainer.appendChild(form);
}

function getEditTextFromUser(e) {
    let userInput = document.getElementById(USER_INPUT_EDIT_TEXT_ID).value;

    let keyToEdit = e.target.id;
    let localStorageArray = JSON.parse(localStorage.getItem(STORAGE_KEY))
    let index = localStorageArray.findIndex(x => x.key.toString() == keyToEdit)

    localStorageArray[index].userText = userInput
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageArray))

    let cardContainer = document.getElementById(CARD_CONTAINER_ID);
    cardContainer.innerHTML = '';

    let clearEditContainer = document.getElementById(EDIT_CONTAINER_ID);
    clearEditContainer.innerHTML = "";

    let arrayToIterate = JSON.parse(localStorage.getItem(STORAGE_KEY));
    arrayToIterate.forEach(element => {
        createCard(element.key, element.userText)
    });
}

function deleteCard(e) {
    let keyToDelete = e.target.id;
    let localStorageArray = JSON.parse(localStorage.getItem(STORAGE_KEY))
    let filteredArray = localStorageArray.filter(x => x.key.toString() != keyToDelete)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredArray));

    const divToRemove = document.getElementById(e.target.id)
    divToRemove.remove()
}

function createCard(key, value) {
    let card = document.createElement('div');
    card.id = key;
    card.className = 'card';
    card.style.width = '18rem';

    // Create card body element
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    // Create card text element
    let cardText = document.createElement('p');
    cardText.id = 'cardTextContent';
    cardText.className = 'card-text';
    cardText.textContent = value;

    // Create buttons container element
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'd-flex justify-content-evenly';

    // Create Edit button
    let editButton = document.createElement('a');
    editButton.id = key;
    editButton.onclick = editCard;
    editButton.href = '#';
    editButton.className = 'btn btn-primary';
    editButton.textContent = EDIT_BUTTON_TEXT;

    // Create Delete button
    let deleteButton = document.createElement('a');
    deleteButton.id = key;
    deleteButton.onclick = deleteCard;
    deleteButton.href = '#';
    deleteButton.className = 'btn btn-primary';
    deleteButton.textContent = DELETE_BUTTON_TEXT;

    // Append elements to their respective parent elements
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonContainer);

    card.appendChild(cardBody);

    // Append the card to the cardContainer div
    let cardContainer = document.getElementById(CARD_CONTAINER_ID);
    cardContainer.appendChild(card);
}

function displayCards() {
    let arrayToIterate = JSON.parse(localStorage.getItem(STORAGE_KEY));
    let cardContainer = document.getElementById(CARD_CONTAINER_ID);
    
    cardContainer.innerHTML = '';
    arrayToIterate.forEach(element => {
        createCard(element.key, element.userText)
    });
}

function UserObject(key, userText) {
    this.key = key;
    this.userText = userText;
}

function getTextFromUser() {
    let userInput = document.getElementById("userInput").value;
    let editTextP = document.getElementById(EDIT_TEXT_ID);
    let uniqueKey = Date.now()
    let userObject = new UserObject(uniqueKey, userInput);
    let localStorageArray = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")

    localStorageArray.push(userObject)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localStorageArray))

    if (editTextP.innerText == EDIT_NOTE_TEXT) {
        editTextP.innerText = ENTER_NOTE_TEXT;
    }

    document.getElementById("userInput").value = ""
}

function storeCards() {
    let updatedText = document.getElementById(STORE_UPDATE_TEXT_ID)
    let currentTime = new Date();
    updatedText.innerText = UPDATED_AT_TEXT + currentTime.toLocaleTimeString();
}

function storeEveryTwoSeconds() {
    setInterval(initializeArrayIntoLocalStorage, 2000)
}
