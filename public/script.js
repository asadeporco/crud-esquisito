const baseUrl = "http://localhost:3000/"
const todoList = document.getElementById('todo-list')
const deleteModal = document.getElementById('delete-modal')
const deleteButtonModal = document.getElementById('delete-button-modal')
const closeDeleteModal = document.getElementById('close-delete-modal')
const closeCreateModal = document.getElementById('close-create-modal')
const editForm = document.forms['edit-form']
const saveButton = document.getElementById('create-button-modal')
const newTodoButton = document.getElementById('new-todo')
let isEdit = false;

let todos = [];
let currentTodo = {};

const getQuestions = () => {
    return fetch(`${baseUrl}api/todo`)
}

const createButton = (text, cssClass) => {
    const button = document.createElement('button');
    button.innerHTML = text
    button.classList.add('btn')
    button.classList.add(cssClass)
    button.classList.add('btn-sm')
    return button
}

const createDeleteButton = (todo) => {
    const deleteButton = createButton('Excluir', 'btn-danger');
    deleteButton.setAttribute('data-toggle', 'modal')
    deleteButton.setAttribute('data-target', "#delete-modal")
    deleteButton.addEventListener('click', () => {
        currentTodo = todos.find(td => td.id == todo.id )
    })
    return deleteButton;
}

const createEditButton = (todo) => {
    const editButton = createButton('Editar', 'btn-primary');
    editButton.setAttribute('data-toggle', 'modal')
    editButton.setAttribute('data-target', "#create-modal")
    editButton.addEventListener('click', () => {
        currentTodo = todos.find(td => td.id == todo.id )
        editForm[0].value = currentTodo.title;
        editForm[1].value = currentTodo.description;
        editForm[2].checked = todo.done == 'true';
        isEdit=true;
    })
    return editButton;
}

const createButtons = (todo) => {
    const buttons = document.createElement('td')
    const editButton = createEditButton(todo)
    const deleteButton = createDeleteButton(todo)
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton)
    return buttons;
}

const setRowData = (todo) => {
    const row = document.createElement('tr');

    const buttons = createButtons(todo)

    const title = document.createElement("td");
    title.innerHTML = todo.title;

    const description = document.createElement("td");
    description.innerHTML = todo.description;

    const done = document.createElement('td')
    done.classList.add('text-center')
    const doneImg = document.createElement('img')
    doneImg.classList.add('done-status')
    doneImg.src = todo.done == "true" ? 'svg/done.svg' : 'svg/not_done.svg'

    done.appendChild(doneImg)

    row.appendChild(buttons);
    row.appendChild(title);
    row.appendChild(description);
    row.appendChild(done);
    row.setAttribute('id', todo.id)

    todoList.appendChild(row)
}

const onClickDelete = () => {
    fetch(`${baseUrl}api/todo/${currentTodo.id}`, {
        method: 'DELETE'
    }).then((reponse) => {
        closeDeleteModal.click();
        setList();
    })
}

const onSaveTodo = () => {
    const payload ={
        title: editForm[0].value,
        description: editForm[1].value,
        done: editForm[2].checked
    }
    let url = `${baseUrl}api/todo/`;
    if (isEdit) {
        url += currentTodo.id
    }
    fetch(url, {
        method: isEdit? 'PUT': 'POST',
        body: JSON.stringify(payload),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((reponse) => {
        closeCreateModal.click();
        setList();
    })
}

const onOpenNewTodo = () => {
    isEdit=false;
    editForm[0].value = '';
    editForm[1].value = '';
    editForm[2].checked = false;
}


const setList = () => {
    getQuestions().then(response => {
        response.json().then(data => {
            todos = data;
            todoList.innerHTML = '';
            data.forEach(todo => {
                setRowData(todo)
            });
        });
    })
}

deleteButtonModal.addEventListener('click', onClickDelete)
saveButton.addEventListener('click', onSaveTodo)
newTodoButton.addEventListener('click', onOpenNewTodo)
setList()
