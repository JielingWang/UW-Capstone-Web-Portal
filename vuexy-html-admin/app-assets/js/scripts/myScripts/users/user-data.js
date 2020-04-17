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


// $(document).on('click', '#add_item_button', function() {
//     var JSON_data = {
//         "Name": null,
//         "email": null,
//         "UWID": null,
//         "profile_imageURL": "",
//         "verified_user": false
//     }
//     JSON_data.name

//     // delete the head and tail space
//     var expense_description = $('input[name=expense]').val().replace(/(^\s*)|(\s*$)/g, "");
//     JSON_data += '"expense":' + '"' + expense_description + '",';
//     var business_purpose = $('input[name=business]').val().replace(/(^\s*)|(\s*$)/g, "");
//     JSON_data += '"business":' + '"' + business_purpose + '",';
//     var category = $('input[name=category]').val().replace(/(^\s*)|(\s*$)/g, "");
//     JSON_data += '"category":' + '"' + category + '",';

// });

// var editeditems = [];
// ...

// $('#SaveChanges').click(function() {
//     $('.portlet').each(function() {
//         var settings = [];
//         $('.settingInput').each(function() {
//             settings.push({
//                 settingkey: $(this).attr('name'),
//                 settingvalue: $(this).attr('value')
//             });
//         });

//         editeditems.push({
//             itemname: $(this).data('itemname'),
//             settings: settings
//         });
//     });

//     ...
// });

var lineItem = [];

$(document).on('click', '#confirm_item', function uploadFiles_without_HTML_FORMS() {
    alert('send data to database');
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
        ReimburseFor: $("input[name='myselfOrBehalfRadio']:checked").val(),
        Individual: $("input[name='individual-reimbursed']:checked").val(),
        PaymentMethod: $("input[name='paymentRadio']:checked").val(),
        ExpenseDescription: $("input[name='expense']").val(),
        BusinessPurpose: $("input[name='business']").val(),
        Category: $("select#category option:checked").val(),
        Amount: $("input[name='amount']").val(),
        TaxPaid: $("input[name='taxRadio']").val(),
        BudgetNum: $("select#budgetNum option:checked").val()
    }

    lineItem.push({
        ExpenseDescription: $("input[name='expense']").val(),
        Category: $("select#category option:checked").val(),
        Amount: $("input[name='amount']").val()
    });

    //now lets set up the JSON_toServer JSON Object
    JSON_toServer.userID_ref = user_id;  // 5e63127145f8e019d1f26ddc
    JSON_toServer.OrderType = "Test Orderzz_TEST";
    // JSON_toServer.OrderInfo = JSON.stringify(JSON_OrderInfo_inForm);
    // JSON_toServer.OrderInfo = JSON.stringify(requestInfo);
    JSON_toServer.OrderInfo = JSON.stringify(requestInfo);
    // console.log(typeof(requestInfo));
    JSON_toServer.OrderStatus = "Submitted"; //leave this as Submitted, this represent current status of the Order. Example Order Status: Submitted, approved, etc:
    JSON_toServer.ChatInfo = "TEST CHAT INFO"; //leaving this empty since there's no chat when user upload a order first
    JSON_toServer.assignedTo = null; //leaving this as null since there's no one assigned when a user upload/submit a order.


    var fileSelect = document.getElementById("fileField1");
    for(var x = 0; x < fileSelect.files.length; x++) {
        formData.append(fileSelect.files[x].name, fileSelect.files[x]);
    }
    formData.append("files", fileSelect.files[x]); //"files" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request"
    
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
            const requestInfo_obj = JSON.parse(data_obj.OrderInfo);
            console.log(requestInfo_obj);

            // show it in the summary table
            var tableRef = document.getElementById('summary_table').getElementsByTagName('tbody')[0];
            var newRow = tableRef.insertRow(-1);
            var cell1 = newRow.insertCell(0);
            cell1.innerHTML = "Item " + lineItem.length;
            var cell2 = newRow.insertCell(1);
            cell2.innerHTML = requestInfo_obj.ExpenseDescription;
            var cell3 = newRow.insertCell(2);
            cell3.innerHTML = requestInfo_obj.Category;
            var cell4 = newRow.insertCell(3);
            cell4.innerHTML = requestInfo_obj.Amount;
            var cell5 = newRow.insertCell(4);
            cell5.innerHTML = "placeholder";
        }
    }
    request.open('POST', baseURL + "uploadOrder");
    request.send(formData);
});