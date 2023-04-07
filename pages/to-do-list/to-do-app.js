window.addEventListener('DOMContentLoaded', ()=> {  
     

    const inputBox = document.querySelector('.to-do-input');
    const addBtn = document.querySelector('.to-do-add-btn');
    const toDoContainer = document.querySelector('.to-do-container');    

    let toDoTasks = [];

    // Empty Input Popup
    const emptyInputPopup = document.querySelector('.empty-input-popup');      

    function showEmptyInputPopup(){
        emptyInputPopup.style.display = 'block';
    }
    function closeEmptyInputPopup(){
        emptyInputPopup.style.display = 'none'
    }
    function addTask(){
        if(inputBox.value === ""){
            console.log('test')
            showEmptyInputPopup();
        }else{
            const newTask = new ToDoTask(inputBox.value);
            toDoTasks.push(newTask);
            const index = toDoTasks.indexOf(newTask);
            newTask.createId(index);
            Display.displayTask(index, newTask);        
        }
    }

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
            inputBox.value = "";
            inputBox.focus();
        }
        static deleteTask(idToDelete){ 
            const toDelete = document.getElementById(`${idToDelete}`);
            toDelete.remove();
        }
        static doneTask(idToDone){
            const toDoneParent = document.getElementById(`${idToDone}`);
            const ToDone = toDoneParent.querySelector('.to-do-task');
            console.log(ToDone);
            if(!ToDone.querySelector('s')){
                ToDone.innerHTML = `<s><em>${ToDone.textContent}</em></s>`;
            }else{
                ToDone.innerHTML = `${ToDone.textContent}`;
            }
        
        }
    }


    // Event Listener
    addBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        addTask()        
    });
   
    toDoContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('to-do-btn-delete')){
            const taskBox = e.target.parentElement;
            const idToDelete = taskBox.id;
            Display.deleteTask(idToDelete);
        }
    });
    toDoContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('to-do-btn-done')){
            const taskBox = e.target.parentElement;
            const idToDone = taskBox.id;
            Display.doneTask(idToDone);
        }
    });

    document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('empty-input-close-btn')){
            closeEmptyInputPopup();
        };
    });
    
});

