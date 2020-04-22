const baseURL = "https://coe-api.azurewebsites.net/api/";
var user_id = "5e8e45eea148b9004420651f";

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

var requester = document.getElementById("requester");
var subunit = document.getElementById("subunit");
var status = document.getElementById("status");
var deliveryMethod = document.getElementById("deliveryMethod");

// Http Request  
var request = new XMLHttpRequest();
var request_user_info = new XMLHttpRequest();
//this function will get the response from the server after we upload the order
request.onreadystatechange = function() {
    console.log("HERE");
    if (request.readyState == 4) {

        // show it in the console
        const response_obj = JSON.parse(request.response);
        const data_obj = response_obj.data;
        //convert order info to JSON
        const requestInfo_obj = JSON.parse(data_obj[data_obj.length - 1].OrderInfo);
        console.log(requestInfo_obj);

        // show it in the summary page
        requester.innerHTML = "Jieling Wang";
        deliveryMethod.innerHTML = requestInfo_obj.Payment;
        status.innerHTML = response_obj.OrderStatus;

        var tableRef = document.getElementById('summary_table').getElementsByTagName('tbody')[0];
        var lineItem = requestInfo_obj.LineItem;
        for (var i = 0; i < lineItem.length; i++) {
            var newRow = tableRef.insertRow(-1);
            // var cell1 = newRow.insertCell(0);
            // cell1.innerHTML = "Item " + i + 1;
            var cell2 = newRow.insertCell();
            cell2.innerHTML = lineItem[i].ExpenseDescription;
            var cell3 = newRow.insertCell();
            cell3.innerHTML = lineItem[i].Category;
            var cell4 = newRow.insertCell();
            cell4.innerHTML = lineItem[i].Amount;
            var cell5 = newRow.insertCell();
            cell5.innerHTML = "<button type='button' class='btn btn-icon btn-flat-success'><i class='feather icon-edit'></i></button>";
        }
    }
}
request.open('GET', baseURL + "getOrders/5e8e45eea148b9004420651f");
request.send();

// request_user_info.onreadystatechange = function() {
//     console.log("HERE");
//     if (request_user_info.readyState == 4) {

//         // show it in the console
//         const response_obj = JSON.parse(request_user_info.response);
//         const data_obj = response_obj.data;
//         //convert order info to JSON
//         const userInfo_obj = JSON.parse(data_obj[data_obj.length - 1]);
//         console.log(userInfo_obj);

//         // show it in the summary page
//         requester.innerHTML = userInfo_obj.Name;
//         deliveryMethod.innerHTML = requestInfo_obj.Payment;
//         status.innerHTML = response_obj.OrderStatus;

//         var tableRef = document.getElementById('summary_table').getElementsByTagName('tbody')[0];
//         var lineItem = requestInfo_obj.LineItem;
//         for (var i = 0; i < lineItem.length; i++) {
//             var newRow = tableRef.insertRow(-1);
//             // var cell1 = newRow.insertCell(0);
//             // cell1.innerHTML = "Item " + i + 1;
//             var cell2 = newRow.insertCell();
//             cell2.innerHTML = lineItem[i].ExpenseDescription;
//             var cell3 = newRow.insertCell();
//             cell3.innerHTML = lineItem[i].Category;
//             var cell4 = newRow.insertCell();
//             cell4.innerHTML = lineItem[i].Amount;
//             var cell5 = newRow.insertCell();
//             cell5.innerHTML = "<button type='button' class='btn btn-icon btn-flat-success'><i class='feather icon-edit'></i></button>";
//         }
//     }
// }
// request_user_info.open('GET', baseURL + "getUserInfomation/5e8e45eea148b9004420651f");
// request_user_info.send();