
/*
const fruits: string [] = ["banana", "apple", "lemons"] 

//fruits.forEach(fruit => console.log(fruit))

let i = 0;
for(i; i<fruits.length; i++){
  if(fruits[i].startsWith("a"))
  console.log(fruits[i])
}

*/

// todays challenge: Daily habit tracker
/* 
    Users can add habits (e.g., "Drink water", "Go for a walk").
    Check them off each day.
    Show a streak counter for each habit.
    Store progress locally (localStorage) or in a small backend.
    */

let nextHabitId: number = 1;

type Habit = {
  id: number;
  textHabit: string;
}


let myHabits: Habit[] = [
    {id: nextHabitId++, textHabit: "Drink 3L water"}, // placeHolder might delete
]




//make new habit
function createHabit(habitObj: Omit<Habit, "id">): Habit{
  const newHabit: Habit = {
    id: nextHabitId++,
    ...habitObj,
  }

  myHabits.push(newHabit);
  administerHabits();
  showHabits();
  console.log(myHabits)
  return newHabit;
  

}


function deleteHabit(id : Habit["id"]){ 
    myHabits = myHabits.filter(item => item.id !== id);
    administerHabits(); // updates the table each time a new habit is aded
    showHabits();
}

// delete habits, maybe also edit?
function administerHabits(){
      const list = document.getElementById("myP1");
    if (!list) 
      return;
    // list.innerHTML = myTasks.map(t => `${t.id}: ${t.task}`).join("<br>");

     list.innerHTML = ""; // clear the old list!

  
    myHabits.forEach(t => {            // t is current task in the loop
    
    // set each task in its own div
      const habitDiv = document.createElement("div");
      const habitText = document.createElement("span");
      habitDiv.textContent = `${t.id}: ${t.textHabit}`

    //delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent= "delete";
    deleteBtn.onclick = () => {
      if(confirm("DELETE: " + t.textHabit + "... Warning: this will permanently delete your current streak progress")){deleteHabit(t.id)
        }
      }; // we the get correct id from t, (current task in the loop)

      
      list.appendChild(deleteBtn);
      list.appendChild(habitDiv);
      });
}

let adminBtn = document.getElementById("administerHabitsBtn")  as HTMLInputElement;;
  adminBtn.onclick = () => administerHabits();






let addInput = document.getElementById("newHabitBox") as HTMLInputElement;
let newHabit = addInput.value;
document.getElementById("submitHabit")!.onclick = function(){
    if(!addInput.value){
        return;
    }
    createHabit({ textHabit: addInput.value} );
    addInput.value = ""; // optional: clear input after adding
    }




function showHabits(){
    // list all habits and check off habits
          const list = document.getElementById("myP2");
    if (!list) 
      return;
    // list.innerHTML = myTasks.map(t => `${t.id}: ${t.task}`).join("<br>");

     list.innerHTML = ""; // clear the old list!

  
    myHabits.forEach(t => {            // t is current task in the loop
    
    // set each task in its own div
      const habitDiv = document.createElement("div");
      const habitText = document.createElement("span");
      habitDiv.textContent = `${t.id}: ${t.textHabit}`

    //check habit

    const checkHabit = document.createElement("input");
    checkHabit.type = "checkbox";

        // Check if current habit already is completed today
    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem(`habit_${t.id}`); // use localStorage.getItem and setItem 
    if (lastCompleted === today){
      checkHabit.disabled = true;
      checkHabit.checked = true;
      habitText.style.color = "grey"
      habitText.style.textDecoration = "line-trough"
    }

    checkHabit.onclick = () => {
      localStorage.setItem(`habit_${t.id}`, today);
      checkHabit.disabled = true;
      
      


      }; // we the get correct id from t, (current task in the loop)

      
      list.appendChild(checkHabit);
      list.appendChild(habitDiv);
      });


    function checkOffhabit(){}
    // checked habit should grey out
    // increment streak and grey out habit until midnight

  }
  showHabits()




// show daily streaks of checking off a habit
function streakCounter(){}

//also: Store progress locally (localStorage) or in a small backend. FIND OUT HOW DO THIS