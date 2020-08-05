var requestsInfo = [];
var requesters = [];
var subUnits = [];
var users = [];
var myReqArr = [];
var unitStaff = [];
let userInfoMap = new Map();
let reqIdMap = new Map(); // <K, V> -> <request id, request index in requestsInfo>
// contacts.set('Jessie', {phone: "213-555-1234", address: "123 N 1st Ave"})
// contacts.has('Jessie') // true
// contacts.get('Hilary') // undefined
// contacts.set('Hilary', {phone: "617-555-4321", address: "321 S 2nd St"})
// contacts.get('Jessie') // {phone: "213-555-1234", address: "123 N 1st Ave"}
// contacts.delete('Raymond') // false
// contacts.delete('Jessie') // true
// console.log(contacts.size) // 1

/**
 * Initialize the window
 * Since we cannot get all needed information just from getAllOrders api
 * So we need to get users id from getAllOrders api, store them in users array,
 * and then get userInfo one by one,
 * then getAllOrders again and write to the requestsInfo global array
 */
window.onload = function() {
    update_Dashboard_welcomebar_navigationbar();

    // All requests table
    this.getAllRequestsInfo();
    this.updateAllRequestsTable();

    // My pending request table and card
    this.getMyPendingRequestsInfo();
    this.updatePendingCards();
    var table = this.initMyPendingReqTable();
    this.updateMyPendingRequestsTable(table);

    $("input:radio[name='my-pending-format']").on('change', function () {
        $("#my-pending-box").toggleClass("hidden");
        $("#my-pending-table").toggleClass("hidden");
        // if ($("input:radio[name='my-pending-format']:checked").val() == 'list-format') {
        //     $("#my-pending-box").toggleClass("hidden");
        //     $("#my-pending-table").toggleClass("hidden");
        // }
        // if ($("input:radio[name='my-pending-format']:checked").val() == 'box-format') {
        //     $("#my-pending-box").toggleClass("hidden");
        //     $("#my-pending-table").toggleClass("hidden");
        // }
    });

    // Prepare for modal
    this.prepareReassignSelector();
    
};


function updateAllRequestsTable() {
    var table = $("#DataTables_Table_1").DataTable({
        "order": [[4, "desc"]]
    });

    for (var x = 0; x < requestsInfo.length; x++) {
        table.row.add([
            requestsInfo[x].RequestID,
            requestsInfo[x].Requester,
            requestsInfo[x].Type,
            requestsInfo[x].Subunit,
            requestsInfo[x].Date,
            requestsInfo[x].Status,
            requestsInfo[x].Assigned
        ]).draw();
    }

    $('#DataTables_Table_1 tbody').on( 'click', 'tr td:not(:last-child)', function () {
        var data = table.row( $(this).parents('tr') ).data();
        console.log('row id: ' + data[0]);
        sendRequestId(data[0]);
    } );
    
    $('#DataTables_Table_1 tbody').on( 'click', "button[name='takeButton']", function () {
        var data = table.row( $(this).parents('tr') ).data();
        // console.log('take id: ' + data[0]);
        var cell = table.cell($(this).parents('td'));
        cell.data('<button type="button" class="btn mr-0 mb-0 btn-outline-danger btn-sm" name="untakeButton" data-toggle="modal" data-target="#reassignModal">Untake</button>').draw();
        var assign_id = window.sessionStorage.getItem("id");
        updateAssignedInfo(data[0], assign_id);

        getMyPendingRequestsInfo();
        updatePendingCards();
        // var table_0 = $("#DataTables_Table_0");
        // updateMyPendingRequestsTable(table_0);
    } );

    $('#DataTables_Table_1 tbody').on( 'click', "button[name='untakeButton']", function () {
        var data = table.row( $(this).parents('tr') ).data();
        // console.log('untake id: ' + data[0]);
        var cell = table.cell( $(this).parents('td') );
        $('#reassignModal').on('click', "button[name='reassign']", function() {
            var newAssign = modalReassignClicked(data[0]);
            if (newAssign) {
                cell.data(newAssign).draw();
            } else {
                cell.data('<button type="button" class="btn mr-0 mb-0 btn-outline-primary btn-sm" name="takeButton">Take</button>');
            }
            getMyPendingRequestsInfo();
            updatePendingCards();
            // updateMyPendingRequestsTable();
        });
        
    } );
}

function initMyPendingReqTable() {
    var table = $("#DataTables_Table_0").DataTable({
        "order": [[0, "asc"]]
    });
    return table;
}


function updateMyPendingRequestsTable(table) {
    

    // table.clear();

    for (var i = 0; i < myReqArr.length; i++) {
        var x = reqIdMap.get(myReqArr[i].RequestID);
        table.row.add([
            requestsInfo[x].RequestID,
            requestsInfo[x].Requester,
            requestsInfo[x].Type,
            requestsInfo[x].Subunit,
            requestsInfo[x].Date,
            requestsInfo[x].Status
        ]).draw();
    }

    $('#DataTables_Table_0 tbody').on( 'click', 'tr', function () {
        var data = table.row( $(this) ).data();
        console.log('row id: ' + data[0]);
        sendRequestId(data[0]);
    } );
}


function prepareReassignSelector() {
    getUnitFiscalStaff();
    var selector = document.getElementById("reassignSelect");
    for (var x = 0; x < unitStaff.length; x++) {
        var op = document.createElement('option');
        op.setAttribute('value', unitStaff[x].id);
        op.innerHTML = unitStaff[x].Name;
        selector.appendChild(op);
    }
}

function getUnitFiscalStaff() {
    var unit_id = window.sessionStorage.getItem("unitID");
    var myself_id = window.sessionStorage.getItem("id");
    var onSuccess = function(data) {
        if (data.status == true) {
            var info = data.data;
            for (var i = 0; i < info.length; i++) {
                if (info[i]._id == myself_id) continue;
                unitStaff.push({
                    Name: info[i].Name,
                    id: info[i]._id
                });
            }
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("units/getUserInfomation/" + unit_id, onSuccess, onFailure);
}

function modalReassignClicked(reqeust_id) {
    var selector = document.getElementById("reassignSelect");
    var assign_id = selector.value;
    var assign_name = null;
    if (assign_id) {
        assign_name = selector.options[selector.selectedIndex].text;
        updateAssignedInfo(reqeust_id, assign_id);
    } else {
        untakeRequest(reqeust_id);
    }
    $('#reassignModal').modal('hide');
    return assign_name;
}

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
                    var id = info[j]._id;
                    var requesterID = info[j].userID_ref;
                    if (!userInfoMap.has(requesterID)) {
                        var userData = getUserInfo(requesterID);
                        userInfoMap.set(requesterID, {
                            name: userData.userInfo.Name,
                            subunit: userData.SubUnitName
                        });
                    }
                    var requester = userInfoMap.get(requesterID).name;
                    var type = info[j].OrderType;
                    var subunitName = userInfoMap.get(requesterID).subunit;
                    var date = info[j].submittedOn.substr(0, 10);
                    var status = info[j].OrderStatus;
                    var assigned = info[j].assignedTo;
                    if (status == "Approved" && assigned == null) { // take button cell
                        assignedValue = '<button type="button" class="btn mr-0 mb-0 btn-outline-primary btn-sm" name="takeButton">Take</button>';
                    } else if (assigned == window.sessionStorage.getItem("id")) { // check cell
                        assignedValue = '<button type="button" class="btn mr-0 mb-0 btn-outline-danger btn-sm" name="untakeButton" data-toggle="modal" data-target="#reassignModal">Untake</button>';
                    } else if (assigned != null) { // taken by others cell
                        assignedValue = getUserInfo(assigned).userInfo.Name;
                    } else {
                        assignedValue = "Routing";
                        // assigned_td = document.createElement('td');
                        // var span = document.createElement('span');
                        // span.setAttribute('class', 'badge badge-warning');
                        // span.setAttribute('id', `${_id}`);
                        // span.innerHTML = "Routing";
                        // assigned_td.appendChild(span);
                        // assigned_td.innerHTML = "Routing";
                    }
                    requestsInfo.push({
                        RequestID: id,
                        Requester: requester,
                        Type: type,
                        Subunit: subunitName,
                        Date: date,
                        Status: status,
                        Assigned: assignedValue
                    });
                    reqIdMap.set(id, j);
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
 * Core function
 * Update the request table
 */
// function updateSummaryTable() {
//     var len = requestsInfo.length;
//     var itemTable = document.getElementById('request_table_body');
//     itemTable.innerHTML = '';
//     for (var i = 0; i < len; i++) {
//         var id = requestsInfo[i].RequestID;
//         var requester = requestsInfo[i].Requester;
//         var type = requestsInfo[i].Type;
//         var subunit = requestsInfo[i].Subunit;
//         var date = requestsInfo[i].Date;
//         var status = requestsInfo[i].Status;
//         var assigned = requestsInfo[i].Assigned;
//         itemTable.appendChild(genRequestRow(id, requester, type, subunit, date, status, assigned));
//     }
// }


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
// function genRequestRow(_id, requester, type, subunit, date, status, assigned) {

//     var _id_td = document.createElement('td');
//     _id_td.innerHTML = _id;

//     var requester_td = document.createElement('td');
//     requester_td.innerHTML = requester;

//     var type_td = document.createElement('td');
//     type_td.innerHTML = type;
    
//     var subunit_td = document.createElement('td');
//     subunit_td.innerHTML = subunit;

//     var date_td = document.createElement('td');
//     date_td.innerHTML = date;
    
//     var status_td = document.createElement('td');
//     status_td.innerHTML = status;

//     var assigned_td = null;
//     if (status == "Approved" && assigned == null) { // take button cell
//         assigned_td = genAssignedButtonCell(_id);
//     } else if (assigned == window.sessionStorage.getItem("id")) { // check cell
//         assigned_td = document.createElement('td');
//         var icon = document.createElement('i');
//         icon.setAttribute('class', 'fa fa-check');
//         assigned_td.appendChild(icon);
//     } else if (assigned != null) { // taken by others cell
//         assigned_td = document.createElement('td');
//         assigned_td.innerHTML = getUserInfo(assigned);
//     } else {
//         assigned_td = document.createElement('td');
//         // var span = document.createElement('span');
//         // span.setAttribute('class', 'badge badge-warning');
//         // span.setAttribute('id', `${_id}`);
//         // span.innerHTML = "Routing";
//         // assigned_td.appendChild(span);
//         assigned_td.innerHTML = "Routing";
//     }
    
//     // create tr element
//     var tr = document.createElement('tr');
//     tr.setAttribute('id', 'summary_row_' + _id);
//     tr.appendChild(_id_td);
//     tr.appendChild(requester_td);
//     tr.appendChild(type_td);
//     tr.appendChild(subunit_td);
//     tr.appendChild(date_td);
//     tr.appendChild(status_td);
//     tr.appendChild(assigned_td);

//     return tr;
// }


/**
 * Helper function, generate the assigned cell for requests table
 * @param {int} request_id real id of this request, 
 *                         use to tie the button to the correct request
 */
// function genAssignedButtonCell() {
//     var assigned_td = document.createElement('td');
//     var btn = document.createElement('button');
//     btn.setAttribute('type', 'button');
//     btn.setAttribute('class', 'btn mr-0 mb-0 btn-outline-primary btn-sm');
//     btn.setAttribute('id', request_id);
//     btn.innerHTML = "Take";
//     btn.onclick = function() {
//         btn.remove();
//         var icon = document.createElement('i');
//         icon.setAttribute('class', 'fa fa-check');
//         assigned_td.appendChild(icon);
//         updateAssignedInfo(request_id);
//         getMyPendingRequestsInfo();
//         updatePendingCards();
//     };
//     assigned_td.appendChild(btn);
//     return assigned_td;
//     var assignedValue = '<button type="button" class="btn mr-0 mb-0 btn-outline-primary btn-sm" name="takeButton">Take</button>';
//     return assignedValue;
// }

/**
 * Update the assigned information of this request when clicking take button
 * @param {int} request_id request id
 */
function updateAssignedInfo(request_id, assign_id) {
    var onSuccess = function(data) {
        if (data.status == true) {
           console.log("assigned success!");
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makePostRequest("assignOrder/" + request_id + "/" + assign_id, onSuccess, onFailure);
}

/**
 * Untake the taken request without reassigning to others
 * @param {int} request_id request id
 */
function untakeRequest(request_id) {
    var onSuccess = function(data) {
        if (data.status == true) {
           console.log("untake success!");
        } else {
            //error message
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("untakeOrder/" + request_id, onSuccess, onFailure);
}

/**
 * Get assigned Requests from database
 */
function getMyPendingRequestsInfo() {
    myReqArr = [];
    var onSuccess = function(data) {
        if (data.status == true) {
            // console.log("my pending requests information is here");
            // console.log(data.data);
            var info = data.data;
            for (var i = 0; i < info.length; i++) {
                var requesterID = info[i].userID_ref;
                if (!userInfoMap.has(requesterID)) {
                    var userData = getUserInfo(requesterID);
                    userInfoMap.set(requesterID, {
                        name: userData.userInfo.Name,
                        subunit: userData.SubUnitName
                    });
                }
                var requester = userInfoMap.get(requesterID).name;
                myReqArr.push({
                    RequestID: info[i]._id,
                    Requester: requester,
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
    // console.log(myReqArr);
    for (var i = 0; i < myReqArr.length; i++) {
        card_block.appendChild(genPendingRequestCard(myReqArr[i].RequestID, 
            myReqArr[i].Requester, myReqArr[i].Type, myReqArr[i].Date));
    }
}