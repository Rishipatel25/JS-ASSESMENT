(function(){
  const closemodal = document.getElementById('closex'); 
  const form = document.querySelector('.addTodoFrom');
  const totalTask = document.getElementById('totalTask');
  const totalTime = document.getElementById('totalTime');
  const searchInput = document.getElementById('searchinput');

  let cnt = 1;
  let id;
  let todoList = [];

  const table = document.getElementById('table');
  function UpdateList(todo, fromLocation) {
    // console.log("Here Test todo", todo.length);
    if (todo.isActive == false ) {
        todo.remove()
    }


    if (fromLocation == "add") {
        for (let i = todo.length-1; i < todo.length; i++) {
            const tr = document.createElement("tr");
            tr.setAttribute('data-key', todo.name);
            tr.innerHTML = `
              <td>${todo[i].date}</td>
              <td>${todo[i].name}</td>
              <td>${todo[i].desc}</td>
              <td>
                <select name="" id="" onchange="ChangeStatus()">
                    <option value="pending" selected >${todo[i].status}</option>
                    <option value="pending">Complete</option>
                </select>
              </td>
              <td>
              <span class="cursor-pointer" role="button" id="${todo[i].id}" onclick="viewMe(event,${todo[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal">View</span> 
              <span  class="cursor-pointer" role="button" id="edit${todo[i].id}" onclick="editMe(event,${todo[i].id})" data-bs-toggle="modal" data-bs-target="#EditModal" >Edit</span> 
              <span  class="cursor-pointer" role="button" id="${todo[i].id}" >Delete</span>
              </td>
            `;
    
            table.append(tr);
        }
    }
    if (fromLocation == "delete") {
        console.log("location Delete Please Re-render");
        console.log(table);
        table.style.innerHTML = " ";
        console.log("todoList",todo.length);
        for (let i = 0; i < todo.length; i++) {
            console.log("hello");
            console.log(todo[i]);
            const tr = document.createElement("tr");
            tr.setAttribute('data-key', todo.name);
            tr.innerHTML = `
              <td>${todo[i].date}</td>
              <td>${todo[i].name}</td>
              <td>${todo[i].desc}</td>
              <td>
                <select name="" id="" onchange="ChangeStatus()">
                    <option value="pending" selected >${todo[i].status}</option>
                    <option value="pending">Complete</option>
                </select>
              </td>
              <td>
              <span class="cursor-pointer" role="button" id="${todo[i].id}" onclick="viewMe(event,${todo[i].id})" data-bs-toggle="modal" data-bs-target="#exampleModal">View</span> 
              <span  class="cursor-pointer" role="button" id="edit${todo[i].id}" onclick="editMe(event,${todo[i].id})" data-bs-toggle="modal" data-bs-target="#EditModal" >Edit</span> 
              <span  class="cursor-pointer" role="button" id="${todo[i].id}" >Delete</span>
              </td>
            `;
            table.append(tr);

        }
        
    }
    totalTask.innerHTML = `<b>${todo.length}</b>`;
  }


  function deleteMe(id) {
    console.log(id);
    console.log(todoList);
    // const updatedList = todoList.filter(item => item.id !== id);
    // console.log(updatedList);

    UpdateList(updatedList, "delete");
  }

  function editMe(e, id) {
    for (const ele of todoList) {
        if (ele.id == id) {
            const des = document.getElementById('editdes');
            const date = document.getElementById('editdate');
            const time = document.getElementById('edittim');
            const noti = document.getElementById('editnot');
            const status = document.getElementById('editsta');
            const title = document.getElementById('edittitle');
            title.innerHTML = `<b>${ele.name}</b>`;
            des.innerHTML = `<b>${ele.desc}</b>`;
            date.innerHTML = `<b>${ele.date}</b>`;
            time.innerHTML = `<b>${ele.time}</b>`;
            noti.innerHTML = `<b>${ele.noti}</b>`;
            status.innerHTML = `<b>${ele.status}</b>`;
          } 
      }
  }


function addTodo(name, desc,date, time, noti, status) {
    const todo = {
        id : cnt++,
      name,
      desc,
      date,
      time,
      noti,
      status,
      isActive: true
    };
    todoList.push(todo);
    localStorage.setItem("taskList", JSON.stringify(todoList))

    console.log(todoList);
    UpdateList(todoList, "add")
  }
form.addEventListener('submit', event => {
  event.preventDefault();
  let name = document.getElementById('Taskname');
  let desc = document.getElementById('Taskdesc');
  let date = document.getElementById('startdate');
  let time = document.getElementById('timetaken');
  let noti = document.getElementById('notification');
  let status = document.getElementById('status');
  addTodo(name.value, desc.value,date.value, time.value, noti.value, status.value);
  name.value = "";
  desc.value = "";
  date.value = ""; 
  time.value = "";
  closemodal.click();
});

searchInput.addEventListener('keypress', (e) =>{
    console.log(e.target.value);
    for (let i = 0; i < todoList.length; i++) {
      if (e.target.value == todoList[i].name || e.target.value == todoList[i].desc) {
          console.log(todoList);
      }
    }
    
})
})()