//this will allow us to access methods defined in Users model
var Users_ref = require('./Users');

var mongoose = require('mongoose');

//schema for Units
var unitSchema = mongoose.Schema({
    unitName:{
        type:String,
        required: true
    },
    userIDs:[
        {
            ID:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            Admin:{
                type:Boolean,
                required: true
            }
        }
    ],
    subUnitIDs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'SubUnit'
    }
});

var Unit = module.exports = mongoose.model('Unit', unitSchema);

// ---------- Helper functions ---------------------------------

//This validator function will validate Passed in JSON object contains correct data types
function validate_and_copy_passedJSON(JSON_Obj, callback)
{
    //Empty template of a department JSON object
    var Unit_JSON_Obj = {
        "unitName":null,
        "userIDs":[],
        "subUnitIDs":[]
    };

    //check passed in JSON fields have correct data types
    if(typeof JSON_Obj.unitName != 'string')
       callback("Name is not String type", null);
    else
        Unit_JSON_Obj.unitName = JSON_Obj.unitName;

    if (!Array.isArray(JSON_Obj.userIDs))
        callback("UserIDs is not array type", null);
    else
        Unit_JSON_Obj.userIDs = validate_UserIDs(JSON_Obj.userIDs,callback);   

    if (!Array.isArray(JSON_Obj.subUnitIDs))
        callback("subUnitIDs is not array type", null);
    else
        Unit_JSON_Obj.subUnitIDs = JSON_Obj.subUnitIDs; 
    
    return Unit_JSON_Obj;
}

//this function will validate if content inside the userIDs array is correct, if yes return the object, not call the callback
function validate_UserIDs(UserIDs_array, callback){
    var ArrayofIDs = [];
    var dataStruct_JSON = {"ID": null, "Admin":false}
    var errorsFound = false;

    //check types inside the UserIDs array
    for(x=0;x<UserIDs_array.length;x++)
    {
        if(typeof UserIDs_array[x].ID != 'string')
        {
            errorsFound = true;
            break;
        }else
            dataStruct_JSON.ID = UserIDs_array[x].ID;

        
        if(typeof UserIDs_array[x].Admin != 'boolean')
        {
            errorsFound = true;
            break;
        }else
            dataStruct_JSON.Admin = UserIDs_array[x].Admin;

        //finally adding to the array
        ArrayofIDs.push(dataStruct_JSON);
    }

    if(errorsFound)
        callback("userIDs array contains invalid data types")
    else
        return ArrayofIDs;

}

//this function will check whether if given Unit exists in the collection by its ID
module.exports.Unit_exsists_inCollection_byID = async function (UnitID)
{
    try{
        return (await Unit.findById(UnitID));
    }catch //cath will be executed when mongoose cant find the record !
    {
        return null;
    }
    
}

//this function will check whether if given Unit exists in the collection by its name
async function Unit_exsits_inColleciton_byName(Unit_name, owned_department)
{
    try{
        return (await Unit.findOne({"unitName":Unit_name}));
    }catch{
        return null;
    }
}



//this function will help to find if a given userID is alreadye exists in UserIDs => if found true, not found false
function check_UserID_exists_in_UserIDs(userID, Unit_JSON)
{
    for(var x=0;x<Unit_JSON.userIDs.length;x++)
        if(Unit_JSON.userIDs[x].ID == userID)
            return true;



    return false;
}

//this function will check if given SubunitID and UnitID
module.exports.check_SubunitID_exsists_in_SubunitIDs_array = async function (SubunitID,UnitID)
{
    try{
        const unitResult = await Unit.find({_id:mongoose.Types.ObjectId(UnitID), subUnitIDs:mongoose.Types.ObjectId(SubunitID)});
        if(unitResult.length ==0) //if not null return it
            return false;
        else
            return true;

    }catch //cath will be executed when mongoose cant find the record !
    {
        return null;
    }
}

//this module will add Subunits to the SubUnitIDs array in subUnit records
module.exports.addSubunits_to_SubUnitIDs_array = async function (SubunitIDs,UnitID)
{
    for(var x=0;x<SubunitIDs.length;x++)
    {
        try{
            const result = await Unit.check_SubunitID_exsists_in_SubunitIDs_array(SubunitIDs[x],UnitID);

            if(result == null) //incase above function fail to execute query return null
                return null;
            else if(result == false)
                await Unit.findByIdAndUpdate({"_id":UnitID},{$push: {subUnitIDs:SubunitIDs[x]}})

        }catch{
            return null;
        }
    }

    return true;
}


// ---------- End of Helper functions ---------------------------------


// ------- API functions -------------------------

//Method to add a new Unit to the mongoDB 
module.exports.addUnit = async function(unit,callback)
{

    if(await Unit_exsits_inColleciton_byName(unit.unitName,unit.Owned_Department) == null)
        Unit.create(validate_and_copy_passedJSON(unit,callback), callback);
    else
        callback(`Unit "${unit.unitName}" exists under units collection`,null);
}


//Method to add add new users to the Unit by ID of the Unit
module.exports.addUsers_to_Unit_byID = async function(unitID,UserIDs_array,callback)
{

    const results_unit = await Unit.Unit_exsists_inCollection_byID(unitID);
    var valid_UserIDs = []; //this will keep track of all the valid User IDs 

    //this will filter out all the valid user IDs and save it in valid_UserIDs array
    for(var x=0;x<UserIDs_array.length;x++)
        if(await Users_ref.validate_UserID(UserIDs_array[x].ID))
            valid_UserIDs.push(UserIDs_array[x]);

    if(results_unit)
    {
        //Now lets remove any userIDs that already exsists in the fetched Unit record
        for(var x=0;x<(valid_UserIDs.length);x++)
            if(check_UserID_exists_in_UserIDs(valid_UserIDs[x].ID,results_unit) == false)
            {
                //now lets push IDs that are not already in the array
                try{
                    await Unit.findByIdAndUpdate({"_id":unitID},{$push: {userIDs:{ID:valid_UserIDs[x].ID, Admin:valid_UserIDs[x].Admin}}})
                }catch{
                    callback(`Error occured inserting ID:${valid_UserIDs[x].ID} to collection`);
                    return;
                }
            }

        callback(null,"Successfully added users");

    }else //means we didn't find the Unit under Units collection
        callback(`UnitID: ${unitID} not found !`,valid_UserIDs);

}
