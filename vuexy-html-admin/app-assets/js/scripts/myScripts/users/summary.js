const baseURL = "https://coe-api.azurewebsites.net/api/";
var user_id = "5e8e45eea148b9004420651f";

var requester = document.getElementById("requester");
var subunit = document.getElementById("subunit");

var requestStatus = document.getElementById("status");
var requestDate = document.getElementById("request-date");
var requestID = document.getElementById("requestID");
var assignedTo = document.getElementById("assignedTo");

var deliveryMethod = document.getElementById("deliveryMethod");
var addrFullName = document.getElementById("addr-full-name")
var addrLine1 = document.getElementById("addr-line-1");
var addrLine2 = document.getElementById("addr-line-2");
var addrCity = document.getElementById("addr-city");
var addrState = document.getElementById("addr-state");
var addrZip = document.getElementById("addr-zip");

var costItems = document.getElementById("cost-items");
var costShipping = document.getElementById("cost-shipping");
var costBeforeTax = document.getElementById("cost-total-before-tax");
var costEstimatedTax = document.getElementById("cost-estimated-tax");
var costTotal = document.getElementById("cost-total");


window.onload = function() {
    getUserInfo();
    getRequestInfo();
    // getRequestHistory();
}


function getUserInfo() {
    var onSuccess = function(data) {
        if (data.status == true) {
            console.log("user information is here");
            console.log(data.data);
            // fill in requester info
            requester.innerHTML = data.data.userInfo.Name;
            subunit.innerHTML = data.data.SubUnitName;
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("getuserInformation/" + user_id, onSuccess, onFailure);
}



function getRequestInfo() {
    // Http Request  
    var request = new XMLHttpRequest();
    //this function will get the response from the server after we upload the order
    request.onreadystatechange = function() {
        console.log("HERE");
        if (request.readyState == 4) {

            // get response JSON Object
            const response_obj = JSON.parse(request.response);
            const data_obj = response_obj.data;

            // get the latest request basic info
            const basicInfo = data_obj[data_obj.length - 1];

            var fullDate = basicInfo.submittedOn;
            requestDate.innerHTML = fullDate.substr(0, 10);
            requestStatus.innerHTML = basicInfo.OrderStatus;
            requestID.innerHTML = basicInfo._id;
            var originalAssigndeTo = basicInfo.assignedTo;
            if (originalAssigndeTo == null) {
                assignedTo.innerHTML = "Not Assigned Yet";
            } else {
                assignedTo.innerHTML = originalAssigndeTo;
            }
            
            // get request content
            const requestContent = JSON.parse(basicInfo.OrderInfo);
            console.log(requestContent);

            deliveryMethod.innerHTML = requestContent.Payment;
            var addr = requestContent.Addr;
            addrFullName.innerHTML = addr.FullName;
            addrLine1.innerHTML = addr.AddrLine1;
            addrLine2.innerHTML = addr.AddrLine2;
            addrCity.innerHTML = addr.AddrCity;
            addrState.innerHTML = addr.AddrState;
            addrZip.innerHTML = addr.AddrZip;

            // var lineItemTableBody = document.getElementById('line-item-table-body');
            const lineItems = requestContent.LineItems;
            if (lineItems) {
                updateSummaryTable(lineItems);
            }
        }
    }
    request.open('GET', baseURL + "getOrders/5e8e45eea148b9004420651f");
    request.send();
}


//----------------------- Helper Functions ---------------------------

function updateSummaryTable(lineItems) {
    var len = lineItems.length;
    var itemTable = document.getElementById('line-item-table-body');
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

//--------------------- End Helper Functions ---------------------------


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
function makeGetRequest(url, onSuccess, onFailure) {
    $.ajax({
        async:false,
        type: 'GET',
        url: baseURL + url,
        dataType: "json",
        success: onSuccess,
        error: onFailure
    });
};