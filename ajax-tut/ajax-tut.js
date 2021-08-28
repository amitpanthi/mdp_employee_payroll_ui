let url = "http://localhost:3000/employees"
let newEmp = {
    "name": "Person 7",
    "gender": "Male",
    "department": ["Engineering, HR, Finance"],
    "salary": "600000",
    "startDate": "21-01-2019",
    "note": "",
    "id": 5,
    "profilePic": "../assets/dp/Ellipse -7.png"
}

function makeReq(methodType, url, callback, async, data=null){
    let xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4){
            callback(data)
        }
    }

    xhttp.open(methodType, url, async)
    
    if(data){
        xhttp.send(data)
    } else {
        xhttp.send()
    }
}

function makePromiseReq(methodType, url, async, data=null){
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

async function makeAsyncReq(methodType, url, callback, async, data=null){
    try{
        let xhr = new XMLHttpRequest
        xhr.open(methodType, url, async)
        await xhr.send()

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(this.status >= 200 && this.status <300){
                    callback(this.responseText)
                } else {
                    throw("Someone went wrong")
                }
            }
        }
    } catch(e){
        console.log(e)
    }
}

function displayData(data){
    console.log(data)
}


function addData(empObject){
    makePromiseReq("POST", url, async=true, data=empObject)
    .then((responseText) => {
        console.log("Object added successfully:\n" + responseText)
    }).catch((error) => {
        console.log(error)
    })
}

function delData(){
    makePromiseReq("DELETE", url +"/4", async=true)
    .then((responseText) => {
        console.log("Object deleted successfully:\n" + responseText)
    }).catch((error) => {
        console.log(error)
    })
}

function updateData(empObject){
    makePromiseReq("PUT", url + "/5", true, empObject)
    .then((responseText) => {
        console.log("Object updated successfully:\n" + JSON.stringify(responseText))
    }).catch((error) => {
        console.log(error)
    })
}

updateData(newEmp)
