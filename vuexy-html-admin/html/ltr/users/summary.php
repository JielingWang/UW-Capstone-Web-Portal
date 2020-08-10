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
    <title>Travel Request</title>
    <link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/pickers/pickadate/pickadate.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/animate/animate.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/extensions/sweetalert2.min.css">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
	<link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
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

<body class="vertical-layout vertical-menu-modern 2-columns  navbar-floating footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">

    <!-- BEGIN: Header-->
    <nav class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow" >
        <div class="navbar-wrapper" >
            <div class="navbar-container content" ,>
                <div class="navbar-collapse" id="navbar-mobile">
                    <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                      <ul class="nav navbar-nav">
                            <li class="nav-item mobile-menu d-xl-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ficon feather icon-menu"></i></a></li>
                        </ul>

                    </div>

                    <ul class="nav navbar-nav float-right">

                        <li class="nav-item d-none d-lg-block"><a class="nav-link nav-link-expand"><i class="ficon feather icon-maximize"></i></a></li>
                        <li class="nav-item nav-search"><a class="nav-link nav-link-search"><i class="ficon feather icon-search"></i></a>
                            <div class="search-input">
                                <div class="search-input-icon"><i class="feather icon-search primary"></i></div>
                                <input class="input" type="text" placeholder="Search..." tabindex="-1" data-search="template-list">
                                <div class="search-input-close"><i class="feather icon-x"></i></div>
                                <ul class="search-list search-list-main"></ul>
                            </div>
                        </li>

                        <li class="dropdown dropdown-notification nav-item"><a class="nav-link nav-link-label" href="#" data-toggle="dropdown"><i class="ficon feather icon-bell"></i><span class="badge badge-pill badge-primary badge-up">5</span></a>
                            <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                <li class="dropdown-menu-header">
                                    <div class="dropdown-header m-0 p-2">
                                        <h3 class="white">5 New</h3><span class="notification-title">App Notifications</span>
                                    </div>
                                </li>
                                <li class="scrollable-container media-list"><a class="d-flex justify-content-between" href="javascript:void(0)">
                                        <div class="media d-flex align-items-start">
                                            <div class="media-left"><i class="feather icon-plus-square font-medium-5 primary"></i></div>
                                            <div class="media-body">
                                                <h6 class="primary media-heading">You have new order!</h6><small class="notification-text"> Amazon Web Services - Standard Order</small>
                                            </div><small>
                                                <time class="media-meta" datetime="2015-06-11T18:29:20+08:00">9 hours ago</time></small>
                                        </div>
                                    </a><a class="d-flex justify-content-between" href="javascript:void(0)">
                                        <div class="media d-flex align-items-start">
                                            <div class="media-left"><i class="feather icon-download-cloud font-medium-5 success"></i></div>
                                            <div class="media-body">
                                                <h6 class="success media-heading red darken-1">Reimbursement accepted!</h6><small class="notification-text">Your reimbursement request has been accepted by the department</small>
                                            </div><small>
                                                <time class="media-meta" datetime="2015-06-11T18:29:20+08:00">5 hour ago</time></small>
                                        </div>
                                    </a><a class="d-flex justify-content-between" href="javascript:void(0)">
                                        <div class="media d-flex align-items-start">
                                            <div class="media-left"><i class="feather icon-alert-triangle font-medium-5 danger"></i></div>
                                            <div class="media-body">
                                                <h6 class="danger media-heading yellow darken-3">Budget Report due today</h6><small class="notification-text">CEE budget report due today at 2pm</small>
                                            </div><small>
                                                <time class="media-meta" datetime="2015-06-11T18:29:20+08:00">Today</time></small>
                                        </div>
                                    </a><a class="d-flex justify-content-between" href="javascript:void(0)">
                                        <div class="media d-flex align-items-start">
                                            <div class="media-left"><i class="feather icon-check-circle font-medium-5 info"></i></div>
                                            <div class="media-body">
                                                <h6 class="info media-heading">Task completed</h6><small class="notification-text">2019 budget report exported to you local storage</small>
                                            </div><small>
                                                <time class="media-meta" datetime="2015-06-11T18:29:20+08:00">Last week</time></small>
                                        </div>
                                    </a><a class="d-flex justify-content-between" href="javascript:void(0)">
                                        <div class="media d-flex align-items-start">
                                            <div class="media-left"><i class="feather icon-file font-medium-5 warning"></i></div>
                                            <div class="media-body">
                                                <h6 class="warning media-heading">Monthly report generated</h6><small class="notification-text">Your monthly report has been successfuly generated</small>
                                            </div><small>
                                                <time class="media-meta" datetime="2015-06-11T18:29:20+08:00">Last month</time></small>
                                        </div>
                                    </a></li>
                                <li class="dropdown-menu-footer"><a class="dropdown-item p-1 text-center" href="javascript:void(0)">View all notifications</a></li>
                            </ul>
                        </li>
                        <li class="dropdown dropdown-user nav-item"><a class="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                                <div class="user-nav d-sm-flex d-none"><span class="user-name text-bold-600">Ted Hanson</span><span class="user-status">CEE Administrator</span></div><span><img class="round" src="../../../app-assets/images/portrait/small/avatar-s-9.jpg" alt="avatar" height="40" width="40"></span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="page-user-profile.html"><i class="feather icon-user"></i> Edit Profile</a><a class="dropdown-item" href="app-email.html"><i class="feather icon-mail"></i> My Inbox</a><a class="dropdown-item" href="app-todo.html"><i class="feather icon-check-square"></i> Task</a>
                                <div class="dropdown-divider"></div><a class="dropdown-item" href="auth-login.html"><i class="feather icon-power"></i> Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>


    <!-- END: Header-->


    <!-- BEGIN: Main Menu-->
    <div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item mr-auto"><a class="navbar-brand" href="user-dashboard.html">
                        <div class="brand-logo"></div>
                        <h2 class="brand-text mb-0">AWFT</h2>
                    </a></li>
                <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"><i class="feather icon-x d-block d-xl-none font-medium-4 primary toggle-icon"></i><i class="toggle-icon feather icon-disc font-medium-4 d-none d-xl-block collapse-toggle-icon primary" data-ticon="icon-disc"></i></a></li>
            </ul>
        </div>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
			    <li><a href="user-dashboard.html"><i class="feather icon-home"></i><span class="menu-item" data-i18n="Dashboard">Dashboard</span></a></li>
				
				<li class=" navigation-header"><span>General User</span></li>
				<li class=" nav-item"><a href="#"><i class="feather icon-file-plus"></i><span class="menu-title" data-i18n="User">Create Request</span></a>
                    <ul class="menu-content" style="margin-left:10px;">
                        <li><a href="user-reimbursement-3.html"><i class="feather icon-circle"></i><span class="menu-item" data-i18n="List">Reimbursement</span></a>
                        </li>
                        <li><a href="travelReimbursement.html"><i class="feather icon-circle"></i><span class="menu-item" data-i18n="View">Travel Reimbursement</span></a>
                        </li>
                        <li><a href="user-purchase.html"><i class="feather icon-circle"></i><span class="menu-item" data-i18n="Edit">Purchase Request</span></a>
                        </li>
						<li><a href="user-invoice.html"><i class="feather icon-circle"></i><span class="menu-item" data-i18n="Edit">Pay an Invoice</span></a>
                        </li>
						<li><a href="procardReceipt.html"><i class="feather icon-circle"></i><span class="menu-item" data-i18n="Edit">Procard Receipt</span></a>
                        </li>
                        <li><a href="travelRequest.html"><i class="feather icon-circle"></i><span class="menu-item" data-i18n="Edit">Travel Request</span></a>
                        </li>

                    </ul>
                </li>
                
				<li class="nav-item"><a href="orderHistory-new.html"><i class="feather icon-refresh-ccw"></i><span class="menu-title" data-i18n="PendingOrders">My Requests</span></a></li>
                
				<li class=" navigation-header"><span>Settings</span></li>
				<li class=" nav-item"><a href=""><i class="feather icon-user"></i><span class="menu-title" data-i18n="UserSettings">User Settings</span></a></li>
				<li class=" nav-item"><a href=""><i class="feather icon-bell"></i><span class="menu-title" data-i18n="Notifications">Notifications</span></a></li>
				<li class=" nav-item"><a href=""><i class="feather icon-power"></i><span class="menu-title" data-i18n="Logout">Logout</span></a></li>
				
				
				<li class=" navigation-header"><span>Help</span></li>
				<li class=" nav-item"><a href=""><i class="feather icon-file-text"></i><span class="menu-title" data-i18n="Manual">Davinci Manual</span></a></li>
				<li class=" nav-item"><a href=""><i class="feather icon-mail"></i><span class="menu-title" data-i18n="MailingList">Mailing List</span></a></li>
				<li class=" nav-item"><a href=""><i class="feather icon-book"></i><span class="menu-title" data-i18n="ReimbursmentInstructions">Instructions</span></a></li>
				<li class=" nav-item"><a href=""><i class="feather icon-credit-card"></i><span class="menu-title" data-i18n="PurchasingQuestions">Purchasing Questions</span></a></li>
				<li class=" nav-item"><a href=""><i class="feather icon-tv"></i><span class="menu-title" data-i18n="TechnicalQuestions">Technical Questions</span></a></li>
            </ul>
        </div>
    </div>
    <!-- END: Main Menu-->

    <!-- BEGIN: Content-->
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2 class="content-header-title float-left mb-0">Invoice</h2>
                        </div>
                    </div>
                </div>
                <div class="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
                    <div class="form-group breadcrum-right">
                        <div class="dropdown">
                            <button class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="feather icon-settings"></i></button>
                            <div class="dropdown-menu dropdown-menu-right"><a class="dropdown-item" href="#">Chat</a><a class="dropdown-item" href="#">Email</a><a class="dropdown-item" href="#">Calendar</a></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-body">
                <!-- invoice functionality start -->
                <section class="invoice-print mb-1">
                    <div class="row">

                        <fieldset class="col-12 col-md-5 mb-1 mb-md-0">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Email" aria-describedby="button-addon2">
                                <div class="input-group-append" id="button-addon2">
                                    <button class="btn btn-outline-primary" type="button">Send Invoice</button>
                                </div>
                            </div>
                        </fieldset>
                        <div class="col-12 col-md-7 d-flex flex-column flex-md-row justify-content-end">
                            <button class="btn btn-primary btn-print mb-1 mb-md-0"> <i class="feather icon-file-text"></i> Print</button>
                            <button class="btn btn-outline-primary  ml-0 ml-md-1"> <i class="feather icon-download"></i> Download</button>
                        </div>
                    </div>
                </section>
                <!-- invoice functionality end -->
                <!-- invoice page -->
                <section id="travelRequest" class="card invoice-page">
                    <div id="invoice-template" class="card-body">
                        <!-- Invoice Company Details -->
                        <div id="invoice-company-details" class="row">
                            <div class="col-sm-6 col-12 text-left">
                                <h1 id="request-type">
                                   
                                </h1>
                            </div>
                            <div class="col-sm-6 col-12 text-right">
                                <h1>Request ID: <span id="requestID">
                                </span></h1>
                            </div>
                        </div>
                        <div id="invoice-company-details" class="row">
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h6 class="mt-2">REQUESTER</h6>
                                    <p id="requester">
                                       
                                    </p>
                                    <h6 class="mt-2">SUB-UNIT</h6>
                                    <p id="subunit">
                                       
                                    </p>
                                    <h6 class="mt-2">Email</h6>
                                    <p id="userEmail">
                                        
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h6 class="mt-2">UW ID</h6>
                                    <p id="userUWID">
      
                                    </p>
                                    <h6 class="mt-2">Access Level</h6>
                                    <p id="accessLevel">
                                        
                                    </p>
                                </div>
                            </div>

                            <div class="col-sm-6 col-12 text-right">
                                <div class="invoice-details mt-2">
                                    <h6 class="mt-2">STATUS</h6>
                                    <p id="status">
                                    </p>
                                    <h6 class="mt-2">ASSIGNED TO</h6>
                                    <p id="assignedTo"></p>
                                </div>
                            </div>
                            <!-- Request Information -->
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4>Request Information</h4>
                                    <h6 class="mt-2">Submitted Date</h6>
                                    <p id="submitDate">
                                       
                                    </p>
                                </div>
                            </div>
                            

                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Amount</h6>
                                    <p>
                                      N/A  
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Budget</h6>
                                    <p id="budget">
                                        
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4>&nbsp;</h4>
                                   
                                </div>
                            </div>
                            <!-- Request Information End-->

                            <!-- reason -->
                             <div class="col-sm-12 col-6" text-left>
                                <div class="invoice-details mt-2">
                                    <h4>Request Reason</h4>
                                    <p id="reason">
                                       
                                    </p>
                                </div>
                            </div>                            
                            <!-- Request Information End-->

                            <!-- Travel Information-->
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4>Travel Information</h4>
                                    <h6 class="mt-2">FirstName</h6>
                                    <p id="firstName">
                                       
                                    </p>
                                    <h6 class="mt-2">Departing Date</h6>
                                    <p id="departDate">
                                       
                                    </p>

                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">LastName</h6>
                                    <p id="lastName">
                                       
                                    </p>
                                    <h6 class="mt-2">Returning Date</h6>
                                    <p id="returnDate">
                                        
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Departure</h6>
                                    <p id="departure">
                                       
                                    </p>
                                    <h6 class="mt-2">Birthday</h6>
                                    <p id="birthday">
                                       
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Destination</h6>
                                    <p id="destination">
                                       
                                    </p>
                                </div>
                            </div>
                            <!-- Travel Information End-->

                            <!-- Flight Information-->
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4>Flight Information</h4>
                                    <h6 class="mt-2">Need unit to pay the flight?</h6>
                                    <p id="flight">
                                       
                                    </p>
                                    <h6 class="mt-2">Flight From</h6>
                                    <p id="flightFrom">
                                      
                                    </p>
                                    <h6 class="mt-2">Flight Reference</h6>
                                    <p id="flightReference">
                                       
                                    </p>

                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Airline</h6>
                                    <p id="airline">
                                       
                                    </p>
                                    <h6 class="mt-2">Flight To</h6>
                                    <p id="flightTo">
                                       
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Flight Number</h6>
                                    <p id="flightNumber">
                                       
                                    </p>
                                    <h6 class="mt-2">Departing Date</h6>
                                    <p id="flightDepartDate">
                                       
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Amount</h6>
                                    <p id="flightAmount">
                                       
                                    </p>
                                    <h6 class="mt-2">Returning Date</h6>
                                    <p id="flightReturnDate">
                                        
                                    </p>
                                </div>
                            </div>
                            <!-- Flight Information End-->
                             <!-- Hotel Information-->
                             <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4>Hotel Information</h4>
                                    <h6 class="mt-2">Need unit to pay the hotel?</h6>
                                    <p id="hotel">
                                      
                                    </p>
                                    <h6 class="mt-2">Number of People</h6>
                                    <p id="hotelNum">
                                       
                                    </p>
                                    <h6 class="mt-2">Link</h6>
                                    <p id="hotelLink">
                                      
                                    </p>

                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Hotel Name</h6>
                                    <p id="hotelName">
                                       
                                    </p>
                                    <h6 class="mt-2">Check in Date</h6>
                                    <p id="hotelCheckIn">
                                       
                                    </p>
                                    <h6 class="mt-2">Hotel Note</h6>
                                    <p id="hotelNote">
                                       
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Hotel Address</h6>
                                    <p id="hotelAddress">
                                        
                                    </p>
                                    <h6 class="mt-2">Check out Date</h6>
                                    <p id="hotelCheckout">
                                       
                                    </p>
                                </div>
                            </div>
                            <div class="col-sm-3 col-6 text-left">
                                <div class="invoice-details mt-2">
                                    <h4> &nbsp; </h4>
                                    <h6 class="mt-2">Zip Code</h6>
                                    <p id="hotelZip">
                                       
                                    </p>
                                    <h6 class="mt-2">Amount</h6>
                                    <p id="hotelAmount">
                                       
                                    </p>
                                </div>
                            </div>
                            <!-- Hotel Information End-->
                            
                        </div>
                        <!--/ Invoice Company Details -->

                    </div>
                </section>
                <!-- invoice page end -->

              <!-- Timeline Starts -->
              <section>
                    <div class="row">
                        <div class="col-6">
                            <div class="card" id="history_card">
                                <div class="card-header">
                                    <h4 class="card-title">Request History</h4>
                                </div>
                                <div class="card-content">
                                    <div class="card-body">
                                        <ul id="request-history" class="activity-timeline timeline-left list-unstyled">
                                           
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-6">
                            <div class="card" id="note_card">
                                <div class="card-header">
                                    <h4 class="card-title">Notes</h4>
                                </div>
                                <div class="card-content" id="notes" style="padding-top: 1.5rem; padding-left: 1.5rem;">
                                   
                                </div>
                                
                            </div>
                        </div>

                    </div>
                </section>
                <!-- Timeline Ends -->

                <!-- add note start-->
                <div class="row" id="feedback-block">
                    <div class="col-md-12">
                          <div class="card">
                                <div class="card-content">
                                    <div class="card-body">
                                        <h4 class="card-title">Note</h4>
                                        <form class="form">
                                            <div class="form-body">
                                                <div class="form-group">
                                                    <label for="feedback_input" class="sr-only">Notes</label>
                                                        <textarea id="feedback_input" rows="3" class="form-control" name="message" placeholder="Add a note"></textarea>
                                                </div>
                                            </div>
                                            <div class="form-actions">
                                                <button type="button" class="btn btn-primary mr-1" onclick="addNote()">Add a note</button>
                                              
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <!-- add note end-->
            </div>
        </div>
    </div>
    <!-- END: Content-->
    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <!-- BEGIN: Footer-->
    <footer class="footer footer-static footer-light">

    </footer>
    <!-- END: Footer-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>



    <!-- BEGIN: Vendor JS-->
    <script src="../../../app-assets/vendors/js/vendors.min.js"></script>
    <!-- BEGIN Vendor JS-->

    <!-- BEGIN: Page Vendor JS-->
    <script src="../../../app-assets/vendors/js/pickers/pickadate/picker.js"></script>
    <script src="../../../app-assets/vendors/js/pickers/pickadate/picker.date.js"></script>
    <script src="../../../app-assets/vendors/js/pickers/pickadate/picker.time.js"></script>
    <script src="../../../app-assets/vendors/js/pickers/pickadate/legacy.js"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Page JS-->
    <script src="../../../app-assets/js/scripts/pickers/dateTime/pick-a-datetime.js"></script>
    <!-- END: Page JS-->

    <!-- BEGIN: Page Vendor JS-->
    <script src="../../../app-assets/vendors/js/extensions/sweetalert2.all.min.js"></script>
    <script src="../../../app-assets/vendors/js/extensions/polyfill.min.js"></script>
    <script src="../../../app-assets/vendors/js/forms/validation/jqBootstrapValidation.js"></script>
    <!-- END: Page Vendor JS-->

    <!-- BEGIN: Page JS-->
    <script src="../../../app-assets/js/scripts/extensions/sweet-alerts.js"></script>
    <!-- END: Page JS-->

    <!-- BEGIN: Theme JS-->
    <script src="../../../app-assets/js/core/app-menu.js"></script>
    <script src="../../../app-assets/js/core/app.js"></script>
    <script src="../../../app-assets/js/scripts/components.js"></script>
    <!-- END: Theme JS-->

    <!-- BEGIN: Page JS-->
    <script src="../../../app-assets/js/scripts/pages/dashboard-ecommerce.js"></script>
    <script src="../../../app-assets/js/scripts/forms/validation/form-validation.js"></script>
    <!--<script src="../../../app-assets/js/scripts/myScripts/users/travelRequest-summary.js"></script>-->
    <!-- END: Page JS-->

    <!-- BEGIN: Page JS-->
    

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
        var i;
        var file_name;
        var js_id=window.sessionStorage.getItem("orderId");
        window.onload = function(){
            document.getElementById('requestID').innerHTML = window.sessionStorage.getItem("orderId");
            document.getElementById('requester').innerHTML = window.sessionStorage.getItem("user_name");
            document.getElementById('subunit').innerHTML = window.sessionStorage.getItem("user_subunitName");
            document.getElementById('userEmail').innerHTML = window.sessionStorage.getItem("user_email");
            document.getElementById('userUWID').innerHTML = window.sessionStorage.getItem("user_uwid");
            document.getElementById('accessLevel').innerHTML = window.sessionStorage.getItem("user_AccessLevel");
            document.getElementById('status').innerHTML ="<i class=\"fa fa-circle font-small-3 text-warning mr-50\"></i>" + window.sessionStorage.getItem("status");
            document.getElementById('submitDate').innerHTML = window.sessionStorage.getItem("submit_date");
            if(window.sessionStorage.getItem("budget_length").localeCompare("1")==0){
                document.getElementById('budget').innerHTML = window.sessionStorage.getItem("budget1") +" "+window.sessionStorage.getItem("split1");
            }else{
                document.getElementById('budget').innerHTML = window.sessionStorage.getItem("budget1") +" "+window.sessionStorage.getItem("split1")
                                                     +"<br>"+window.sessionStorage.getItem("budget2") +" "+window.sessionStorage.getItem("split2");
            }
            document.getElementById('reason').innerHTML = window.sessionStorage.getItem("reason");
            document.getElementById('firstName').innerHTML = window.sessionStorage.getItem("firstname");
            document.getElementById('departDate').innerHTML = window.sessionStorage.getItem("date");
            document.getElementById('lastName').innerHTML = window.sessionStorage.getItem("lastname");
            document.getElementById('returnDate').innerHTML = window.sessionStorage.getItem("returndate");
            document.getElementById('departure').innerHTML = window.sessionStorage.getItem("departure");
            document.getElementById('birthday').innerHTML = window.sessionStorage.getItem("birthday")+"&nbsp;";
            document.getElementById('destination').innerHTML = window.sessionStorage.getItem("destionation");
            document.getElementById('flight').innerHTML = window.sessionStorage.getItem("flight")+"&nbsp;";
            document.getElementById('flightFrom').innerHTML = window.sessionStorage.getItem("flight_from")+"&nbsp;";
            document.getElementById('flightReference').innerHTML = window.sessionStorage.getItem("flight_reference")+"&nbsp;";
            document.getElementById('airline').innerHTML = window.sessionStorage.getItem("flight_company")+"&nbsp;";
            document.getElementById('flightTo').innerHTML = window.sessionStorage.getItem("flight_to")+"&nbsp;";
            document.getElementById('flightNumber').innerHTML = window.sessionStorage.getItem("flight_number")+"&nbsp;";
            document.getElementById('flightDepartDate').innerHTML = window.sessionStorage.getItem("flight_departdate")+"&nbsp;";
            document.getElementById('flightAmount').innerHTML = window.sessionStorage.getItem("flight_amount")+"&nbsp;";
            document.getElementById('flightReturnDate').innerHTML = window.sessionStorage.getItem("flight_returndate")+"&nbsp;";
            document.getElementById('hotel').innerHTML = window.sessionStorage.getItem("hotel")+"&nbsp;";
            document.getElementById('hotelNum').innerHTML = window.sessionStorage.getItem("hotel_num")+"&nbsp;";
            document.getElementById('hotelLink').innerHTML = window.sessionStorage.getItem("hotel_link")+"&nbsp;";
            document.getElementById('hotelName').innerHTML = window.sessionStorage.getItem("hotel_name")+"&nbsp;";
            document.getElementById('hotelCheckIn').innerHTML = window.sessionStorage.getItem("hotel_movein")+"&nbsp;";
            document.getElementById('hotelNote').innerHTML = window.sessionStorage.getItem("hotel_note")+"&nbsp;";
            document.getElementById('hotelAddress').innerHTML = window.sessionStorage.getItem("hotel_address")+"&nbsp;";
            document.getElementById('hotelCheckout').innerHTML = window.sessionStorage.getItem("hotel_moveout")+"&nbsp;";
            document.getElementById('hotelZip').innerHTML = window.sessionStorage.getItem("hotel_zip")+"&nbsp;";
            document.getElementById('hotelAmount').innerHTML = window.sessionStorage.getItem("hotel_amount")+"&nbsp;";
            document.getElementById('request-type').innerHTML = window.sessionStorage.getItem("type")+"&nbsp;";
        }
       

    function update_order(orderinfo){
        alert("Update!!!");
        //var note_approver = document.getElementById("approver_note").value;
        console.log(orderinfo);
        var JSON_data = {
            "OrderInfo": orderinfo
        }
        var onSuccess = function(data){
            alert("update success");
        }
        var onFaliure = function(){
            alert("fail");
        }
        makePostRequest("updateOrderInfo/"+js_id,JSON_data,onSuccess,onFaliure);
    }
    function addNote(){
        var onSuccess = function(data){
            var user_name = window.sessionStorage.getItem("user_name");
            var temp = JSON.parse(data.data.OrderInfo);   
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date+' '+time;
            temp.NoteFromApprover+="<br>";   
            temp.NoteFromApprover+= user_name;  
            temp.NoteFromApprover+= " ";   
            temp.NoteFromApprover+=dateTime;
            temp.NoteFromApprover+=" ";
            temp.NoteFromApprover+=document.getElementById("feedback_input").value;
            alert(temp.NoteFromApprover);
            update_order(JSON.stringify(temp));
        }
        var onFaliure = function(){
            alert("fail");
        }
        makeGetRequest("getOrderInformation/"+js_id,onSuccess,onFaliure);
    }

    </script>
</body>
<!-- END: Body-->
<!--<script src="travelRequest.js"></script>-->
<!-- END: Page JS-->
</html>
