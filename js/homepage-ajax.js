let baseURL = "http://localhost:3000/employees/"

window.addEventListener("DOMContentLoaded", (event) => {
    console.log("Page loaded successfully")
    updateHTML()
})

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
    makeAjaxRequest("GET", baseURL, true).then((response) => setHTMLValues(response)).catch((err) => {console.log(err)})
}


function setHTMLValues(empData){
    console.log(empData)
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