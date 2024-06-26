let itemInput = document.querySelector("#itemInput");
let addNewTodoButton = document.querySelector("#addButton");
let todoUl = document.querySelector(".todo-ul");
let clearButton = document.querySelector("#clearButton");
let userNewTodoItem;
let TodoArray = [];

window.onload = () => {
  let localStorageTodos = JSON.parse(localStorage.getItem("todos"));
  if (localStorageTodos) {
    TodoArray = localStorageTodos;
  } else {
    TodoArray = [];
  }
  todoGenarator(TodoArray);
};

const addNewTodoButtonClick = () => {
  if (itemInput.value != "") {
    
    userNewTodoItem = itemInput.value;
    itemInput.value = "";
    let newObj = {
      id: TodoArray.length + 1,
      job: userNewTodoItem,
      status: false,
    };
  
    TodoArray.push(newObj);
    newObj = {};
    setLocalStorage(TodoArray);
    todoGenarator(TodoArray);
  }
};

const todoGenarator = (todoList) => {
  todoUl.innerHTML = ""
  
  todoList.forEach((todo) => {
    let lielem = document.createElement("li");
    lielem.className = "completed well";

    let lebelelem = document.createElement("label");
    lebelelem.innerHTML = todo.job;

    let completeButtonelem = document.createElement("button");
    completeButtonelem.addEventListener("click", () => {
      todo.status = !todo.status;
      localStorage.setItem("todos" ,JSON.stringify(todoList))

      lielem.className = todo.status ? "uncompleted well" : "completed well";

      completeButtonelem.innerHTML = todo.status ? "un complete" : "complete";
    });
    completeButtonelem.innerHTML = "complete";
    completeButtonelem.className = "btn btn-success";

    let deleteButtonelem = document.createElement("button");
    deleteButtonelem.addEventListener("click", () => {
      todoList.pop(todo);
      localStorage.setItem("todos",JSON.stringify(todoList))
      todoGenarator(todoList)
    });
    deleteButtonelem.className = "btn btn-danger";
    deleteButtonelem.innerHTML = "delete";
    lielem.append(lebelelem, completeButtonelem, deleteButtonelem);
    todoUl.append(lielem);
  });
};

const setLocalStorage = (listOfTodo) => {
  localStorage.setItem("todos", JSON.stringify(listOfTodo));
};

const TypeingInputHandler = (event) => {
  if (event.key === "Enter") {
    if (itemInput.value != "") {
      userNewTodoItem = event.target.value;
      itemInput.value = "";
      let newObj = {
        id: TodoArray.length + 1,
        job: userNewTodoItem,
        status: false,
      };
      TodoArray.push(newObj);
      setLocalStorage(TodoArray);
      newObj = {};
      todoGenarator(TodoArray);
    }

  }
};

const removeTodoDraft = () => {
  itemInput.value = "";
};

clearButton.addEventListener("click", removeTodoDraft);
addNewTodoButton.addEventListener("click", addNewTodoButtonClick);
itemInput.addEventListener("keydown", TypeingInputHandler);
