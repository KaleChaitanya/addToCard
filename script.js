import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://realtime-database-af8dc-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shopping-list");
const inputEl = document.querySelector('#input-el');
const btnAdd = document.querySelector('#btn-add');
const ulEl = document.querySelector('#shopping-list');

function addData() {
    let inputValue = inputEl.value;
    push(shoppingListInDb, inputValue);
    clearInputField();
}
onValue(shoppingListInDb, function (snapshot) {
    if (snapshot.exists()) {
        let shoppingListArray = Object.entries(snapshot.val());
        clearShopingUlEl()

        for (let i = 0; i < shoppingListArray.length; i++) {
            let currentItem = shoppingListArray[i];
            let currentItemId = currentItem[0];
            let currentItemValue = currentItem[1];

            appendIntoUl(currentItem);
        }
    }
    else {
        ulEl.innerHTML = "no item here...yet";
    }
})

function clearShopingUlEl() {
    ulEl.innerHTML = "";
}
function clearInputField() {
    inputEl.value = "";
}
function appendIntoUl(item) {
    let itemId = item[0];
    let itemValue = item[1];
    let newEl = document.createElement("li");
    newEl.textContent = itemValue;

    newEl.addEventListener('click', function () {
        // console.log(itemId);
        let exactLocationOfItemInDB = ref(database, `shopping-list/${itemId}`);
        // console.log(exactLocationOfItemInDB);
        remove(exactLocationOfItemInDB);
    })

    ulEl.append(newEl);
}
btnAdd.addEventListener("click", addData);