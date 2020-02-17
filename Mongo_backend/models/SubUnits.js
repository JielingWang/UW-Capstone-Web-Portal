//this will allow us to access methods defined in Units model
var Units_ref = require('./Units');

var mongoose = require('mongoose');

//schema for SubUnits

var subUnitScheme = mongoose.Schema({
    subUnitName:{
        type:String,
        required: true
    },
    //acts as managers to a given SubUnit, but we can set each manager to be able to an approver or just a manager has viewing capabilities
    UserIDs:[{
        ID:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        Approver:{
            type:Boolean,
            required: true
        }
    }],
    Submitters_IDs:[
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User'
        }
    ],
    UnitID_ref:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    }
});

var SubUnit = module.exports = mongoose.model('SubUnit', subUnitScheme);

// ------------------- Helper Functions --------------------------------------------------------

//This validator function will validate Passed in JSON object contains correct data types
function validate_and_copy_passedJSON(JSON_Obj, callback) {

    var err_list = []; //this will keep all the error messages

    //Empty template of a user JSON object
    var User_JSON_Obj = {
        "subUnitName": null,
        "UserIDs": [],
        "Submitters_IDs": [],
        "UnitID_ref": null
    };

    if (typeof JSON_Obj.subUnitName != 'string')
        err_list.push("subUnitName is not String type")
    else
        User_JSON_Obj.subUnitName = JSON_Obj.subUnitName;

    if (!Array.isArray(JSON_Obj.UserIDs))
        err_list.push("Department is not array type")
    else
        User_JSON_Obj.UserIDs = JSON_Obj.UserIDs;
        
    if (!Array.isArray(JSON_Obj.Submitters_IDs))
        err_list.push("Submitters_IDs is not array type")
    else
        User_JSON_Obj.Submitters_IDs = JSON_Obj.Submitters_IDs;    
        
    if (typeof JSON_Obj.UnitID_ref != 'string')
        err_list.push("UnitID_ref is not String type")
    else
        User_JSON_Obj.UnitID_ref = JSON_Obj.UnitID_ref;    


    if(err_list.length == 0)
        return User_JSON_Obj;
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


// ------------------- End of Helper Functions --------------------------------------------------------


// ------------------- API Functions ------------------------------------------------------------------
//Method to add a new SubUnit to the mongoDB 
module.exports.addSubUnits = async function(Subunit_JSON,callback){


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
                const subUnit_validated = validate_and_copy_passedJSON(Subunit_JSON,callback);
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