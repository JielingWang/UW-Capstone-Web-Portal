var requestType = document.getElementById("request-type");
var requester = document.getElementById("requester");
var payee = document.getElementById("payee");
var payeeLabel = document.getElementById("payee-label");
var subunit = document.getElementById("subunit");

var requestStatus = document.getElementById("status");
var requestDate = document.getElementById("request-date");
var requestID = document.getElementById("requestID");
var assignedTo = document.getElementById("assignedTo");

var requestInfoHead = document.getElementById('request-info-head');
var requestInfoBody = document.getElementById('request-info-body');

var lineItemTableHead = document.getElementById('line-item-table-head');
var lineItemTableBody = document.getElementById('line-item-table-body');

var historyCard = document.getElementById("history_card");
var requestHistory = document.getElementById("request-history");
var reqApproverArr = [];
var reqBuyer = {};
let approverResponseMap = new Map(); // key: approverid, value: {name, response}

var noteCard = document.getElementById("note_card");
var noteContent = document.getElementById("notes");
var feedbackBlock = document.getElementById("feedback-block");

var notesArr = [];

var itemAmount = 0;
var additionalTax = 0;

var request_id = null;

window.onload = function() {
    request_id = window.sessionStorage.getItem('RequestID');
    this.console.log(request_id);

    // Request Example: Reimbursement
    // request_id = "5f1b2a648813560044fa2c52";
    // Request Example: Purchase Request
    // request_id = "5f1c92448813560044fa2c53";
    // Request Example: Procard Receipt
    // request_id = "5f1b14228cc64b1bd881ba65";
    // Request Example: Pay an Invoice
    // request_id = "5f0e530b7f2ae5004492a161";

    requestInfo = getRequestInfo(request_id);
    updateRequestInfo(requestInfo);
    collectHistoryInfo(requestInfo);
    prepareNotesArr(requestInfo);
    updateNotes();
    // changeOrderStatus();
}


// just for debug
function changeOrderStatus() {
    var data = {
        OrderStatus: "Updated"
    };
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
    makePostRequest("updateOrderStatus/" + request_id, data, onSuccess, onFailure);
}

/**
 * Collect note information into global variable notesArr from database
 * @param {JSON Object} data Request data got from database
 */
function prepareNotesArr(data) {
    var info = data.ChatInfo;
    for (var x = 0; x < info.length; x++) {
        notesArr.push({
            Name: info[x].userName,
            Time: info[x].timeStamp,
            Comment: info[x].comment
        });
    }
}

/**
 * Update the content of note block based on global variable notesArr
 */
function updateNotes() {
    noteContent.innerHTML = "";
    noteCard.style.height = `${historyCard.clientHeight}px`;
    for (var x = 0; x < notesArr.length; x++) {
        var p = document.createElement('p');
        var n = document.createElement('span');
        n.setAttribute('class', 'mr-1');
        n.innerHTML = notesArr[x].Name;
        var t = document.createElement('span');
        t.setAttribute('class', 'mr-1');
        t.innerHTML = moment(notesArr[x].Time).format('MMMM Do YYYY h:mm:ss a');
        var c = document.createElement('span');
        c.setAttribute('class', 'mr-1');
        c.innerHTML = notesArr[x].Comment;
        p.appendChild(n);
        p.appendChild(t);
        p.appendChild(c);
        noteContent.appendChild(p);
    }
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
    var info = null;
    var onSuccess = function(data) {
        if (data.status == true) {
            console.log("request information is here");
            console.log(data.data);
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

    makeGetRequest("getOrderInformation/" + request_id, onSuccess, onFailure);
    return info;
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
    var idx = basicInfo.OrderStatus.indexOf(',');
    if (idx > 0) {
        requestStatus.innerHTML = basicInfo.OrderStatus.substring(0, idx);
    } else {
        requestStatus.innerHTML = basicInfo.OrderStatus;
    }
    
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

    const requestContent = JSON.parse(basicInfo.OrderInfo);
    // console.log(requestContent);
    if (request_type == "Reimbursement") {
        payee.setAttribute('class', 'visible');
        payeeLabel.setAttribute('class', 'mt-2');

        var reimburseFor = requestContent.ReimburseFor;
        if (reimburseFor == "onbehalf") {
            var payee_input = requestContent.OnbehalfName + 
                                " (" + requestContent.OnbehalfEmail + ", " + 
                                requestContent.OnbehalfAffiliation + ")";
            payee.innerHTML = payee_input;
        } else {
            payee.innerHTML = requester_info.userInfo.Name;
        }
    }
    
    // Part 3: Line item table
    lineItemTableHead.appendChild(genLineItemTableHead(request_type));
    const lineItems = requestContent.LineItems;
    var n = lineItems.length;
    for (var i = 0; i < n; i++) {
        lineItemTableBody.appendChild(genLineItemTableRow(i + 1, request_type, lineItems[i], n));
    }

    // Part 2: Brief summary
    requestInfoHead.appendChild(genRequestInfoHead(request_type));
    requestInfoBody.appendChild(genRequestInfoBody(request_type, requestContent));

    // Part 4: Action buttons
    var request_status = basicInfo.OrderStatus;
    var self_id = sessionStorage.getItem('id');
    if (request_status == "Approved" && self_id == originalAssigndeTo) {
        var acceptBtn = document.getElementById('accept-btn');
        acceptBtn.disabled = false;
        var sendBackBtn = document.getElementById('send-back-btn');
        sendBackBtn.disabled = false;
    }
    if (request_status == "Accepted") {
        var completeBtn = document.getElementById('complete-btn');
        completeBtn.disabled = false;
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
    } else if (request_type == "Purchase Request" || request_type == "Pay an Invoice") {
        th_1.innerHTML = "SHIPPING ADDRESS";
        th_2.innerHTML = "VENDOR CONTACTS";
        th_3.setAttribute('colspan', '2');
        th_3.innerHTML = "REQUEST SUMMARY";
    } else if (request_type == "Procard Receipt") {
        th_1.innerHTML = "CARDHOLDER";
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

    // Part 1: Addr / Cardholder
    if (request_type == "Reimbursement") {
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var p3 = document.createElement('p');
        var p4 = document.createElement('p');
        if (request_info.Payment == "Check mail") {
            var addr = request_info.Addr;
            p1.innerHTML = addr.FullName;
            p2.innerHTML = addr.AddrLine1;
            p3.innerHTML = addr.AddrLine2;
            p4.innerHTML = addr.AddrCity + ", " + addr.AddrState + " " + addr.AddrZip;
        } else {
            p1.innerHTML = "Department of Electrical & Computer Engineering";
            p2.innerHTML = "185 Stevens Way";
            p3.innerHTML = "Paul Allen Center – Room AE100R";
            p4.innerHTML = "Seattle, WA 98195-2500";
        }
        td_1.appendChild(p1);
        td_1.appendChild(p2);
        td_1.appendChild(p3);
        td_1.appendChild(p4);
    } else if (request_type == "Purchase Request" || request_type == "Pay an Invoice") {
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        var p3 = document.createElement('p');
        var p4 = document.createElement('p');
        var addr = request_info.Addr;
        p1.innerHTML = addr.FullName;
        p2.innerHTML = addr.AddrLine1;
        p3.innerHTML = addr.AddrLine2;
        p4.innerHTML = addr.AddrCity + ", " + addr.AddrState + " " + addr.AddrZip;
        td_1.appendChild(p1);
        td_1.appendChild(p2);
        td_1.appendChild(p3);
        td_1.appendChild(p4);
    } else if (request_type == "Procard Receipt") {
        var p = document.createElement('p');
        p.innerHTML = request_info.Cardholder;
        td_1.appendChild(p);
    }


    // Part 2: delivery method / vendor contacts
    if (request_type == "Reimbursement") {
        td_2.innerHTML = request_info.Payment;
    } else if (request_type == "Purchase Request" || 
                    request_type == "Procard Receipt" || 
                    request_type == "Pay an Invoice") {
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
    if (request_type == "Reimbursement" || request_type == "Procard Receipt") {
        var summary_p1 = document.createElement('p');
        var summary_p2 = document.createElement('p');
        var summary_p3 = document.createElement('p');
        summary_p1.innerHTML = "Items:";
        summary_p2.innerHTML = "Additional tax:";
        summary_p3.innerHTML = "<strong>Grand total:</strong>";
        td_3.appendChild(summary_p1);
        td_3.appendChild(summary_p2);
        td_3.appendChild(summary_p3);
        var item_cost = document.createElement('p');
        item_cost.innerHTML = "$ " + itemAmount;
        var estimated_tax = document.createElement('p');
        estimated_tax.innerHTML = "$ " + additionalTax;
        var grand_total = document.createElement('p');
        var grand = itemAmount + additionalTax;
        var grand_input = "$ " + grand;
        grand_total.innerHTML = grand_input;
        td_4.appendChild(item_cost);
        td_4.appendChild(estimated_tax);
        td_4.appendChild(grand_total);
    } else if (request_type == "Purchase Request" || request_type == "Pay an Invoice") {
        var summary_p1 = document.createElement('p');
        var summary_p2 = document.createElement('p');
        var summary_p3 = document.createElement('p');
        summary_p1.innerHTML = "Items:";
        summary_p2.innerHTML = "Approximate tax:";
        summary_p3.innerHTML = "<strong>Grand total:</strong>";
        td_3.appendChild(summary_p1);
        td_3.appendChild(summary_p2);
        td_3.appendChild(summary_p3);
        var item_cost = document.createElement('p');
        item_cost.innerHTML = "$ " + itemAmount;
        var estimated_tax = document.createElement('p');
        additionalTax = itemAmount * 0.101;
        estimated_tax.innerHTML = "$ " + Math.round(additionalTax * 1000) / 1000;
        var grand_total = document.createElement('p');
        var grand = itemAmount + additionalTax;
        var grand_input = "$ " + grand;
        grand_total.innerHTML = grand_input;
        td_4.appendChild(item_cost);
        td_4.appendChild(estimated_tax);
        td_4.appendChild(grand_total);
    }
    
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

    if (request_type == "Reimbursement" || request_type == "Procard Receipt") {
        th_5.innerHTML = "Amount";
        th_6.innerHTML = "Tax";
        th_7.innerHTML = "Documentation";
        head.appendChild(th_5);
        head.appendChild(th_6);
        head.appendChild(th_7);
    } else if (request_type == "Purchase Request") {
        th_5.innerHTML = "Quantity";
        th_6.innerHTML = "Unit Price";
        th_7.innerHTML = "Documentation";
        head.appendChild(th_5);
        head.appendChild(th_6);
        head.appendChild(th_7);
    } else if (request_type == "Pay an Invoice") {
        th_5.innerHTML = "Amount";
        th_5.innerHTML = "Documentation";
        head.appendChild(th_5);
        head.appendChild(th_6);
    }
    
    
    return head;
}


/**
 * Use to generate a line item table row
 * @param {int} seq the sequence of this line item (since the id not always continuous)
 * @param {string} request_type 
 * @param {JSON Object} line_item_info 
 * @param {int} line_item_len use to determine the row-span of docs column
 */
function genLineItemTableRow(item_seq, request_type, line_item_info, line_item_len) {

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

    if (request_type == "Reimbursement" || request_type == "Procard Receipt") {
        var amount_td = document.createElement('td');
        amount_td.innerHTML = line_item_info.Amount;
        itemAmount += parseFloat(line_item_info.Amount);
        tr.appendChild(amount_td);

        // Append tax td
        var tax_td = document.createElement('td');
        var taxInfo = line_item_info.TaxPaid;
        if (taxInfo == "yes") {
            tax_td.innerHTML = "Included";
        } else if (taxInfo == "no") {
            var item_amount = line_item_info.Amount;
            var tax_estimate = item_amount * 0.101;
            var tax_estimate_input = Math.round(tax_estimate * 1000) / 1000;
            tax_td.innerHTML = tax_estimate_input;
            additionalTax += parseFloat(tax_estimate_input);
        } else if (taxInfo == "nontaxable") {
            tax_td.innerHTML = "Not Taxable";
        }
        tr.appendChild(tax_td);
    } else if (request_type == "Purchase Request") {
        var quantity_td = document.createElement('td');
        var unit_id = document.createElement('td');
        quantity_td.innerHTML = line_item_info.Quantity;
        unit_id.innerHTML = line_item_info.UnitPrice;
        quantityNum = parseFloat(line_item_info.Quantity);
        unitPriceNum = parseFloat(line_item_info.UnitPrice);
        itemAmount += quantityNum * unitPriceNum;
        tr.appendChild(quantity_td);
        tr.appendChild(unit_id);
    } else if (request_type == "Pay an Invoice") {
        var amount_td = document.createElement('td');
        amount_td.innerHTML = line_item_info.Amount;
        itemAmount += parseFloat(line_item_info.Amount);
        tr.appendChild(amount_td);
    }

    // Append docs td
    if (item_seq == 1) {
        var doc_td = document.createElement('td');
        doc_td.setAttribute('rowspan', `${line_item_len}`);
        tr.appendChild(doc_td);
        docsName = getDocsName(request_id);
        // console.log(docsName);
        if (docsName) {
            for (var x = 0; x < docsName.length; x++) {
                var a = document.createElement('a');
                var name = docsName[x];
                a.setAttribute('href', 
                `https://coe-api.azurewebsites.net/api/downloadAttachment/${request_id}/${name}`);
                a.setAttribute('style', 'margin-right: 1rem;');
                a.innerHTML = name;
                doc_td.appendChild(a);
            }
        }
        
    }

    return tr;
}

/**
 * Get names of all attached files
 * Return the JSON Object
 * @param {string} request_id 
 */
function getDocsName(request_id) {
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

    makeGetRequest("getfilesAttached/" + request_id, onSuccess, onFailure);
    return info;
}

/**
 * Generate a cell to display split budget 
 * @param {array (JSON Object)} arr budgets array from the line item information
 */
function genBudgetsCell(arr) {
    var td = document.createElement('td');
    var n = arr.length;

    for (var i = 0; i < n; i++) {
        var border = false;
        var p = document.createElement('p');
        if (n == 1) {
            p.innerHTML = arr[i].Number;
        } else {
            p.innerHTML = arr[i].Split + ' on ' + arr[i].Number;
        }
        td.appendChild(p);

        // Append optional info
        if (arr[i].Task) {
            if (border == false) {
                td.appendChild(genBudgetInfo(arr[i].Task, true));
                border = true;
            } else {
                td.appendChild(genBudgetInfo(arr[i].Task, false));
            }
        }
        if (arr[i].Option) {
            if (border == false) {
                td.appendChild(genBudgetInfo(arr[i].Option, true));
                border = true;
            } else {
                td.appendChild(genBudgetInfo(arr[i].Option, false));
            }
        }
        if (arr[i].Project) {
            if (border == false) {
                td.appendChild(genBudgetInfo(arr[i].Project, true));
                border = true;
            } else {
                td.appendChild(genBudgetInfo(arr[i].Project, false));
            }
        }
        if (border == false) {
            p.setAttribute('style', 'border-bottom: 1px dashed #d9d9d9;');
        }
    }

    return td;
}

/**
 * Generate the additional info for the budget number
 * @param {int} text contents of the info
 * @param {boolean} border true or false, determine whether append border
 */
function genBudgetInfo(text, border) {
    var info = document.createElement('p');
    if (border) {
        info.setAttribute('style', 'border-bottom: 1px dashed #d9d9d9;');
    }
    var info_input = "(" + text.toUpperCase() + ")";
    info.innerHTML = info_input;
    return info;
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
        var responseData = responses[i].approverResponses;
        for (var x = 0; x < responseData.length; x++) {
            var approver_id = responseData[x].approverID_ref;
            if (!approverResponseMap.has(approver_id)) {
                approverResponseMap.set(approver_id, {
                    name: getUserInfo(approver_id).userInfo.Name,
                    response: responseData[x].response
                });
            }
        }
        

        // for (var j = 0; j < r.length; j++) {
        //     var approverName = getUserInfo(r[j].approverID_ref).userInfo.Name;
        //     var idx = findApprover(approverName);
        //     if (idx > -1) {
        //         if (r[j].response) {
        //             reqApproverArr[idx].Responses.push(r[j].response);
        //         }
        //     } else {
        //         var res = [];
        //         if (r[j].response) {
        //             res.push(r[j].response);
        //         }
        //         reqApproverArr.push({
        //             Approver: approverName,
        //             Responses: res
        //         });
        //     }
        // }
    }

    var buyerName = null;
    if (data.assignedTo) {
        buyerName = getUserInfo(data.assignedTo).userInfo.Name;
    }
    reqBuyer = {
        Status: data.OrderStatus,
        AssignedTo: buyerName
    };

    requestHistory.appendChild(genFormStamp("Submitted", data.submittedOn));
    if (approverResponseMap.size == 0) {
        requestHistory.appendChild(genApprovalStamp(null, null));
    } else {
        for (const [key, value] of approverResponseMap.entries()) {
            var appr = value.name;
            var resp = value.response;
            requestHistory.appendChild(genApprovalStamp(appr, resp));
        }
        // for (var i = 0; i < reqApproverArr.length; i++) {
        //     var approver = reqApproverArr[i].Approver;
        //     var responses = reqApproverArr[i].Responses;
        //     requestHistory.appendChild(genApprovalStamp(approver, responses));
        // }
    }
    // add status and timestamp
    requestHistory.appendChild(genFiscalStaffStamp(reqBuyer.Status, reqBuyer.AssignedTo, data.lastModified));
    requestHistory.appendChild(genClaimStamp(reqBuyer.Status, data.lastModified));
    requestHistory.appendChild(genFinishStamp(reqBuyer.Status, data.lastModified));
}

// function updateRequestHistory() {
//     requestHistory.appendChild(genFormStamp("Submitted"));
//     for (var i = 0; i < reqApproverArr.length; i++) {
//         var approver = reqApproverArr[i].Approver;
//         var responses = reqApproverArr[i].Responses;
//         requestHistory.appendChild(genApprovalStamp(approver, responses));
//     }
//     requestHistory.appendChild(genFiscalStaffStamp(reqBuyer.Status, reqBuyer.AssignedTo));
//     requestHistory.appendChild(genClaimStamp(reqBuyer.Status));
//     requestHistory.appendChild(genFinishStamp(reqBuyer.Status));
// }

/**
 * Find the index of the given approver's name in reqApproverArr array
 * @param {string} name the approver's name
 * Return the index in reqApproverArr array
 */
// function findApprover(name) {
//     var result = -1;
//     for (var i = 0; i < reqApproverArr.length; i++) {
//         if (reqApproverArr[i].Approver) {
//             if (reqApproverArr[i].Approver == name) {
//                 result = i;
//             }
//         }
        
//     }
//     return result;
// }

/**
 * Generate the history stamp of approval chain
 * @param {string} approver 
 * @param {array} responses
 */
function genApprovalStamp(approver, response) {
     
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');

    // var done = isDone(responses);
    var done = response;

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
    if (done) {
        p.innerHTML = "Request Budget Approved";
    } else {
        p.innerHTML = "Awaiting Budget Approval";
    }
    
    info.appendChild(p);
    var span = document.createElement('span');
    if (approver == null) {
        span.innerHTML = "Not got approvers yet";
    } else {
        span.innerHTML = "By approver " + approver;
    }
    info.appendChild(span);
    stamp.appendChild(signal);
    stamp.appendChild(info);
    return stamp;
}

/**
 * Check if this approver approved all budgets belongs to him
 * @param {array} responses array of responses of this approver
 */
// function isDone(responses) {
//     if (responses.length == 0) return false;
//     for (var i = 0; i < responses.length; i++) {
//         if (!responses[i]) return false;
//     }
//     return true;
// }

function genFiscalStaffStamp(request_status, assignedTo, timeStamp) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');
    var time = document.createElement('small');

    var done = false;
    if (request_status.indexOf("Accepted") >= 0) {
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
    if (done) {
        p.innerHTML = "Request Accepted";
    } else {
        p.innerHTML = "Awaiting Request Acception";
    }
    info.appendChild(p);
    var span = document.createElement('span');
    if (assignedTo) {
        span.innerHTML = "By fiscal staff " + assignedTo;
    } else {
        span.innerHTML = "Not assigned yet";
    }

    if (done) {
        time.innerHTML = moment(timeStamp).fromNow();
    }

    info.appendChild(span);
    stamp.appendChild(signal);
    stamp.appendChild(info);
    stamp.appendChild(time);
    return stamp;
}

/**
 * Generate the stamp related to form
 * @param {string} action e.g. "Submitted"
 */
function genFormStamp(action, timeStamp) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');
    var time = document.createElement('small');

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

    time.innerHTML = moment(timeStamp).fromNow();

    stamp.appendChild(signal);
    stamp.appendChild(info);
    stamp.appendChild(time);
    return stamp;
}

function genClaimStamp(request_status, timeStamp) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');
    var time = document.createElement('small');

    var done = false;
    if (request_status.indexOf("Accepted") >= 0) {
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
    p.innerHTML = "Request Claimed";
    var span = document.createElement('span');
    span.innerHTML = "Good job!";
    info.appendChild(p);
    info.appendChild(span);

    if (done) {
        time.innerHTML = moment(timeStamp).fromNow();
    }

    stamp.appendChild(signal);
    stamp.appendChild(info);
    stamp.appendChild(time);
    return stamp;
}

function genFinishStamp(request_status, timeStamp) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');
    var time = document.createElement('small');

    var done = false;
    if (request_status.indexOf("Completed") >= 0) {
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

    if (done) {
        time.innerHTML = moment(timeStamp).fromNow();
    }

    stamp.appendChild(signal);
    stamp.appendChild(info);
    stamp.appendChild(time);
    return stamp;
}

// function accept() {
//     var data = {"OrderStatus": "Accepted"};
//     var onSuccess = function(data) {
//         if (data.status == true) {
//             info = data.data;
//         } else {
//             //error message
//             info = null;
//         }
//     }

//     var onFailure = function() {
//         // failure message
//         info = null;
//     }
//     makePutRequest("updateOrderStatus/order_id", data, onSuccess, onFailure);
// }

// function updateChatInfo(request_id) {
//     var data = {"ChatInfo": "chat from jieling the second time"};
//     var onSuccess = function(data) {
//         if (data.status == true) {
//             console.log("update success");
//         } else {
//             //error message
//             info = null;
//         }
//     }

//     var onFailure = function() {
//         // failure message
//         info = null;
//     }
//     makePostRequest("updateChatInfo/" + request_id, data, onSuccess, onFailure);
// }



var feedback = document.getElementById("feedback_input");

function sendBackClicked() {
    const timeStamp = new Date(Date.now()).toISOString();

    var orderData = {
        OrderStatus: "Updated"
    };
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
    // makePostRequest("updateChatInfo/" + request_id, chatData, onSuccess, onFailure);
    makePostRequest("updateOrderStatus/" + request_id, orderData, onSuccess, onFailure);
    location.reload();
}

function approveClicked() {
    console.log('clicked');
    const timeStamp = new Date(Date.now()).toISOString();

    var data = {
        OrderStatus: "Accepted"
    };
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
    makePostRequest("updateOrderStatus/" + request_id, data, onSuccess, onFailure);
    location.reload();
}


function finishClicked() {
    console.log('clicked');
    const timeStamp = new Date(Date.now()).toISOString();
    // console.log(timeStamp);
    // console.log(moment(timeStamp).fromNow());
    // const str = "Accepted,timestamp";
    // var idx = str.indexOf(',');
    // console.log(str.substring(idx + 1));

    var data = {
        OrderStatus: "Completed"
    };
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
    makePostRequest("updateOrderStatus/" + request_id, data, onSuccess, onFailure);
    location.reload();
}

function takeNoteClicked() {
    // console.log('clicked');

    // send data
    var data = {
        userName: window.sessionStorage.getItem("id"),
        comment: feedback.value
    };
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
    location.reload();
}