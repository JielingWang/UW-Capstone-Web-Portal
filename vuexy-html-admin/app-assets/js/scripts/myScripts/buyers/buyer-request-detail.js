var requestType = document.getElementById("request-type");
var requester = document.getElementById("requester");
var subunit = document.getElementById("subunit");

var requestStatus = document.getElementById("status");
var requestDate = document.getElementById("request-date");
var requestID = document.getElementById("requestID");
var assignedTo = document.getElementById("assignedTo");

var requestInfoHead = document.getElementById('request-info-head');
var requestInfoBody = document.getElementById('request-info-body');

var lineItemTableHead = document.getElementById('line-item-table-head');
var lineItemTableBody = document.getElementById('line-item-table-body');

var requestHistory = document.getElementById("request-history");
var reqApproverArr = [];
var reqBuyer = {};

window.onload = function() {
    var request_id = window.sessionStorage.getItem('RequestID');
    // var request_id = "5ec453d00598f40045c315b5";
    getRequestInfo(request_id);
    this.console.log(reqApproverArr);
    updateRequestHistory();
    // this.updateChatInfo(request_id);
    // getRequestHistory();
}

/**
 * Get the user information, return the JSON object
 * @param {int} user_id 
 */
function getUserInfo(user_id) {
    var info = null;
    var onSuccess = function(data) {
        if (data.status == true) {
            info = data.data;
        } else {
            //error message
            info = null;
        }
    }

    var onFailure = function() {
        // failure message
        info = null;
    }

    makeGetRequest("getuserInformation/" + user_id, onSuccess, onFailure);
    return info;
}

/**
 * Get the request information with the global variable request_id
 * @param {int} request_id 
 */
function getRequestInfo(request_id) {
    var onSuccess = function(data) {
        if (data.status == true) {
            console.log("request information is here");
            console.log(data.data);
            updateRequestInfo(data.data);
            collectHistoryInfo(data.data);
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("getOrderInformation/" + request_id, onSuccess, onFailure);
}


/**
 * Update request information for the whole page
 * @param {JSON Object} request_data contains all the information of this request
 */
function updateRequestInfo(request_data) {
    const basicInfo = request_data;

    // Part 1: Basic information
    var request_type = basicInfo.OrderType;
    requestType.innerHTML = request_type;
    requestDate.innerHTML = basicInfo.submittedOn.substr(0, 10);
    requestStatus.innerHTML = basicInfo.OrderStatus;
    requestID.innerHTML = basicInfo._id;
    requester_id = basicInfo.userID_ref;
    var requester_info = getUserInfo(requester_id);
    requester.innerHTML = requester_info.userInfo.Name;
    subunit.innerHTML = requester_info.SubUnitName;
    var originalAssigndeTo = basicInfo.assignedTo;
    if (originalAssigndeTo == null) {
        assignedTo.innerHTML = "Not Assigned Yet";
    } else {
        var assignedTo_info = getUserInfo(originalAssigndeTo);
        assignedTo.innerHTML = assignedTo_info.userInfo.Name;
    }
    
    // Part 2: Brief summary
    const requestContent = JSON.parse(basicInfo.OrderInfo);
    // console.log(requestContent);
    requestInfoHead.appendChild(genRequestInfoHead(request_type));
    requestInfoBody.appendChild(genRequestInfoBody(request_type, requestContent));

    // Part 3: Line item table
    lineItemTableHead.appendChild(genLineItemTableHead(request_type));
    const lineItems = requestContent.LineItems;
    var n = lineItems.length;
    for (var i = 0; i < n; i++) {
        lineItemTableBody.appendChild(genLineItemTableRow(i + 1, request_type, lineItems[i]));
    }
}


/**
 * Generate the table head of part 2 (request basic info)
 * @param {string} request_type 
 */
function genRequestInfoHead(request_type) {
    var head = document.createElement('tr');
    var th_1 = document.createElement('th');
    var th_2 = document.createElement('th');
    var th_3 = document.createElement('th');
    if (request_type == "Reimbursement") {
        th_1.innerHTML = "SHIPPING ADDRESS";
        th_2.innerHTML = "DELIVERY METHODS";
        th_3.setAttribute('colspan', '2');
        th_3.innerHTML = "REQUEST SUMMARY";
    } else if (request_type == "Purchase Request") {
        th_1.innerHTML = "SHIPPING ADDRESS";
        th_2.innerHTML = "VENDOR CONTACTS";
        th_3.setAttribute('colspan', '2');
        th_3.innerHTML = "REQUEST SUMMARY";
    }
    head.appendChild(th_1);
    head.appendChild(th_2);
    head.appendChild(th_3);
    return head;
}


/**
 * Generate the basic information body
 * @param {string} request_type 
 * @param {JSON Object} request_info 
 */
function genRequestInfoBody(request_type, request_info) {
    var body = document.createElement('tr');
    var td_1 = document.createElement('td');
    var td_2 = document.createElement('td');
    var td_3 = document.createElement('td');
    var td_4 = document.createElement('td');
    td_1.setAttribute('style', 'vertical-align: top;');
    td_2.setAttribute('style', 'vertical-align: top;');
    td_3.setAttribute('style', 'vertical-align: top;');
    td_4.setAttribute('style', 'vertical-align: top;');

    // Part 1: Addr
    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');
    var p4 = document.createElement('p');
    var p5 = document.createElement('p');
    var addr = request_info.Addr;
    p1.innerHTML = addr.FullName;
    p2.innerHTML = addr.AddrLine1;
    p3.innerHTML = addr.AddrLine2;
    p4.innerHTML = addr.AddrCity + ", " + addr.AddrState;
    p5.innerHTML = addr.AddrZip;
    td_1.appendChild(p1);
    td_1.appendChild(p2);
    td_1.appendChild(p3);
    td_1.appendChild(p4);
    td_1.appendChild(p5);

    // Part 2: delivery method / vendor contacts
    if (request_type == "Reimbursement") {
        td_2.innerHTML = request_info.Payment;
    } else if (request_type == "Purchase Request") {
        var name = document.createElement('p');
        var email = document.createElement('p');
        var phone = document.createElement('p');
        var website = document.createElement('p');
        var vendor = request_info.VendorInfo;
        name.innerHTML = vendor.Name;
        email.innerHTML = vendor.Email;
        phone.innerHTML = vendor.Phone;
        website.innerHTML = vendor.Website;
        td_2.appendChild(name);
        td_2.appendChild(email);
        td_2.appendChild(phone);
        td_2.appendChild(website);
    }

    // Part 3: Cost summary
    var summary_p1 = document.createElement('p');
    var summary_p2 = document.createElement('p');
    var summary_p3 = document.createElement('p');
    summary_p1.innerHTML = "Items:";
    summary_p2.innerHTML = "Estimated tax:";
    summary_p3.innerHTML = "<strong>Grand total:</strong>";
    td_3.appendChild(summary_p1);
    td_3.appendChild(summary_p2);
    td_3.appendChild(summary_p3);
    var item_cost = document.createElement('p');
    var estimated_tax = document.createElement('p');
    var grand_total = document.createElement('p');
    td_4.appendChild(item_cost);
    td_4.appendChild(estimated_tax);
    td_4.appendChild(grand_total);
    
    body.appendChild(td_1);
    body.appendChild(td_2);
    body.appendChild(td_3);
    body.appendChild(td_4);
    return body;
}


/**
 * Generate the line item table head based on different request type
 * @param {string} request_type 
 */
function genLineItemTableHead(request_type) {
    var head = document.createElement('tr');
    var th_1 = document.createElement('th');
    var th_2 = document.createElement('th');
    var th_3 = document.createElement('th');
    var th_4 = document.createElement('th');
    var th_5 = document.createElement('th');
    var th_6 = document.createElement('th');
    var th_7 = document.createElement('th');
    th_1.innerHTML = "No.";

    var th_2_p1 = document.createElement('p');
    var th_2_p2 = document.createElement('p');
    th_2_p1.setAttribute('style', 'margin-bottom: 0;');
    th_2_p2.setAttribute('style', 'margin-bottom: 0;');
    th_2_p1.innerHTML = "Expense Description";
    th_2_p2.innerHTML = "Business Purpose";
    th_2.appendChild(th_2_p1);
    th_2.appendChild(th_2_p2);

    th_3.innerHTML = "Category";
    th_4.innerHTML = "Budget(s)";

    head.appendChild(th_1);
    head.appendChild(th_2);
    head.appendChild(th_3);
    head.appendChild(th_4);

    if (request_type == "Reimbursement") {
        th_5.innerHTML = "Amount";
        th_6.innerHTML = "Documentation";
        head.appendChild(th_5);
        head.appendChild(th_6);
    } else if (request_type == "Purchase Request") {
        th_5.innerHTML = "Quantity";
        th_6.innerHTML = "Unit Price";
        th_7.innerHTML = "Documentation";
        head.appendChild(th_5);
        head.appendChild(th_6);
        head.appendChild(th_7);
    }
    
    
    return head;
}


/**
 * Use to generate a line item table row
 * @param {int} seq the sequence of this line item (since the id not always continuous)
 * @param {string} request_type 
 * @param {JSON Object} line_item_info 
 */
function genLineItemTableRow(item_seq, request_type, line_item_info) {

    var tr = document.createElement('tr');
    var _id_td = document.createElement('td');
    _id_td.innerHTML = item_seq;

    var expense_purpose_td = document.createElement('td');
    var exp = document.createElement('p');
    exp.setAttribute('style', 'margin-bottom: 0;');
    exp.innerHTML = line_item_info.Expense;
    var pur = document.createElement('p');
    pur.setAttribute('style', 'margin-bottom: 0;');
    pur.innerHTML = line_item_info.Purpose;
    expense_purpose_td.appendChild(exp);
    expense_purpose_td.appendChild(pur);

    var category_td = document.createElement('td');
    category_td.innerHTML = line_item_info.Category;

    var budgets_td = genBudgetsCell(line_item_info.Budgets);
    
    
    tr.appendChild(_id_td);
    tr.appendChild(expense_purpose_td);
    tr.appendChild(category_td);
    tr.appendChild(budgets_td);

    if (request_type == "Reimbursement") {
        var amount_td = document.createElement('td');
        amount_td.innerHTML = line_item_info.Amount;
        tr.appendChild(amount_td);
    } else if (request_type == "Purchase Request") {
        var quantity_td = document.createElement('td');
        var unit_id = document.createElement('td');
        quantity_td.innerHTML = line_item_info.Quantity;
        unit_id.innerHTML = line_item_info.UnitPrice;
        tr.appendChild(quantity_td);
        tr.appendChild(unit_id);
    }
    
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
    
    tr.appendChild(receipt_td);

    return tr;
}

/**
 * Generate a cell to display split budget 
 * @param {array} arr budgets array from the line item information
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
 * Collect history information based on the ApprovalResponses item in request info
 * @param {JSON Object} responses 
 * @param {array} reqApproverArr global JSON Object array, e.g:
 *                reqApproverArr = [{
 *                                      Approver: Jieling Wang,
 *                                      Reponses: [true, true]
 *                                  }]
 */
function collectHistoryInfo(data) {
    var responses = data.ApprovalResponses;
    for (var i = 0; i < responses.length; i++) {
        var r = responses[i].approverResponses;
        for (var j = 0; j < r.length; j++) {
            var approverName = getUserInfo(r[j].approverID_ref).userInfo.Name;
            var idx = findApprover(approverName);
            if (idx > -1) {
                if (r[j].response) {
                    reqApproverArr[idx].Responses.push(r[j].response);
                }
            } else {
                var res = [];
                if (r[j].response) {
                    res.push(r[j].response);
                }
                reqApproverArr.push({
                    Approver: approverName,
                    Responses: res
                });
            }
        }
    }

    var buyerName = null;
    if (data.assignedTo) {
        buyerName = getUserInfo(data.assignedTo).userInfo.Name;
    }
    reqBuyer = {
        Status: data.OrderStatus,
        AssignedTo: buyerName
    };
}

function updateRequestHistory() {
    requestHistory.appendChild(genFormStamp("Submitted"));
    for (var i = 0; i < reqApproverArr.length; i++) {
        var approver = reqApproverArr[i].Approver;
        var responses = reqApproverArr[i].Responses;
        requestHistory.appendChild(genApprovalStamp(approver, responses));
    }
    requestHistory.appendChild(genFiscalStaffStamp(reqBuyer.Status, reqBuyer.AssignedTo));
    requestHistory.appendChild(genFinishStamp(reqBuyer.Status));
}

/**
 * Find the index of the given approver's name in reqApproverArr array
 * @param {string} name the approver's name
 * Return the index in reqApproverArr array
 */
function findApprover(name) {
    var result = -1;
    for (var i = 0; i < reqApproverArr.length; i++) {
        if (reqApproverArr[i].Approver) {
            if (reqApproverArr[i].Approver == name) {
                result = i;
            }
        }
        
    }
    return result;
}

/**
 * Generate the history stamp of approval chain
 * @param {string} approver 
 * @param {array} responses
 */
function genApprovalStamp(approver, responses) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');

    var done = isDone(responses);

    var i = document.createElement('i');
    i.setAttribute('class', 'feather icon-alert-circle font-medium-2');
    if (done) {
        signal.setAttribute('class', 'timeline-icon bg-warning');
    } else {
        signal.setAttribute('class', 'timeline-icon bg-warning bg-lighten-5');
    }
    signal.appendChild(i);

    var p = document.createElement('p');
    p.setAttribute('class', 'font-weight-bold');
    p.innerHTML = "Request Approved";
    info.appendChild(p);
    var span = document.createElement('span');
    span.innerHTML = "By approver " + approver;
    info.appendChild(span);
    stamp.appendChild(signal);
    stamp.appendChild(info);
    return stamp;
}

/**
 * Check if this approver approved all budgets belongs to him
 * @param {array} responses array of responses of this approver
 */
function isDone(responses) {
    if (responses.length == 0) return false;
    for (var i = 0; i < responses.length; i++) {
        if (!responses[i]) return false;
    }
    return true;
}

function genFiscalStaffStamp(request_status, assignedTo) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');

    var done = false;
    if (request_status == "Accepted") {
        done = true;
    }

    var i = document.createElement('i');
    i.setAttribute('class', 'feather icon-alert-circle font-medium-2');
    if (done) {
        signal.setAttribute('class', 'timeline-icon bg-warning');
    } else {
        signal.setAttribute('class', 'timeline-icon bg-warning bg-lighten-5');
    }
    signal.appendChild(i);

    var p = document.createElement('p');
    p.setAttribute('class', 'font-weight-bold');
    p.innerHTML = "Request Accepted";
    info.appendChild(p);
    var span = document.createElement('span');
    if (assignedTo) {
        span.innerHTML = "By fiscal staff " + assignedTo;
    } else {
        span.innerHTML = "Not assigned yet";
    }
    info.appendChild(span);
    stamp.appendChild(signal);
    stamp.appendChild(info);
    return stamp;
}

/**
 * Generate the stamp related to form
 * @param {string} action e.g. "Submitted"
 */
function genFormStamp(action) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');

    var i = document.createElement('i');
    i.setAttribute('class', 'feather icon-plus font-medium-2');
    signal.setAttribute('class', 'timeline-icon bg-primary');
    signal.appendChild(i);

    var p = document.createElement('p');
    p.setAttribute('class', 'font-weight-bold');
    p.innerHTML = "Request " + action;
    var span = document.createElement('span');
    span.innerHTML = "Good job!";
    info.appendChild(p);
    info.appendChild(span);
    stamp.appendChild(signal);
    stamp.appendChild(info);
    return stamp;
}

function genFinishStamp(request_status) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');

    var done = false;
    if (request_status == "Accepted") {
        done = true;
    }

    var i = document.createElement('i');
    i.setAttribute('class', 'feather icon-check font-medium-2');
    if (done) {
        signal.setAttribute('class', 'timeline-icon bg-success');
    } else {
        signal.setAttribute('class', 'timeline-icon bg-success bg-lighten-5');
    }
    signal.appendChild(i);

    var p = document.createElement('p');
    p.setAttribute('class', 'font-weight-bold');
    p.innerHTML = "Request Completed";
    var span = document.createElement('span');
    span.innerHTML = "Good job!";
    info.appendChild(p);
    info.appendChild(span);
    stamp.appendChild(signal);
    stamp.appendChild(info);
    return stamp;
}


function genNewTimeStamp(type, note) {
    var stamp = document.createElement('li');
    
    var signal = document.createElement('div');
    var info = document.createElement('div');
    var time = document.createElement('div');

    if (type == "submitted") {
        var i = document.createElement('i');
        i.setAttribute('class', 'feather icon-plus font-medium-2');
        signal.setAttribute('class', 'timeline-icon bg-primary');
        signal.appendChild(i);

        var p = document.createElement('p');
        p.setAttribute('class', 'font-weight-bold');
        p.innerHTML = "Request Submitted";
        var span = document.createElement('span');
        span.innerHTML = note;
        info.appendChild(p);
        info.appendChild(span);
    } else if (type == "approved") {
        var i = document.createElement('i');
        i.setAttribute('class', 'feather icon-alert-circle font-medium-2');
        signal.setAttribute('class', 'timeline-icon bg-warning');
        signal.appendChild(i);

        var p = document.createElement('p');
        p.setAttribute('class', 'font-weight-bold');
        p.innerHTML = "Waiting for approval";
        var span = document.createElement('span');
        span.innerHTML = note;
        info.appendChild(p);
        info.appendChild(span);
    } else if (type == "completed") {
        var i = document.createElement('i');
        i.setAttribute('class', 'feather icon-check font-medium-2');
        signal.setAttribute('class', 'timeline-icon bg-success');
        signal.appendChild(i);

        var p = document.createElement('p');
        p.setAttribute('class', 'font-weight-bold');
        p.innerHTML = "Request Completed";
        var span = document.createElement('span');
        span.innerHTML = note;
        info.appendChild(p);
        info.appendChild(span);
    }
    
    stamp.appendChild(signal);
    stamp.appendChild(info);
    // stamp.appendChild(time);
    return stamp;
}

{/* <li>
    <div class="timeline-icon bg-primary">
        <i class="feather icon-plus font-medium-2"></i>
    </div>
    <div class="timeline-info">
        <p class="font-weight-bold">Request Form Submitted</p>
        <span></span>
    </div>
    <small class="">a few seconds ago</small>
</li>
<li>
    <div class="timeline-icon bg-warning">
        <i class="feather icon-alert-circle font-medium-2"></i>
    </div>
    <div class="timeline-info">
        <p class="font-weight-bold">Waiting for approve</p>
        <!-- <span>Cupcake gummi bears soufflé caramels candy</span> -->
    </div>
    <small class="">a few seconds ago</small>
</li>
<li>
    <div class="timeline-icon bg-success">
        <i class="feather icon-check font-medium-2"></i>
    </div>
    <div class="timeline-info">
        <p class="font-weight-bold">Task Completed</p>
        <span>Candy ice cream cake. Halvah gummi bears
        </span>
    </div>
    <small class="">20 minutes ago</small>
</li> */}


function accept() {
    var data = {"OrderStatus": "Accepted"};
    var onSuccess = function(data) {
        if (data.status == true) {
            info = data.data;
        } else {
            //error message
            info = null;
        }
    }

    var onFailure = function() {
        // failure message
        info = null;
    }
    makePutRequest("updateOrderStatus/order_id", data, onSuccess, onFailure);
}

function updateChatInfo(request_id) {
    var data = {"ChatInfo": "chat from jieling the second time"};
    var onSuccess = function(data) {
        if (data.status == true) {
            console.log("update success");
        } else {
            //error message
            info = null;
        }
    }

    var onFailure = function() {
        // failure message
        info = null;
    }
    makePostRequest("updateChatInfo/" + request_id, data, onSuccess, onFailure);
}