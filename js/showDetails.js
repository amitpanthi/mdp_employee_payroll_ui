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
    }

    validateRegex(params){
        //checking username
        var uname_rgx = /^([A-Z])([\w]){1}([\w])+$/
        let name = params[1]

        let name_bool = uname_rgx.test(name)

        var gender_rgx = /^[MF]$/
        let gender = params[3]

        let gender_bool = gender_rgx.test(gender)

        if(name_bool == false){
            throw("Invalid Name!")
        }

        if(gender_bool == false){
            throw("Invalid Gender!")
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

    let newEmployee = new EmployeePayroll(name.value, pic.value, gender.value, salary.value, day.value, month.value, year.value, notes.value)
    newEmployee.showDetails()
}