window.addEventListener('DOMContentLoaded', ()=> {    

    const inputBox = document.querySelector('.to-do-input');
    const addBtn = document.querySelector('.to-do-add-btn');
    const toDoContainer = document.querySelector('.to-do-container');
    
    
    // const doneBtn = document.querySelectorAll('.to-do-btn-done');
    

    let toDoTasks = [];

    
    

    class ToDoTask{
        constructor(task){
            this.task = task;
        }
        createId(id){
            this.id = id; 
        }
    }
    class Display{
        static displayTask(index, newTask){
            let displayTask =  `
                <div class="to-do-task-box" id="${index}">
                    <div class="to-do-task">${newTask.task}</div>
                    <button class="to-do-btn-done"><i class="fa-solid fa-check"></i></button>
                    <button class="to-do-btn-delete"><i class="fa-solid fa-trash"></i></button>
                </div>
                `;
            toDoContainer.innerHTML += displayTask;
            const toDoBox = toDoContainer.querySelector('.to-do-task-box');
            const deleteBtn = toDoBox.querySelector('.to-do-btn-delete');
            console.log(toDoTasks);
            
        }
        static deleteTask(idToDelete){ 
            const toDelete = document.getElementById(`${idToDelete}`);
            toDelete.remove();
          
        }
    }

    // Event Listener
    addBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        const newTask = new ToDoTask(inputBox.value);
        toDoTasks.push(newTask);
        const index = toDoTasks.indexOf(newTask);
        newTask.createId(index);
        Display.displayTask(index, newTask);
    });
   
    toDoContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('to-do-btn-delete')){
            const taskBox = e.target.parentElement;
            const idToDelete = taskBox.id;
            Display.deleteTask(idToDelete);
        }
    })
});