var itemNum = 1;
var lineItems = [];
const baseURL = "https://coe-api.azurewebsites.net/api/";
var user_id = "5e8e45eea148b9004420651f";

/** BEGIN: Wizard step control */

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
        JSON_toServer.OrderType = "Test Orderzz_TEST";
        JSON_toServer.OrderInfo = JSON.stringify(requestInfo);
        // console.log(typeof(requestInfo));
        JSON_toServer.OrderStatus = "Submitted"; //leave this as Submitted, this represent current status of the Order. Example Order Status: Submitted, approved, etc:
        JSON_toServer.ChatInfo = "TEST CHAT INFO"; //leaving this empty since there's no chat when user upload a order first
        JSON_toServer.assignedTo = null; //leaving this as null since there's no one assigned when a user upload/submit a order.


        var fileSelect = document.getElementById("file_1");
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


/** END: Wizard step control */






/** control myself or onbehalf radio */
$(document).on('click', '#onBehalfRadio_Yes', function(){
    $('#onBehalf_Yes').attr('class', 'visible');
});

$(document).on('click', '#myselfRadio_Yes', function(){
    $('#onBehalf_Yes').attr('class', 'hidden');
});

/** control radio selected */
$(document).on('click', 'input', function(){
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



// var item_count = 1;
// $(document).on('click', '#add_item', function(){
    

//     // item_count++;
//     var $new_line_item = $('#added_line_item').clone().attr('class', 'row visible');
//     // var $new_line_item = $('#line_item').clone().prop('id', 'line_item' + item_count);
//     $('#first_line_item').after($new_line_item);
//     // $('#line_item').attr('item_num', item_count++);
//     // var num = parseInt($('#item_num').html());
//     // $('#line_item_ #item_num').html(++item_count);
//     // $('#added_line_item_1').attr('class', 'visible');
// });


/** split budget */

$(document).on('click', '#budget_btn_1_1', function() {
    var _id = 1;
    var _budget_id = 1;
    document.getElementById('budget_' + _id + '_' + _budget_id).after(addBudget(_id, _budget_id + 1, false));
});


// var budgetNum = 1;
// $(document).on('click', '#add_budget', function(){
//     $('#first_split_amount').attr('class', 'col-md-2 visible');
//     $('#first_split_perc').attr('class', 'col-md-2 visible');
//     var $new_budget_num = $('#added_budget').clone().attr('class', 'col-12 visible');
//     $('#first_budget').after($new_budget_num);
//     budgetNum ++;
// });

// $(document).on('click', '#remove_budget', function(){
//     $('#added_budget').remove();
//     budgetNum --;
//     if (budgetNum == 1) {
//         $('#first_split_amount').attr('class', 'col-md-2 hidden');
//         $('#first_split_perc').attr('class', 'col-md-2 hidden');
//     }
// });

/** budget options */

// $(document).on('click', '.custom-control-input', function() {
//     console.log('clicked');
    
// });


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

/** Add additional budget number */
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
    var sel = document.createElement('select');
    sel.setAttribute('class', 'custom-select form-control');
    sel.setAttribute('name', 'budget_num_' + _id);
    sel.appendChild(addTestBudgetData('Please select'));
    sel.appendChild(addTestBudgetData('61-2692'));
    sel.appendChild(addTestBudgetData('66-1981'));
    sel.appendChild(addTestBudgetData('80-2535'));
    second.appendChild(sel);

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-2');
    var sel2 = document.createElement('select');
    sel2.setAttribute('class', 'custom-select form-control');
    sel2.setAttribute('id', 'split_with_' + _id + '_' + _budget_id);
    sel2.onclick = function() {
        console.log('click new select');
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
    forth.appendChild(inputGroup(true, "$", "dollar", _id, _budget_id));

    var hiddenForth = document.createElement('div');
    hiddenForth.setAttribute('class', 'col-md-2 hidden');
    hiddenForth.setAttribute('id', 'split_percent_input_' + _id + '_' + _budget_id);
    hiddenForth.appendChild(inputGroup(false, "%", "percent", _id, _budget_id));

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

/** For test */
function addTestBudgetData(num) {
    var op = document.createElement('option');
    op.setAttribute('value', num);
    op.innerHTML = num;
    return op;
}

/** Use to generate the input group with prepend or append label */
function inputGroup(isPre, label, name, _id, _budget_id) {
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

/** Add task/option/project options behind each budget number */
function addBudgetOptions(_id, _budget_id) {
    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-1');
    first.appendChild(genOption("Task", "option_task", _id, _budget_id));

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-1');
    second.appendChild(genOption("Option", "option_option", _id, _budget_id));

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-1');
    third.appendChild(genOption("Project", "option_project", _id, _budget_id));
    
    row.appendChild(first);
    row.appendChild(genOptionInput("task_input", _id, _budget_id));
    row.appendChild(second);
    row.appendChild(genOptionInput("option_input", _id, _budget_id));
    row.appendChild(third);
    row.appendChild(genOptionInput("project_input", _id, _budget_id));

    return row;
}

/** Generate options of task/option/project */
function genOption(label, name, _id, _budget_id) {
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

/** Generate the input box behind each task/option/project */
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


/** Split with dollar or percent */
$(document).on('click', '#split_with_1_1', function(){
    splitWithChanged(1, 1);
});

/** When split with dollar/percentage changed */
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


/** Add new line item */

$(document).on('click', '#add_new_line_item', function(){
    itemNum ++;
    addNewLineItem(itemNum);
});

function addNewLineItem(_id) {
    console.log('item id: ' + _id);

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
    row.appendChild(addNewUpload(_id));

    formBody.appendChild(row);
    form.appendChild(formBody);
    newFeild.appendChild(form);
    newBox.appendChild(newFeild);
    var end = document.getElementById('new_line_item');
    end.before(newBox);

}

/** Init confirm button */

$(document).on('click', '#confirm_1', function() {
    confirmItem(1);
});

/** Click 'confirm' button, To show brief info of line-item in the summary table */

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

/** Init delete button */

$(document).on('click', '#delete_1', function() {
    removeLineItem(1);
});

/** When click the red x button of a certain box */
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

/** Confirm line item info and add them to the summary table */
function confirmItem(_id) {
    console.log('confirm item: ' + _id);
    var formData = new FormData();

    /** Get budgets info */
    var budgetsNumArr = document.getElementsByName('budget_num_' + _id);
    var budgetsLen = budgetsNumArr.length;

    /** Front-end control */
    for (var i = 0; i < budgetsLen; i++) {
        var budgetId = i + 1;
        var btn = document.getElementById('budget_btn_' + _id + '_' + budgetId);
        console.log('budget_btn_' + _id + '_' + budgetId);
        btn.remove();
    }
    var checkBtn = document.getElementById('confirm_' + _id);
    checkBtn.remove();

    
    /** Build budgets array data structure */
    var budgetsArr = [];
    if (budgetsLen == 1) {
        budgetsArr.push(budgetsNumArr[0].value);
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
            console.log('_id: ' + _id + ' i: ' + i +  ' splitVal: ' + splitVal);
            budgetsArr.push({
                Number: num,
                Split: splitVal
            });
        }
    }

    lineItems.push({
        id: _id,
        Expense: document.getElementById('expense_' + _id).value,
        Purpose: document.getElementById('purpose_' + _id).value,
        Category: document.getElementById('category_' + _id).value,
        Budgets: budgetsArr,
        Amount: document.getElementById('amount_' + _id).value
    });

    updateSummaryTable();

    // var itemTable = document.getElementById('summary_tbody');
    // var exp = document.getElementById('expense_' + _id).value;
    // var pur = document.getElementById('purpose_' + _id).value;
    // var cate = document.getElementById('category_' + _id).value;
    // var amo = document.getElementById('amount_' + _id).value;
    // itemTable.appendChild(genNewLineItemRow(_id, exp, pur, cate, budgetsArr, amo));

    // var fileSelect = document.getElementById("fileField1");
    // for(var x = 0; x < fileSelect.files.length; x++) {
    //     formData.append(fileSelect.files[x].name, fileSelect.files[x]);
    // }
    // formData.append("files", fileSelect.files[x]); //"files" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request"
    
    // show it in the summary table
    // var tableRef = document.getElementById('summary_table').getElementsByTagName('tbody')[0];
    // var newRow = tableRef.insertRow(-1);
    // var cell1 = newRow.insertCell(0);
    // cell1.innerHTML = "Item " + lineItem.length;
    // var cell2 = newRow.insertCell(1);
    // cell2.innerHTML = lineItem[0].ExpenseDescription;
    // var cell3 = newRow.insertCell(2);
    // cell3.innerHTML = lineItem[0].Category;
    // var cell4 = newRow.insertCell(3);
    // cell4.innerHTML = lineItem[0].Amount;
    // var cell5 = newRow.insertCell(4);
    // cell5.innerHTML = "<button type='button' class='btn btn-icon btn-flat-success'><i class='feather icon-edit'></i></button>";

}


/** Generate a cell to display split budget */
function genBudgetsCell(arr) {
    var td = document.createElement('td');
    var n = arr.length;
    if (n == 1) {
        td.innerHTML = arr[0];
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

/** Use to generate a new item summary row */
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



$(document).on('click', '#confirm_item', function() {
    var formData = new FormData();

    lineItem.push({
        ExpenseDescription: $("input[name='expense']").val(),
        Category: $("select#category option:checked").val(),
        Amount: $("input[name='amount']").val()
    });

    // var fileSelect = document.getElementById("fileField1");
    // for(var x = 0; x < fileSelect.files.length; x++) {
    //     formData.append(fileSelect.files[x].name, fileSelect.files[x]);
    // }
    // formData.append("files", fileSelect.files[x]); //"files" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request"
    
    // show it in the summary table
    var tableRef = document.getElementById('summary_table').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(-1);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = "Item " + lineItem.length;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = lineItem[0].ExpenseDescription;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = lineItem[0].Category;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = lineItem[0].Amount;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = "<button type='button' class='btn btn-icon btn-flat-success'><i class='feather icon-edit'></i></button>";

    //here we just pass in the JSON object we need to pass to the server. "JSON_body" should stay as it is, becuase this is how server can identify files from the JSON information, when it get this HTTP request
    // formData.set("JSON_body", JSON.stringify(JSON_toServer));
    
});


//--------------------------- Helper Functions ------------------------------

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

// function addNewBudget(_id) {
//     var box = document.createElement('div');
//     box.setAttribute('class', 'col-12');
//     var row = document.createElement('div');
//     row.setAttribute('class', 'form-group row');

//     var first = document.createElement('div');
//     first.setAttribute('class', 'col-md-4');
//     first.innerHTML = "<span>Budget Number</span>";

//     var second = document.createElement('div');
//     second.setAttribute('class', 'col-md-7');
//     var input = document.createElement('input');
//     input.setAttribute('type', 'text');
//     input.setAttribute('id', 'business_purpose_' + _id);
//     input.setAttribute('class', 'form-control');
//     input.setAttribute('name', 'purpose');
//     input.setAttribute('placeholder', 'Business Purpose');
//     second.appendChild(input);
    
//     row.appendChild(first);
//     row.appendChild(second);
//     box.appendChild(row);

//     return box; 
// }

function addNewUpload(_id) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-12');
    var row = document.createElement('div');
    row.setAttribute('class', 'form-group row');

    var first = document.createElement('div');
    first.setAttribute('class', 'col-md-4');
    first.innerHTML = "<span>Upload Receipt</span>";

    var second = document.createElement('div');
    second.setAttribute('class', 'col-md-4');
    var f = document.createElement('fieldset');
    var d = document.createElement('div');
    d.setAttribute('class', 'custom-file');
    var i = document.createElement('input');
    i.setAttribute('type', 'file');
    i.setAttribute('id', 'file_' + _id);
    i.setAttribute('class', 'custom-file-input');
    var l = document.createElement('label');
    l.setAttribute('class', 'custom-file-label');
    l.setAttribute('for', 'file_' + _id);
    l.innerHTML = "Choose File";
    d.appendChild(i);
    d.appendChild(l);
    f.appendChild(d);
    second.appendChild(f);

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-1 offset-md-3');

    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-success');    
    btn.setAttribute('id', 'confirm_' + _id);
    var icon = document.createElement('i');
    icon.setAttribute('class', 'feather icon-check-circle');
    btn.appendChild(icon);
    btn.onclick = function() {
        console.log('confirm button clicked: ' + _id);
        confirmItem(_id);
    };

    third.appendChild(btn);
    
    row.appendChild(first);
    row.appendChild(second);
    row.appendChild(third);
    box.appendChild(row);

    return box; 
}

//-------------------------- End Helper Functions ---------------------------