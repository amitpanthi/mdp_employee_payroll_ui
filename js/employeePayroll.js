export class EmployeePayroll{
    constructor(...params){
        this.validateRegex(params)
        this.e_id = params[0]
        this.e_name = params[1]
        this.e_salary = params[2]
        this.e_gender = params[3]
        this.e_startDate = params[4]
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
        console.log(`Employee ID: ${this.e_id}\nEmployee Name: ${this.e_name}\nEmployee Salary: ${this.e_salary}\
        \nGender: ${this.e_gender}\nStart Date: ${this.e_startDate}`)
    }
}