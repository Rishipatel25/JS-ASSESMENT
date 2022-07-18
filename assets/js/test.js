(function () {
    // clearLocalStorage
    // localStorage.clear();

    // Variables
    const closemodal = document.getElementById('closex'); 
    const form = document.querySelector('.addTodoFrom');
    const totalTask = document.getElementById('totalTask');
    const totalTime = document.getElementById('totalTime');
    const searchInput = document.getElementById('searchinput');
    const table = document.getElementById('table');
    const AddTodo = document.getElementById('addTask');
    const updateEditTask = document.getElementById('updateTask');
    
    let cnt = 1;
    let id;
    let todoList = [];
    
    if (todoList.length == 0) {
        todoList = getTodoItems();
    }
    
    // EventListners
    AddTodo.addEventListener('click', addTodo);
    updateEditTask.addEventListener('click', updateTask);
    
    
    // SetLocalStorage
    function setTodoItems(list) {
        localStorage.setItem("todoList", JSON.stringify(list))
    }
    
    // GetLocalStorage
    function getTodoItems() {
        return JSON.parse(localStorage.getItem("todoList"));
    }
    
    // UpdateTable
    function updateTable(latestTodo) {
        latestTodo = getTodoItems();
        if (latestTodo != null) {
            table.innerHTML = " ";
            for (let i = 0; i < latestTodo.length; i++) {
                const tr =  document.createElement("tr");
                tr.setAttribute('data-key', latestTodo.name);
                tr.innerHTML = `
                <td>${latestTodo[i].date}</td>
                <td>${latestTodo[i].name}</td>
                <td>${latestTodo[i].desc}</td>
                <td>
                <select name="" id="" onchange="ChangeStatus()">
                    <option value="pending" selected >${latestTodo[i].status}</option>
                    <option value="pending">Complete</option>
                    </select>
                    </td>
                    <td>
                        <span  class="cursor-pointer editbtn" role="button" id="${latestTodo[i].id}" data-bs-toggle="modal" data-bs-target="#EditModal" >Edit</span> 
                        <span  class="cursor-pointer deletebtn" role="button" id="${latestTodo[i].id}" >Delete</span>
                    </td>
                `;
                
              tr.getElementsByClassName('editbtn')[0].addEventListener("click", editTodo);
              tr.getElementsByClassName('deletebtn')[0].addEventListener("click", deleteTodo);
              table.append(tr);
            }
        }
    }
        
        // Add Todo
        function addTodo() {
            let name = document.getElementById('Taskname').value;
            let desc = document.getElementById('Taskdesc').value;
            let date = document.getElementById('startdate').value;
            let time = document.getElementById('timetaken').value;
            let noti = document.getElementById('notification').value;
            let status = document.getElementById('status').value;
            
            if (todoList == null) {
                todoList = [];
            }
            
            console.log(todoList.length , "yoo");
            todoList.push({
                id: cnt++,
                name,
                desc,
                date,
                time,
                noti,
                status: status ? "pending" : "completed"
            });
            setTodoItems(todoList);
            updateTable(todoList);
            closemodal.click();
            resetForm();
    }

    // ResetForm
    function resetForm() {
        let name = document.getElementById('Taskname');
        let desc = document.getElementById('Taskdesc');
        let date = document.getElementById('startdate');
        let time = document.getElementById('timetaken');
        let noti = document.getElementById('notification');
        let status = document.getElementById('status');
        name.value = "";
        desc.value = "";
        date.value = "";
        time.value = "";
        noti.value = "";
    }
    

    // Edit Todo
    function editTodo(e) {
        console.log("hello");
        let finds = todoList.findIndex(item => item.id == e.target.id);
        console.log(todoList[finds]);
        let name = document.getElementById('editTaskname');
        let desc = document.getElementById('editTaskdesc');
        let date = document.getElementById('editstartdate');
        let time = document.getElementById('edittimetaken');
        let noti = document.getElementById('editnotification');
        let status = document.getElementById('editstatus');

        name.value = todoList[finds].name;
        desc.value = todoList[finds].desc;
        date.value = todoList[finds].date;
        time.value = todoList[finds].time;
        noti.value = todoList[finds].noti;
        status.value = todoList[finds].status;
    }

    function updateTask() {
        console.log("update Me");
        
    }

    // Delete Todo
    function deleteTodo(e) {
        let finds = todoList.findIndex(item => item.id == e.target.id);
        todoList.splice(finds, 1);
        setTodoItems(todoList)
        updateTable(todoList);
    }

    updateTable(todoList);
})()