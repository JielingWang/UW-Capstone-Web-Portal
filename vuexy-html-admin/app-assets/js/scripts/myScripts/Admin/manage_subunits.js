
//keep track of the subunit over view table
var subunit_over_view_table = null;
//keep track of the submitter over view table
var submitter_over_view_table = null;
//keep track of the budget over view table
var budget_over_view_table = null;
//keep track of the approvers over view table
var approvers_over_view_table = null;

//keep track of table body tags
var subunit_names_table_body = document.getElementById("subunit_names_table_body");
var submitters_overview_table_body = document.getElementById("submitters_overview_table_body");
var budget_overview_table_body = document.getElementById("budget_overview_table_body");
var approvers_overview_table_body = document.getElementById("approvers_overview_table_body");

//these variables will keep track of selected rows in 4 tables
var selected_row_subunit_over_view = -1;
var selected_row_submitter_over_view = -1;
var selected_row_budget_over_view = -1;
var selected_row_approvers_over_view = -1;

var subunit_info = null;


window.onload = function()
{
    //api Call to get all the subunits under a this unit
    subunit_info = getAll_Subunits_under_Unit();
    //initializing all the tables
    initialize_Subunit_overview_table();
    initialize_submitter_overview_table();
    initialize_budget_overview_table();
    initialize_approvers_overview_table();

    //updating subunit overview table
    update_Subunit_overview_table();
   

}

function update_Subunit_overview_table()
{
    console.log(subunit_info);
    if(subunit_info)
    {
        subunit_over_view_table.clear().destroy();
        //filling subunit overview table
        for(var x=0;x<subunit_info.length;x++)
            subunit_names_table_body.appendChild(prepare_Subunit_overview_table_rows(subunit_info[x]._id,subunit_info[x].subUnitName,subunit_info[x].type));

        initialize_Subunit_overview_table();
        
    }
    
}

function update_Budget_overview_table()
{
    const x = selected_row_subunit_over_view;

    if(subunit_info && x > -1)
    {    
        budget_over_view_table.clear().destroy();
            for(var y=0;y<subunit_info[x].BudgetTable.length;y++)
                budget_overview_table_body.appendChild(prepare_Budget_overview_table_rows(subunit_info[x].BudgetTable[y].budgetNumber, subunit_info[x].BudgetTable[y].budgetName, subunit_info[x].BudgetTable[y].startDate, subunit_info[x].BudgetTable[y].endDate, subunit_info[x].BudgetTable[y].approvalLogic));
            
        initialize_budget_overview_table();
        
    }
}

function update_Submitters_overview_table()
{
    const x = selected_row_subunit_over_view;

    if(subunit_info && x > -1)
    {
        submitter_over_view_table.clear().destroy();
        for(var y=0;y<subunit_info[x].Submitters_IDs.length;y++)
        {
            const results = get_user_information_given_ID(subunit_info[x].Submitters_IDs[y]);
            if(results)
                submitters_overview_table_body.appendChild(prepare_Submitters_overview_table_rows(results._id, results.Name, results.UWID, results.email, results.verified_user, results.profileImage_URL));
        }

        initialize_submitter_overview_table();
    }
}

function update_Approvers_overview_table()
{
    const x = selected_row_subunit_over_view;
    const z = selected_row_budget_over_view;

    if(subunit_info && x > -1 && z > -1)
    {
        approvers_over_view_table.clear().destroy();
        for(var y=0; y<subunit_info[x].BudgetTable[z].approvers.length;y++)
        {
            
            const results = get_user_information_given_ID(subunit_info[x].BudgetTable[z].approvers[y].ID);
            if(results)
                approvers_overview_table_body.appendChild(prepare_Approvers_overview_table_rows(results._id, results.Name, results.UWID, results.email, results.verified_user, results.profileImage_URL,subunit_info[x].BudgetTable[z].approvers[y].limit,subunit_info[x].BudgetTable[z].approvers[y].allowedRequests));
        }
        initialize_approvers_overview_table();
    }
}

//----------------------- Functions to prepare rows for different tables ----------------------------------------------
function prepare_Subunit_overview_table_rows(SubunitID, SubunitName, SubunitType)
{
    var td_id = document.createElement('td');
    td_id.innerHTML = SubunitID;
    var td_name = document.createElement('td');
    td_name.innerHTML = SubunitName;

    var tr = document.createElement('tr');
    tr.appendChild(td_id);
    tr.appendChild(td_name);

    return tr;

}

function prepare_Budget_overview_table_rows(budgetNumber, BudgetName, StartDate, EndDate, ApprovalLogic)
{
    var td_budgetNumber = document.createElement('td');
    td_budgetNumber.innerHTML = budgetNumber;
    var td_BudgetName = document.createElement('td');
    td_BudgetName.innerHTML = BudgetName;
    var td_StartDate = document.createElement('td');
    td_StartDate.innerHTML = StartDate;
    var td_EndDate = document.createElement('td');
    td_EndDate.innerHTML = EndDate;
    var td_ApprovalLogic = document.createElement('td');
    td_ApprovalLogic.innerHTML = ApprovalLogic;

    var tr = document.createElement('tr');
    tr.appendChild(td_budgetNumber);
    tr.appendChild(td_BudgetName);
    tr.appendChild(td_StartDate);
    tr.appendChild(td_EndDate);
    tr.appendChild(td_ApprovalLogic);

    return tr;

}

function prepare_Submitters_overview_table_rows(_id, Name, UWID, Email, verified_user, profile_pic_url)
{
    var td_id_ = document.createElement('td');
    td_id_.innerHTML = _id;

    //making profile picture cell part 
    var td_profile_image = document.createElement('td');
    var avatar_div = document.createElement('div');
    avatar_div.setAttribute('class','avatar mr-1 avatar-lg');
    var avatar_img = document.createElement('img');
    avatar_img.setAttribute('alt','avtar img holder');
    if(profile_pic_url == "" || profile_pic_url == null)
        avatar_img.setAttribute('src','../../../app-assets/images/portrait/small/default.jpg');
    else
        avatar_img.setAttribute('src',profile_pic_url);
    
    avatar_div.appendChild(avatar_img);
    td_profile_image.appendChild(avatar_div);

    var td_name = document.createElement('td');
    td_name.innerHTML = Name;

    var td_UWID = document.createElement('td');
    td_UWID.innerHTML = UWID;

    var td_Email = document.createElement('td');
    td_Email.innerHTML = Email;

    var td_verfied_user = document.createElement('td');
    if(verified_user)
        td_verfied_user.innerHTML = "Yes";
    else
        td_verfied_user.innerHTML = "No";

    var tr = document.createElement('tr');
    tr.appendChild(td_id_);
    tr.appendChild(td_profile_image);
    tr.appendChild(td_name);
    tr.appendChild(td_UWID);
    tr.appendChild(td_Email);
    tr.appendChild(td_verfied_user);

    return tr;    

}

function prepare_Approvers_overview_table_rows(_id, Name, UWID, Email, verified_user, profile_pic_url,limit,requests)
{
    var td_id_ = document.createElement('td');
    td_id_.innerHTML = _id;

    //making profile picture cell part 
    var td_profile_image = document.createElement('td');
    var avatar_div = document.createElement('div');
    avatar_div.setAttribute('class','avatar mr-1 avatar-lg');
    var avatar_img = document.createElement('img');
    avatar_img.setAttribute('alt','avtar img holder');
    if(profile_pic_url == "" || profile_pic_url == null)
        avatar_img.setAttribute('src','../../../app-assets/images/portrait/small/default.jpg');
    else
        avatar_img.setAttribute('src',profile_pic_url);
    
    avatar_div.appendChild(avatar_img);
    td_profile_image.appendChild(avatar_div);

    var td_name = document.createElement('td');
    td_name.innerHTML = Name;

    var td_UWID = document.createElement('td');
    td_UWID.innerHTML = UWID;

    var td_Email = document.createElement('td');
    td_Email.innerHTML = Email;

    var td_verfied_user = document.createElement('td');
    if(verified_user)
        td_verfied_user.innerHTML = "Yes";
    else
        td_verfied_user.innerHTML = "No";

    var td_limit = document.createElement('td');
    td_limit.innerHTML = limit;

    var td_requests = document.createElement('td');
    var allowed_requests = "";
    for(var x=0;x<requests.length;x++)
        allowed_requests = allowed_requests + requests[x] + "</br>";

    td_requests.innerHTML = allowed_requests;

    var tr = document.createElement('tr');
    tr.appendChild(td_id_);
    tr.appendChild(td_profile_image);
    tr.appendChild(td_name);
    tr.appendChild(td_UWID);
    tr.appendChild(td_Email);
    tr.appendChild(td_verfied_user);
    tr.appendChild(td_limit);
    tr.appendChild(td_requests);

    return tr;     


}
//----------------------- End of Functions to prepare rows for different tables ---------------------------------------

//----------------------- Table Click events ----------------------------------------------------------------------------------
//subunit overiew table
$('#subunit_names_table tbody').on( 'click', 'tr', function () {
    //table row highlight code
    if ( $(this).hasClass('selected') ) 
    {
        $(this).removeClass('selected');
        selected_row_subunit_over_view = -1;
        //if not selected we just destroy the table and reinitialize it
        budget_over_view_table.clear().destroy();
        initialize_budget_overview_table();
        //if not selected we just destroy the table and reinitialize it
        submitter_over_view_table.clear().destroy();
        initialize_submitter_overview_table();
        //if not selected we just destroy the table and reinitialize it
        approvers_over_view_table.clear().destroy();
        initialize_approvers_overview_table();

    }
    else 
    {
        subunit_over_view_table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selected_row_subunit_over_view = subunit_over_view_table.row( this ).index();
        //updating budget table
        update_Budget_overview_table();
        update_Submitters_overview_table();
        //we need to clear out the approvers table when clicking into different row in submitters table
        approvers_over_view_table.clear().destroy();
        initialize_approvers_overview_table();
        
    }
} );

//Submitters overview table
$('#submitters_overview_table tbody').on( 'click', 'tr', function () {
    //table row highlight code
    if ( $(this).hasClass('selected') ) 
    {
        $(this).removeClass('selected');
        selected_row_submitter_over_view= -1;
    }
    else 
    {
        submitter_over_view_table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selected_row_submitter_over_view = submitter_over_view_table.row( this ).index();
        
    }
} );

//Budget overview table
$('#budget_overview_table tbody').on( 'click', 'tr', function () {
    //table row highlight code
    if ( $(this).hasClass('selected') ) 
    {
        $(this).removeClass('selected');
        selected_row_budget_over_view= -1;
        //if not selected we just destroy the table and reinitialize it
        approvers_over_view_table.clear().destroy();
        initialize_approvers_overview_table();
    }
    else 
    {
        budget_over_view_table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selected_row_budget_over_view = budget_over_view_table.row( this ).index();
        update_Approvers_overview_table();
        
    }
} );

//Budget overview table
$('#approvers_over_view_table tbody').on( 'click', 'tr', function () {
    //table row highlight code
    if ( $(this).hasClass('selected') ) 
    {
        $(this).removeClass('selected');
        selected_row_approvers_over_view= -1;
    }
    else 
    {
        approvers_over_view_table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        selected_row_approvers_over_view = approvers_over_view_table.row( this ).index();
        
    }
} );
//----------------------- End of Table Click events ---------------------------------------------------------------------------

//----------------------- Table initializer functions -------------------------------------------
function initialize_Subunit_overview_table()
{
    subunit_over_view_table = $('#subunit_names_table').DataTable(  {
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }
        ],
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
    });
}

function initialize_submitter_overview_table()
{
    submitter_over_view_table = $('#submitters_overview_table').DataTable(  {
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }
        ],
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
    });
}

function initialize_budget_overview_table()
{
    budget_over_view_table = $('#budget_overview_table').DataTable(  {
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
    });
}

function initialize_approvers_overview_table()
{
    approvers_over_view_table = $('#approvers_overview_table').DataTable(  {
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }
        ],
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]]
    });
}
//----------------------- End of Table initializers ---------------------------------------------


//----------------------- API functions to talk to backend ----------------------------------------------------
function getAll_Subunits_under_Unit()
{
    var return_value = null;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error('Backend error occured while fetching Subunit information. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value = null;
        }   
        else
            return_value = data.data;
        
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Backend error occured while fetching Subunit information. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value = null;
    }

    makeGetRequest("subunitsinUnit/"+window.sessionStorage.getItem("unitID"),onSuccess,onFaliure);
    return return_value;
}


function get_user_information_given_ID(userID)
{
    var return_value = null;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error('Backend error occured while fetching user information. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value = null;
        }   
        else
            return_value = data.data;
        
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Backend error occured while fetching user information. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value = null;
    }

    makeGetRequest("users/"+userID,onSuccess,onFaliure);
    return return_value;
}
//----------------------- End of API functions to talk to backend ---------------------------------------------