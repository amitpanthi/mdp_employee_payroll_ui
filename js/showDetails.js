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

        console.log(year, month, day)
        let inputDate = new Date(year, month, day)
        console.log(inputDate)
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

    setName(new_name){
        this.e_name = new_name
    }

    setID(new_id){
        this.e_id = new_id
    }

    setSalary(new_salary){
        this.e_salary = new_salary
    }

    setGender(new_gender){
        this.e_gender = new_gender
    }

    setName(new_name){
        this.e_name = new_name
    }

    setID(new_id){
        this.e_id = new_id
    }

    setSalary(new_salary){
        this.e_salary = new_salary
    }

    showDetails(){
        console.log(`Employee Name: ${this.name}\nEmployee Pic: ${this.pic}\nEmployee Gender: ${this.gender}\nEmployee Salary: ${this.salary}\
        \nEmployee Start Date: ${this.day}/${this.month}/${this.year}\nEmployee Additional Notes: ${this.notes}`)
    }
}

function showDetails(){
    let name = document.getElementById("name-ip")
    let pic = document.querySelector('input[name="dp"]:checked')
    let gender = document.querySelector('input[name="gender"]:checked')
    let salary = document.getElementById("salary-slider")
    let day = document.getElementById("day-ip")
    let month = document.getElementById("month-ip")
    let year = document.getElementById("year-ip")
    let notes = document.getElementById("notes-ip")

    try{
        let newEmployee = new EmployeePayroll(name.value, pic.value, gender.value, salary.value, day.value, month.value, year.value, notes.value)
        newEmployee.showDetails()
    } catch(err) {
        errorBox = document.getElementById("error-text")
        errorBox.innerHTML = "Please enter all inputs"
    }
}