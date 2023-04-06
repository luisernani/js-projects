window.addEventListener('DOMContentLoaded', ()=> {

    const inputBox = document.querySelector('.to-do-input');
    const addBtn = document.querySelector('.to-do-add-btn');
    const toDoContainer = document.querySelector('.to-do-container');
    let toDoTasks = [];
    class ToDoTaskClass{
        constructor(task){
            this.task = task;
        }
        taskDone(){};
        taskDelete(){};
    }

    addBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        const newTask = new ToDoTaskClass(inputBox.value) 
        toDoTasks.push(newTask);
        console.log(toDoTasks);
        const taskDiv = `
            <div class="to-do-task-box">
                <div class="to-do-task">${newTask.task}</div>
                <button class="to-do-btn-done"><i class="fa-solid fa-check"></i></button>
                <button class="to-do-btn-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `
        toDoContainer.innerHTML += taskDiv;

    });


})

