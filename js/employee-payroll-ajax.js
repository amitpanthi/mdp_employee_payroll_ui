class EmployeePayroll{
    constructor(...params){
        this.name = params[0]
        this.pic = params[1]
        this.gender = params[2]
        this.salary = params[3]
        this.day = params[4]
        this.month = params[5]
        this.year = params[6]
        this.notes = params[7]
        this.department = params[8]
    }

    setName(name){
        //checking username
        var uname_rgx = /^([A-Z])([A-Za-z ]){2,}$/
        let name_bool = uname_rgx.test(name)
        let inputBox = document.getElementById("name-ip")

        if(name_bool == false){
            inputBox.className = "name-ip ip error"
        } else {
            this.name = name
            inputBox.className = "name-ip ip"
        }
    }

    setDate(date){
        //checking date
        let day = date[0]
        let month = date[1]
        let year = date[2]

        let inputDate = new Date(year, month, day)
        let inputDateInMs = inputDate.getTime()

        const timeElapsed = Date.now()
        let numDaysPassed = (timeElapsed - inputDateInMs)/(1000 * 60 * 60 * 24) //getting number of days passed since input date
        
        let yearInputBox = document.getElementById("year-ip")
        let monthInputBox = document.getElementById("month-ip")
        let dateInputBox = document.getElementById("day-ip")

        if(numDaysPassed <= 30){
            dateInputBox.className = "day-ip ip error"
            monthInputBox.className = "month-ip ip error"
            yearInputBox.className = "year-ip ip error"
        } else {
            dateInputBox.className = "day-ip ip"
            monthInputBox.className = "month-ip ip"
            yearInputBox.className = "year-ip ip"

            this.day = day
            this.month = month
            this.year = year
        }
    }

    showDetails(){
        console.log(`Employee Name: ${this.name}\nEmployee Pic: ${this.pic}\nEmployee Gender: ${this.gender}\nEmployee Salary: ${this.salary}\
        \nEmployee Start Date: ${this.day}/${this.month}/${this.year}\nEmployee Additional Notes: ${this.notes}\
        \nEmployee Department: ${this.department}`)
    }
}

let emp = new EmployeePayroll()
let baseURL = "http://localhost:3000/employees/"
let baseQueryURL = "http://localhost:3000/employees?"

function makeAjaxRequest(methodType, url, async, data=null){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                console.log("Started")
                if(this.status == 200 || this.status == 201){
                    resolve(JSON.parse(this.responseText))
                } else {
                    reject("Something went wrong")
                }
            }
        }

        xhr.open(methodType, url, async)

        if(data){
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data))
        } else {
            xhr.send()
        }
    })
}

function submitForm(){
    let name = document.getElementById("name-ip")
    let pic = document.querySelector('input[name="dp"]:checked')
    let gender = document.querySelector('input[name="gender"]:checked')
    let salary = document.getElementById("salary-slider")
    let department = getDepartments()
    let day = document.getElementById("day-ip")
    let month = document.getElementById("month-ip")
    let year = document.getElementById("year-ip")
    let notes = document.getElementById("notes-ip")

    emp.setName(name.value)
    emp.setDate([day.value, month.value, year.value])
    emp.pic = pic.value
    emp.gender = gender.value
    emp.salary = salary.value
    emp.department = department
    emp.notes = notes.value

    let newEmp = {
        "name": emp.name,
        "gender": emp.gender,
        "department": emp.department,
        "salary": emp.salary,
        "startDate": `${emp.day}-${emp.month}-${emp.year}`,
        "note": emp.notes,
        "profilePic": pic.value
    }

    if(localStorage.getItem("updateNodeKey") != "undefined" && localStorage.getItem("updateNodeKey") != "null" && localStorage.getItem("updateNodeKey") != null){
        
        newEmp.id = localStorage.getItem("updateNodeKey")
        makeAjaxRequest("PUT", baseURL + `${newEmp.id}`, true, newEmp).then((returnVal) => {
            console.log("Successfully updated"); 
            localStorage.removeItem("updateNodeKey")
            window.location = "../src/home.html"})
            .catch((err) => {console.log(err)})
        
        return
    } 

    makeAjaxRequest("POST", baseURL, true, newEmp).then((returnVal) => {
        console.log("Successfully added"); 
        window.location = "../src/home.html"})
        .catch((err) => {console.log(err)})
}


function getDepartments(){
    let checkedDepts = []
    let departments = document.getElementsByName("dept")

    departments.forEach(d => {
        if(d.checked === true){
            checkedDepts.push(d.value)
        }
    });

    return checkedDepts
}

function setVal(employeePayrollData){
    let name = document.getElementById("name-ip")
    let pic = document.getElementsByName('dp')
    let gender = document.getElementsByName('gender')
    let salary = document.getElementById("salary-slider")
    let department = document.getElementsByName("dept")
    let day = document.getElementById("day-ip")
    let month = document.getElementById("month-ip")
    let year = document.getElementById("year-ip")
    let notes = document.getElementById("notes-ip")

    name.value = employeePayrollData.name
    salary.value = employeePayrollData.salary

    for(let itr = 0; itr < department.length; itr++){
        if(employeePayrollData.department.includes(department[itr].value)){
            document.getElementById(`dept${itr+1}`).checked = true
        }
    }

    for(let itr = 0; itr < gender.length; itr++){
        if(gender[itr].value == employeePayrollData.gender){
            gender[itr].checked = true
        }
    }

    for(let itr = 0; itr < pic.length; itr++){
        if(pic[itr].value == employeePayrollData.profilePic){
            pic[itr].checked = true
        }
    }

    let dateArray = employeePayrollData.startDate.split("-")
    day.value = dateArray[0]
    month.value = dateArray[1]
    year.value = dateArray[2]

    notes.value = employeePayrollData.notes
}

function checkUpdates(){
    if(localStorage.getItem("updateNodeKey") != "undefined"){
        let updateKey = localStorage.getItem("updateNodeKey")
        makeAjaxRequest("GET", baseQueryURL + `id=${updateKey}`, true).then((employee) => {setVal(employee[0])}).catch((err) => {console.log(err)})
        }
}

function reset(){
    let name = document.getElementById("name-ip")
    let pic = document.getElementsByName('dp')
    let gender = document.getElementsByName('gender')
    let salary = document.getElementById("salary-slider")
    let salaryVal = document.getElementById("slider-output")
    let department = document.getElementsByName("dept")
    let day = document.getElementById("day-ip")
    let month = document.getElementById("month-ip")
    let year = document.getElementById("year-ip")
    let notes = document.getElementById("notes-ip")

    name.value = ''
    
    pic.forEach((p) => {
        p.checked = false
    })

    gender.forEach((g) => {
        g.checked = false
    })

    salary.value = 500000
    salaryVal.innerHTML = 500000
    department.forEach((d) => {
        d.checked = false
    })

    day.value = 1
    month.value = 1
    year.value = 2021
    notes.value = ""
}