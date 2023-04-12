//Setting Database
let toDoTasks = JSON.parse(localStorage.getItem('toDoTasks')) || [];
console.table('inicial', toDoTasks);

function setDatabase(){
    localStorage.setItem('toDoTasks', JSON.stringify(toDoTasks));
}

window.addEventListener('DOMContentLoaded', ()=> {  
     
    const inputBox = document.querySelector('.to-do-input');
    const addBtn = document.querySelector('.to-do-add-btn');
    const toDoContainer = document.querySelector('.to-do-container');    

    // Empty Input Popup
    const emptyInputPopup = document.querySelector('.empty-input-popup');      


    //------- Functions for Warning Empty Input -------//
    function showEmptyInputPopup(){
        emptyInputPopup.style.display = 'block';
    }
    function closeEmptyInputPopup(){
        emptyInputPopup.style.display = 'none'
    }
    function taskDisplayTemplate(index, task){
        return `
            <div class="to-do-task-box" id="${index}">
                <div class="to-do-task">${task}</div>
                <button class="to-do-btn-done"><i class="fa-solid fa-check"></i></button>
                <button class="to-do-btn-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
            `;
    }
    function taskDisplayTemplateDone(index, task){
        return `
            <div class="to-do-task-box" id="${index}">
                <div class="to-do-task" style="color: gray"><s><em>${task}</em></s></div>
                <button class="to-do-btn-done"><i class="fa-solid fa-check"></i></button>
                <button class="to-do-btn-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
            `;
    }

    //------- Classes -------//

    //Class to create to do task and push it to the to do task array
    class ToDoTask{
        constructor(task){
            this.task = task;
            this.done = false;
        }
        createId(id){
            this.id = id; 
        }
    }

    // Class to add to do task - Display it, Delete and Done/Undone it
    class Display{
        static addTask(){
            if(inputBox.value === ""){
                showEmptyInputPopup();
            }else{
                const newTask = new ToDoTask(inputBox.value);
                toDoTasks.push(newTask);
                const index = toDoTasks.indexOf(newTask);
                newTask.createId(index);
                Display.displayTask(newTask.id, newTask.task);
                console.log(newTask)
                setDatabase();
            }
        }
        static displayTask(index, newTask){
            // console.log(index, newTask)
            const displayTask = taskDisplayTemplate(index, newTask)
           
            toDoContainer.innerHTML += displayTask;
            inputBox.value = "";
            inputBox.focus();
        }

        static displayFromStorage(index, task){
            let displayTaskFromStorage = "";

            if(toDoTasks[index].done ?
                    displayTaskFromStorage = taskDisplayTemplateDone(index, task)
                    :
                    displayTaskFromStorage = taskDisplayTemplate(index, task));
        
            toDoContainer.innerHTML += displayTaskFromStorage;
        }

        static deleteTask(idToDelete){ 
            // console.log(idToDelete);
            const toDelete = document.getElementById(`${idToDelete}`);
            toDelete.remove();
            // console.log(toDoTasks[idToDelete].id)
           
            toDoTasks = toDoTasks.filter(item => item.id != idToDelete)
            // console.log(deletedItem);

            setDatabase();
        }
        static doneTask(idToDone){
            const toDoneParent = document.getElementById(`${idToDone}`);
            const ToDone = toDoneParent.querySelector('.to-do-task');

            
            if(!ToDone.querySelector('s')){
                ToDone.style.color = 'gray';
                ToDone.innerHTML = `<s><em>${ToDone.textContent}</em></s>`;
                toDoTasks[idToDone].done = true;
                console.log(toDoTasks);
                setDatabase();
                
            }else{
                ToDone.style.color = 'black';
                ToDone.innerHTML = `${ToDone.textContent}`;
                toDoTasks[idToDone].done = false;
                console.log(toDoTasks);
                setDatabase();
            }
        
        }
    }

    
    if(toDoTasks != null){
        for(let i=0; i < toDoTasks.length; i++){
            // console.table(toDoTasks[i].id);
            // console.table(toDoTasks[i].task);
            // console.table(toDoTasks[i].done);
            // console.table(toDoTasks);
            Display.displayFromStorage(toDoTasks[i].id, toDoTasks[i].task);
        }
    }


    //------- Events Listener -------//

    //Add task to do and display it
    addBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        Display.addTask();       
    });
   
    // Delete task to do
    toDoContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('to-do-btn-delete')){
            const taskBox = e.target.parentElement;
            // console.log(taskBox);
            const idToDelete = taskBox.id;
            // console.log(idToDelete);
            Display.deleteTask(idToDelete);
        }
    });

    // Done/undone to do task
    toDoContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('to-do-btn-done')){
            const taskBox = e.target.parentElement;
            const idToDone = taskBox.id;
            Display.doneTask(idToDone);
        }
    });

    // Closing popup that says input to do was empty
    document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('empty-input-close-btn')){
            closeEmptyInputPopup();
        };
    });



    //------- Speech Recognition js -------/

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    
    const speechBtn = document.querySelector(".to-do-speech-btn");
    

    recognition.addEventListener('result', e =>{
        const transcript = Array.from(e.results)
            .map(results => results[0])
            .map(results => results.transcript)
            .join('');
        inputBox.value = transcript;
        
    });
    recognition.addEventListener('end', () =>{
        Display.addTask();
        speechBtn.classList.remove("rec");
    })

    speechBtn.addEventListener('click', function(e) {
        e.preventDefault();
        speechBtn.classList.add("rec")
        recognition.start();
    })
    
});