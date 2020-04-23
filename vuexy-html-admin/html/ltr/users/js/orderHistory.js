const baseURL = "https://coe-api.azurewebsites.net/api/";
var user_id = "5e8e4bcaa148b90044206526";


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

$(document).on('click', '#search', function searchOrder()
{
    //
    //alert("hello");
    var onSuccess = function(data)
    {
        alert("success");
        //On success execution this is where you update your frontend
        //document.getElementById("test").innerHTML = data.data[1]._id;
        //document.getElementById("test").innerHTML = data;
        var s="1";
        var index=0;
        var rowindex = 1;

        var table = document.getElementById("table");
        while(data.data[index]){
            s+=data.data[index]._id;
            s+=" ";
            var row=table.insertRow(rowindex);
            var cell1=row.insertCell(0);
            var cell2=row.insertCell(1);
            cell1.innerHTML=data.data[index]._id;
            cell2.innerHTML="456";
            rowindex++;
            index++;
        }
        document.getElementById("test").innerHTML = s;

        //console.log(data.data[0]._id);
        //document.getElementById("test").innerHTML = JSON.parse(json_);
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        alert("fail");
        //on faliure this is where you update front end (example: inform user unexpected error occured)
        document.getElementById("test").innerHTML = "Backend faliure occured";
    }
    makeGetRequest("getOrders/5e8e4bcaa148b90044206526",onSuccess,onFaliure);
});