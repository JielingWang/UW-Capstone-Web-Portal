var requestsInfo = [];
var requesters = [];
var subUnits = [];
var users = [];
var myPending = [];



/**
 * Initialize the window
 * Since we cannot get all needed information just from getAllOrders api
 * So we need to get users id from getAllOrders api, store them in users array,
 * and then get userInfo one by one,
 * then getAllOrders again and write to the requestsInfo global array
 */
window.onload = function() {
    update_Dashboard_welcomebar_navigationbar();
    this.getAllUsers();
    for (var i = 0; i < this.users.length; i++) {
        var r = this.getUserInfo(users[i]);
        requesters.push(r.userInfo.Name);
        subUnits.push(r.SubUnitName);
    }
    this.getAllRequestsInfo();
    this.updateSummaryTable();
    this.getMyPendingRequests();
    this.updatePendingCards();
};

/**
 * Welcome messages
 */
function update_Dashboard_welcomebar_navigationbar() {
    
    //Now welcome mesaage
    const welcome_message = welcomeMessage() + " " + sessionStorage.getItem("name").split(" ")[0] + " !";
    document.getElementById("welcome_userName").innerHTML = "<b>"+welcome_message+"</b>";
    //adding unit name
    document.getElementById("welcome-unitName").innerHTML = '<i class="feather icon-map-pin"></i> ' + sessionStorage.getItem("unitName");

}

/**
 * Get all users id of all requests from datebase
 * @param {array} users store all users id
 */
function getAllUsers() {
    var onSuccess = function(data) {
        if (data.status == true) {
            var data_subunits = data.data.SubUnits;
            for (var i = 0; i < data_subunits.length; i++) {
                var info = data_subunits[i].orders;
                for (var j = 0; j < info.length; j++) {
                    users.push(info[j].userID_ref);
                }
            }
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("findOrdersForFiscal/" + window.sessionStorage.getItem("unitID"), onSuccess, onFailure);
}

/**
 * Get all request information from getAllOrders api
 */
function getAllRequestsInfo() {
    var onSuccess = function(data) {
        if (data.status == true) {
            var data_subunits = data.data.SubUnits;
            for (var i = 0; i < data_subunits.length; i++) {
                var info = data_subunits[i].orders;
                for (var j = 0; j < info.length; j++) {
                    requestsInfo.push({
                        RequestID: info[j]._id,
                        Requester: requesters[j],
                        Type: info[j].OrderType,
                        Subunit: subUnits[j],
                        Date: info[j].submittedOn.substr(0, 10),
                        Status: info[j].OrderStatus,
                        Assigned: info[j].assignedTo
                    });
                }
            }            
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("findOrdersForFiscal/" + window.sessionStorage.getItem("unitID"), onSuccess, onFailure);
}

/**
 * Get all users information from getuserInformation api
 * @param {int} user_id extract from users global array
 */
function getUserInfo(user_id) {
    var response = null;
    var onSuccess = function(data) {
        if (data.status == true) {
            response = data.data;
        } else {
            //error message
            response = null;
        }
    }

    var onFailure = function() {
        // failure message
        response = null;
    }

    makeGetRequest("getuserInformation/" + user_id, onSuccess, onFailure);
    return response;
}

/**
 * Core function
 * Update the request table
 */
function updateSummaryTable() {
    var len = requestsInfo.length;
    var itemTable = document.getElementById('request_table_body');
    itemTable.innerHTML = '';
    for (var i = 0; i < len; i++) {
        var id = requestsInfo[i].RequestID;
        var requester = requestsInfo[i].Requester;
        var type = requestsInfo[i].Type;
        var subunit = requestsInfo[i].Subunit;
        var date = requestsInfo[i].Date;
        var status = requestsInfo[i].Status;
        var assigned = requestsInfo[i].Assigned;
        itemTable.appendChild(genRequestRow(id, requester, type, subunit, date, status, assigned));
    }
}


/**
 * Helper function, generate a single row for request table
 * @param {int} _id real id of this request
 * @param {string} requester requester name
 * @param {string} type type of this request
 * @param {string} subunit subunit of this request
 * @param {string} date submitted date of this request
 * @param {string} status status of this request
 * @param {string} assigned assigned to which fiscal staff
 */
function genRequestRow(_id, requester, type, subunit, date, status, assigned) {

    var _id_td = document.createElement('td');
    _id_td.innerHTML = _id;

    var requester_td = document.createElement('td');
    requester_td.innerHTML = requester;

    var type_td = document.createElement('td');
    type_td.innerHTML = type;
    
    var subunit_td = document.createElement('td');
    subunit_td.innerHTML = subunit;

    var date_td = document.createElement('td');
    date_td.innerHTML = date;
    
    var status_td = document.createElement('td');
    status_td.innerHTML = status;

    var assigned_td = null;
    if (assigned == null) {
        assigned_td = genAssignedCell(_id);
    } else if (assigned == window.sessionStorage.getItem("id")) {
        assigned_td = document.createElement('td');
        var icon = document.createElement('i');
        icon.setAttribute('class', 'fa fa-check');
        assigned_td.appendChild(icon);
    } else {
        assigned_td = document.createElement('td');
        var r = getUserInfo(assigned);
        assigned_td.innerHTML = r.userInfo.Name;
    }
    
    // create tr element
    var tr = document.createElement('tr');
    tr.setAttribute('id', 'summary_row_' + _id);
    tr.appendChild(_id_td);
    tr.appendChild(requester_td);
    tr.appendChild(type_td);
    tr.appendChild(subunit_td);
    tr.appendChild(date_td);
    tr.appendChild(status_td);
    tr.appendChild(assigned_td);

    return tr;
}


/**
 * Helper function, generate the assigned cell for requests table
 * @param {int} request_id real id of this request, 
 *                         use to tie the button to the correct request
 */
function genAssignedCell(request_id) {
    var assigned_td = document.createElement('td');
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('class', 'btn mr-1 mb-1 btn-outline-primary btn-sm');
    btn.setAttribute('id', request_id);
    btn.innerHTML = "Take";
    btn.onclick = function() {
        btn.remove();
        var icon = document.createElement('i');
        icon.setAttribute('class', 'fa fa-check');
        assigned_td.appendChild(icon);
        updateAssignedInfo(request_id);
        getMyPendingRequests();
        updatePendingCards();
    };
    assigned_td.appendChild(btn);
    return assigned_td;
}

/**
 * Update the assigned information of this request when clicking take button
 * @param {int} request_id request id
 */
function updateAssignedInfo(request_id) {
    var onSuccess = function(data) {
        if (data.status == true) {
           console.log("success!");
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makePostRequest("assignOrder/" + request_id + "/" + window.sessionStorage.getItem("id"), onSuccess, onFailure);
}

/**
 * Get assigned Requests from database
 */
function getMyPendingRequests() {
    var onSuccess = function(data) {
        if (data.status == true) {
            console.log("my pending requests information is here");
            console.log(data.data);
            myPending = [];
            var info = data.data;
            for (var i = 0; i < info.length; i++) {
                var user_info = getUserInfo(info[i].userID_ref);
                myPending.push({
                    RequestID: info[i]._id,
                    Requester: user_info.userInfo.Name,
                    Type: info[i].OrderType,
                    Date: info[i].submittedOn.substr(0,10)
                });
            }
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("getAssignedOrders/" + window.sessionStorage.getItem("id"), onSuccess, onFailure);
}


/**
 * Generate the pending request card component
 * @param {int} request_id 
 * @param {string} requester 
 * @param {string} type 
 * @param {string} date 
 */
function genPendingRequestCard(request_id, requester, type, date) {
    var box = document.createElement('div');
    box.setAttribute('class', 'col-xl-4 col-md-6 col-sm-12');
    var card = document.createElement('div');
    card.setAttribute('class', 'card');
    var content = document.createElement('div');
    content.setAttribute('class', 'card-content');
    
    var body_block = document.createElement('div');
    body_block.setAttribute('class', 'card-body');

    var request_id_block = document.createElement('h5');
    request_id_block.setAttribute('class', 'mt-1');
    request_id_block.innerHTML = "#" + request_id;

    var requester_block = document.createElement('p');
    requester_block.setAttribute('class', 'card-text');
    requester_block.innerHTML = "By " + requester;

    var hr = document.createElement('hr');
    hr.setAttribute('class', 'my-1');

    var down_block = document.createElement('div');
    down_block.setAttribute('class', 'd-flex justify-content-between mt-2');

    var left_block = document.createElement('div');
    left_block.setAttribute('class', 'float-left');
    var type_block = document.createElement('p');
    type_block.setAttribute('class', 'font-medium-2 mb-0');
    type_block.innerHTML = type;
    var type_label = document.createElement('p');
    type_label.innerHTML = "Type";
    left_block.appendChild(type_block);
    left_block.appendChild(type_label);

    var right_block = document.createElement('div');
    right_block.setAttribute('class', 'float-right');
    var date_block = document.createElement('p');
    date_block.setAttribute('class', 'font-medium-2 mb-0');
    date_block.innerHTML = date;
    var date_label = document.createElement('p');
    date_label.innerHTML = "Submitted Date";
    right_block.appendChild(date_block);
    right_block.appendChild(date_label);

    down_block.appendChild(left_block);
    down_block.appendChild(right_block);
    
    var edit_btn = document.createElement('button');
    edit_btn.setAttribute('type', 'button');
    edit_btn.setAttribute('class', 'btn gradient-light-primary btn-block mt-2');
    edit_btn.setAttribute('id', "edit_" + request_id);
    edit_btn.setAttribute('onclick',`sendRequestId('${request_id}');`);
    edit_btn.innerHTML = "Edit";

    body_block.appendChild(request_id_block);
    body_block.appendChild(requester_block);
    body_block.appendChild(hr);
    body_block.appendChild(down_block);
    body_block.appendChild(edit_btn);

    content.appendChild(body_block);
    card.appendChild(content);
    box.appendChild(card);
    return box;
}

function sendRequestId(request_id) {
    window.sessionStorage.setItem('RequestID', request_id);
    window.location.href = "../../../html/ltr/buyers/buyer-request-detail.html";
}

/**
 * Update my pending request cards
 */
function updatePendingCards() {
    var card_block = document.getElementById('card_block');
    card_block.innerHTML = '';
    for (var i = 0; i < myPending.length; i++) {
        card_block.appendChild(genPendingRequestCard(myPending[i].RequestID, 
            myPending[i].Requester, myPending[i].Type, myPending[i].Date));
    }
}