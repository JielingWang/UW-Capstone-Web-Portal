var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongose = require('mongoose');

app.use(bodyParser.json());

//adding all the required Models to the App
Departments = require('./models/Departments');
Users = require('./models/Users');
Units = require('./models/Units');
SubUnits = require('./models/SubUnits');



//connect to mongoose
mongose.connect('mongodb://localhost/backendDB', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var db = mongose.connection;

// ------ API Routes -------------


//------------------------get request for landing page-------------------------------------------
app.get('/',function(req,res){
    res.send('Please use /api/ to access the API');
});
//------------------------------------------------------------------------------------------------


// ------------------------------------ Department Routes ------------------------------------

//Route to add a new department to the Collection
app.post('/api/departments',function(req,res){
    var department_JSON = req.body;

    Departments.addDepartment(department_JSON,function(err,department){
        if(err){
            res.json({"status":false, "data":err});
        }else{
            res.json({"status":true, "data":department});
        }
    });
});
// ------------------------------------ End of Department Routes ------------------------------


// ---- User Routes -------

//Route to add a new Users to the Collection
app.post('/api/users',function(req,res){
    var User_JSON = req.body;

    Users.addUser(User_JSON,function(err,user){
        if(err){
            res.json({"status":false, "data":err});
        }else{
            res.json({"status":true, "data":user});
        }
    });
});

// ---- End of User Routes ------


// ---- Unit Routes -------

//Route to add a new Units to the Collection
app.post('/api/units',function(req,res){
    var Unit_JSON = req.body;

    Units.addUnit(Unit_JSON,function(err,user){
        if(err){
            res.json({"status":false, "data":err});
        }else{
            res.json({"status":true, "data":user});
        }
    });
});

//route to add new users to Unit
app.put('/api/units/:_id',function(req,res){
    var Unit_users = req.body;
    var Unit_ID = req.params._id;
    Units.addUsers_to_Unit_byID(Unit_ID,Unit_users.userIDs,function(err,user){
        if(err){
            res.json({"status":false, "data":err});
        }else{
            res.json({"status":true, "data":user});
        }
    });
});

// ---- End of Unit Routes ------


// ---- SubUnit Routes -------
app.post('/api/subunits',function(req,res){
    var Unit_JSON = req.body;

    SubUnits.addSubUnits(Unit_JSON,function(err,user){
        if(err){
            res.json({"status":false, "data":err});
        }else{
            res.json({"status":true, "data":user});
        }
    });
});
// ---- End of SubUnit Routes ------


app.listen(3000);
console.log("Backend Running on Port 3000");