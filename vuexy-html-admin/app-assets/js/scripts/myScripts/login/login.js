
function login()
{
    //get UW ID from the field
    var UWID_ = document.getElementById("uwNetID").value;


    var onSuccess = function(data)
    {
        if(data.status)
        {
            //saving following data in session storage
            window.sessionStorage.setItem("id",data.data.userInfo._id);
            window.sessionStorage.setItem("name",data.data.userInfo.Name);
            window.sessionStorage.setItem("uwid",data.data.userInfo.UWID);
            window.sessionStorage.setItem("unitID",data.data.UnitID);
            window.sessionStorage.setItem("unitName",data.data.UnitName);

            if(data.data.AccessLevel == "Financial Admin")
            {
                window.location.replace("../Admin/dashboard_admin.html");
                
            }
        }else
        {
            alert(data.data);
        }

    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        alert("Backend faliure !");
    }

    makeGetRequest("login/"+UWID_,onSuccess,onFaliure);
}



