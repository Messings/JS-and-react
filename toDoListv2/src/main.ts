
let nextTaskId = 1;

type Task ={
    id: number;
    task: string;
}

let myTasks: Task[] = [
    {id: nextTaskId++, task: "today i want to dance"}, // placeHolder might delete
]




function addNewTask(taskObj: Omit<Task, "id">): Task { // omitting taskId to make it automitic

    const newTask: Task = {
       id: nextTaskId++,
       ...taskObj,
    } 

    myTasks.push(newTask); // here menu.push does the magic. taskObj is pushed in menu array.s
    showEditDeleteTasks(); // updates the table each time a new task is aded
    return newTask;
  
}

function deleteTask(id : Task["id"]){ 
    myTasks = myTasks.filter(item => item.id !== id);
   showEditDeleteTasks(); // updates the table each time a new task is aded
}

function editTask(id: Task["id"], editedTask: Task["task"]){
  const task = myTasks.find(item => item.id === id);
  if (!task) {
    console.warn(`[editTask] no task found with id=${id}`);
    return false;
  }
  task.task = editedTask;
  showEditDeleteTasks();
  return true;
  
}


addNewTask({ task: "i want to eat a cow" }); // for testing purposes
console.log("after add:", myTasks);       // [{id:1,...},{id:2,...}]

//deleteTask(1);
//console.log("after delete 1:", myTasks); // [{id:2, task: "i want to eat a cow"}]

editTask(1, "just kidding")  // edit id 2 (not 1)             // true
console.log("after edit (stringified):", JSON.stringify(myTasks, null, 2));;     // [{id:2, task: "just kidding"}]


myTasks.forEach(t => console.log("task:", t.id, t.task));


//let list = document.getElementById("myP1");



function showEditDeleteTasks(){
    const list = document.getElementById("myP1");
    if (!list) 
      return;
    // list.innerHTML = myTasks.map(t => `${t.id}: ${t.task}`).join("<br>");

     list.innerHTML = ""; // clear the old list!

  
    myTasks.forEach(t => {            // t is current task in the loop
    
    // set each task in its own div
      const taskDiv = document.createElement("div");
      const taskText = document.createElement("span");
      taskDiv.textContent = `${t.id}: ${t.task}`

    //delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent= "delete";
    deleteBtn.onclick = () => {
      if(confirm("DELETE: " + t.task)){deleteTask(t.id)
        }
      }; // we the get correct id from t, (current task in the loop)

    //edit 
    const editBtn = document.createElement("button");
    editBtn.textContent= "edit";
    editBtn.onclick = () => { 
      const editedText = prompt("Edit the task: ", t.task) // we the get correct id from t, (current task in 
      if (editedText){
        editTask(t.id, editedText)
      } else return;
    }; 

      list.appendChild(editBtn);
      list.appendChild(deleteBtn);
      list.appendChild(taskDiv);
      });

}




let addInput = document.getElementById("newTaskBox") as HTMLInputElement;
let newTask = addInput.value;
document.getElementById("submitTask")!.onclick = function(){
    if(!addInput.value){
        return;
    }
    addNewTask({ task: addInput.value} );
    addInput.value = ""; // optional: clear input after adding
}

/* old edit functionality

let deleteInput = document.getElementById("deleteTaskBox") as HTMLInputElement;
document.getElementById("deleteTask")!.onclick = function(){
    if(!deleteInput.value){
        return;
    }
   // this does not work; let deleteNumberId = deleteInput.value;
   const deleteNumberId = Number(deleteInput.value); 
    deleteTask(deleteNumberId);
    deleteInput.value = ""; // optional: clear input after adding
    showTasks();
}


let editIdInput = document.getElementById("editTaskBoxId") as HTMLInputElement;
let editTextInput  = document.getElementById("editTaskBoxText") as HTMLInputElement;
document.getElementById("editTaskBtn")!.onclick = function(){
    if(!editIdInput.value){
        return;
    } else if (!editTextInput.value){
        return;
    }

   const editedNumberId = Number(editIdInput.value); 
   let editedText = editTextInput.value;
    editTask(editedNumberId, editedText);
    editIdInput.value = ""; // optional: clear input after adding
    editTextInput.value = "";
    showTasks();
}
*/