class EmployeePayroll{
    constructor(...params){
        this.validateRegex(params)
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

    validateRegex(params){
        //checking username
        var uname_rgx = /^([A-Z])([A-Za-z ]){2,}$/
        let name = params[0]

        let name_bool = uname_rgx.test(name)
        let inputBox = document.getElementById("name-ip")

        if(name_bool == false){
            inputBox.className = "name-ip ip error"
        } else {
            inputBox.className = "name-ip ip"
        }

        //checking date
        let day = params[4]
        let month = params[5]
        let year = params[6]

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
        }
    }

    showDetails(){
        console.log(`Employee Name: ${this.name}\nEmployee Pic: ${this.pic}\nEmployee Gender: ${this.gender}\nEmployee Salary: ${this.salary}\
        \nEmployee Start Date: ${this.day}/${this.month}/${this.year}\nEmployee Additional Notes: ${this.notes}\
        \nEmployee Department: ${this.department}`)
    }
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

    // let newEmployee = new EmployeePayroll(name.value, pic.value, gender.value, salary.value, day.value, month.value, year.value, notes.value, department)
    let newEmployee = {
        name: name.value,
        pic: pic.value,
        gender: gender.value,
        salary: salary.value,
        department: department,
        date: `${day.value}-${month.value}-${year.value}`,
        notes: notes.value
    }

    let employeePayrollList = localStorage.getItem("employeePayrollData")

    if(employeePayrollList == undefined || employeePayrollList == []){
        employeePayrollList = [{id: 1, data: newEmployee}]
    } else {
        employeePayrollList = JSON.parse(employeePayrollList)
        employeePayrollList.push({id: employeePayrollList.length + 1, data: newEmployee})
    }

    localStorage.setItem("employeePayrollData", JSON.stringify(employeePayrollList))
}


function getDepartments(){
    let checkedDepts = []
    let departments = document.getElementsByName("dept")

    departments.forEach(d => {
        console.log(d, d.checked)
        if(d.checked === true){
            checkedDepts.push(d.value)
        }
    });

    return checkedDepts
}


function checkUpdates(){
    if(localStorage.getItem("updateNodeKey") != undefined){
        let updateKey = localStorage.getItem("updateNodeKey")
        let employeePayrollList = JSON.parse(localStorage.getItem("employeePayrollData"))

        let idx = -1
        let name = document.getElementById("name-ip")
        let pic = document.getElementsByName('dp')
        let gender = document.getElementsByName('gender')
        let salary = document.getElementById("salary-slider")
        let department = document.getElementsByName("dept")
        let day = document.getElementById("day-ip")
        let month = document.getElementById("month-ip")
        let year = document.getElementById("year-ip")
        let notes = document.getElementById("notes-ip")
        
        employeePayrollList.forEach(employee => {
            if(employee.id == updateKey){
                employeePayrollData = employee.data
            }

            idx += 1
        });

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
            if(pic[itr].value == employeePayrollData.pic){
                pic[itr].checked = true
            }
        }

        let dateArray = employeePayrollData.date.split("-")
        day.value = dateArray[0]
        month.value = dateArray[1]
        year.value = dateArray[2]

        notes.value = employeePayrollData.notes

        console.log(idx)
        console.log(employeePayrollList)
        localStorage.setItem("employeePayrollData", JSON.stringify(employeePayrollList.splice(idx, 1)))
        localStorage.setItem("updateNodeKey")
    }
}