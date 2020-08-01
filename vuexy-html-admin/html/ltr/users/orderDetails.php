<?php 
    function console_log( $data ){
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
      }
?>

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
    <div class="content-wrapper" id="content">
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
                                                <td class="font-weight-bold">Name</td>
                                                <td>
                                                    <?php
                                                        $user_name=$_GET["user_name"];
                                                        echo $user_name;
                                                    ?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">UW ID</td>
                                                <td>
                                                    <?php
                                                        $user_uwid=$_GET["user_uwid"];
                                                        echo $user_uwid;
                                                    ?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Email</td>
                                                <td>
                                                    <?php
                                                        $user_email=$_GET["user_email"];
                                                        echo $user_email;
                                                    ?>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-12 col-md-12 col-lg-5">
                                        <table class="ml-0 ml-sm-0 ml-lg-0">
                                            <tr>
                                                <td class="font-weight-bold">Sub-unit</td>
                                                <td>
                                                    <?php
                                                        $user_subunitName=$_GET["user_subunitName"];
                                                        echo $user_subunitName;
                                                    ?>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Access Level</td>
                                                <td>
                                                    <?php
                                                        $user_subunitName=$_GET["user_AccessLevel"];
                                                        echo $user_subunitName;
                                                    ?>
                                                </td>
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
                                <div class="card-title mb-2">Request Information</div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Request Number </td>
                                        <td> 
                                            <?php
                                                $id=$_GET["id"];
                                                echo $id;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Request Type</td>
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
                                                $submit_date=$_GET["submit_date"];
                                                echo $submit_date;
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
                                            <?php
                                                $budget_length=$_GET["budget_length"];

                                                $budget1=$_GET["budget1"];
                                                $split1=$_GET["split1"];
                                                echo $budget1;
                                                echo ":";
                                                echo "&nbsp&nbsp";
                                                echo $split1;

                                                if($budget_length==2){
                                                    echo ";&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";
                                                    $budget2=$_GET["budget2"];
                                                    $split2=$_GET["split2"];
                                                    echo $budget2;
                                                    echo ":";
                                                    echo "&nbsp&nbsp";
                                                    echo $split2;
                                                }
                                                //echo $budget2;
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
                    <!-- information start -->
                    <!-- Travel Request1-->
                    <div class="col-md-6 col-12 " id="travelRequest1">
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
                    <!-- Travel1 end -->

                    <!-- Travel Reimbursement1-->
                    <div class="col-md-6 col-12 hidden" id="travelReimbursement1">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">
                                     <?php
                                            echo "Travel Reimbursement Information";
                                    ?>
                                </div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Have you been reimbursed before this trip?</td>
                                        <td>
                                            <?php
                                                $TravelBefore= $_GET["TravelBefore"];
                                                echo $TravelBefore;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Reference Number</td>
                                        <td>
                                            <?php
                                                $referenceNumber = $_GET["ReferenceNumber"];
                                                echo $referenceNumber;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">I am requesting travel reimbursement for myself</td>
                                        <td>
                                            <?php
                                                $forMyself = $_GET["ForMyself"];
                                                echo $forMyself
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Someone's Name</td>
                                        <td>
                                            <?php
                                                $someoneName = $_GET["SomeoneName"];
                                                echo $someoneName;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Someone's Affliation</td>
                                        <td>
                                            <?php
                                                $someoneAffliation = $_GET["SomeoneAffliation"];
                                                echo $someoneAffliation;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Someone's Email</td>
                                        <td>
                                            <?php
                                                $someoneEmail= $_GET["SomeoneEmail"];
                                                echo $someoneEmail;
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
                    <!-- Travel1 end -->

                    <!-- travelRequest3 -->
                    <div class="col-md-6 col-12 " id="travelRequest3">
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
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>
                                    </tr>
                                   
                                   
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- itravelRequest3 -->
                    
                    <!-- travel Reimbursement 3-->
                    <div class="col-md-6 col-12 " id="travelReimbursement3">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">Travel Information</div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">US Citizen or Permanent Resident?</td>
                                            <td>
                                                <?php
                                                  $US= $_GET["US"];
                                                  echo $US;
                                                ?>
                                            </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Copy of Passport Identity Page</td>
                                        <td> 
                                            <?php 
                                                  if($_GET["passport_file"]!="undefined" ){
                                                    echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                    echo $_GET["id"];
                                                    echo "/";
                                                    echo $_GET["passport_file"];
                                                    echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>";   
                                                  }                         
                                            ?>
                                             
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">I-94 or US Port Entry Stamp,Visa Info,etc</td>
                                        <td>
                                            <?php 
                                                 if($_GET["visa_file"]!="undefined" ){
                                                    echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                    echo $_GET["id"];
                                                    echo "/";
                                                    echo $_GET["visa_file"];
                                                    echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>";  
                                                 }
                                            ?>                                    
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Purpose of Travel</td>
                                        <td>
                                            <?php   
                                               $purpose= $_GET["purpose"];
                                               echo $purpose;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Was personal travel included?</td>
                                        <td>
                                            <?php
                                                 $personalTravel= $_GET["personalTravel"];
                                                 echo $personalTravel;
                                            ?>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Personal Travel Starting/End Dates & Times:</td>
                                        <td>    
                                            <?php
                                                $personalTravelDetails= $_GET["personalTravelDetails"];
                                                echo $personalTravelDetails;
                                            ?>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>

                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>

                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>
                                    </tr>
                                   
                                   
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- travelRequest4-->
                    <div class="col-md-6 col-12 " id="travelRequest4">
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
                                        <td class="font-weight-bold">Check in Date</td>
                                        <td>
                                            <?php
                                                $hotel_checkin= $_GET["hotel_movein"];
                                                echo $hotel_checkin;
                                            ?>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Check out Date</td>
                                        <td>
                                            <?php
                                                $hotel_checkout= $_GET["hotel_moveout"];
                                                echo $hotel_checkout;
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
                                    

                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- travelRequest4 end -->

                     <!-- travel Reimbursement 4 -->
                     <div class="col-md-6 col-12 " id="travelReimbursement4">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">Travel Costs</div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Registration</td>
                                            <td>
                                                <?php
                                                  $registration = $_GET["registration"];
                                                  echo "$";
                                                  echo $registration;
                                                ?>
                                            </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Registration Receipt</td>
                                        <td>
                                            <?php 
                                                if($_GET["registration_file"]!="undefined" ){
                                                    echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                    echo $_GET["id"];
                                                    echo "/";
                                                    echo $_GET["registration_file"];
                                                    echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>";  
                                                }
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Airfare Fee</td>
                                        <td> 
                                            <?php
                                                 $airfare= $_GET["airfare"];
                                                 echo "$";
                                                 echo $airfare;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Airfare Receipt</td>
                                        <td>
                                            <?php 
                                                 if($_GET["airfare_file"]!="undefined" ){
                                                    echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                    echo $_GET["id"];
                                                    echo "/";
                                                    echo $_GET["airfare_file"];
                                                    echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>";  
                                                 }
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Car Service Fee</td>
                                        <td>
                                            <?php   
                                                $car= $_GET["car"];
                                                echo "$";
                                                echo $car;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Car Service Receipt</td>
                                        <td>
                                            <?php 
                                                  if($_GET["car_file"]!="undefined" ){
                                                    echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                    echo $_GET["id"];
                                                    echo "/";
                                                    echo $_GET["car_file"];
                                                    echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>"; 
                                                  } 
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Train/Rail Fee</td>
                                        <td>
                                            <?php
                                                  $train= $_GET["train"];
                                                  echo "$";
                                                  echo $train;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Train/Rail itinerary and receipt of payment</td>
                                        <td>    
                                             <?php 
                                                if($_GET["train_file"]!="undefined" ){
                                                    echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                    echo $_GET["id"];
                                                    echo "/";
                                                    echo $_GET["train_file"];
                                                    echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>";    
                                                } 
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Car Rental</td>
                                        <td>    
                                            <?php
                                                $carRental= $_GET["carRental"];
                                                echo "$";
                                                echo $carRental;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Final Car Rental Agreement</td>
                                        <td>    
                                            <?php 
                                                  if($_GET["rental_file"]!="undefined" ){
                                                    echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                    echo $_GET["id"];
                                                    echo "/";
                                                    echo $_GET["rental_file"];
                                                    echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>";  
                                                  }
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Hotel Fee</td>
                                        <td>    
                                            <?php
                                                 $hotelFee= $_GET["hotelFee"];
                                                 echo "$";
                                                 echo $hotelFee;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">Hotel Receipt</td>
                                    
                                        <td>    
                                            <?php 
                                              if($_GET["hotel_file"]!="undefined" ){
                                                echo "<a href=\"https://coe-api.azurewebsites.net/api/downloadAttachment/";
                                                echo $_GET["id"];
                                                echo "/";
                                                echo $_GET["hotel_file"];
                                                echo "\" style=\"cursor:pointer;color:blue;text-decoration:underline;\">Download</a>";  
                                              }
                                            ?>
                                        </td>
                                    </tr>

                                </table>
                            </div>
                        </div>
                    </div>

                     <!-- travelRequest2start -->
                     <div class="col-12" id="travelRequest2">
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
                    <!-- travelRequest2 end -->

                     <!-- travel Reimbursement 5-->
                     <div class="col-md-6 col-12 " id="travelReimbursement5">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">Meal Per Diem</div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Are you claiming meal per diem?</td>
                                            <td>
                                                <?php
                                                  $meal= $_GET["meal"];
                                                  if(strcmp($meal, "meal1")==0){
                                                    echo "Yes, maximum allowable perdiem";
                                                  }else if(strcmp($meal, "meal2")==0){
                                                    echo "Yes, specifc days and meals";
                                                  }else if(strcmp($meal, "meal3")==0){
                                                    echo "Yes, specific amount";
                                                  }else if(strcmp($meal, "meal4")==0){
                                                    echo "No";
                                                  }
                                                ?>
                                            </td>
                                    </tr>
                                    <tr>
                                        <td class="font-weight-bold">Specific Amount</td>
                                        <td> 
                                            <?php
                                                 $meal_amount= $_GET["meal_amount"];
                                                 echo "$";
                                                 echo $meal_amount;
                                            ?>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>

                                    </tr>
                                    
                                    <tr>
                                        <td class="font-weight-bold">Specifc Days and Meals</td>
                                        <td> 
                                            <table id="meal_table1">
                                                <thead>
                                                    <tr>
                                                        <th>DATE</th>
                                                        <th>Breakfast</th>
                                                        <th>Lunch</th>
                                                        <th>Dinner</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   <tr>
                                                        <td><span></span></td>
                                                        <td><span></span></td>
                                                        <td><span></span> </td>
                                                        <td><span></span></td>
                                                    </tr>                                             
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- travel Reimbursement 6-->
                    <div class="col-md-6 col-12 " id="travelReimbursement6">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title mb-2">Meal Provided</div>
                            </div>
                            <div class="card-body">
                                <table>
                                    <tr>
                                        <td class="font-weight-bold">Were meals provided to you?</td>
                                            <td>
                                                <?php
                                                  $mealProvided= $_GET["mealProvided"];
                                                  echo $mealProvided;
                                                ?>
                                            </td>
                                    </tr>

                                    <tr>
                                        <td class="font-weight-bold">&nbsp</td>

                                    </tr>
                                    
                                    <tr>
                                        <td class="font-weight-bold">Specifc Days and Meals</td>
                                        <td> 
                                            <table id="meal_table2">
                                                <thead>
                                                    <tr>
                                                        <th>DATE</th>
                                                        <th>Breakfast</th>
                                                        <th>Lunch</th>
                                                        <th>Dinner</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   <tr>
                                                        <td><span></span></td>
                                                        <td><span></span></td>
                                                        <td><span></span> </td>
                                                        <td><span></span></td>
                                                    </tr>                                             
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <section class="col-12" id="timeline-card">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Request History</h4>
                                    <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                                    <div class="heading-elements">
                                        <ul class="list-inline mb-0">
                                            <li><a data-action="collapse"><i class="feather icon-chevron-down"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <div class="card-body">
                                        <ul class="activity-timeline timeline-left list-unstyled">
                                            <li>
                                                <div class="timeline-icon bg-primary">
                                                    <i class="feather icon-plus font-medium-2"></i>
                                                </div>
                                                <div class="timeline-info">
                                                    <p class="font-weight-bold">Request Form Submitted</p>
                                                    <span></span>
                                                </div>
                                                <small class="">Good job!</small>
                                            </li>
                                            <li>
                                                <div class="timeline-icon bg-warning">
                                                    <i class="feather icon-check font-medium-2"></i>
                                                </div>
                                                <div class="timeline-info">
                                                    <p class="font-weight-bold">Awaiting Approver's Approval</p>
                                                </div>
                                                <small class="">By approver Linda Bushnell</small>
                                            </li>
                                            <li>
                                                <div class="timeline-icon bg-warning">
                                                    <i class="feather icon-alert-circle font-medium-2"></i>
                                                </div>
                                                <div class="timeline-info">
                                                    <p class="font-weight-bold">Awaiting for Fiscal Staff's Approval</p>
                                                </div>
                                                <small class="">a few seconds ago</small>
                                            </li>
                                            <li>
                                                <div class="timeline-icon bg-warning">
                                                    <i class="feather icon-alert-circle font-medium-2"></i>
                                                </div>
                                                <div class="timeline-info">
                                                    <p class="font-weight-bold">Done!</p>
                                                </div>
                                                <small class="">a few seconds ago</small>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>


                   <!-- permissions start -->
                   <div class="col-12">
                    <div class="card">
                        <div class="card-header border-bottom mx-2 px-0">
                            <h6 class="border-bottom py-1 mb-0 font-medium-2"><i class="feather icon-award mr-50 "></i>
                            Note History
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
                            <?php
                                if($status=="Updated"){
                                    echo "<a href=\"edit_order.php?id=";
                                    echo $id; 
                                    echo "\"class=\"btn btn-primary mr-1\"><i class=\"feather icon-edit-1\"></i> Edit My Request</a>";
                                }
                            ?>
                             <button class="btn btn-primary mr-1" onclick="window.print()"><i class="feather icon-download-cloud"></i> Save as PDF</button>
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

 <!-- BEGIN: Vendor JS-->
 <script src="../../../app-assets/vendors/js/vendors.min.js"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Theme JS-->
    <script src="../../../app-assets/js/core/app-menu.js"></script>
    <script src="../../../app-assets/js/core/app.js"></script>
    <script src="../../../app-assets/js/scripts/components.js"></script>
    <!-- END: Theme JS-->

    <!-- BEGIN: Page JS-->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"></script>

<script>   
    const baseURL = "https://coe-api.azurewebsites.net/api/";
    var user_id = "5e8e4bcaa148b90044206526";   
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
    var js_id = "<?php echo $_GET["id"]; ?>";
    var i;
    var file_name;
    function getFiles(index){
            var onSuccess = function(data)
            {
                //console.log(data.data);
                if(index==0){
                    file_name="<?php echo $_GET["passport_file"]; ?>";
                    for(i=0;i<data.data.length;i++){
                        if( data.data[i].localeCompare(file_name)==0){
                            window.location.href = "https://coe-api.azurewebsites.net/api/downloadAttachment/"+js_id+"/"+file_name;
                        }
                    }
                }
                else if(index==1){
                    file_name="<?php echo $_GET["visa_file"]; ?>";
                    for(i=0;i<data.data.length;i++){
                        if( data.data[i].localeCompare(file_name)==0){
                            window.location.href = "https://coe-api.azurewebsites.net/api/downloadAttachment/"+js_id+"/"+file_name;
                        }
                    }
                }
                else if(index==2){
                    file_name="<?php echo $_GET["airfare_file"]; ?>";
                    for(i=0;i<data.data.length;i++){
                        if( data.data[i].localeCompare(file_name)==0){
                            window.location.href = "https://coe-api.azurewebsites.net/api/downloadAttachment/"+js_id+"/"+file_name;
                        }
                    }
                }
                else if(index==3){
                    file_name="<?php echo $_GET["train_file"]; ?>";
                    for(i=0;i<data.data.length;i++){
                        if( data.data[i].localeCompare(file_name)==0){
                            window.location.href = "https://coe-api.azurewebsites.net/api/downloadAttachment/"+js_id+"/"+file_name;
                        }
                    }
                }
                else if(index==4){
                    file_name="<?php echo $_GET["rental_file"]; ?>";
                    for(i=0;i<data.data.length;i++){
                        if( data.data[i].localeCompare(file_name)==0){
                            window.location.href = "https://coe-api.azurewebsites.net/api/downloadAttachment/"+js_id+"/"+file_name;
                        }
                    }
                }
                else if(index==5){
                    file_name="<?php echo $_GET["hotel_file"]; ?>";
                    for(i=0;i<data.data.length;i++){
                        if( data.data[i].localeCompare(file_name)==0){
                            window.location.href = "https://coe-api.azurewebsites.net/api/downloadAttachment/"+js_id+"/"+file_name;
                        }
                    }
                }
               
               // window.location.href = "https://coe-api.azurewebsites.net/api/downloadAttachment/"+js_id+"/"+file_name;
            }
            var onFaliure = function(){
                alert("fail");
            }
            makeGetRequest("getfilesAttached/"+js_id,onSuccess,onFaliure);
    }

    window.onload = function() {
        var order_type = "<?php echo $_GET["type"] ?>";
        //alert(order_type.localeCompare("Travel Reimbursement"));
        if(order_type.localeCompare("Travel Request")==0){
            document.getElementById("travelRequest1").className = "col-md-6 col-12 visible";
            document.getElementById("travelRequest2").className = "col-md-6 col-12 visible";
            document.getElementById("travelRequest3").className = "col-md-6 col-12 visible";
            document.getElementById("travelRequest4").className = "col-md-6 col-12 visible";
            document.getElementById("travelReimbursement1").className = "col-md-6 col-12 hidden";
            document.getElementById("travelReimbursement3").className = "col-md-6 col-12 hidden";
            document.getElementById("travelReimbursement4").className = "col-md-6 col-12 hidden";
            document.getElementById("travelReimbursement5").className = "col-md-6 col-12 hidden";
            document.getElementById("travelReimbursement6").className = "col-md-6 col-12 hidden";
        }else if(order_type.localeCompare("Travel Reimbursement")==0){
            document.getElementById("travelRequest1").className = "col-md-6 col-12 hidden";
            document.getElementById("travelRequest2").className = "col-md-6 col-12 hidden";
            document.getElementById("travelRequest3").className = "col-md-6 col-12 hidden";
            document.getElementById("travelRequest4").className = "col-md-6 col-12 hidden";
            document.getElementById("travelReimbursement1").className = "col-md-6 col-12 visible";
            document.getElementById("travelReimbursement3").className = "col-md-6 col-12 visible";
            document.getElementById("travelReimbursement4").className = "col-md-6 col-12 visible";
            document.getElementById("travelReimbursement5").className = "col-md-6 col-12 visible";
            document.getElementById("travelReimbursement6").className = "col-md-6 col-12 visible";

        }
        
        var onSuccess = function(data){
            //alert("find order");
            //console.log(data.data.OrderInfo);
            var col1=1;
            var orderinfo = JSON.parse(data.data.OrderInfo);
            var table = document.getElementById("meal_table1");

            var i;
            var col=2;
            for(i=0;i<orderinfo.Meal_table1.length;i++){
                var row = table.insertRow(col+i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);//space
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML=orderinfo.Meal_table1[i].Date;
                if(orderinfo.Meal_table1[i].Breakfast==true){
                    cell2.innerHTML="*";
                }
                if(orderinfo.Meal_table1[i].Lunch==true){
                    cell3.innerHTML="*";
                }
                if(orderinfo.Meal_table1[i].Dinner==true){
                    cell4.innerHTML="*";
                }
            }

            var col2=2;
            var table2 = document.getElementById("meal_table2");
            for(i=0;i<orderinfo.Meal_table2.length;i++){
                var row = table2.insertRow(col+i);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);//space
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML=orderinfo.Meal_table2[i].Date;
                if(orderinfo.Meal_table2[i].Breakfast==true){
                    cell2.innerHTML="*";
                }
                if(orderinfo.Meal_table2[i].Lunch==true){
                    cell3.innerHTML="*";
                }
                if(orderinfo.Meal_table2[i].Dinner==true){
                    cell4.innerHTML="*";
                }
            }

            
        }
        var onFaliure = function(){
                alert("fail");
        }
        makeGetRequest("getOrderInformation/"+js_id,onSuccess,onFaliure);
    }

    function downloadPDF(){

        let doc = new jsPDF('p','pt','a4');

        doc.addHTML(document.body,function() {
            var name = js_id + ".pdf";
            doc.save(name);
        });
      
    }
</script>
</html>
