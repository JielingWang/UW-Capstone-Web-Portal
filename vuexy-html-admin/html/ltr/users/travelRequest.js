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

$(document).on('click', '#confirm_item', function uploadFiles_without_HTML_FORMS() {
    alert('Travel Request Sent!');
    //window.location.replace("user-dashboard.html");
    var formData = new FormData();
    //this is the JSON Object we are sending to the server
    var JSON_toServer = {
        "userID_ref": null, 
        "OrderType": null, 
        "OrderInfo": null,  //this is where we are going to put JSON_OrderInfo_inForm JSON object, but we will convert JSON_OrderInfo_inForm JSON object to string to send to server
        "OrderStatus": null, 
        "ChatInfo": null,
        "assignedTo": null
    }

    var requestInfo = {
        FirstName: $("input[name='firstName']").val(),
        LastName: $("input[name='lastName']").val(),
        Departure: $("input[name='departure']").val(),
        Destination: $("input[name='destination']").val(),
        Date: $("input[name='date']").val(),
        ReturnDate: $("input[name='returnDate']").val(),
        Reason: $("input[name='reason']").val(),
        //Flight:
        Flight: $("input[name='flight']:checked").val(),
        FlightCompany: $("input[name='flight_company']").val(),
        FlightNumber: $("input[name='flight_number']").val(),
        FlightFrom: $("input[name='flight_from']").val(),
        FlightTo: $("input[name='flight_to']").val(),
        FlightDepartingDate: $("input[name='flight_departingDate']").val(),
        FlightReturningDate: $("input[name='flight_returningDate']").val(),
        FlightAmount: $("input[name='flight_amount']").val(),
        //hotel:
        Hotel: $("input[name='hotel']:checked").val(),
        HotelName: $("input[name='hotel_name']").val(),
        HotelAddress: $("input[name='hotel_address']").val(),
        HotelNum: $("input[name='hotel_num']").val(),
        HotelAddress: $("input[name='hotel_address']").val(),
        HotelZip: $("input[name='hotel_zip']").val(),
        HotelMovein: $("input[name='hotel_movein']").val(),
        HotelMoveout: $("input[name='hotel_moveout']").val(),
        HotelAmount: $("input[name='hotel_amount']").val(),
        HotelLink: $("input[name='hotel_link']").val(),
    }


    //now lets set up the JSON_toServer JSON Object
    JSON_toServer.userID_ref = user_id;  // 5e63127145f8e019d1f26ddc
    JSON_toServer.OrderType = "Travel Request";
    // JSON_toServer.OrderInfo = JSON.stringify(JSON_OrderInfo_inForm);
    // JSON_toServer.OrderInfo = JSON.stringify(requestInfo);
    JSON_toServer.OrderInfo = JSON.stringify(requestInfo);
    // console.log(typeof(requestInfo));
    JSON_toServer.OrderStatus = "Pending"; //leave this as Submitted, this represent current status of the Order. Example Order Status: Submitted, approved, etc:
    JSON_toServer.ChatInfo = "TEST CHAT INFO"; //leaving this empty since there's no chat when user upload a order first
    JSON_toServer.assignedTo = null; //leaving this as null since there's no one assigned when a user upload/submit a order.
    //here we just pass in the JSON object we need to pass to the server. "JSON_body" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request
    formData.set("JSON_body", JSON.stringify(JSON_toServer));
    // Http Request  
    var request = new XMLHttpRequest();
    //this function will get the response from the server after we upload the order
    request.onreadystatechange = function() {
        console.log("HERE");
        if (request.readyState == 4) {

            // show it in the console
            const response_obj = JSON.parse(request.response);
            const data_obj = response_obj.data;
            //convert order info to JSON
            const orderInfo_obj = JSON.parse(data_obj.OrderInfo);
            console.log(orderInfo_obj);

            // show it in the summary table
        }
    }
    request.open('POST', baseURL + "uploadOrder");
    request.send(formData); 
});

$(document).on('click', '#delete', function deleteOrder()
{
    //
    var onSuccess = function(data)
    {
        alert("success");
        //On success execution this is where you update your frontend
        document.getElementById("result").innerHTML = JSON.stringify(data);
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        alert("fail");
        //on faliure this is where you update front end (example: inform user unexpected error occured)
        document.getElementById("result").innerHTML = "Backend faliure occured";
    }
    makeDeleteRequest("removeOrder/5e9e4abc7d38270044304da8",onSuccess,onFaliure);

   
});