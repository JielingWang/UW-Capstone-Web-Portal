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
    
};


function updateAllRequestsTable() {
    var table = $("#DataTables_Table_1").DataTable({
        "order": [[3, "desc"]]
    });

    for (var x = 0; x < requestsInfo.length; x++) {
        table.row.add([
            requestsInfo[x].RequestID,
            requestsInfo[x].Type,
            requestsInfo[x].Subunit,
            requestsInfo[x].Date,
            requestsInfo[x].Status,
            requestsInfo[x].Assigned
        ]).draw();
    }

    $('#DataTables_Table_1 tbody').on( 'click', 'tr', function () {
        var data = table.row( $(this) ).data();
        console.log('row id: ' + data[0]);
        sendRequestId(data[0]);
    } );
}


function sendRequestId(request_id) {
    window.sessionStorage.setItem('RequestID', request_id);
    window.location.href = "../../../html/ltr/users/user-request-detailpage.html";
}

/**
 * Welcome messages
 */
function update_Dashboard_welcomebar_navigationbar() {
    
    //Now welcome mesaage
    const welcome_message = welcomeMessage() + " " + sessionStorage.getItem("name").split(" ")[0] + " !";
    document.getElementById("welcome_userName").innerHTML = "<b>"+welcome_message+"</b>";
    //adding unit name
    document.getElementById("welcome-unitName").innerHTML = '<i class="feather icon-map-pin"></i> ' + sessionStorage.getItem("subunitName");

}

/**
 * Get all request information from getAllOrders api
 */
function getAllRequestsInfo() {
    var onSuccess = function(data) {
        if (data.status == true) {
            var n = data.data.length;
            for (var i = 0; i < n; i++) {
                var info = data.data[i];
                var id = info._id;
                var type = info.OrderType;
                var date = info.submittedOn.substr(0, 10);
                var status = info.OrderStatus;
                var assigned = info.assignedTo;
                if (assigned) { // take button cell
                    assignedValue = info.assignedTo_name;
                } else {
                    assignedValue = "Not assigned yet";
                }
                requestsInfo.push({
                    RequestID: id,
                    Type: type,
                    Subunit: window.sessionStorage.getItem('subunitName'),
                    Date: date,
                    Status: status,
                    Assigned: assignedValue
                });
                reqIdMap.set(id, i);
            }
        } else {
            //error message
            console.log('error');
        }
    }

    var onFailure = function() {
        // failure message
    }

    makeGetRequest("getOrders/" + window.sessionStorage.getItem('id'), onSuccess, onFailure);
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



