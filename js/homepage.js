window.addEventListener("DOMContentLoaded", (event) => {
    console.log("Page loaded successfully")
    updateHTML()
})

function updateHTML(){
    let headerHTML = `<div class="table-heading-row">
        <p class="table-heading"></p>
        <p class="table-heading">NAME</p>
        <p class="table-heading">GENDER</p>
        <p class="table-heading">DEPARTMENT</p>
        <p class="table-heading">SALARY</p>
        <p class="table-heading">START DATE</p>
        <p class="table-heading">ACTIONS</p>
        </div>`

    let innerHTMLContent = `${headerHTML}`
    let employeeData = JSON.parse(localStorage.getItem("employeePayrollData"))

    employeeData.forEach(data => {
    innerHTMLContent = `${innerHTMLContent}
    <div class="table-content">
        <img src="${data.data.pic}" alt="dp" class="profile-pic table-heading">
        <p class="table-item">${data.data.name}</p>
        <p class="table-item">${data.data.gender}</p>
        <p class="table-item">${data.data.department}</p>
        <p class="table-item">${data.data.salary}</p>
        <p class="table-item">${data.data.date}</p>
        <p class="table-item"><span id=${data.id} onclick=updateNode(this) class="iconify trash" data-icon="bi:pencil-fill"></span> <span id=${data.id} onclick=deleteNode(this) class="iconify pencil" data-icon="ion:trash"></span></p>
    </div>`
    });

    document.querySelector('#employee-table-div').innerHTML = innerHTMLContent
}


function createEmployeePayrolls(){
    let employeePayrollList = [
        {
            name: "Person 1",
            gender: "Male",
            department: ["HR", "Finance"],
            salary: "500000",
            startDate: "21-01-2019",
            note: "",
            id: 1,
            profilePic: "../assets/dp/Ellipse -7.png"
        },
        {
            name: "Person 2",
            gender: "Feale",
            department: ["HR", "Finance"],
            salary: "500000",
            startDate: "21-01-2019",
            note: "",
            id: 2,
            profilePic: "../assets/dp/Ellipse -7.png"
        }
    ]

    return employeePayrollList
}

function deleteNode(node){
    let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollData"))
    let idx = -1

    employeePayrollList.forEach(employee => {
        if(employee.id == node.id){
            employeePayrollData = employee
        }

        idx += 1
    });

    console.log(idx)
    employeePayrollList.splice(idx, 1)
    localStorage.setItem("employeePayrollData", JSON.stringify(employeePayrollList))
    
    updateHTML()
}

function updateNode(node){
    window.location = "../src/employee-payroll.html"
    localStorage.setItem("updateNodeKey", node.id)
}