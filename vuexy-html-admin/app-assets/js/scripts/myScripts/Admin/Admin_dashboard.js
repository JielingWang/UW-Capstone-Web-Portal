window.onload = function()
{
    update_Dashboard_welcomebar_navigationbar();
    update_administrativeStaff_table();
    update_subunit_table();
}



function update_Dashboard_welcomebar_navigationbar()
{
    //as soon as we get here lets set user name and Unit information to the dashboard
    document.getElementById("navigationBarName").textContent = sessionStorage.getItem("name");
    //Now welcome mesaage
    const welcome_message = welcomeMessage() + " " + sessionStorage.getItem("name").split(" ")[0] + " !";
    document.getElementById("welcome_userName").innerHTML = "<b>"+welcome_message+"</b>";
    //adding unit name
    document.getElementById("welcome-unitName").innerHTML = '<i class="feather icon-map-pin"></i> ' + sessionStorage.getItem("unitName");
}


function update_administrativeStaff_table()
{
    var administrative_staff_table_body = document.getElementById("adminnistrative_staff_table_body");
    var onSuccess = function(data)
    {
        for(var x=0;x<data.data.length;x++)
        {
            
            administrative_staff_table_body.appendChild(build_administrative_table_rows(data.data[x].profileImage_URL,data.data[x].Name,data.data[x].Admin));
        }
        
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        console.log("Backend error");
    }

    makeGetRequest("units/getUserInfomation/"+window.sessionStorage.getItem("unitID"),onSuccess,onFaliure);
}

function update_subunit_table()
{
    var subunit_table_body = document.getElementById("subunits_table_body");
    var onSuccess = function(data)
    {
        for(var x=0;x<data.data.length;x++)
        {
            
            subunit_table_body.appendChild(subunit_table_row_generator(data.data[x].subUnitName,data.data[x].type));
        }
        
    }

    //this function will be called when data exchange with backend occured an error
    var onFaliure = function()
    {
        console.log("Backend error");
    }

    makeGetRequest("subunitsinUnit/"+window.sessionStorage.getItem("unitID"),onSuccess,onFaliure);
}





// ---------------------------- Helper Functions ------------------------------
function build_administrative_table_rows(profile_img_url,name,admin)
{
    //creating profile image part
    var ul = document.createElement('ul');
    ul.setAttribute('class','list-unstyled users-list m-0  d-flex align-items-center');
    var li = document.createElement('li');
    li.setAttribute('data-toggle','tooltip');
    li.setAttribute('data-popup','tooltip-custom');
    li.setAttribute('data-placement','bottom');
    li.setAttribute('data-original-title',name);
    li.setAttribute('class','avatar pull-up');
    var img = document.createElement('img');
    img.setAttribute('class','media-object rounded-circle');
    if(profile_img_url=="" || profile_img_url == null)
        img.setAttribute('src','../../../app-assets/images/portrait/small/default.jpg');
    else
        img.setAttribute('src',profile_img_url);

    img.setAttribute('alt','Avatar');
    img.setAttribute('height','30');
    img.setAttribute('width','30');
    
    li.appendChild(img);
    ul.appendChild(li);

    var td_prof_image = document.createElement('td');
    td_prof_image.setAttribute('class','p-1');
    td_prof_image.appendChild(ul);

    var td_name = document.createElement('td');
    td_name.innerHTML = name;

    var td_accessLevel = document.createElement('td');
    if(admin)
    {
        td_accessLevel.setAttribute('style','color:Tomato');
        td_accessLevel.innerHTML = "<b>Administrator</b>";
    }else
    {
        td_accessLevel.setAttribute('style','color:MediumSeaGreen');
        td_accessLevel.innerHTML = "<b>Staff</b>";
    }
        
    

    var tr = document.createElement('tr');
    tr.appendChild(td_prof_image);
    tr.appendChild(td_name);
    tr.appendChild(td_accessLevel);

    return tr;

}


function subunit_table_row_generator(name,type)
{
    var td_subunitName = document.createElement('td');
    td_subunitName.innerHTML = name;

    var td_type = document.createElement('td');
    td_type.innerHTML = type;

    var tr = document.createElement('tr');
    tr.appendChild(td_subunitName);
    tr.appendChild(td_type);
    console.log(tr);
    return tr;

}
//----------------------------- End of Helpers   ------------------------------