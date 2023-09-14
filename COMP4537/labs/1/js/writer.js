function initializeArrayIntoLocalStorage() {
    let updatedText = document.getElementById("storeUpdateText")
    let currentTime = new Date();
    let userArray = []

    updatedText.innerText = "stored at: " + currentTime.toLocaleTimeString();
    if (localStorage.getItem("testArray") == null) {
        localStorage.setItem("testArray", JSON.stringify(userArray));
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
    paragraph.id = "editText";
    paragraph.textContent = "Edit your notes here";

    // Create an input element
    let input = document.createElement("input");
    input.type = "text";
    input.id = "userInputEditText";

    // Create a button element with an onclick event
    let button = document.createElement("button");
    button.type = "button";
    button.textContent = "Submit";
    button.id = key;
    button.onclick = getEditTextFromUser;

    // Append the elements to the form
    form.appendChild(paragraph);
    form.appendChild(input);
    form.appendChild(button);

    // Append the form to the container
    let formContainer = document.getElementById("editContainer");
    formContainer.appendChild(form);
}

function getEditTextFromUser(e) {
    let userInput = document.getElementById("userInputEditText").value;

    let keyToEdit = e.target.id;
    let localStorageArray = JSON.parse(localStorage.getItem("testArray"))
    let index = localStorageArray.findIndex(x => x.key.toString() == keyToEdit)

    localStorageArray[index].userText = userInput
    localStorage.setItem("testArray", JSON.stringify(localStorageArray))

    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    let clearEditContainer = document.getElementById("editContainer");
    clearEditContainer.innerHTML = "";

    let arrayToIterate = JSON.parse(localStorage.getItem("testArray"));
    arrayToIterate.forEach(element => {
        createCard(element.key, element.userText)
    });
}

function deleteCard(e) {
    let keyToDelete = e.target.id;
    let localStorageArray = JSON.parse(localStorage.getItem("testArray"))
    let filteredArray = localStorageArray.filter(x => x.key.toString() != keyToDelete)
    localStorage.setItem("testArray", JSON.stringify(filteredArray));

    const divToRemove = document.getElementById(e.target.id)
    divToRemove.remove()
}

function createCard(key, value) {
    // console.log({ key, value })

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
    editButton.textContent = 'Edit';

    // Create Delete button
    let deleteButton = document.createElement('a');
    deleteButton.id = key;
    deleteButton.onclick = deleteCard;
    deleteButton.href = '#';
    deleteButton.className = 'btn btn-primary';
    deleteButton.textContent = 'Delete';

    // Append elements to their respective parent elements
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonContainer);

    card.appendChild(cardBody);

    // Append the card to the cardContainer div
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.appendChild(card);
}

function displayCards() {
    let arrayToIterate = JSON.parse(localStorage.getItem("testArray"));
    let cardContainer = document.getElementById('cardContainer');
    
    cardContainer.innerHTML = '';
    arrayToIterate.forEach(element => {
        createCard(element.key, element.userText)
    });
}

function TestObject(key, userText) {
    this.key = key;
    this.userText = userText;
}

function getTextFromUser() {
    let userInput = document.getElementById("userInput").value;
    let editTextP = document.getElementById("editText");
    let uniqueKey = Date.now()
    let testObject = new TestObject(uniqueKey, userInput);
    let localStorageArray = JSON.parse(localStorage.getItem("testArray") || "[]")

    localStorageArray.push(testObject)
    localStorage.setItem("testArray", JSON.stringify(localStorageArray))

    if (editTextP.innerText == "Edit your notes here") {
        editTextP.innerText = "Enter your notes here"
    }

    document.getElementById("userInput").value = ""
}

function storeCards() {
    let updatedText = document.getElementById("storeUpdateText")
    let currentTime = new Date();
    updatedText.innerText = "updated at: " + currentTime.toLocaleTimeString();

}

function storeEveryTwoSeconds() {
    setInterval(initializeArrayIntoLocalStorage, 2000)
}

