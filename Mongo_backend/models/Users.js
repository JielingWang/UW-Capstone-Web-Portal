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
    department: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Department'
        }
    ],
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
    //Empty template of a user JSON object
    var User_JSON_Obj = {
        "Name": null,
        "email": null,
        "UWID": null,
        "department": [],
        "profileImage_URL": null,
        "verified_user": false

    };

    if (typeof JSON_Obj.Name != 'string')
        callback("Name is not String type", null);
    else
        User_JSON_Obj.Name = JSON_Obj.Name;

    if (typeof JSON_Obj.email != 'string')
        callback("email is not String type", null);
    else
        User_JSON_Obj.email = JSON_Obj.email;

    if (typeof JSON_Obj.UWID != 'string')
        callback("UWID is not String type", null);
    else
        User_JSON_Obj.UWID = JSON_Obj.UWID;

    if (!Array.isArray(JSON_Obj.department))
        callback("Department is not array type", null);
    else
        User_JSON_Obj.department = JSON_Obj.department;        

    if (typeof JSON_Obj.profile_imageURL != 'string')
        callback("profile_imageURL is not String type", null);
    else
        User_JSON_Obj.profileImage_URL = JSON_Obj.profile_imageURL;

    if (typeof JSON_Obj.verified_user != 'boolean')
        callback("verified_user is not Boolean type", null);
    else
        User_JSON_Obj.verified_user = JSON_Obj.verified_user;


    return User_JSON_Obj;
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

// ------------------- End of Helper Functions --------------------------------------------------------


// ------------------- API Functions ------------------------------------------------------------------

//Method to add a new user to the mongoDB 
module.exports.addUser = function (user, callback) {
    
    //ToDO; Check if user already exists before adding
    User.create(validate_and_copy_passedJSON(user,callback), callback);
}

//this method will find user by given id
module.exports.searchUser_byObjectID = function(userID,callback){

    User.findById(userID,callback);
}

// ------------------- End of API Functions ------------------------------------------------------------------