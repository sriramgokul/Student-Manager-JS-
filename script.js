
// CRUD- Create,Read,Update,Delete

// Selecting the DOM Elements

const studentList = document.getElementById("student-list");

// Rendering the DATA

function renderStudents(studs){
const studentDiv =document.createElement("div");
studentDiv.className = "card";
studentDiv.innerHTML += `
<h2>${studs.name}</h2>
<p><span class="span-h">Age: </span><span id="age-val">${studs.age}</span></p>
<p><span class="span-h">Batch: </span> <span id="batch-val">${studs.batch}</span></p>
<div class="btn-group">
<button data-id= ${studs.id} id="edit-btn" class="btn">Edit</button>
<button data-id= ${studs.id} id="del-btn" class="btn">Delete</button>
</div>
`
studentList.append(studentDiv);
}

// API

const API = "https://661de6ff98427bbbef02d0dd.mockapi.io/Students";

// Reading/Fetching the Data from API

function ReadAllData(){
    fetch(API, {
        method: "GET"
    })
    .then((res)=>res.json())
    .then((res1)=>renderAllStudents(res1))
    .catch((err)=>console.log(err))
}

ReadAllData();

// Getting Details from API

function renderAllStudents(students){
    students.forEach((student)=>{
        renderStudents(student);
    })
}


// CREATE(POST)
function createData(newStudents){
    fetch(API, {
        method:"POST",
        body:JSON.stringify(newStudents),
        headers:{
            "content-Type" : "application/json"
        }
    })
    .then((res)=> res.json())
    .then((res1)=>renderStudents(res1))
    .then(()=>{
        InputName.value = "",
        InputAge.value = "",
        InputBatch.value = ""
    })
    .catch((err)=>console.log(err))
}

// UPDATED DATA

function updateData(updatedStudents){  
    fetch(`${API}/${editId}`,{
        method:"PUT",
        body : JSON.stringify(updatedStudents),
        headers : {
            "Content-Type" : "application/json",
        }
    })
    .then((res)=>res.json())
    .then(()=>location.reload())
    .catch((err)=>console.log("Error",err))
}




// EDIT
function populateStudentForm(parent){
    const editable = parent.parentNode;
    InputName.value = editable.querySelector("h2").textContent;
    InputAge.value = editable.querySelector("#age-val").textContent;
    InputBatch.value = editable.querySelector("#batch-val").textContent;
    updatebtn.style.display = "block",
    addbtn.style.display = "none"
}
//DELETE
studentList.addEventListener("click",(e)=>{
    const id = e.target.dataset.id;
    const parent = e.target.parentNode;
    if(e.target.id==="del-btn"){
      deleteData(id,parent);
    }
    if(e.target.id==="edit-btn"){
      populateStudentForm(parent);
      editId = id;
    }
    
    
})

function deleteData(id,parent){
    fetch(`${API}/${id}`,{
        method: "DELETE",
        headers : {
            "content-Type": "application/json"
        }
    })
    .then(()=> parent.parentNode.remove())
    .catch((err)=> console.log(err))
}





// Creating a Form
const studentform = document.querySelector("#student-form");
studentform.innerHTML += `
<form class="form-data">
<h2 class="head">STUDENT FORM</h2>
<input type="text"  name="name" required value="" placeholder="Student Name" class="input-text" id="input-name"/>
<input type="text"  name="age" required value=""  placeholder="Student Age" class="input-text" id="input-age"/>
<input type="text"  name="batch" required value="" placeholder="Student Batch" class="input-text" id="input-batch"/>

<div>
<button type="submit" id="add-btn" class="btn">Add Students</button>
<button type="submit" id="update-btn">Update Students</button>
</div>
</form>
`
// POST
const InputName = document.querySelector("#input-name");
const InputAge = document.querySelector("#input-age");
const InputBatch = document.querySelector("#input-batch");

// Update
const updatebtn = document.querySelector("#update-btn");
const addbtn = document.querySelector("#add-btn");
let editId;

updatebtn.style.display = "none";


studentform.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.id == "add-btn" ){
        const newStudents = {
            name : InputName.value,
            age: InputAge.value,
            batch: InputBatch.value
        };
        createData(newStudents); 
    }
    if(e.target.id == "update-btn"){
        const updatedStudents = {
            name: InputName.value,
            age: InputAge.value,
            batch: InputBatch.value
        };
        updateData(updatedStudents);
    }

})