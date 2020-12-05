const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos =[];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDoList.removeChild(li);

    toDos= cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML="X";
    delBtn.addEventListener("click",deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length+1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    li.id = newId;
    const toDoObj = {
        text : text,
        id :newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !==null) {
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
    console.log("ㅇㅇ");
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();