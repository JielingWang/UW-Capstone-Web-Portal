<!DOCTYPE html>
<html class="loading" lang="en" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="Vuexy admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities.">
    <meta name="keywords" content="admin template, Vuexy admin template, dashboard template, flat admin template, responsive admin template, web app">
    <meta name="author" content="PIXINVENT">
    <title>Request History</title>
    <link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/tables/datatable/datatables.min.css">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/vertical-menu.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/colors/palette-gradient.css">
    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
    <!-- END: Custom CSS-->

</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body >

    <!-- BEGIN: Content-->
   
    <div class="content-overlay"></div>
    <div class="header-navbar-shadow"></div>
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body">
            <!-- page users view start -->
            <section class="page-users-view">
                <div class="row">
                    <!-- account start -->
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">Account</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="users-view-image">
                                       
                                    </div>
                                    <div class="col-12 col-sm-9 col-md-6 col-lg-5">
                                        <table>
                                            <tr>
                                                <td class="font-weight-bold">UserID</td>
                                                <td>
                                                    <?php
                                                        //$user_id=$_GET["user_id"];
                                                        //echo $userid;
                                                    ?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Name</td>
                                                <td>Angelo Sashington</td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Email</td>
                                                <td>angelo@sashington.com</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-12 col-md-12 col-lg-5">
                                        <table class="ml-0 ml-sm-0 ml-lg-0">
                                            <tr>
                                                <td class="font-weight-bold">Department</td>
                                                <td>CEE</td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Supervisor</td>
                                                <td>Linda</td>
                                            </tr>
                          
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- account end -->
                    <!-- information start -->
                    <div class="col-md-6 col-12 ">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">Order Information</div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Order Number </td>
                                        <td id="id_num"> 
                                            <?php
                                                $id=$_GET["id"];
                                                echo $id;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Order Type</td>
                                        <td> 
                                            <?php
                                                $type=$_GET["type"];
                                                echo $type;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Submitted Date</td>
                                        <td>
                                             <?php
                                                $date=$_GET["date"];
                                                echo $date;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Amount</td>
                                        <td>
                                             <?php
                                                $amount=$_GET["amount"];
                                                echo $amount;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Status</td>
                                        <td>
                                            <?php
                                                $status=$_GET["status"];
                                                echo $status;
                                            ?>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Budget</td>
                                        <td>
                                          

                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>
                                    </tr>
                                   
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- information start -->
                    <!-- social links end -->
                    <div class="col-md-6 col-12 ">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">
                                     <?php
                                        if($type="Test Orderzz_TEST" || $type=="Travel Request"){
                                            echo "Travel Information";
                                        }
                                        
                                    ?>
                                </div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">FirstName</td>
                                        <td>
                                            <?php
                                                $firstname = $_GET["firstname"];
                                                echo $firstname;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">LastName</td>
                                        <td>
                                            <?php
                                                $lastname = $_GET["lastname"];
                                                echo $lastname;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Birthday</td>
                                        <td>
                                            <?php
                                                $birthday = $_GET["birthday"];
                                                echo $birthday;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Departure</td>
                                        <td>
                                            <?php
                                                $departure = $_GET["departure"];
                                                echo $departure;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Destination</td>
                                        <td>
                                            <?php
                                                $destination = $_GET["destination"];
                                                echo $destination;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Departing Date</td>
                                        <td>
                                            <?php
                                                $date= $_GET["date"];
                                                echo $date;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Returning Date</td>
                                        <td>
                                            <?php
                                                $returndate= $_GET["returndate"];
                                                echo $returndate;
                                            ?>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- social links end -->
                    <!-- permissions start -->
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header border-bottom mx-2 px-0">
                                <h6 class="border-bottom py-1 mb-0 font-medium-2"><i class="feather icon-info mr-50 "></i>Reason
                                </h6>
                            </div>
                            <div class="card-body px-75">
                                <div class="table-responsive users-view-permission">
                                            <?php
                                                $reason= $_GET["reason"];
                                                echo $reason;
                                            ?>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- permissions end -->
                    

                    <!-- flight and hotel -->
                    <div class="col-md-6 col-12 ">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">Flight Information</div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Need unit to pay the flight? </td>
                                        <td> 
                                            <?php
                                                $flight=$_GET["flight"];
                                                echo $flight;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Airline</td>
                                        <td> 
                                            <?php
                                                $airline=$_GET["flight_company"];
                                                echo $airline;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Flight Number</td>
                                        <td>
                                             <?php
                                                $flight_number=$_GET["flight_number"];
                                                echo $flight_number;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Flight From</td>
                                        <td>
                                             <?php
                                                $flight_from=$_GET["flight_from"];
                                                echo $flight_from;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Flight To</td>
                                        <td>
                                            <?php
                                                $flight_to=$_GET["flight_to"];
                                                echo $flight_to;
                                            ?>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Departing Date</td>
                                        <td>
                                            <?php
                                                $flight_departdate=$_GET["flight_departdate"];
                                                echo $flight_departdate;
                                            ?>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Returning Date</td>
                                        <td>
                                            <?php
                                                $flight_returndate=$_GET["flight_returndate"];
                                                echo $flight_returndate;
                                            ?>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Amount</td>
                                        <td>
                                            <?php
                                                $flight_amount=$_GET["flight_amount"];
                                                echo "$";
                                                echo $flight_amount;
                                            ?>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Flight Reference</td>
                                        <td>
                                            <?php
                                                $flight_reference=$_GET["flight_reference"];
                                                echo $flight_reference;
                                            ?>

                                        </td>
                                    </tr>
                                   
                                   
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- information start -->
                    <!-- social links end -->
                    <div class="col-md-6 col-12 ">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">
                                     <?php
                                        if($type="Test Orderzz_TEST" || $type=="Travel Request"){
                                            echo "Hotel Information";
                                        }
                                        
                                    ?>
                                </div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Need unit to pay the hotel?</td>
                                        <td>
                                            <?php
                                                $hotel= $_GET["hotel"];
                                                echo $hotel;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Hotel Name</td>
                                        <td>
                                            <?php
                                                $hotelname = $_GET["hotel_name"];
                                                echo $hotelname;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Hotel Address</td>
                                        <td>
                                            <?php
                                                $hotel_address = $_GET["hotel_address"];
                                                echo $hotel_address;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Number of People</td>
                                        <td>
                                            <?php
                                                $hotel_num = $_GET["hotel_num"];
                                                echo $hotel_num;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Zip Code</td>
                                        <td>
                                            <?php
                                                $zip= $_GET["hotel_zip"];
                                                echo $zip;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Amount</td>
                                        <td>
                                            <?php
                                                $hotel_amount= $_GET["hotel_amount"];
                                                echo "$";
                                                echo $hotel_amount;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Link</td>
                                        <td>
                                            <?php
                                                $hotel_link= $_GET["hotel_link"];
                                                echo $hotel_link;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Hotel Note</td>
                                        <td>
                                            <?php
                                                $hotel_note= $_GET["hotel_note"];
                                                echo $hotel_note;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>
                   

                   <!-- permissions start -->
                   <div class="col-12">
                    <div class="card">
                        <div class="card-header border-bottom mx-2 px-0">
                            <h6 class="border-bottom py-1 mb-0 font-medium-2"><i class="feather icon-award mr-50 "></i>
                            Note To the Requester
                            </h6>
                           
                        </div>
                        <div class="card-body px-75">
                          <div class="col-12">
                          <textarea id="w3mission" rows="4" cols="70">

                        </textarea>
                         </div>
                        </div>
                        <div class="card-body px-75">
                          <div class="col-12">
                            <button id="accept" onclick="accept()"  class="btn btn-primary mr-1">Accept</button>
                            <button id="reject" onclick="reject()"  class="btn btn-primary mr-1">Reject</button>
                           
                         </div>
                        </div>
                    </div>
                </div>
                <!-- permissions end -->
                </div>
            </section>
            <!-- page users view end -->

        </div>
    </div>

<!-- END: Content-->

   

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>
    <script>
        const baseURL = "https://coe-api.azurewebsites.net/api/";
        var user_id = "5e8e4bcaa148b90044206526";


        // Template POst request Ajax call
        var makePostRequest = function(url, data, onSuccess, onFailure) {
            $.ajax({
                async:false,
                type: 'POST',
                url: baseURL + url,
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json",
                success: onSuccess,
                error: onFailure
            });
        };

        // Template PUT request Ajax call
        var makePutRequest = function(url, data, onSuccess, onFailure) {
            $.ajax({
                async:false,
                type: 'PUT',
                url: baseURL + url,
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: "json",
                success: onSuccess,
                error: onFailure
            });
        };


        // Template Delete request Ajax call
        var makeDeleteRequest = function(url, onSuccess, onFailure) {
            $.ajax({
                async:false,
                type: 'DELETE',
                url: baseURL + url,
                dataType: "json",
                success: onSuccess,
                error: onFailure
            });
        };	

        // Template GET request Ajax call
        var makeGetRequest = function(url, onSuccess, onFailure) {
            $.ajax({
                async:false,
                type: 'GET',
                url: baseURL + url,
                dataType: "json",
                success: onSuccess,
                error: onFailure
            });
        };

        function accept(){
           //alert("hello");
            var JSON_data = {
                "OrderStatus": "Accepted"
            }
            var onSuccess = function(data)
            {
                alert("success");
                
            }
            var onFaliure = function(){
                alert("fail");

            }
            var js_id = "<?php echo $id ?>";
            alert(js_id);
            makePostRequest("updateOrderStatus/"+js_id,JSON_data,onSuccess,onFaliure);
            //makeGetRequest("getOrders/5e8e4bcaa148b90044206526",onSuccess,onFaliure);
        }

        function reject(){
           //alert("hello");
            var JSON_data = {
                "OrderStatus": "Rejected"
            }
            var onSuccess = function(data)
            {
                alert("success");
                
            }
            var onFaliure = function(){
                alert("fail");

            }
            var js_id = "<?php echo $id ?>";
            alert(js_id);
            makePostRequest("updateOrderStatus/"+js_id,JSON_data,onSuccess,onFaliure);
            //makeGetRequest("getOrders/5e8e4bcaa148b90044206526",onSuccess,onFaliure);
        }

    </script>


    <!-- BEGIN: Vendor JS-->
    <script src="../../../app-assets/vendors/js/vendors.min.js"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <script src="../../../app-assets/vendors/js/tables/datatable/pdfmake.min.js"></script>
    <script src="../../../app-assets/vendors/js/tables/datatable/vfs_fonts.js"></script>
    <script src="../../../app-assets/vendors/js/tables/datatable/datatables.min.js"></script>
    <script src="../../../app-assets/vendors/js/tables/datatable/datatables.buttons.min.js"></script>
    <script src="../../../app-assets/vendors/js/tables/datatable/buttons.html5.min.js"></script>
    <script src="../../../app-assets/vendors/js/tables/datatable/buttons.print.min.js"></script>
    <script src="../../../app-assets/vendors/js/tables/datatable/buttons.bootstrap.min.js"></script>
    <script src="../../../app-assets/vendors/js/tables/datatable/datatables.bootstrap4.min.js"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="../../../app-assets/js/core/app-menu.js"></script>
    <script src="../../../app-assets/js/core/app.js"></script>
    <script src="../../../app-assets/js/scripts/components.js"></script>
    <!-- END: Theme JS-->

    <!-- BEGIN: Page JS-->
    <script src="../../../app-assets/js/scripts/datatables/datatable.js"></script>
    <!-- END: Page JS-->

</body>
<!-- END: Body-->

</html>