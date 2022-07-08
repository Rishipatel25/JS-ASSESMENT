const closemodal = document.getElementById('closex'); 
const form = document.querySelector('.addTodoFrom');
const totalTask = document.getElementById('totalTask');
const totalTime = document.getElementById('totalTime');

let cnt = 1;
let id;
// Add Data From form
let todoList = [];

function UpdateList(todo, fromLocation) {
    // console.log("Here Test todo", todo.length);
    const table = document.getElementById('table');
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
              <span  class="cursor-pointer" role="button" id="${todo[i].id}" onclick="deleteMe(event,${todo[i].id})" >Delete</span>
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
              <span  class="cursor-pointer" role="button" id="${todo[i].id}" onclick="deleteMe(event,${todo[i].id})" >Delete</span>
              </td>
            `;
    
            table.append(tr);
            
        }
        
    }
    totalTask.innerHTML = `<b>${todo.length}</b>`;

  }

  function deleteMe(e, id) {
    console.log(id);
    const updatedList = todoList.filter(item => item.id !== id);
    console.log(updatedList);

    UpdateList(updatedList, "delete");
  }

  function editMe(e, id) {

  }

  function viewMe(e, id) {
    let foundId;
    for (const ele of todoList) {
        if (ele.id == id) {
            const des = document.getElementById('editdes');
            const date = document.getElementById('editdate');
            const time = document.getElementById('edittim');
            const noti = document.getElementById('editnot');
            const status = document.getElementById('editsta');

            des.style.innerHTML = `<b>${ele.desc}</b>`;
            date.style.innerHTML = `<b>${ele.date}</b>`;
            time.style.innerHTML = `<b>${ele.time}</b>`;
            noti.style.innerHTML = `<b>${ele.noti}</b>`;
            status.style.innerHTML = `<b>${ele.status}</b>`;
            console.log(des);
            console.log(ele);
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

    console.log(todoList);
    UpdateList(todoList, "add")
  }
form.addEventListener('submit', event => {
  event.preventDefault();
  console.log("hello");
  const name = document.getElementById('Taskname').value;
  const desc = document.getElementById('Taskdesc').value;
  const date = document.getElementById('startdate').value;
  const time = document.getElementById('timetaken').value;
  const noti = document.getElementById('notification').value;
  const status = document.getElementById('status').value;
  addTodo(name, desc,date, time, noti, status);
  closemodal.click()
//   console.log(name, desc,date, time, noti, status);
});


// End Form Data Adding 


// Loop for table
