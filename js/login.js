let baseEmployeeURL = "http://localhost:3000/employees/"
let baseCredURL = "http://localhost:3000/credentials/"
let baseCredQueryURL = "http://localhost:3000/credentials?"

function makeAjaxRequest(methodType, url, async, data=null){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                console.log("Started")
                if(this.status == 200){
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

function userLogin(){
    let mobile = document.getElementById("name-ip")
    let password = document.getElementById("password-ip")

    if(checkMobile(mobile)){
        console.log("valid")
        checkPasswordAndMobile(password, mobile)
    }
}

function checkMobile(mobile){
    mobile_rgx = /^[\d]{2}[ ][6789][\d]{9}$/
    const inputBox = mobile.parentElement
    const smallElement = inputBox.querySelector('small')
    mobile_val = mobile.value

    if(mobile_rgx.test(mobile_val)){
        inputBox.className = 'input-grid success'
        smallElement.innerText = ''
    } else {
        inputBox.className = 'input-grid error'
        smallElement.innerText = 'Please enter a valid mobile number'
        return false
    }

    return true
}

function checkEmail(email){
    email_rgx = /^([a-zA-Z0-9_])+(@)(\w)+(.)([a-zA-Z]){2,3}(.)?(\w){2,3}?$/
    const inputBox = email.parentElement
    const smallElement = inputBox.querySelector('small')
    email_str = email.value

    if(email_rgx.test(email_str)){
        inputBox.className = 'input-grid success'
        smallElement.innerText = ''
    } else {
        inputBox.className = 'input-grid error'
        smallElement.innerText = 'Please enter a valid Email ID'
        return false
    }

    return true
}

function checkPassword(password){
    password_rgx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]{1}).{8,}$/
    const inputBox = password.parentElement
    const smallElement = inputBox.querySelector('small')
    pass = password.value

    if(password_rgx.test(pass)){
        inputBox.className = 'input-grid success'
        smallElement.innerText = ''
    } else {
        inputBox.className = 'input-grid error'
        smallElement.innerText = 'Please enter a valid password'
        return false
    }

    return true
}


function checkPasswordAndMobile(password, mobile){
    let responseMatch;
    const inputBox = password.parentElement
    const smallElement = inputBox.querySelector('small')

    makeAjaxRequest("GET", baseCredQueryURL + `password=${password.value}&mobile=${mobile.value}`, true)
    .then((responseText) => {
        if(responseText.length == 0){
            inputBox.className = 'input-grid error'
            smallElement.innerText = 'Invalid credentials'
        } else {
            inputBox.className = 'input-grid success'
            smallElement.innerText = ''
        }
    }).catch((e) => console.log(e))

    return responseMatch
}

function register(){
    let email = document.getElementById("email-ip")
    let mobile = document.getElementById("mobile-ip")
    let password = document.getElementById("password-ip")

    if(checkEmail(email) && checkMobile(mobile) && checkPassword(password)){
        let newCredential = {
            "email": email.value,
            "password": password.value,
            "mobile": mobile.value
        }

        makeAjaxRequest("POST", baseCredURL, true, newCredential)
        .then(() => {console.log("Inserted New Credential Successfully")})
        .catch((error) => {console.log(error)})
    }
}

