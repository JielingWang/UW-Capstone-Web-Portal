
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

//form elements
var subUnit_name_input = document.getElementById("subUnit_name_input");
var subUnit_name_input_error = document.getElementById("subUnit_name_input_error");
var ManageSubUnit_removeBtn = document.getElementById("ManageSubUnit_removeBtn");
var ManageSubUnit_updateBtn = document.getElementById("ManageSubUnit_updateBtn");
var ManageSubUnit_addBtn = document.getElementById("ManageSubUnit_addBtn");

var submitters_name_input = document.getElementById("submitters_name_input");
var submitters_name_input_error = document.getElementById("submitters_name_input_error");
var submitter_email_input = document.getElementById("submitter_email_input");
var submitter_email_input_error = document.getElementById("submitter_email_input_error");
var submitter_UWID_input = document.getElementById("submitter_UWID_input");
var submitter_UWID_input_error = document.getElementById("submitter_UWID_input_error");
var submitter_clearBtn = document.getElementById("submitter_clearBtn");
var submitter_removeBtn = document.getElementById("submitter_removeBtn");
var submitter_updateBtn = document.getElementById("submitter_updateBtn");
var submitter_addBtn = document.getElementById("submitter_addBtn");

var budget_addBtn = document.getElementById("budget_addBtn");
var budget_removeBtn = document.getElementById("budget_removeBtn");

var approver_name_input = document.getElementById("approver_name_input");
var approver_name_input_error = document.getElementById("approver_name_input_error");
var approver_email_input = document.getElementById("approver_email_input");
var approver_email_input_error = document.getElementById("approver_email_input_error");
var approver_UWID_input = document.getElementById("approver_UWID_input");
var approver_UWID_input_error = document.getElementById("approver_UWID_input_error");
var approver_limit_input = document.getElementById("approver_limit_input");
var approver_limit_input_error = document.getElementById("approver_limit_input_error");
var approvers_removeBtn = document.getElementById("approvers_removeBtn");
var approvers_updateBtn = document.getElementById("approvers_updateBtn");
var approvers_addBtn = document.getElementById("approvers_addBtn");


window.onload = function()
{
    
    //initializing all the tables
    initialize_Subunit_overview_table();
    initialize_submitter_overview_table();
    initialize_budget_overview_table();
    initialize_approvers_overview_table();

    //updating subunit overview table
    update_Subunit_overview_table();
   

    add_btn_hide_unhide_logic_Subunit_overview();
    update_btn_hide_unhide_logic_Subunit_overview();
    remove_btn_hide_unhide_logic_Subunit_overview();

    //all the buttons in Subinit Overview must be hidden
    hide_all_btns_logic_Submitter_overview();
    //all the buttons in budget Overview must be hidden
    hide_all_btns_logic_budget_overview();


}

function update_Subunit_overview_table()
{
    //api Call to get all the subunits under a this unit
    subunit_info = getAll_Subunits_under_Unit();
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

    var td_profile_pic_url = document.createElement('td');
    td_profile_pic_url.innerHTML = profile_pic_url;

    var tr = document.createElement('tr');
    tr.appendChild(td_id_);
    tr.appendChild(td_profile_image);
    tr.appendChild(td_name);
    tr.appendChild(td_UWID);
    tr.appendChild(td_Email);
    tr.appendChild(td_verfied_user);
    tr.appendChild(td_profile_pic_url);

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

//----------------------- Input Validators ----------------------------------------------------------------------------
function subunit_overview_input_validator()
{
    var errorFound = false;

    if(subUnit_name_input.value == "" || subUnit_name_input.value == null)
    {
        subUnit_name_input_error.innerHTML = "* Subunit Name required";
        errorFound = true;
    }else
        subUnit_name_input_error.innerHTML = "";
        
    if(errorFound)
        return true;
    else
        return false;

}


function submitter_overview_input_validator()
{
    String.prototype.isNumber = function(){return /^\d+$/.test(this);}
    var errorFound = false;
    
    if(submitters_name_input.value == "" || submitters_name_input.value == null)
    {
        submitters_name_input_error.innerHTML = "* Name required";
        errorFound = true;
    }        
    else
        submitters_name_input_error.innerHTML = "";

    if(submitter_UWID_input.value == "" || submitter_UWID_input.value == null)
    {
        submitter_UWID_input_error.innerHTML = "* UW ID required";
        errorFound = true;
    }        
    else if (!submitter_UWID_input.value.isNumber())
    {
        submitter_UWID_input_error.innerHTML = "* Only digits allowed";
        errorFound = true;
    }else
        submitter_UWID_input_error.innerHTML = "";
        
        
    if(submitter_email_input.value == "" || submitter_email_input.value == null)
    {
        submitter_email_input_error.innerHTML = "* Email address required";
        errorFound = true;
    }        
    else if (submitter_email_input.value.includes("@uw.edu") == false)
    {
        submitter_email_input_error.innerHTML = "* Only UW email adresses allowed";
        errorFound = true;
    }else
        submitter_email_input_error.innerHTML = "";


    if(errorFound)
        return true;
    else
        return false;
    
}

//----------------------- End of inout Validators ---------------------------------------------------------------------

//----------------------- Functions to fill form elements associated with the tables ----------------------------------------
function fill_form_elements_Subunit_overview(row_index)
{
    
    if(row_index > -1)
    {
        const row_info = subunit_over_view_table.row(row_index).data();
        subUnit_name_input.value = row_info[1];
    }else
    {
        subUnit_name_input.value = "";
    }
}

function fill_form_elements_Submitters_overview(row_index)
{
    if(row_index > -1)
    {
        const row_info = submitter_over_view_table.row(row_index).data();
        submitters_name_input.value = row_info[2];
        submitter_UWID_input.value = row_info[3];
        submitter_email_input.value = row_info[4];
    }else
    {
        submitters_name_input.value = "";
        submitter_UWID_input.value = "";
        submitter_email_input.value = "";
    }   
}

//----------------------- End of Functions to fill form elements associated with the tables ----------------------------------

//----------------------- Button Click Events --------------------------------------------------------------------------------
function add_SubUnit_SubUnit_overview()
{
    if(!subunit_overview_input_validator())
    {
        if(add_subUnit(subUnit_name_input.value))
        {
            toastr.success(`Subunit ${subUnit_name_input.value} added to ${window.sessionStorage.getItem("unitName")}`, 'Success', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            clear_Information_Subunit_overview();
            update_Subunit_overview_table();
        }
    }
}

function update_SubUnit_SubUnit_overview()
{
    if(selected_row_subunit_over_view > -1)
    {
        const selected_row_info = subunit_over_view_table.row( selected_row_subunit_over_view ).data();
        const newName = subUnit_name_input.value;

        if(update_SubUnit_name(selected_row_info[0],newName))
        {
            toastr.success(`Subunit name successfully updated`, 'Success', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            clear_Information_Subunit_overview();
            update_Subunit_overview_table();
        }
    }
}

function remove_SubUnit_SubUnit_overview()
{
    if(selected_row_subunit_over_view > -1)
    {
        const selected_row_info = subunit_over_view_table.row( selected_row_subunit_over_view ).data();

        if(remove_subunit(selected_row_info[0]))
        {
            toastr.success(`Subunit ${selected_row_info[1]} successfully removed`, 'Success', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            clear_Information_Subunit_overview();
            update_Subunit_overview_table();
        }
    }
}


function clear_Information_Subunit_overview()
{
    subUnit_name_input.value = "";
    subUnit_name_input_error.innerHTML = "";

    if(selected_row_subunit_over_view > -1)
    {
        subunit_over_view_table.rows('.selected').nodes().to$().removeClass( 'selected' );
        selected_row_subunit_over_view = -1;
    }

    
    add_btn_hide_unhide_logic_Subunit_overview();
    update_btn_hide_unhide_logic_Subunit_overview();
    remove_btn_hide_unhide_logic_Subunit_overview();

    //clear all the information in Subunit fields and hide the buttons and clear all the information in the table
    clear_Infomraiton_Submitter_overview();
    hide_all_btns_logic_Submitter_overview();
    clear_and_initialize_Submitters_overview_table();

    clear_and_initialize_Budget_overview_table();
    clear_and_initialize_Approvers_overview_table();


}

function add_user_Submitter_overview()
{
    if(!submitter_overview_input_validator())
    {
        const reurn_value = add_user_to_user_table();

        if(reurn_value)
            if(add_user_to_submitter_list(reurn_value,subunit_info[selected_row_subunit_over_view]._id))
            {
                toastr.success(`${submitters_name_input.value} added to ${subunit_info[selected_row_subunit_over_view].subUnitName} as a submitter`, 'Success', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
                clear_Information_Subunit_overview();
                update_Subunit_overview_table();  
            }     
    }
}

function update_user_Submitter_overview()
{
    if(!submitter_overview_input_validator())
        if(update_user_information())
        {
            toastr.success(`User information successfully updated`, 'Success', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            clear_Information_Subunit_overview();
            update_Subunit_overview_table();  
        }     
    
}

function remove_user_Submitter_overview()
{
    if(selected_row_submitter_over_view > -1)
    {
        const userID = submitter_over_view_table.row( selected_row_submitter_over_view ).data()[0];
        const userName = submitter_over_view_table.row( selected_row_submitter_over_view ).data()[2];
        const subUnitID = subunit_info[selected_row_subunit_over_view]._id;
        const subUnitName = subunit_info[selected_row_subunit_over_view].subUnitName;
        
        if(remove_user_to_submitter_list(userID,subUnitID))
        {
            if(remove_user_from_user_table(userID))
            {
                toastr.success(`${userName} successfully removed from ${subUnitName} subunit`, 'Success', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
                clear_Information_Subunit_overview();
                update_Subunit_overview_table();  
            }         
        }

    }else
    {
        toastr.warning('Select a user to delete', 'Warning', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
    } 
    
}

function clear_Infomraiton_Submitter_overview()
{
    submitters_name_input.value = "";
    submitters_name_input_error.innerHTML = "";

    submitter_email_input.value = "";
    submitter_email_input_error.innerHTML = "";

    submitter_UWID_input.value = "";
    submitter_UWID_input_error.innerHTML = "";

    if(selected_row_submitter_over_view > -1)
    {
        submitter_over_view_table.rows('.selected').nodes().to$().removeClass( 'selected' );
        selected_row_submitter_over_view = -1;
        add_btn_hide_unhide_logic_Submitter_overview();
        update_btn_hide_unhide_logic_Submitter_overview();
        remove_btn_hide_unhide_logic_Submitter_overview();

    }
    
   
}

function clear_Infomraiton_Budget_overview()
{
    if(selected_row_budget_over_view > -1)
    {
        budget_over_view_table.rows('.selected').nodes().to$().removeClass( 'selected' );
        selected_row_budget_over_view = -1;
    }


    //TODO: add button hide unhide logic here
}

function clear_Infomraiton_Approver_overview()
{
    approver_name_input.value = "";
    approver_name_input_error.value = "";

    approver_email_input.value = "";
    approver_email_input_error.value = "";

    approver_UWID_input.value = "";
    approver_UWID_input_error.value = "";

    approver_limit_input.value = "";
    approver_limit_input_error.value = "";

    if(selected_row_approvers_over_view > -1)
    {
        approvers_over_view_table.rows('.selected').nodes().to$().removeClass( 'selected' );
        selected_row_approvers_over_view = -1;
    }


    //TODO: add button hide unhide logic here
}

//----------------------- End of Button Click Events -------------------------------------------------------------------------

//----------------------- Button Hide/Unhide logic ----------------------------------------------------------------------------
function add_btn_hide_unhide_logic_Subunit_overview()
{
    if(selected_row_subunit_over_view > -1)
    {
        const row_info = subunit_over_view_table.row( selected_row_subunit_over_view ).data();

        if(row_info[1] == subUnit_name_input.value)
            ManageSubUnit_addBtn.disabled = true;
        else
            ManageSubUnit_addBtn.disabled = false;
    }else
        ManageSubUnit_addBtn.disabled = false; 
}

function update_btn_hide_unhide_logic_Subunit_overview()
{
    if(selected_row_subunit_over_view > -1)
    {
        const row_info = subunit_over_view_table.row( selected_row_subunit_over_view ).data();

        if(row_info[1] == subUnit_name_input.value)
            ManageSubUnit_updateBtn.disabled = true;
        else
            ManageSubUnit_updateBtn.disabled = false;
    }else
        ManageSubUnit_updateBtn.disabled = true; 
}

function remove_btn_hide_unhide_logic_Subunit_overview()
{
    if(selected_row_subunit_over_view > -1)
        ManageSubUnit_removeBtn.disabled = false;
    else
        ManageSubUnit_removeBtn.disabled = true;
}

function hide_all_btns_logic_Submitter_overview()
{
    submitter_clearBtn.disabled = true;
    submitter_removeBtn.disabled = true;
    submitter_updateBtn.disabled = true;
    submitter_addBtn.disabled = true;
}

function unhide_all_btns_logic_Submitter_overview()
{
    submitter_clearBtn.disabled = false;
    submitter_removeBtn.disabled = false;
    submitter_updateBtn.disabled = false;
    submitter_addBtn.disabled = false;
}

function add_btn_hide_unhide_logic_Submitter_overview()
{
    if(selected_row_submitter_over_view > -1)
    {
        const row_info = submitter_over_view_table.row( selected_row_submitter_over_view ).data();

        if(row_info[3] == submitter_UWID_input.value || row_info[4] == submitter_email_input.value)
            submitter_addBtn.disabled = true;
        else
            submitter_addBtn.disabled = false;
    }else
        submitter_addBtn.disabled = false; 
}

function update_btn_hide_unhide_logic_Submitter_overview()
{
    if(selected_row_submitter_over_view > -1)
    {
        const row_info = submitter_over_view_table.row( selected_row_submitter_over_view ).data();

        if(row_info[2] == submitters_name_input.value && row_info[3] == submitter_UWID_input.value && row_info[4] == submitter_email_input.value)
            submitter_updateBtn.disabled = true;
        else
            submitter_updateBtn.disabled = false;
    }else
        submitter_updateBtn.disabled = true; 
}

function remove_btn_hide_unhide_logic_Submitter_overview()
{
    if(selected_row_submitter_over_view > -1)
        submitter_removeBtn.disabled = false;
    else
        submitter_removeBtn.disabled = true;
}

function hide_all_btns_logic_budget_overview()
{
    budget_removeBtn.disabled = true;
    budget_addBtn.disabled = true;
}

function unhide_all_btns_logic_budget_overview()
{
    budget_removeBtn.disabled = false;
    budget_addBtn.disabled = false;
}

function remove_btn_hide_unhide_logic_budget_overview()
{
    if(selected_row_budget_over_view > -1)
        budget_removeBtn.disabled = false;
    else
        budget_removeBtn.disabled = true;
}

//----------------------- End of Button Hide/Unhide logic ---------------------------------------------------------------------

// ------------------------ Table Information clearing function ---------------------------------------------------------------
function clear_and_initialize_SubUnit_overview_table()
{
    selected_row_subunit_over_view = -1;
    subunit_over_view_table.clear().destroy();
    initialize_Subunit_overview_table();
}

function clear_and_initialize_Submitters_overview_table()
{
    selected_row_submitter_over_view = -1;
    submitter_over_view_table.clear().destroy();
    initialize_submitter_overview_table();
}

function clear_and_initialize_Budget_overview_table()
{
    selected_row_budget_over_view = -1;
    budget_over_view_table.clear().destroy();
    initialize_budget_overview_table();
}

function clear_and_initialize_Approvers_overview_table()
{
    selected_row_approvers_over_view = -1;
    approvers_over_view_table.clear().destroy();
    initialize_approvers_overview_table();
}
// ------------------------ End of Table Information clearing function --------------------------------------------------------

//----------------------- Table Click events ----------------------------------------------------------------------------------

//subunit overiew table
$('#subunit_names_table tbody').on( 'click', 'tr', function () {

    //reset selected index of all the table to -1
    selected_row_submitter_over_view = -1;
    selected_row_budget_over_view = -1;
    selected_row_approvers_over_view = -1;

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

        //Submitter overview section
        clear_Infomraiton_Submitter_overview();
        hide_all_btns_logic_Submitter_overview();

        //Budget overview section
        hide_all_btns_logic_budget_overview();

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

        //Submitter overview section
        unhide_all_btns_logic_Submitter_overview();
        add_btn_hide_unhide_logic_Submitter_overview();
        update_btn_hide_unhide_logic_Submitter_overview();
        remove_btn_hide_unhide_logic_Submitter_overview();
        
        //Budget overview section
        unhide_all_btns_logic_budget_overview();
        remove_btn_hide_unhide_logic_budget_overview();
        
    }

    fill_form_elements_Subunit_overview(selected_row_subunit_over_view);
    add_btn_hide_unhide_logic_Subunit_overview();
    update_btn_hide_unhide_logic_Subunit_overview();
    remove_btn_hide_unhide_logic_Subunit_overview();

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

    fill_form_elements_Submitters_overview(selected_row_submitter_over_view);
    add_btn_hide_unhide_logic_Submitter_overview();
    update_btn_hide_unhide_logic_Submitter_overview();
    remove_btn_hide_unhide_logic_Submitter_overview();

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

    remove_btn_hide_unhide_logic_budget_overview();

} );

//Budget overview table
$('#approvers_overview_table tbody').on( 'click', 'tr', function () {
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
            },
            {
                "targets": [ 6 ],
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

function add_subUnit(SubUnit_name)
{
    var SubUnit_JSON = {

    "subUnitName": SubUnit_name,
    "Submitters_IDs": [],
    "UnitID_ref":window.sessionStorage.getItem("unitID"),
    "BudgetTable": [] 
    }

    var return_value = null;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value =  null;
        }else
        {
            return_value =  data.data;
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Internal server error has occured. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value =  null;
    }

    makePostRequest("subunits",SubUnit_JSON,onSuccess,onFaliure);

    return return_value;
}


function update_SubUnit_name(SubUnitID,newName)
{

    var return_value = null;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value =  null;
        }else
        {
            return_value =  true;
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Internal server error has occured. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value =  null;
    }

    makePutRequest_NoBody("subunits/"+SubUnitID+"/"+newName,onSuccess,onFaliure);

    return return_value;   
}


function remove_subunit(SubUnitID)
{
    var return_value = false;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value = false;
        }   
        else
            return_value = true;
        
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Backend error occured while removing Subunit. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value = false;
    }

    makeDeleteRequest("subunits/"+SubUnitID,onSuccess,onFaliure);
    return return_value;    
}


function add_user_to_user_table()
{
    var user_JSON = {

        "Name": submitters_name_input.value,
        "email": submitter_email_input.value,
        "UWID":submitter_UWID_input.value,
        "profile_imageURL":"",
        "verified_user":false
    }

    var return_value = null;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value =  null;
        }else
        {
            return_value =  data.data._id;
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Internal server error has occured. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value =  null;
    }

    makePostRequest("users",user_JSON,onSuccess,onFaliure);

    return return_value;
}


function add_user_to_submitter_list(UserID, SubunitID)
{
    var submitter_JSON = {

        "Submitters_IDs": [UserID]
    }

    var return_value = false;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value =  false;
        }else
        {
            return_value =  true;
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Internal server error has occured. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value =  false;
    }

    makePostRequest("submitters/"+SubunitID,submitter_JSON,onSuccess,onFaliure);

    return return_value; 
}

function update_user_information()
{
    var return_value = null;

    var isVerfied = false;
    var old_email = submitter_over_view_table.row( selected_row_submitter_over_view ).data()[4];
    var old_UWID = submitter_over_view_table.row( selected_row_submitter_over_view ).data()[3];

    if(submitter_over_view_table.row( selected_row_submitter_over_view ).data()[5] == "Yes")
        isVerfied = true;
    else
        isVerfied = false;

    const JSON_obj = {
        "Name": submitters_name_input.value,
        "email": submitter_email_input.value,
        "UWID": submitter_UWID_input.value,
        "profile_imageURL": submitter_over_view_table.row( selected_row_submitter_over_view ).data()[6],
        "verified_user": isVerfied
    }


    
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value =  false;
        }else
        { 
            return_value =  true;
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Internal server error has occured. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value =  false;
    }

    makePutRequest("users/"+old_email+"/"+old_UWID,JSON_obj,onSuccess,onFaliure);
    
    return return_value;
}

function remove_user_from_user_table(UserID)
{
    var return_value = false;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value =  false;
        }else
        {
            return_value =  true;
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Internal server error has occured. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value =  false;
    }

    makeDeleteRequest("users/"+UserID,onSuccess,onFaliure);

    return return_value;
}


function remove_user_to_submitter_list(UserID, SubunitID)
{
    var submitter_JSON = {

        "Submitters_IDs": [UserID]
    }

    var return_value = false;
    var onSuccess = function(data)
    {
        if(data.status == false)
        {
            toastr.error(data.data, 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
            return_value =  false;
        }else
        {
            return_value =  true;
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        toastr.error('Internal server error has occured. Please try again', 'Error', { positionClass: 'toast-top-right', containerId: 'toast-top-right' });
        return_value =  false;
    }

    makePostRequest("Removesubmitters/"+SubunitID,submitter_JSON,onSuccess,onFaliure);

    return return_value; 
}

//----------------------- End of API functions to talk to backend ---------------------------------------------