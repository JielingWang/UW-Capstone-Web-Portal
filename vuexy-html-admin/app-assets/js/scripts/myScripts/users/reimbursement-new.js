var itemNum = 1;
var lineItems = [];
var formData = new FormData();
var type = "";
var unit_id = "";
var budgets_database = [];
const baseURL = "https://coe-api.azurewebsites.net/api/";
var user_id = "5e8e45eea148b9004420651f";

/******************************************************* BEGIN: Wizard step control ************************************************/

/*=========================================================================================
    File Name: my-wizard-steps.js
    Description: wizard steps page specific js based on original js file
    ----------------------------------ORIGINAL INFO---------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


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
        // getUserInfo();
        var formData = new FormData();

        // var itemsCost = 0;
        // for (var i = 0; i < lineItems.length; i++) {
        //     var firstChar = lineItems[i].Amount.charAt(0);
        //     if (firstChar === "$") {
        //         var amountNum = lineItems[i].Amount.substr(1);
        //         itemsCost += parseFloat(amountNum);
        //     } else {
        //         itemsCost += parseFloat(lineItems[i].Amount);
        //     }
        // }

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
            LineItems: lineItems
            // ItemsCost: itemsCost
        }

        //now lets set up the JSON_toServer JSON Object
        JSON_toServer.userID_ref = user_id;  // 5e63127145f8e019d1f26ddc
        JSON_toServer.OrderType = "Reimbursement";
        JSON_toServer.OrderInfo = JSON.stringify(requestInfo);
        // console.log(typeof(requestInfo));
        JSON_toServer.OrderStatus = "Submitted"; //leave this as Submitted, this represent current status of the Order. Example Order Status: Submitted, approved, etc:
        JSON_toServer.ChatInfo = "TEST CHAT INFO"; //leaving this empty since there's no chat when user upload a order first
        JSON_toServer.assignedTo = null; //leaving this as null since there's no one assigned when a user upload/submit a order.

        
        //here we just pass in the JSON object we need to pass to the server. "JSON_body" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request
        formData.set("JSON_body", JSON.stringify(JSON_toServer));
        // Http Request  
        var request = new XMLHttpRequest();
        //this function will get the response from the server after we upload the order
        request.onreadystatechange = function() {
            console.log("Request info is here:");
            if (request.readyState == 4) {
                console.log(request.response);
                // show it in the console
                const response_obj = JSON.parse(request.response);
                const data_obj = response_obj.data;
                //convert order info to JSON
                const requestInfo_obj = JSON.parse(data_obj.OrderInfo);
                console.log(requestInfo_obj);

                // window.location.href = "../../../html/ltr/users/user-summary.html";

                
            }
        }
        request.open('POST', baseURL + "uploadOrder/" + type + "/" + unit_id);
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


/************************************************ END: Wizard step control *******************************************************/




/**************************************************** BEGIN: Form Control ********************************************************/


/**
 * Get user information and budget information when the page loading
 * Set global variables
 */
window.onload = function() {
    this.getUserInfo();
    this.getBudgetsInfo();
    this.console.log(this.budgets_database);
    // Initialize the budget select box
    var budget_select = this.document.getElementById('init_budget_select_box');
    for (var i = 0; i < this.budgets_database.length; i++) {
        var num = budgets_database[i];
        budget_select.appendChild(addBudgetData(num));
    }
};

/**
 * Get the user information from database
 * @param {string} type global variable, track the type (unit or subunit) which will be used in upload route
 * @param {string} unitID global variable, track the unit or subunit id, also need in upload route
 */
function getUserInfo() {
    var onSuccess = function(data) {
        if (data.status == true) {
            console.log("user information is here");
            console.log(data.data);
            var level = data.data.AccessLevel;
            if (level == "Submitter" || level == "Approver") {
                type = "subunit";
                unit_id = data.data.SubUnitID;
            } else if (level == "Fiscal Staff" || level == "Fiscal Administrator") {
                type = "unit";
                unit_id = data.data.UnitID;
            }
            
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("getuserInformation/" + user_id, onSuccess, onFailure);
}

/**
 * Get the budgets information from database
 * @param {array} budgets_database global variable, store all the budget number of this unit or subunit
 */
function getBudgetsInfo() {
    var onSuccess = function(data) {
        if (data.status == true) {
            console.log("budgets information is here");
            console.log(data.data);
            for (var i = 0; i < data.data.length; i++) {
                budgets_database.push(data.data[i].budgetNumber);
            }
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("getBudgetsUnderSubUnit/" + unit_id, onSuccess, onFailure);
}


/************ Step1 & Step2 *****************/

$(document).on('click', 'input', function(){
    /** myself or onbehalf radio */
    var mySelf = $("input[name='myself-onbehalf']:checked").val();
    if (mySelf == "myself") {
        $('#onBehalf_Yes').attr('class', 'hidden');
    } else if (mySelf == "onbehalf") {
        $('#onBehalf_Yes').attr('class', 'visible');
    }

    /** payment method part */
    var individual = $("input[name='individual-reimbursed']:checked").val();
    if (individual == "employee") {
        $('#emplyee_payment').attr('class', 'col-11 visible');
        $('#nonemplyee_payment').attr('class', 'col-11 hidden');
    } else {
        $('#emplyee_payment').attr('class', 'col-11 hidden');
        $('#nonemplyee_payment').attr('class', 'col-11 visible');
    }

    /** control mail-addr */
    var needsAddr = $("input[name='paymentRadio']:checked").val();
    if (needsAddr == "Check mail") {
        $('#mail-addr').attr('class', 'visible');
    } else {
        $('#mail-addr').attr('class', 'hidden');
    }
});


/***************** BEGIN: Step3 *******************/

/**
 * BEGIN: Budgets Controller
 * @param _id id for line item, start from 1
 * @param _budget_id id for budget number in this line item, start from 1 
 * For each line item, we may have multiple budget number,
 * so for every budget number and budget button, 
 * they have their unique id
 * button: budget_btn_{line-item-id}_{budget-id}
 * budget number: budget_{line-item-id}_{budget-id}
 */

/**
 * This function just to tie the original button in page
 * Functionality: add more budget numbers
 */
$(document).on('click', '#budget_btn_1_1', function() {
    var _id = 1;
    var _budget_id = 1;
    document.getElementById('budget_' + _id + '_' + _budget_id).after(addBudget(_id, _budget_id + 1, false));
});


/** 
 * Core function of budgets controller 
 * @param _id id for line item
 * @param _budget_id id for budget number in this line item
 * @param {boolean} init signal for if this is the original budget number in this line item
 * This function will use to add new budget block in form
 * If this is the initialized budget block for this line item (init == true),
 * the button will be plus button, otherwise the button will be delete button
 */
function addBudget(_id, _budget_id, init) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');
    box.setAttribute('id', 'budget_' + _id + '_' + _budget_id);
    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    if (init) {
        first.innerHTML = "<span>Budget Number</span>";
    }

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-2');
    second.appendChild(genBudgetsSelectBox(_id));

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-2');
    var sel2 = document.createElement('select');
    sel2.setAttribute('class', 'custom-select form-control');
    sel2.setAttribute('id', 'split_with_' + _id + '_' + _budget_id);
    sel2.onclick = function() {
        splitWithChanged(_id, _budget_id);
    };
    var op1 = document.createElement('option');
    op1.setAttribute('value', 'amount');
    op1.innerHTML = "Amount";
    var op2 = document.createElement('option');
    op2.setAttribute('value', 'percentage');
    op2.innerHTML = "Percentage";
    sel2.appendChild(op1);
    sel2.appendChild(op2);
    third.appendChild(sel2);

    var forth = document.createElement('div');
    forth.setAttribute('class', 'col-md-2');
    forth.setAttribute('id', 'split_dollar_input_' + _id + '_' + _budget_id);
    forth.appendChild(inputGroup(_id, _budget_id, true, "$", "dollar"));

    var hiddenForth = document.createElement('div');
    hiddenForth.setAttribute('class', 'col-md-2 hidden');
    hiddenForth.setAttribute('id', 'split_percent_input_' + _id + '_' + _budget_id);
    hiddenForth.appendChild(inputGroup(_id, _budget_id, false, "%", "percent"));

    var fifth = document.createElement('div');
    fifth.setAttribute('class', 'col-md-1');
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    if (init) {
        btn.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-success');
        btn.setAttribute('id', 'budget_btn_' + _id + '_' + _budget_id);
    } else {
        btn.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-danger');
        btn.setAttribute('id', 'budget_btn_' + _id + '_' + _budget_id);
    }
    
    var icon = document.createElement('i');
    if (init) {
        icon.setAttribute('class', 'feather icon-plus-circle');
    } else {
        icon.setAttribute('class', 'feather icon-x-circle');
    }
    btn.appendChild(icon);
    if (init) {
        btn.onclick = function() {
            document.getElementById('budget_' + _id + '_' + _budget_id).after(addBudget(_id, _budget_id + 1, false));
        }
    } else {
        btn.onclick = function() {
            document.getElementById('budget_' + _id + '_' + _budget_id).remove();
        };
    }
    fifth.appendChild(btn);
    
    row.appendChild(first);
    row.appendChild(second);
    row.appendChild(third);
    row.appendChild(forth);
    row.appendChild(hiddenForth);
    row.appendChild(fifth);
    box.appendChild(row);
    box.appendChild(addBudgetOptions(_id, _budget_id));

    return box;
}

/** 
 * Generate input group with prepend or append label
 * @param _id id for line item
 * @param _budget_id id for budget number in this line item
 * @param {boolean} isPre a mark to indicate need prepend label or append label
 * @param {string} label what's the label is (e.g. "$" or "%")
 * @param {string} name use to set the input id
 * The input group is unique for every budget number, 
 * so we use format split_{dollar-or-percent}_input_value_{line-item-id}_{budget-id} to set input id
 */
function inputGroup(_id, _budget_id, isPre, label, name) {
    var f = document.createElement('fieldset');
    var d = document.createElement('div');
    d.setAttribute('class', 'input-group');

    var sig = document.createElement('div');
    if (isPre) {
        sig.setAttribute('class', 'input-group-prepend');
    } else {
        sig.setAttribute('class', 'input-group-append');
    }
    var s = document.createElement('span');
    s.setAttribute('class', 'input-group-text');
    s.innerHTML = label;
    sig.appendChild(s);

    var i = document.createElement('input');
    i.setAttribute('class', 'form-control');
    i.setAttribute('type', 'text');
    i.setAttribute('id', 'split_' + name + '_input_value_' + _id + '_' + _budget_id);

    if (isPre) {
        d.appendChild(sig);
        d.appendChild(i);
    } else {
        d.appendChild(i);
        d.appendChild(sig);
    }

    f.appendChild(d);
    return f;

}

/** 
 * Generate task/option/project options behind each budget number 
 */
function addBudgetOptions(_id, _budget_id) {
    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-1');
    first.appendChild(genOption(_id, _budget_id, "Task", "option_task"));

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-1');
    second.appendChild(genOption(_id, _budget_id, "Option", "option_option"));

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-1');
    third.appendChild(genOption(_id, _budget_id, "Project", "option_project"));
    
    row.appendChild(first);
    row.appendChild(genOptionInput("task_input", _id, _budget_id));
    row.appendChild(second);
    row.appendChild(genOptionInput("option_input", _id, _budget_id));
    row.appendChild(third);
    row.appendChild(genOptionInput("project_input", _id, _budget_id));

    return row;
}

/** 
 * Generate option of task/option/project 
 * @param _id id for line item
 * @param _budget_id id for budget number in this line item
 * @param {string} label the label for this options (Task/Option/Project)
 * @param {string} name use to set the name of this option
 * Each option group is bound to a single budget number
 */
function genOption(_id, _budget_id, label, name) {
    var list = document.createElement('ul');
    list.setAttribute('class', 'list-unstyled mb-0');
    var bullet = document.createElement('li');
    bullet.setAttribute('class', 'd-inline-block mr-2');
    var f = document.createElement('fieldset');
    var d = document.createElement('div');
    d.setAttribute('class', 'custom-control custom-checkbox');
    var i = document.createElement('input');
    i.setAttribute('type', 'checkbox');
    i.setAttribute('class', 'custom-control-input');
    i.setAttribute('name', name);
    i.setAttribute('id', name + _id + '_' + _budget_id);
    // i.onclick = function() {
    //     var text = document.getElementById(name + _id + '_' + _budget_id);
    //     text.setAttribute('class', 'col-md-3 hidden');
    // };
    var l = document.createElement('label');
    l.setAttribute('class', 'custom-control-label');
    l.setAttribute('for', name + _id + '_' + _budget_id);
    l.innerHTML = label;
    d.appendChild(i);
    d.appendChild(l);
    f.appendChild(d);
    bullet.appendChild(f);
    list.appendChild(bullet);
    return list;
}

/** 
 * Generate the input box behind each task/option/project 
 * @param {string} name use to set the name of this input
 */
function genOptionInput(name, _id, _budget_id) {
    var div = document.createElement('div');
    div.setAttribute('class', 'col-md-3 hidden');
    div.setAttribute('id', name + _id + '_' + _budget_id);
    var i = document.createElement('input');
    i.setAttribute('type', 'text');
    i.setAttribute('class', 'form-control');
    i.setAttribute('name', name);
    return div;
}

/** 
 * Split with amount or percentage controller
 * Use to transfer between split with amount or percentage
 * Each split select box and input value is bound to a single budget number,
 * so we use split_with_{line-item-id}_{budget-id} to set select box id
 * use split_input_with_{line-item-id}_{budget-id} to set user input id
 */
function splitWithChanged(_id, _budget_id) {
    var sel = document.getElementById('split_with_' + _id + '_' + _budget_id);
    var pick = sel.options[sel.selectedIndex].value;
    var dollar = document.getElementById('split_dollar_input_' + _id + '_' + _budget_id);
    var perc = document.getElementById('split_percent_input_' + _id + '_' + _budget_id);
    if (pick == "amount") {
        dollar.setAttribute('class', 'col-md-2 visible');
        perc.setAttribute('class', 'col-md-2 hidden');
    } else if (pick == "percentage") {
        dollar.setAttribute('class', 'col-md-2 hidden');
        perc.setAttribute('class', 'col-md-2 visible');
    }
}

function genBudgetsSelectBox(_id) {
    var sel = document.createElement('select');
    sel.setAttribute('class', 'custom-select form-control');
    sel.setAttribute('name', 'budget_num_' + _id);
    sel.appendChild(addBudgetData('Please select'));
    
    for (var i = 0; i < budgets_database.length; i++) {
        var num = budgets_database[i];
        sel.appendChild(addBudgetData(num));
    }

    return sel;
}


/** 
 * Bind to the initialized select box 
 */
$(document).on('click', '#split_with_1_1', function(){
    splitWithChanged(1, 1);
});

/**
 * Add budget numbers to selected box from database
 * For now this is just test
 */
function addBudgetData(num) {
    var op = document.createElement('option');
    op.setAttribute('value', num);
    op.innerHTML = num;
    return op;
}

/**
 * Deprecated
 * Previous options controller
 */
$(document).on('click', '#option_task', function() {
    if ($("#option_task").is(":checked")) {
        $('#task_checked').attr('class', 'col-md-3 visible');
    } else {
        $('#task_checked').attr('class', 'col-md-3 hidden');
    }
});

$(document).on('click', '#option_option', function() {
    if ($("#option_option").is(":checked")) {
        $('#option_checked').attr('class', 'col-md-3 visible');
    } else {
        $('#option_checked').attr('class', 'col-md-3 hidden');
    }
});

$(document).on('click', '#option_project', function() {
    if ($("#option_project").is(":checked")) {
        $('#project_checked').attr('class', 'col-md-3 visible');
    } else {
        $('#project_checked').attr('class', 'col-md-3 hidden');
    }
});

/** END: Budgets Controller */



/** 
 * BEGIN: New Line Item Controller 
 * @param _id line item id
 * @param itemNum this is a global variable, starts from 1,
 *                each time when uses add a new line item it will increase by 1 
 *                to generate a unique id for all components inside this line item
 *                but it will not decrease when users delete a line item
 *                so itemNum cannot reflect the real number of line items, it just use to set id
 * Users can add one more line item by clicking add-new-line-item button
 * This funtion will generate all needed components of each line item,
 * exactly the same as original box,
 * and each component and input value have unique id
 */

/** Core function */
function addNewLineItem(_id) {

    var newBox = document.createElement('div');
    newBox.setAttribute('class', 'row d-flex justify-content-center');
    newBox.setAttribute('id', 'lineItemBox_' + _id);

    var newFeild = document.createElement('div');
    newFeild.setAttribute('class', 'col-11');
    newFeild.setAttribute('style', 'margin-top: 1rem; padding-top: 1.5rem; border-top: 1px dashed #d9d9d9;');

    var form = document.createElement('div');
    form.setAttribute('class', 'form form-horizontal');
    
    var formBody = document.createElement('div');
    formBody.setAttribute('class', 'form-body');

    var row = document.createElement('div');
    row.setAttribute('class', 'row');

    // append new line item content
    row.appendChild(addNewExpense(_id));
    row.appendChild(addNewPurpose(_id));
    row.appendChild(addNewCategory(_id));
    row.appendChild(addNewAmount(_id));
    row.appendChild(addNewTax(_id));
    row.appendChild(addBudget(_id, 1, true));
    row.appendChild(addOneMoreFile(_id, 1, true));

    formBody.appendChild(row);
    form.appendChild(formBody);
    newFeild.appendChild(form);
    newBox.appendChild(newFeild);
    var end = document.getElementById('new_line_item');
    end.before(newBox);

}

/** Bind to the initialized button */
$(document).on('click', '#add_new_line_item', function(){
    itemNum ++;
    addNewLineItem(itemNum);
});



/** Helper Functions */
/** 
 * Add expense block
 * @param {int} _id line item id
 */
function addNewExpense(_id) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');

    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    first.innerHTML = "<span>Expense Description</span>";

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-7');
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'expense_' + _id);
    input.setAttribute('class', 'form-control');
    input.setAttribute('name', 'expense');
    input.setAttribute('placeholder', 'Expense Description');
    second.appendChild(input);

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-1');
    var button = document.createElement('button');
    button.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-danger');
    button.setAttribute('id', 'delete_' + _id);
    button.setAttribute('type', 'button');
    button.onclick = function() {
        removeLineItem(_id);
    };
    var icon = document.createElement('i');
    icon.setAttribute('class', 'feather icon-x-circle');
    button.appendChild(icon);
    third.appendChild(button);
    
    row.appendChild(first);
    row.appendChild(second);
    row.appendChild(third);
    box.appendChild(row);

    return box; 
}

/**
 * Add business purpose block
 * @param {int} _id 
 */
function addNewPurpose(_id) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');

    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    first.innerHTML = "<span>Business Purpose</span>";

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-7');
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'purpose_' + _id);
    input.setAttribute('class', 'form-control');
    input.setAttribute('name', 'purpose');
    input.setAttribute('placeholder', 'Business Purpose');
    second.appendChild(input);
    
    row.appendChild(first);
    row.appendChild(second);
    box.appendChild(row);

    return box; 
}

/**
 * Add category block
 * @param {int} _id line item id
 */
function addNewCategory(_id) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');

    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    first.innerHTML = "<span>Category</span>";

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-4');
    var select = document.createElement('select');
    select.setAttribute('class', 'custom-select form-control');
    select.setAttribute('id', 'category_' + _id);
    var option1 = document.createElement('option');
    option1.setAttribute('value', '');
    option1.innerHTML = "Please select";
    select.appendChild(option1);
    second.appendChild(select);
    
    row.appendChild(first);
    row.appendChild(second);
    box.appendChild(row);

    return box; 
}

/**
 * Add amount block
 * @param {int} _id line item id
 */
function addNewAmount(_id) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');

    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    first.innerHTML = "<span>Amount</span>";

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-4 col-12 mb-1');
    var fieldset = document.createElement('fieldset');
    var group = document.createElement('div');
    group.setAttribute('class', 'input-group');
    var prepend = document.createElement('div');
    prepend.setAttribute('class', 'input-group-prepend');
    prepend.innerHTML = "<span class='input-group-text'>$</span>";
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'form-control');
    input.setAttribute('name', 'amount');
    input.setAttribute('placeholder', '0.00');
    input.setAttribute('aria-label', 'Amount (to the nearest dollar)');
    input.setAttribute('id', 'amount_' + _id);
    group.appendChild(prepend);
    group.appendChild(input);
    fieldset.appendChild(group);
    second.appendChild(fieldset);
    
    row.appendChild(first);
    row.appendChild(second);
    box.appendChild(row);

    return box; 
}

/**
 * Add tax block
 * @param {int} _id 
 */
function addNewTax(_id) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');
    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    first.innerHTML = "<span>Was Sales Tax Paid?</span>";

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-8');
    var list = document.createElement('ul');
    list.setAttribute('class', 'list-unstyled mb-0');
    list.appendChild(addNewRadio(_id, 1, "Yes"));
    list.appendChild(addNewRadio(_id, 2, "No"));
    list.appendChild(addNewRadio(_id, 3, "Item Not Taxable"));
    second.appendChild(list);
    
    row.appendChild(first);
    row.appendChild(second);
    box.appendChild(row);

    return box; 
}

/**
 * Helper function to add new radio for tax block
 * @param {int} _id line item id
 * @param {int} seq the sequence of this radio, use to set unique id
 * @param {string} label the label of this radio
 */
function addNewRadio(_id, seq, label) {
    var bullet = document.createElement('li');
    bullet.setAttribute('class', 'd-inline-block mr-2');
    var f = document.createElement('fieldset');
    var d = document.createElement('div');
    d.setAttribute('class', 'custom-control custom-radio');
    var i = document.createElement('input');
    i.setAttribute('type', 'radio');
    i.setAttribute('class', 'custom-control-input');
    i.setAttribute('name', 'taxRadio');
    i.setAttribute('value', 'paid');
    i.setAttribute('id', 'taxRadio' + seq + _id);
    var l = document.createElement('label');
    l.setAttribute('class', 'custom-control-label');
    l.setAttribute('for', 'taxRadio' + seq + _id);
    l.innerHTML = label;
    d.appendChild(i);
    d.appendChild(l);
    f.appendChild(d);
    bullet.appendChild(f);

    return bullet;
}

/**
 * Deprecated partly
 * @param {int} _id line item id
 * @param {int} file_id file id in this line item
 * @param {boolean} init indicate if this is the original file input in this line item
 * For now, there is no plus button behind the first file upload input (set it to hidden)
 * Which means users can only upload one file for one line item
 * So when calling this function, file_id will always be 1, init will always be true
 */
function addOneMoreFile(_id, file_id, init) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');
    box.setAttribute('id', 'file_box_' + _id + '_' + file_id);
    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    if (init) {
        first.innerHTML = "<span>Upload Receipt</span>"
    }

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-4');
    var file = document.createElement('input');
    file.setAttribute('type', 'file');
    file.setAttribute('name', 'file_' + _id);
    file.setAttribute('id', 'file_' + _id + '_' + file_id);
    second.appendChild(file);

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-1 hidden');
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    if (init) {
        btn.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-success');
    } else {
        btn.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-danger');
    }
    btn.setAttribute('id', 'file_btn_' + _id + '_' + file_id);

    var icon = document.createElement('i');
    if (init) {
        icon.setAttribute('class', 'feather icon-plus-circle');
    } else {
        icon.setAttribute('class', 'feather icon-x-circle');
    }
    btn.appendChild(icon);
    if (init) {
        btn.onclick = function() {
            document.getElementById('file_box_' + _id + '_' + file_id).after(addOneMoreFile(_id, file_id + 1, false));
        }
    } else {
        btn.onclick = function() {
            document.getElementById('file_box_' + _id + '_' + file_id).remove();
        };
    }
    third.appendChild(btn);

    var forth = document.createElement('div');
    forth.setAttribute('class', 'col-md-1 offset-md-3');
    var confirm_btn = document.createElement('button');
    confirm_btn.setAttribute('type', 'button');
    confirm_btn.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-success');
    confirm_btn.setAttribute('id', 'confirm_' + _id);
    var i = document.createElement('i');
    i.setAttribute('class', 'fa fa-check');
    confirm_btn.appendChild(i);
    confirm_btn.onclick = function() {
        confirmItem(_id);
    }
    forth.appendChild(confirm_btn);

    row.appendChild(first);
    row.appendChild(second);
    row.appendChild(third);
    row.appendChild(forth);
    box.appendChild(row);
    return box;
}

/** 
 * Deprecated
 * Bind initialized add-more-file button 
 */
$(document).on('click', '#file_btn_1_1', function() {
    document.getElementById('file_box_1_1').after(addOneMoreFile(1, 2, false));
});

/** END: New Line Item Controller  */




/** 
 * BEGIN: Confirm & Delete Line Item Controller
 * @param _id line item id
 * @param {array} lineItems global variable, an array to store all line items of this form
 * Add all confirmed items to global variables lineItems array
 * Remove the delete item from global variables lineItems array
 */

/** Confirm function */
function confirmItem(_id) {

    /** Get budgets info */
    var budgetsNumArr = document.getElementsByName('budget_num_' + _id);
    var budgetsLen = budgetsNumArr.length;

    /** Front-end control */
    for (var i = 0; i < budgetsLen; i++) {
        var budgetId = i + 1;
        var btn = document.getElementById('budget_btn_' + _id + '_' + budgetId);
        btn.remove();
    }
    var checkBtn = document.getElementById('confirm_' + _id);
    checkBtn.remove();

    
    /** Build budgets array data structure */
    var budgetsArr = [];
    if (budgetsLen == 1) {
        budgetsArr.push({
            Number: budgetsNumArr[0].value,
            Split: "100%"
        });
    } else {
        for (var i = 1; i <= budgetsLen; i++) {
            var num = budgetsNumArr[i - 1].value;
            var perOrDolSel = document.getElementById('split_with_' + _id + '_' + i);
            var perOrDolVal = perOrDolSel.options[perOrDolSel.selectedIndex].value;
            var splitVal = "";
            if (perOrDolVal == "amount") {
                splitVal = "$" + document.getElementById('split_dollar_input_value_' + _id + '_' + i).value;
            } else if (perOrDolVal == "percentage") {
                splitVal = document.getElementById('split_percent_input_value_' + _id + '_' + i).value + "%";
            }
            budgetsArr.push({
                Number: num,
                Split: splitVal
            });
        }
    }
    console.log('budgets array:');
    console.log(budgetsArr);
    
    var fileSelect = document.getElementById('file_' + _id + '_1');
    for(var x = 0; x < fileSelect.files.length; x++) {
        formData.append(fileSelect.files[x].name, fileSelect.files[x]);
    }
    formData.append("files", fileSelect.files[x]); //"files" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request"

    
    lineItems.push({
        id: _id,
        Expense: document.getElementById('expense_' + _id).value,
        Purpose: document.getElementById('purpose_' + _id).value,
        Category: document.getElementById('category_' + _id).value,
        Budgets: budgetsArr,
        Amount: document.getElementById('amount_' + _id).value
    });

    updateSummaryTable();

}

/** Delete function */
function removeLineItem(_id) {
    var box = document.getElementById('lineItemBox_' + _id);
    box.remove();
    itemNum --;
    // var summary = document.getElementById('summary_row_' + _id);
    // summary.remove();
    var n = lineItems.length;
    for (var i = 0; i < n; i++) {
        if (lineItems[i].id == _id) {
            lineItems.splice(i, 1);
        }
    }
    updateSummaryTable();
}

/** Init confirm button */
$(document).on('click', '#confirm_1', function() {
    confirmItem(1);
});

/** Init delete button */
$(document).on('click', '#delete_1', function() {
    removeLineItem(1);
});

/** END: Confirm & Delete Line Item Controller */



/** 
 * BEGIN: Summary Table Display Controller
 * Every time when there is any change in lineItems,
 * this function will be called
 * Specifically, when users click confirm button and delete button
 * The update process are only related to the global variable lineItems
 */

function updateSummaryTable() {
    var len = lineItems.length;
    var itemTable = document.getElementById('summary_tbody');
    itemTable.innerHTML = '';
    for (var i = 0; i < len; i++) {
        var exp = lineItems[i].Expense;
        var pur = lineItems[i].Purpose;
        var cate = lineItems[i].Category;
        var budgetsArr = lineItems[i].Budgets;
        var amo = lineItems[i].Amount;
        itemTable.appendChild(genNewLineItemRow(i + 1, exp, pur, cate, budgetsArr, amo));
    }
}

/** 
 * Helper function: generate a table cell to display split budget 
 * @param {array} arr the budget number array
 */
function genBudgetsCell(arr) {
    var td = document.createElement('td');
    var n = arr.length;
    if (n == 1) {
        td.innerHTML = arr[0].Number;
        return td;
    }

    for (var i = 0; i < n; i++) {
        var p = document.createElement('p');
        p.setAttribute('style', 'border-bottom: 1px dashed #d9d9d9;');
        p.innerHTML = arr[i].Split + ' on ' + arr[i].Number;
        td.appendChild(p);
    }

    return td;
}

/**
 * Helper function: generate a new item summary row with given parameters
 * @param {int} _id line item id
 * @param {string} Expense content to fill in the expense cell
 * @param {string} Purpose content to fill in the purpose cell
 * @param {string} Category content to fill in the category cell
 * @param {table cell} Budgets a generated table cell which can be added to the table directly
 * @param {string} Amount content to fill in the amount cell
 */
function genNewLineItemRow(_id, Expense, Purpose, Category, Budgets, Amount) {

    var _id_td = document.createElement('td');
    _id_td.innerHTML = _id;

    var expense_purpose_td = document.createElement('td');
    var exp = document.createElement('p');
    exp.setAttribute('style', 'margin-bottom: 0;');
    exp.innerHTML = Expense;
    var pur = document.createElement('p');
    pur.setAttribute('style', 'margin-bottom: 0;');
    pur.innerHTML = Purpose;
    expense_purpose_td.appendChild(exp);
    expense_purpose_td.appendChild(pur);

    var category_td = document.createElement('td');
    category_td.innerHTML = Category;

    var budgets_td = genBudgetsCell(Budgets);
    
    var amount_td = document.createElement('td');
    amount_td.innerHTML = Amount;

    var receipt_td = document.createElement('td');
    var viewBtn = document.createElement('button');
    var editBtn = document.createElement('button');
    viewBtn.setAttribute('class', 'btn btn-icon btn-flat-success');
    editBtn.setAttribute('class', 'btn btn-icon btn-flat-success');
    var viewIcon = document.createElement('i');
    var editIcon = document.createElement('i');
    viewIcon.className = 'feather icon-file';
    editIcon.className = 'feather icon-edit';
    viewBtn.appendChild(viewIcon);
    editBtn.appendChild(editIcon);
    receipt_td.appendChild(viewBtn);
    receipt_td.appendChild(editBtn);
    // if (Receipt == null) {
    //     receipt_td.appendChild(editBtn);
    // } else {
    //     receipt_td.appendChild(viewBtn);
    //     receipt_td.appendChild(editBtn);
    // }

    // create tr element
    var tr = document.createElement('tr');
    tr.setAttribute('id', 'summary_row_' + _id);
    tr.appendChild(_id_td);
    tr.appendChild(expense_purpose_td);
    tr.appendChild(category_td);
    tr.appendChild(budgets_td);
    tr.appendChild(amount_td);
    tr.appendChild(receipt_td);

    return tr;
}

/** END: Summary Table Display Controller */


/** 
 * Deprecated 
 * File upload template wrote by Kalana
 */
$(document).on('click', '#confirm_item', function() {
    var formData = new FormData();

    var fileSelect = document.getElementById("fileField1");
    for(var x = 0; x < fileSelect.files.length; x++) {
        formData.append(fileSelect.files[x].name, fileSelect.files[x]);
    }
    formData.append("files", fileSelect.files[x]); //"files" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request"
    
    //here we just pass in the JSON object we need to pass to the server. "JSON_body" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request
    formData.set("JSON_body", JSON.stringify(JSON_toServer));
    
});



/***************************************************** END: Form Control **********************************************************/
