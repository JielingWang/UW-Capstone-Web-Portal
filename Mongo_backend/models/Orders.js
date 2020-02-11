var mongoose = require('mongoose');
var fs = require('fs');

//schema for SubUnits

var orderScheme = mongoose.Schema({

    userID_ref:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    OrderInfo:{
        type: String,
        required: true
    },
    OrderStatus:{
        type:String,
        required:true
    },
    ChatInfo:{
        type:String,
        required:true
    },
    Uploaded_documents:{ //stores bunch of URLs that links to some directory in the server
        type:[String],
        required:true
    }

});

var Order = module.exports = mongoose.model('Order', orderScheme);

// ------------------- Helper Functions --------------------------------------------------------------
// ------------------- End of Helper Functions --------------------------------------------------------


// ------------------- API Functions ------------------------------------------------------------------------
/*this function will add a new order to the Order collection also make a directory with the name of the 
Order_ID and save all the uploaded files and files uploaded in the Chat section of the order
*/
module.exports.addOrder = function(Order_JSON,callback){
    
    //lest check passed in 

    //create a directory in the working directory
    fs.mkdir(__dirname+"/../orders/testDir", (err)=>{
        if(err)
            console.log("Shit");
                
        }); 


    callback(null,"Dir created successfully");
    //callback(null,"Dir failed");
}
// ------------------- End of API Functions ------------------------------------------------------------------



