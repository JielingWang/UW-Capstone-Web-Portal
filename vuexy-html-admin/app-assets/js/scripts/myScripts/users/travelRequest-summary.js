var requestType = document.getElementById("request-type");
var requester = document.getElementById("requester");
var payee = document.getElementById("payee");
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

var noteCard = document.getElementById("note_card");
var noteContent = document.getElementById("notes");
var feedbackBlock = document.getElementById("feedback-block");

var request_id = null;

var itemAmount = 0;
var addTax = 0;

//const baseURL = "https://coe-api.azurewebsites.net/api/";
var user_id = "5e8e4bcaa148b90044206526";
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

window.onload = function() {
    // var request_id = window.sessionStorage.getItem('RequestID');
    //this.console.log(request_id);
    request_id = "5efb77159a0b5e00457acff8";
    requestInfo = getRequestInfo(request_id);

    collectHistoryInfo(requestInfo);
    updateRequestHistory();
    updateNotes(requestInfo);

}


function updateNotes(data) {
    noteCard.style.height = `${historyCard.clientHeight}px`;
    //noteContent.innerHTML = data.ChatInfo;
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
    requestHistory.appendChild(genClaimStamp(reqBuyer.Status));
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
    if (done) {
        p.innerHTML = "Request Budget Approved";
    } else {
        p.innerHTML = "Awaiting Budget Approval";
    }
    
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

function genClaimStamp(request_status) {
    var stamp = document.createElement('li');
    var signal = document.createElement('div');
    var info = document.createElement('div');

    var done = false;
    if (request_status == "Claimed") {
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

var feedback = document.getElementById("feedback_input");

function sendBackClicked() {
    var notes = feedback.value;
    var data = {
        ChatInfo: window.sessionStorage.getItem("name") + ": " + notes
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
}

function approveClicked() {
    console.log('clicked');
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
}

