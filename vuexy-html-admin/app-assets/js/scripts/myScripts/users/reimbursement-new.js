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
    if (needsAddr == "nonemployee_checkMail") {
        $('#mail-addr').attr('class', 'visible');
    } else {
        $('#mail-addr').attr('class', 'hidden');
    }
});


/** control repeat */

// var item_count = 1;
$(document).on('click', '#add_item', function(){
    // item_count++;
    var $new_line_item = $('#added_line_item').clone().attr('class', 'row visible');
    // var $new_line_item = $('#line_item').clone().prop('id', 'line_item' + item_count);
    $('#first_line_item').after($new_line_item);
    // $('#line_item').attr('item_num', item_count++);
    // var num = parseInt($('#item_num').html());
    // $('#line_item_ #item_num').html(++item_count);
    // $('#added_line_item_1').attr('class', 'visible');
});

// var noOfFields = 2;

// $(document).on('click', '#add_item_button', function(e) {
// 	e.preventDefault();
// 	var newField = '<br><label for="experience'+noOfFields+'">experience'+noOfFields+'</label>';
//     newField += '<input type="text" name="experience'+noOfFields+'"class="field"/>';
//     $('.field:last').after(newField);
	
//     //adding a hidden input inside the form to know the number of inserted fields
//     //make sure that the input is not already here 
//     //then adding it to handle the number of inputs later
// 	if($('#noOfFields').length === 0){		
// 		$('#Frm').append('<input type="hidden" value="2" id="noOfFields"/>');
// 	}else{
// 		$('#noOfFields').attr('value',noOfFields);
// 	}
// 	noOfFields++;
// });

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
$(document).on('click', '#confirm_item', function() {
    $('#added_line_item_1').attr('class', 'visible');
})