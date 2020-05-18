<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Order Details</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
<meta name="description" content="Vuexy admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities.">
<meta name="keywords" content="admin template, Vuexy admin template, dashboard template, flat admin template, responsive admin template, web app">
<meta name="author" content="PIXINVENT">
<title>User View - Vuexy - Bootstrap HTML admin template</title>
<link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png">
<link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico">
<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" rel="stylesheet">

<!-- BEGIN: Vendor CSS-->
<link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
<!-- END: Vendor CSS-->

<!-- BEGIN: Theme CSS-->
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">

<!-- BEGIN: Page CSS-->
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/horizontal-menu.css">
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/colors/palette-gradient.css">
<link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/app-user.css">
<!-- END: Page CSS-->

<!-- BEGIN: Custom CSS-->
<link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
<!-- END: Custom CSS-->
</head>


<body>
  

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
                                        <td> 
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
                            Note
                            </h6>
                           
                        </div>
                        <div class="card-body px-75">
                          <div class="col-12">
                              <?php
                                $note=$_GET["note"];
                                echo $note;
                              ?>
                         </div>
                        </div>
                        <div class="card-body px-75">
                          <div class="col-12">
                            <a href="user-dashboard.html" class="btn btn-primary mr-1"><i class="feather icon-edit-1"></i> Close</a>
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
  

</body>
</html>
