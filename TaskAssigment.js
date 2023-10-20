let addTask = document.querySelector("#addTask");
let addMember = document.querySelector('#addMember');

let taskInputs = document.querySelectorAll("#tasksContainer input");

// Get all the member input fields
let memberInputs = document.querySelectorAll("#membersContainer input");

// Get the values of the task input fields
let tasks = Array.from(taskInputs).map(input => input.value);

// Get the values of the member input fields
let members = Array.from(memberInputs).map(input => input.value);


addTask.addEventListener('click', function () {
    // Create a new input element
    let input = document.createElement("input");
    let edit = document.createElement('button');

    // Optionally set any desired input attributes
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter new task");
    input.classList.add('form-control');
    edit.setAttribute("type", "submit");

    // Append the input field to the body (or any other container)
    document.querySelector("#tasksContainer").appendChild(input);

    input.addEventListener('change', function () {
        tasks.push(this.value);
    });

})

addMember.addEventListener('click', function () {
    // Create a new input element
    let input = document.createElement("input");

    // Optionally set any desired input attributes
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter new member");
    input.classList.add('form-control');

    // Append the input field to the body (or any other container)
    document.querySelector("#membersContainer").appendChild(input);

    input.addEventListener('change', function () {
        members.push(this.value);
    });

})




let assignBtn = document.querySelector('#asignBtn');

assignBtn.addEventListener('click', function () {

    assignTasks(members, tasks);
});

function assignTasks(members, tasks) {
    let assignments = {};

    // Create a copy of the members array
    let availableMembers = [...members];
    let availableTasks = [...tasks];

   if (availableTasks.length === 0) {
        alert("There are no tasks to assign.");
        return assignments;
    }

    if (availableMembers.length === 0) {
        alert("There are no members to assign tasks to.");
        return assignments;
    }

   
    for (let i = 0; i < members.length; i++) {
        let taskIndex = i % tasks.length; // Use modulo to cycle through tasks
        assignments[members[i]] = tasks[taskIndex];
    }
    for(let i = 0;i<tasks.length; i++){
        let memberIndex = i % members.length;

       assignments[tasks[i]] = members[memberIndex];
    }

    let pre = document.createElement("pre");

    // Set its innerHTML to the stringified assignments object
    pre.innerHTML = JSON.stringify(assignments, null, 2);
    // pre.classList.add('modal-dialog');

    // Append the pre element to the body (or any other container)
    document.body.appendChild(pre);
    document.querySelector(".modal-body").appendChild(pre);

    

    

    return assignments;
}

let copyBtn = document.getElementsByClassName('copy-btn');

copyBtn.addEventListener('click', function () {
    var pageContent = document.querySelector(".modal-body").outerHTML;

    navigator.clipboard.writeText(pageContent).then(function() {
        console.log('Page content copied to clipboard');
    })
    .catch(function(error) {
        console.error('Error occurred while copying page content: ', error);
    });
})





