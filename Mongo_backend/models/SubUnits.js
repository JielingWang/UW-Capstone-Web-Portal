//this will allow us to access methods defined in Units model
var Units_ref = require('./Units');
//this will allow us to access methods defined in Users model
var Users_ref = require('./Users');
//this will allows us to use Budget document in this model
var Budget_Model = require('./Budget');

var mongoose = require('mongoose');

//schema for SubUnits

var subUnitScheme = mongoose.Schema({
    subUnitName:{
        type:String,
        required: true
    },
    Submitters_IDs:[
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        }
    ],
    UnitID_ref:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    BudgetTable:[Budget_Model]
});

var SubUnit = module.exports = mongoose.model('SubUnit', subUnitScheme);

// ------------------- Helper Functions --------------------------------------------------------

//This validator function will validate Passed in JSON object contains correct data types
async function validate_and_copy_passedJSON(JSON_Obj, callback) {

    var err_list = []; //this will keep all the error messages

    //Empty template of a subunit JSON object
    var SubUnit_JSON_Obj = {
        "subUnitName": null,
        "Submitters_IDs": [],
        "UnitID_ref": null,
        "BudgetTable":[]
    };

    //Empty template of a Budget JSON object
    var Buget_JSON_Obj = {
        "budgetNumber": null,
        "budgetName": null,
        "startDate": null,
        "endDate": null,
        "approvers": [],
        "approvalLogic": null
    }




    if (typeof JSON_Obj.subUnitName != 'string')
        err_list.push("subUnitName is not String type")
    else
        SubUnit_JSON_Obj.subUnitName = JSON_Obj.subUnitName;
        
    if (!Array.isArray(JSON_Obj.Submitters_IDs))
        err_list.push("Submitters_IDs is not array type")
    else
        SubUnit_JSON_Obj.Submitters_IDs = JSON_Obj.Submitters_IDs;    
        
    if (typeof JSON_Obj.UnitID_ref != 'string')
        err_list.push("UnitID_ref is not String type")
    else
        SubUnit_JSON_Obj.UnitID_ref = JSON_Obj.UnitID_ref;
        
    if (!Array.isArray(JSON_Obj.BudgetTable))
        err_list.push("BudgetTable is not array type")
    else
        //check if client has provided BudgetTable information, if not (if array is empty) we just skip this part 
        if(JSON_Obj.BudgetTable.length > 0)
        {
            for(var x=0;x<JSON_Obj.BudgetTable.length;x++)
            {
                if (typeof JSON_Obj.BudgetTable[x].budgetNumber != 'string')
                    err_list.push(`budgetNumber at BudgetTable element ${x+1} is not String type`)
                else
                    Buget_JSON_Obj.budgetNumber = JSON_Obj.BudgetTable[x].budgetNumber;    
                    
                if (typeof JSON_Obj.BudgetTable[x].budgetName != 'string')
                    err_list.push(`budgetName at BudgetTable element ${x+1} is not String type`)
                else
                    Buget_JSON_Obj.budgetName = JSON_Obj.BudgetTable[x].budgetName;  

                //check if client sent a valid date for start date
                if(Date.parse(JSON_Obj.BudgetTable[x].startDate) == null)
                    err_list.push(`startDate at BudgetTable element ${x+1} is not valid date type`)
                else
                    Buget_JSON_Obj.startDate = new Date(JSON_Obj.BudgetTable[x].startDate);

                //check if client sent a valid date for end date
                if(JSON_Obj.BudgetTable[x].endDate != "" ||  JSON_Obj.BudgetTable[x].endDate != null) //check if there's a date, if not skip this part
                    if(Date.parse(JSON_Obj.BudgetTable[x].endDate) == null)
                        err_list.push(`endDate at BudgetTable element ${x+1} is not valid date type`)
                    else
                        Buget_JSON_Obj.endDate = new Date(JSON_Obj.BudgetTable[x].endDate);

                if (typeof JSON_Obj.BudgetTable[x].approvalLogic != 'string')
                    err_list.push(`approvalLogic at BudgetTable element ${x+1} is not String type`)
                else
                    Buget_JSON_Obj.approvalLogic = JSON_Obj.BudgetTable[x].approvalLogic;  
                
                //check if the approver field contains an array
                if (!Array.isArray(JSON_Obj.BudgetTable[x].approvers))
                    err_list.push(`approvers at BudgetTable element ${x+1} is not array type`)
                else
                    //less go through all the elements and validate them
                    for(var y=0;y<JSON_Obj.BudgetTable[x].approvers.length;y++)
                    {
                        //check passed in user ID is actually exists
                        const fetched_User_info = await Users_ref.User_exsists_inCollection_byID(JSON_Obj.BudgetTable[x].approvers[y].ID);
                        if(fetched_User_info == null)
                        {
                            err_list.push(`BudgetTable element ${x+1}, approver element ${y+1} user ID doesnot exists in the user table`);
                            break;
                        }
                        //check limit is a number
                        if(typeof JSON_Obj.BudgetTable[x].approvers[y].limit != 'number')
                        {
                            err_list.push(`BudgetTable element ${x+1}, approver element ${y+1} limit is not a number`);
                            break;
                        }
                        //check allowedRequests is an array type
                        if(!Array.isArray(JSON_Obj.BudgetTable[x].approvers[y].allowedRequests))
                        {
                            err_list.push(`BudgetTable element ${x+1}, approver element ${y+1} allowedRequests is not array type`);
                            break;
                        }
                        
                        //if we pass all the checks then push this bad boy to the array
                        Buget_JSON_Obj.approvers.push(JSON_Obj.BudgetTable[x].approvers[y]);
                        
                    }

                //if we pass all the checks then push this budget to the SubUnit_JSON_Obj's BudgetTable
                var temp = new Object(); //creating a new object, otherwise it'll save a reference to the object
                SubUnit_JSON_Obj.BudgetTable.push(Object.assign(temp,Buget_JSON_Obj));
                //now less reset the Buget_JSON_Obj for next iteration
                Buget_JSON_Obj.budgetNumber = null;
                Buget_JSON_Obj.budgetName = null;
                Buget_JSON_Obj.startDate = null;
                Buget_JSON_Obj.endDate = null;
                Buget_JSON_Obj.approvers = [];
                Buget_JSON_Obj.approvalLogic = null;
            }
        }

        /*TODO:
            1. Check if budget already exists under subunit if yes we dont need a duplicate
            2. If Mentioned in the submitter array is mentioned in the approver array then remove him from the submitter array. And wiseversa*/
            
            

    if(err_list.length == 0)
        return SubUnit_JSON_Obj;
    else
    {
        callback(err_list,null);
        return null;
    }
        
}

//this function will check whether if given SubUnit exists in the collection by its name
async function Subunit_exsits_inColleciton_byName(SubUnit_name)
{
    try{
        return (await SubUnit.findOne({"subUnitName":SubUnit_name}));
    }catch{
        return null;
    }
}

//this function will check whether if given SubUnit exists in the collection by its ID
async function Subunit_exsits_inColleciton_byID(SubUnitID)
{
    try{
        return (await SubUnit.findById(SubUnitID));
    }catch{
        return null;
    }
}

//this function will check if subunit exists under  unit => return true if doesnt exists, false if exists
async function check_subUnit_exsists_under_unit(subUnitName,UnitID)
{
    const result = await Subunit_exsits_inColleciton_byName(subUnitName);
    if(result == null)
        return true;
    else
    {
        const result_Subunit = await Units_ref.check_SubunitID_exsists_in_SubunitIDs_array(result._id,UnitID);
        if(result_Subunit == false)
            return true;
        else if(result_Subunit == true)
            return false;
        else if(result_Subunit == null)
            return null;
    }

}

//this function will help to find if a given userID is alreadye exists in UserIDs => if found true, not found false
function check_UserID_exists_in_UserIDs(userID, SubUnit_JSON)
{
 
    for(var x=0;x<SubUnit_JSON.UserIDs.length;x++)
        if(SubUnit_JSON.userIDs[x].ID == userID)
            return true;



    return false;
}


// ------------------- End of Helper Functions --------------------------------------------------------


// ------------------- API Functions ------------------------------------------------------------------
//Method to add a new SubUnit to the mongoDB 
module.exports.addSubUnits = async function(Subunit_JSON,callback){
    /*const subUnit_validated = await validate_and_copy_passedJSON(Subunit_JSON,callback);
    if(subUnit_validated == null)
        return;
    else
        callback(null,subUnit_validated);*/


    const Unit_results = await Units_ref.Unit_exsists_inCollection_byID(Subunit_JSON.UnitID_ref);
    //check if unit actually exists. if no there's no point of moving forward. 
    if(Unit_results == null)
    {
        callback(`Unit ID:"${Subunit_JSON.UnitID_ref}" does not exsists`,null);
        return;
    }

    const SubUnit_result = await check_subUnit_exsists_under_unit(Subunit_JSON.subUnitName,Subunit_JSON.UnitID_ref);
    if(SubUnit_result == null)
    {
        callback("Internel Server error occured",null); 
        return;
    }
    
    if(SubUnit_result)
    {
            try{
                const subUnit_validated = await validate_and_copy_passedJSON(Subunit_JSON,callback);
                if(subUnit_validated == null)
                    return;
                //adding new subunit to the collection
                const return_result = await SubUnit.create(subUnit_validated);
                //adding the subunit to units subunitIDs array
                const update_results = await Units_ref.addSubunits_to_SubUnitIDs_array([return_result._id],return_result.UnitID_ref)
                if(update_results !=null)
                    callback(null,return_result); 
                else
                    callback(`Error occured while adding subunit to corresponding Units array of IDs`,null); 

            }catch{
                callback("Internel Server error occured",null); 
            }

    }else
        callback(`SubUnit "${Subunit_JSON.subUnitName}" already exsists under this unit`,null); 




}




// ------------------- End of API Functions ------------------------------------------------------------------