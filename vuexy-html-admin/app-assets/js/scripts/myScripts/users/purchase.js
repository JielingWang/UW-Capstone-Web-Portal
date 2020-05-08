// alert('connect');

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
    var individual = $("input[name='individual']:checked").val();
    if (individual == "employee") {
        $('#emplyee_payment').attr('class', 'col-11 visible');
        $('#nonemplyee_payment').attr('class', 'col-11 hidden');
    } else {
        $('#emplyee_payment').attr('class', 'col-11 hidden');
        $('#nonemplyee_payment').attr('class', 'col-11 visible');
    }

    // console.log(individual);

    /** control mail-addr */
    var needsAddr = $("input[name='paymentRadio']:checked").val();
    if (needsAddr == "Check mail") {
        $('#mail-addr').attr('class', 'visible');
    } else {
        $('#mail-addr').attr('class', 'hidden');
    }

    // console.log(needsAddr);
});


/** control repeat */



/** split budget */
var budgetNum = 1;
$(document).on('click', '#add_budget', function(){
    $('#first_split_amount').attr('class', 'col-md-2 visible');
    $('#first_split_perc').attr('class', 'col-md-2 visible');
    var $new_budget_num = $('#added_budget').clone().attr('class', 'col-12 visible');
    $('#first_budget').after($new_budget_num);
    budgetNum ++;
});

$(document).on('click', '#remove_budget', function(){
    $('#added_budget').remove();
    budgetNum --;
    if (budgetNum == 1) {
        $('#first_split_amount').attr('class', 'col-md-2 hidden');
        $('#first_split_perc').attr('class', 'col-md-2 hidden');
    }
});

/** budget options */
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

/** hardcode for presentation */
// $(document).on('click', '#confirm_item', function() {
//     $('#added_line_item_1').attr('class', 'visible');
// })


/**
 * Click 'confirm' button 
 * To show brief info of line-item in the summary table
 */
var lineItem = [];

$(document).on('click', '#confirm-line-item', function() {
    console.log('enter function');
    var formData = new FormData();

    lineItem.push({
        ExpenseDescription: $("input[name='expense']").val(),
        Category: $("select#category option:checked").val(),
        Amount: "$" + $("input[name='amount']").val()
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

function addNewLineItem(_id) {

    var newBox = document.createElement('div');
    newBox.setAttribute('class', 'row d-flex justify-content-center');

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
    // row.appendChild(addNewAmount(_id));

    formBody.appendChild(row);
    form.appendChild(formBody);
    newFeild.appendChild(form);
    newBox.appendChild(newFeild);
    var end = document.getElementById('new_line_item');
    end.before(newBox);

}

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
    input.setAttribute('id', 'expense_description_' + _id);
    input.setAttribute('class', 'form-control');
    input.setAttribute('name', 'expense');
    input.setAttribute('placeholder', 'Expense Description');
    second.appendChild(input);

    var third = document.createElement('div');
    third.setAttribute('class', 'col-md-1');
    var button = document.createElement('button');
    button.setAttribute('class', 'btn btn-icon rounded-circle btn-flat-danger');
    button.setAttribute('id', 'delete-line-item');
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
    input.setAttribute('id', 'business_purpose_' + _id);
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
    group.appendChild(prepend);
    group.appendChild(input);
    fieldset.appendChild(group);
    second.appendChild(fieldset);
    
    row.appendChild(first);
    row.appendChild(second);
    box.appendChild(row);

    return box; 
}

//-------------------------- End Helper Functions ---------------------------