//this will give us access to Units model
var Units_ref = require('./Units');
//this will give us access to SubUnits model
var SubUnits_ref = require('./SubUnits');

var mongoose = require('mongoose');


//schema for users
var userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    UWID: {
        type: String,
        required: true,
        unique: true
    },
    profileImage_URL: {
        type: String,
    },
    verified_user: {
        type: Boolean,
        default: false
    }

});

var User = module.exports = mongoose.model('User', userSchema);



// ------------------- Helper Functions --------------------------------------------------------

//This validator function will validate Passed in JSON object contains correct data types
function validate_and_copy_passedJSON(JSON_Obj, callback) {

    var err_list = []; //this will keep all the error messages
    //Empty template of a user JSON object
    var User_JSON_Obj = {
        "Name": null,
        "email": null,
        "UWID": null,
        "profileImage_URL": null,
        "verified_user": false

    };

    if (typeof JSON_Obj.Name != 'string')
        err_list.push("Name is not String type");
    else
        User_JSON_Obj.Name = JSON_Obj.Name;

    if (typeof JSON_Obj.email != 'string')
        err_list.push("email is not String type");
    else
        User_JSON_Obj.email = JSON_Obj.email;

    if (typeof JSON_Obj.UWID != 'string')
        err_list.push("UWID is not String type");
    else
        User_JSON_Obj.UWID = JSON_Obj.UWID;  

    if (typeof JSON_Obj.profile_imageURL != 'string')
        err_list.push("profile_imageURL is not String type");
    else
        User_JSON_Obj.profileImage_URL = JSON_Obj.profile_imageURL;

    if (typeof JSON_Obj.verified_user != 'boolean')
        err_list.push("verified_user is not Boolean type");
    else
        User_JSON_Obj.verified_user = JSON_Obj.verified_user;


    if(err_list.length == 0)
        return User_JSON_Obj;
    else
    {
        callback(err_list,null);
        return null;
    }
}


//this function will validate if a given userID is actually exists in the Users collection
module.exports.validate_UserID = async function (UserID)
{
    try{
        return (await User.findById(UserID));
    }catch{
        return null;
    }
}

//this function will return the user information if user existis in the collection, given user ID
module.exports.User_exsists_inCollection_byID = async function(userID){

    try{
        return (await User.findById(userID));
    }catch //cath will be executed when mongoose cant find the record !
    {
        return null;
    }
}


//this function will check whether if given Unit exists in the collection by its name
async function User_exsits_inColleciton_byName(User_name)
{
    try{
        return (await User.findOne({"Name":User_name}));
    }catch{
        return null;
    }
}

// ------------------- End of Helper Functions --------------------------------------------------------


// ------------------- API Functions ------------------------------------------------------------------

//Method to add a new user to the mongoDB 
module.exports.addUser = function (user, callback) {
    
    //ToDO; Check if user already exists before adding
    const validated_results = validate_and_copy_passedJSON(user,callback);
    if(validated_results == null)
        return;

    User.create(validated_results, callback);
}

//this method will find user by given id
module.exports.searchUser_byObjectID = function(userID,callback){

    User.findById(userID,callback);
}


//this will login a user given its UWID
module.exports.loginUser = async function(UWID,callback){

    try{
        var userInfo = await User.findOne({"UWID":UWID});
        if(userInfo == null)
        {
            callback(`User with UW net ID: ${UWID} does not exist in the database`,null);
            return;
        }

        var accessInfo =        {
                                    "userInfo":userInfo

                                }
        const user_ObjID = userInfo._id;
        //now lets traverse through all the units and find if the user exists in the Units collection

            var fetched_Unit_info = await Units_ref.getAllUnits();
            if(fetched_Unit_info != null)
                for(var x=0;x<fetched_Unit_info.length;x++)
                    for(var y=0;y<fetched_Unit_info[x].userIDs.length;y++)
                        if(fetched_Unit_info[x].userIDs[y].ID.equals(user_ObjID) && fetched_Unit_info[x].userIDs[y].Admin == true)
                        {
                            accessInfo.AccessLevel =  "Financial Admin";
                            accessInfo.UnitName = fetched_Unit_info[x].unitName;
                            accessInfo.UnitID = fetched_Unit_info[x]._id;
                            callback(null,accessInfo);
                            return;
                        }else if (fetched_Unit_info[x].userIDs[y].ID.equals(user_ObjID) && fetched_Unit_info[x].userIDs[y].Admin == false)
                        {
                            accessInfo.AccessLevel =  "Financial Staff";
                            accessInfo.UnitName = fetched_Unit_info[x].unitName;
                            accessInfo.UnitID = fetched_Unit_info[x]._id;
                            callback(null,accessInfo);
                            return;
                        }

        
        
                        
        //now lets traverse through all the subunits and find if the user exists under submitters in the SubUnits collection        
        var fetched_subUnit_info = await SubUnits_ref.getAllSubUnits();
        if(fetched_subUnit_info != null)
        {
            for(var xx=0;xx<fetched_subUnit_info.length;xx++)
            {
                for(var yy=0;yy<fetched_subUnit_info[xx].Submitters_IDs.length;yy++)
                {
                    if(fetched_subUnit_info[xx].Submitters_IDs[yy].equals(user_ObjID))
                    {
                        accessInfo.AccessLevel =  "Submitter";
                        accessInfo.SubUnitName = fetched_subUnit_info[xx].subUnitName;
                        accessInfo.SubUnitID = fetched_subUnit_info[xx]._id;
                        callback(null,accessInfo);
                        return;                        
                    }
                }
            }

            //now lets traverse through all the subunits and find if the user exists under approver in the SubUnits collection
            for(var xx=0;xx<fetched_subUnit_info.length;xx++)
            {
                for(var yy=0;yy<fetched_subUnit_info[xx].BudgetTable.length;yy++)
                {
                    //console.log(fetched_subUnit_info[xx].BudgetTable[yy]);
                    for(var zz=0;zz<fetched_subUnit_info[xx].BudgetTable[yy].approvers.length;zz++)
                    {
                        if(fetched_subUnit_info[xx].BudgetTable[yy].approvers[zz].ID == user_ObjID)
                        {
                            
                            accessInfo.AccessLevel =  "Approver";
                            accessInfo.SubUnitName = fetched_subUnit_info[xx].subUnitName;
                            accessInfo.SubUnitID = fetched_subUnit_info[xx]._id;
                            callback(null,accessInfo);
                            return;                             
                        }
                    }
                }
            }
        }


        //incase we didn't find that user just say cant find him/her
        callback(`User with UW net ID: ${UWID} is not assigned with a access Level. Please assign the user first to login`,null);
        return;                            
        
    }catch{
        callback(`Login Error Occured while looking for UWID`,null);
        return;
    }
}

// ------------------- End of API Functions ------------------------------------------------------------------