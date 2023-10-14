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

    // Optionally set any desired input attributes
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter new task");

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

    while (availableTasks.length > 0) {
        let randomMemberIndex = Math.floor(Math.random() * availableMembers.length);
        let randomTaskIndex = Math.floor(Math.random() * availableTasks.length);

        let selectedMember = availableMembers[randomMemberIndex];
        let selectedTask = availableTasks[randomTaskIndex];

        // Assign the task to the selected member
        assignments[selectedMember] = selectedTask;

        // Remove the selected member and task from the available members and tasks
        availableMembers.splice(randomMemberIndex, 1);
        availableTasks.splice(randomTaskIndex, 1);
    }
    

    let pre = document.createElement("pre");

    // Set its innerHTML to the stringified assignments object
    pre.innerHTML = JSON.stringify(assignments, null, 2);

    // Append the pre element to the body (or any other container)
    document.body.appendChild(pre);

    return assignments;
}

