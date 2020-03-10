const baseURL = "http://localhost:3000/api/";


// Template POst request Ajax call
var makePostRequest = function(url, data, onSuccess, onFailure) {
    $.ajax({
        async:false,
        type: 'POST',
        url: baseURL + url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: onSuccess,
        error: onFailure
    });
};

// Template PUT request Ajax call
var makePutRequest = function(url, data, onSuccess, onFailure) {
    $.ajax({
        async:false,
        type: 'PUT',
        url: baseURL + url,
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json",
        success: onSuccess,
        error: onFailure
    });
};


// Template Delete request Ajax call
var makeDeleteRequest = function(url, onSuccess, onFailure) {
    $.ajax({
        async:false,
        type: 'DELETE',
        url: baseURL + url,
        dataType: "json",
        success: onSuccess,
        error: onFailure
    });
};	

// Template GET request Ajax call
var makeGetRequest = function(url, onSuccess, onFailure) {
   $.ajax({
       async:false,
       type: 'GET',
       url: baseURL + url,
       dataType: "json",
       success: onSuccess,
       error: onFailure
   });
};






function addUsers()
{
    //this is the data we need to send to backend to add a new user
    var JSON_data = {
        "Name": "Test user2",
        "email": "test2@uw.edu",
        "UWID":"131131132",
        "profile_imageURL":"",
        "verified_user":true
    }
    //this function will be called in a successfull data exchange with the backend
    var onSuccess = function(data)
    {
        
        //On success execution this is where you update your frontend
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        //on faliure this is where you update front end (example: inform user unexpected error occured)
        document.getElementById("result").innerHTML = "Backend faliure occured";
    }

    makePostRequest("users",JSON_data,onSuccess,onFaliure);


}

function login()
{
    var UWID = "131131131";

    //this function will be called in a successfull data exchange with the backend
    var onSuccess = function(data)
    {
        
        //On success execution this is where you update your frontend
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        //on faliure this is where you update front end (example: inform user unexpected error occured)
        document.getElementById("result").innerHTML = "Backend faliure occured";
    }

    makeGetRequest("login/"+UWID,onSuccess,onFaliure);


}


function addUnit()
{
    //this is the data we need to send to backend to add a new user
    var JSON_data = {
        "unitName": "Mechanical Engineering",
        "userIDs": [],
        "subUnitIDs":[]
    }
    //this function will be called in a successfull data exchange with the backend
    var onSuccess = function(data)
    {
        
        //On success execution this is where you update your frontend
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        //on faliure this is where you update front end (example: inform user unexpected error occured)
        document.getElementById("result").innerHTML = "Backend faliure occured";
    }

    makePostRequest("units",JSON_data,onSuccess,onFaliure);


}


function addNewUsers()
{
    //this is the data we need to send to backend to add a new user
    var JSON_data = {
        "userIDs": [{"ID":"5e5d5d76701e1d1d386475be","Admin":false},{"ID":"5e5d5c22701e1d1d386475bb","Admin":true}]
    }
    //this function will be called in a successfull data exchange with the backend
    var onSuccess = function(data)
    {
        
        //On success execution this is where you update your frontend
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        //on faliure this is where you update front end (example: inform user unexpected error occured)
        document.getElementById("result").innerHTML = "Backend faliure occured";
    }

    makePutRequest("units/5e5d5c2b701e1d1d386475bc",JSON_data,onSuccess,onFaliure);


}


function deleteOrder()
{
    //this function will be called in a successfull data exchange with the backend
    var onSuccess = function(data)
    {
        
        //On success execution this is where you update your frontend
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        //on faliure this is where you update front end (example: inform user unexpected error occured)
        document.getElementById("result").innerHTML = "Backend faliure occured";
    }

    makeDeleteRequest("removeOrder/5e5c48b98135c862d7ae8e5a",onSuccess,onFaliure);


}



function uploadOrder(){
    // Form Data
    var formData = new FormData();

    var fileSelect = document.getElementById("fileSelect");
    if(fileSelect.files && fileSelect.files.length == 1){
     var file = fileSelect.files[0]
     formData.set("files", file , file.name);
    }

    var input1 = document.getElementById("input1");
    formData.set("JSON_body", input1.value)
    // Http Request  
    var request = new XMLHttpRequest();
    request.open('POST', "http://localhost:3000/api/uploadOrder");
    request.send(formData);
  }


  function uploadFiles(){
    // Form Data
    var formData = new FormData();

    var fileSelect = document.getElementById("fileSelect1");
    if(fileSelect.files && fileSelect.files.length == 1){
     var file = fileSelect.files[0]
     formData.set("files", file , file.name);
    }


    var input1 = document.getElementById("orderID");
    // Http Request  
    var request = new XMLHttpRequest();
    console.log("http://localhost:3000/api/uploadFiles/"+input1.value);
    request.open('PUT', "http://localhost:3000/api/uploadFiles/"+input1.value);
    request.send(formData);
  }


  

