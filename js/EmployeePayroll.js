function populateObject(){
    try{
        populate()
    } catch(e) {
        console.log(e)
    }
}



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
let employeeData = createEmployeePayrolls()

employeeData.forEach(data => {
    innerHTMLContent = `${innerHTMLContent}
                <div class="table-content">
                    <img src="${data.profilePic}" alt="dp1" class="profile-pic table-heading">
                    <p class="table-item">${data.name}</p>
                    <p class="table-item">${data.gender}</p>
                    <p class="table-item">HR, Finance</p>
                    <p class="table-item">${data.salary}</p>
                    <p class="table-item">${data.startDate}</p>
                    <p class="table-item">ACTIONS</p>
                </div>`

                
    console.log(document.querySelector('#employee-table'))
    document.querySelector('#employee-table-div').innerHTML = innerHTMLContent
});




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

    console.log(employeePayrollList)
    return employeePayrollList
}
