/*=========================================================================================
    File Name: my-wizard-steps.js
    Description: wizard steps page specific js based on original js file
    ----------------------------------ORIGINAL INFO---------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

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


// Wizard tabs with numbers setup
$(".number-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function (event, currentIndex) {
        alert("Form submitted.");
    }
});

// Wizard tabs with icons setup
$(".icons-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onFinished: function (event, currentIndex) {
        alert("Form submitted.");
    }
});


/** Build the lineItems data structure */



// Validate steps wizard

// Show form
var form = $(".steps-validation").show();

$(".steps-validation").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
        finish: 'Submit'
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex) {
            return true;
        }

        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex) {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function (event, currentIndex) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex) {
        alert("Submitted!");
        alert('send data to database');
        var lineItem = [];
        var formData = new FormData();

        lineItem.push({
            ExpenseDescription: $("input[name='expense']").val(),
            BusinessPurpose: $("input[name='business']").val(),
            Category: $("select#category option:checked").val(),
            Amount: $("input[name='amount']").val(),
            TaxPaid: $("input[name='taxRadio']").val(),
            BudgetNum: $("select#budgetNum option:checked").val()
        });

        var itemsCost = 0;
        for (var i = 0; i < lineItem.length; i++) {
            var firstChar = lineItem[i].Amount.charAt(0);
            if (firstChar === "$") {
                var amountNum = lineItem[i].Amount.substr(1);
                itemsCost += parseFloat(amountNum);
            } else {
                itemsCost += parseFloat(lineItem[i].Amount);
            }
        }

        //this is the JSON Object we are sending to the server
        var JSON_toServer = {
            "userID_ref": null, 
            "OrderType": null, 
            "OrderInfo": null,  //this is where we are going to put JSON_OrderInfo_inForm JSON object, but we will convert JSON_OrderInfo_inForm JSON object to string to send to server
            "OrderStatus": null, 
            "ChatInfo": null,
            "assignedTo": null
        }

        var addrInfo = {
            FullName: $("input[name='full-name']").val(),
            AddrLine1: $("input[name='addr-line-1']").val(),
            AddrLine2: $("input[name='addr-line-2']").val(),
            AddrCity: $("input[name='addr-city']").val(),
            AddrState: $("input[name='addr-state']").val(),
            AddrZip: $("input[name='addr-zip']").val()
        }

        var requestInfo = {
            ReimburseFor: $("input[name='myselfOrBehalfRadio']:checked").val(),
            Individual: $("input[name='individual-reimbursed']:checked").val(),
            Payment: $("input[name='paymentRadio']:checked").val(),
            Addr: addrInfo,
            LineItem: lineItem,
            ItemsCost: itemsCost
        }

        //now lets set up the JSON_toServer JSON Object
        JSON_toServer.userID_ref = user_id;  // 5e63127145f8e019d1f26ddc
        JSON_toServer.OrderType = "Test Orderzz_TEST";
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

                // window.location.href = "../../../html/ltr/users/user-summary.html";

                // show it in the summary table
            }
        }
        request.open('POST', baseURL + "uploadOrder");
        request.send(formData);
        // window.location.href = "../../../html/ltr/users/user-summary.html";
        // window.location.replace("../../../html/ltr/users/user-summary.html");
    }
});

// Initialize validation
$(".steps-validation").validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    rules: {
        email: {
            email: true
        }
    }
});
