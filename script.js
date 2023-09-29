import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://realtime-database-af8dc-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shopping-list");
const inputEl = document.querySelector('#input-el');
const btnAdd = document.querySelector('#btn-add');

function addData() {
    let inputValue = inputEl.value;
    push(shoppingListInDb, inputValue);
    console.log(`${inputValue} added to database`);
}

btnAdd.addEventListener("click", addData);