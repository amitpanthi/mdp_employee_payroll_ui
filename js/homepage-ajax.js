let baseURL = "http://localhost:3000/employees/"
let baseCredQueryURL = "http://localhost:3000/credentials?"
let userValues = []
let users = {}

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("Page loaded successfully")
    updateHTML()
    updateAdminNav()
})

document.getElementById("search").addEventListener('keyup', getSearchValues)

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

function updateHTML(){
    makeAjaxRequest("GET", baseURL, true)
    .then((response) => {
        setUserList(response);
        setHTMLValues(response);
    })
    .catch((err) => {console.log(err)})
}

function setUserList(responseText){
    let employeeCount = document.getElementById("employee-count")
    responseText.forEach((user) => {
        userValues.push(user.name)
    })

    users = responseText
    employeeCount.innerHTML = userValues.length
}


function getSearchValues(){
    let search = document.getElementById("search")
    let keyword = search.value.toLowerCase()

    let filtered_users = userValues.filter(function(user){
        user = user.toLowerCase();
       return user.indexOf(keyword) > -1
    })
    
    let fullyFilteredUsers = []

    filtered_users.forEach((elem) => {
        users.forEach((u) => {
            if(u.name == elem){
                fullyFilteredUsers.push(u)
            }
        })
    })

    setHTMLValues(fullyFilteredUsers)
}

function setHTMLValues(empData){
    var headerHTML = `<div class="table-heading-row">
        <p class="table-heading"></p>
        <p class="table-heading">NAME</p>
        <p class="table-heading">GENDER</p>
        <p class="table-heading">DEPARTMENT</p>
        <p class="table-heading">SALARY</p>
        <p class="table-heading">START DATE</p>
        <p class="table-heading">ACTIONS</p>
        </div>`

    var innerHTMLContent = `${headerHTML}`

    empData.forEach((data) => {
        innerHTMLContent = `${innerHTMLContent}
        <div class="table-content">
            <img src="${data.profilePic}" alt="dp" class="profile-pic table-heading">
            <p class="table-item">${data.name}</p>
            <p class="table-item">${data.gender}</p>
            <p class="table-item">${data.department}</p>
            <p class="table-item">${data.salary}</p>
            <p class="table-item">${data.startDate}</p>
            <p class="table-item"><span id=${data.id} onclick=updateNode(this) class="iconify trash" data-icon="bi:pencil-fill"></span> <span id=${data.id} onclick=deleteNode(this) class="iconify pencil" data-icon="ion:trash"></span></p>
        </div>`
        });

    document.querySelector('#employee-table-div').innerHTML = innerHTMLContent
}

function deleteNode(node){
    makeAjaxRequest("DELETE", baseURL + `${node.id}`, true).then("Successfully deleted").catch((e) => console.log(e))
    updateHTML()
}

function updateNode(node){
    window.location = "../src/employee-payroll.html"
    localStorage.setItem("updateNodeKey", node.id)
}

function updateAdminNav(){
    let mobile_num = localStorage.getItem("loggedInMobile")
    

    makeAjaxRequest("GET", baseCredQueryURL + `mobile=${mobile_num}`, true)
    .then((response) => setAdminDetails(response[0]))
    .catch((e) => console.log(e))
}

function setAdminDetails(responseText){
    let mobile = document.getElementById("admin-mob")
    let email = document.getElementById("admin-email")

    console.log(responseText)
    mobile.innerHTML = `Mobile: ${responseText.mobile}`
    email.innerHTML = `Email: ${responseText.email}`
}

function logout(){
    localStorage.removeItem("loggedInMobile")
    window.location = "../src/admin-login.html"
}