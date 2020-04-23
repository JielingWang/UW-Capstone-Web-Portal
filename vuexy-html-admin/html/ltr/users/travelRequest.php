<?php

$id=$_GET["id"];

if($id=="submit"){
    echo 'Thank you! Your request has been submitted.';
}
else if($id=="flight"){
      echo "      <fieldset>
                    <h2>Flight Information</h2>
                    <div class=\"row\">
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"expense-icon\">Company</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"vendor-icon\" class=\"form-control\" name=\"fname-icon\" >
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-clipboard\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"expense-icon\">Flight Number</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" >
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-clipboard\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"business-icon\">Flying From</label>
                                <div class=\"position-relative has-icon-left\">
                                    <form>
                                        <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"City of airport\">
                                    </form>
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-disc\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"amount-icon\">Going to</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" >
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-disc\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"business-icon\">Departing</label>
                                <div class=\"position-relative has-icon-left\">
                                    <form>
                                        <input type=\"date\" />
                                    </form>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"amount-icon\">Returning</label>
                                <div class=\"position-relative has-icon-left\">
                                    <form>
                                        <input type=\"date\" />
                                    </form>
                               
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"business-icon\">Amount</label>
                                <div class=\"position-relative has-icon-left\">
                                    <div class=\"input-group-prepend\">
                                        <span class=\"input-group-text\">$</span>
                                        <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\">
                                    </div>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"amount-icon\">Link</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"\">
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-link\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                       
                        

                    </div>

                    <div class=\"row\">
                        <div class=\"col-sm-2\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <label class=\"mr-2\" >Was Sales Tax Paid</label>
                            </div>
                        </div> 


                        
                        <div class=\"col-sm-10\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <div class=\"c-inputs-stacked\">
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">Yes</span>
                                        </div>
                                    </div>
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">No</span>
                                        </div>
                                    </div>
                                    <div class=\"d-inline-block\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">Item Not Taxable</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>    
                    </div> 

                    <div class=\"row\">
                        <div class=\"col-sm-2\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <label class=\"mr-2\" >Will you pay by yourself?</label>
                            </div>
                        </div> 


                        
                        <div class=\"col-sm-10\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <div class=\"c-inputs-stacked\">
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">Yes</span>
                                        </div>
                                    </div>
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">No</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div> 

                    <div class=\"row\" style=\"padding-top: 20px; padding-bottom: 20px;\">
                        <div class=\"col-sm-12 text-center\">
                            <button type=\"button\" name=\"flight-save\" class=\"btn btn-outline-primary mr-1 mb-1 waves-effect waves-light\"><a href=\"travelRequest.html\">Save</a></button>
                        </div>

                    </div>   

                </fieldset>";
}

else if($id=="deleteFlight"){
    echo "      <div class=\"content-header row\">
    </div>
    <div class=\"content-body\">
        <!-- Dashboard Ecommerce Starts -->
        <section id=\"dashboard-ecommerce\">



        </section>

        <fieldset>
            <h2>Travel Information</h2>
            <div class=\"row\">
                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"expense-icon\">First Name</label>
                        <div class=\"position-relative has-icon-left\">
                        <input type=\"text\" id=\"vendor-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"\">
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-clipboard\"></i>
                        </div>
                      </div>
                      </div>
                </div>

                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"expense-icon\">Last Name</label>
                        <div class=\"position-relative has-icon-left\">
                        <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"\">
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-clipboard\"></i>
                        </div>
                      </div>
                      </div>
                </div>
                
                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"business-icon\">Departure</label>
                        <div class=\"position-relative has-icon-left\">
                            <form>
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"City of airport\">
                            </form>
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-disc\"></i>
                        </div>
                      </div>
                      </div>
                </div>
                
                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"amount-icon\">Destination</label>
                        <div class=\"position-relative has-icon-left\">
                        <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"\">
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-disc\"></i>
                        </div>
                      </div>
                      </div>
                </div>

                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"business-icon\">Departing Date</label>
                        <div class=\"position-relative has-icon-left\">
                            <form>
                                <input type='text' class=\"form-control pickadate\" />
                            </form>
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-arrow-up-right\"></i>
                        </div>
                      </div>
                      </div>
                </div>
                
                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"amount-icon\">Returning Date</label>
                        <div class=\"position-relative has-icon-left\">
                            <form>
                                <input type='text' class=\"form-control pickadate\" />
                            </form>
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-arrow-down-right\"></i>
                        </div>
                      </div>
                      </div>
                </div>

            </div>

            
            <!-- Reason -->
            <section class=\"basic-textarea\">
                <div class=\"row\">
                    <div class=\"col-12\">
                        <div class=\"card\">
                            <div class=\"card-header\">
                                <h4 class=\"card-title\">Reason</h4>
                            </div>
                               <div class=\"card-content\">
                               <div class=\"card-body\">
                                    <div class=\"row\">
                                        <div class=\"col-12\">
                                            <fieldset class=\"form-group\">
                                                <textarea class=\"form-control\" id=\"basicTextarea\" rows=\"3\" placeholder=\"Please explain why do you request this travel?\"></textarea>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class=\"row\">
                <div class=\"col-sm-2\">
                    <div class=\"form-group d-flex align-items-center pt-md-2\">
                        <label class=\"mr-2\" >Attach a File </label>
                        
                    </div>        
                </div>
                
                <div class=\"col-sm-10\">
                    <div class=\"form-group d-flex align-items-center pt-md-2\">
                        <div class=\"c-inputs-stacked\">
                            <div class=\"d-inline-block mr-2\">
                                <input type=\"file\">
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

            <div class=\"row\">
                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"subsub-icon\"></label>
                        <div class=\"position-relative has-icon-left\">
                        <input type=\"text\" id=\"subsub-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Requester ID\">
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-hash\"></i>
                        </div>
                      </div>
                      </div>
                </div>

                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"task-icon\"></label>
                        <div class=\"position-relative has-icon-left\">
                        <input type=\"text\" id=\"task-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Department\">
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-hash\"></i>
                        </div>
                      </div>
                      </div>
                </div>

            </div> 
            
           
            <div class=\"row\">
                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"subsub-icon\"></label>
                        <div class=\"position-relative has-icon-left\">
                        <input type=\"text\" id=\"subsub-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Phone Number\">
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-hash\"></i>
                        </div>
                      </div>
                      </div>
                </div>

                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"task-icon\"></label>
                        <div class=\"position-relative has-icon-left\">
                        <input type=\"text\" id=\"task-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Email\">
                        <div class=\"form-control-position\">
                            <i class=\"feather icon-edit\"></i>
                        </div>
                      </div>
                      </div>
                </div>

            </div> 

            <div class=\"row\">
                <div class=\"col-sm-6\">
                    <div class=\"form-group\">
                        <label for=\"subsub-icon\"></label>
                        <div class=\"position-relative has-icon-left\">
                            <button type=\"button\" onclick=\"flight()\" class=\"btn btn-primary mr-1 mb-1 waves-effect waves-light\">Add a Flight Request</button>
                            <button type=\"button\" class=\"btn btn-primary mr-1 mb-1 waves-effect waves-light\">Add a Hotel Request</button>
                        </div>
                    </div>
                </div>
            </div> 
            
            <div class=\"row\" style=\"padding-top: 20px; padding-bottom: 20px;\">
                <div class=\"col-sm-12 text-center\">
                    <button type=\"button\" onclick=\"submit()\" class=\"btn btn-outline-primary mr-1 mb-1 waves-effect waves-light\" id=\"submit\">Submit</button>
                </div>

            </div>   

        </fieldset>

        <!-- Dashboard Ecommerce ends -->

        <div class=\"row\" id=\"orderSummary\">
            <div class=\"col-12\">
                <table class=\"table zero-configuration\">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Type</th>
                            <th>Destination</th>
                            <th>Date</th>
                            <th></th>
                            <th></th>

                         </tr>
                
                        <tr>
                            <td>12345679</td>
                            <td>Hotel</td>
                            <td>New York</td>
                            <td>2020-1-6</td>
                            <td> <button onclick=\"editFlight()\">Edit</button></td>
                            <td> <button onclick=\"deleteFlight()\">Delete</button></td>
                            
                        </tr>

                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
        <!-- End of Flight Information -->

    </div>";
    

}

else if($id=="editFlight"){
    echo "      <fieldset>
                  <h2>Flight Information</h2>
                  <div class=\"row\">
                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"expense-icon\">Company</label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"vendor-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Delta\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-clipboard\"></i>
                              </div>
                            </div>
                            </div>
                      </div>

                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"expense-icon\">Flight Number</label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"A13456\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-clipboard\"></i>
                              </div>
                            </div>
                            </div>
                      </div>
                      
                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"business-icon\">Flying From</label>
                              <div class=\"position-relative has-icon-left\">
                                  <form>
                                      <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Seattle\">
                                  </form>
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-disc\"></i>
                              </div>
                            </div>
                            </div>
                      </div>
                      
                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"amount-icon\">Going to</label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Boston\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-disc\"></i>
                              </div>
                            </div>
                            </div>
                      </div>

                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"business-icon\">Departing</label>
                              <div class=\"position-relative has-icon-left\">
                                  <form>
                                      <input type=\"text\" class=\"form-control pickadate\" placeholder=\"January 2,2020\">
                                  </form>
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-arrow-up-right\"></i>
                              </div>
                            </div>
                            </div>
                      </div>
                      
                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"amount-icon\">Returning</label>
                              <div class=\"position-relative has-icon-left\">
                                  <form>
                                      <input type='text' class=\"form-control pickadate\" placeholder=\"January 20,2020\">
                                  </form>
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-arrow-down-right\"></i>
                              </div>
                            </div>
                            </div>
                      </div>

                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"business-icon\">Amount</label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"500$\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-bold\"></i>
                              </div>
                            </div>
                            </div>
                      </div>
                      
                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"amount-icon\">Link</label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"www.expedia.com\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-link\"></i>
                              </div>
                            </div>
                            </div>
                      </div>
                     
                      

                  </div>

                  <div class=\"row\">
                      <div class=\"col-sm-2\">
                          <div class=\"form-group d-flex align-items-center pt-md-2\">
                              <label class=\"mr-2\" >Was Sales Tax Paid</label>
                          </div>
                      </div> 


                      
                      <div class=\"col-sm-10\">
                          <div class=\"form-group d-flex align-items-center pt-md-2\">
                              <div class=\"c-inputs-stacked\">
                                  <div class=\"d-inline-block mr-2\">
                                      <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                          <input type=\"checkbox\" value=\"false\" checked>
                                          <span class=\"vs-checkbox\">
                                              <span class=\"vs-checkbox--check\">
                                                  <i class=\"vs-icon feather icon-check\"></i>
                                              </span>
                                          </span>
                                          <span class=\"\" >Yes</span>
                                      </div>
                                  </div>
                                  <div class=\"d-inline-block mr-2\">
                                      <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                          <input type=\"checkbox\" value=\"false\">
                                          <span class=\"vs-checkbox\">
                                              <span class=\"vs-checkbox--check\">
                                                  <i class=\"vs-icon feather icon-check\"></i>
                                              </span>
                                          </span>
                                          <span class=\"\">No</span>
                                      </div>
                                  </div>
                                  <div class=\"d-inline-block\">
                                      <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                          <input type=\"checkbox\" value=\"false\">
                                          <span class=\"vs-checkbox\">
                                              <span class=\"vs-checkbox--check\">
                                                  <i class=\"vs-icon feather icon-check\"></i>
                                              </span>
                                          </span>
                                          <span class=\"\">Item Not Taxable</span>
                                      </div>
                                  </div>

                              </div>
                          </div>
                      </div>    
                  </div> 


                  <div class=\"row\">
                      <div class=\"col-sm-2\">
                          <div class=\"form-group d-flex align-items-center pt-md-2\">
                              <label class=\"mr-2\" >Attach a File </label>
                              
                          </div>        
                      </div>
                      
                      <div class=\"col-sm-10\">
                          <div class=\"form-group d-flex align-items-center pt-md-2\">
                              <div class=\"c-inputs-stacked\">
                                  <div class=\"d-inline-block mr-2\">
                                      <input type=\"file\">
                                  </div>
                              </div>
                          </div>
                      </div>
                      
                  </div>

                  <div class=\"row\">
                      <div class=\"col-sm-2\">
                          <div class=\"form-group d-flex align-items-center pt-md-2\">
                              <label class=\"mr-2\" >Will you pay by yourself?</label>
                          </div>
                      </div> 


                      
                      <div class=\"col-sm-10\">
                          <div class=\"form-group d-flex align-items-center pt-md-2\">
                              <div class=\"c-inputs-stacked\">
                                  <div class=\"d-inline-block mr-2\">
                                      <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                          <input type=\"checkbox\" value=\"false\" checked>
                                          <span class=\"vs-checkbox\">
                                              <span class=\"vs-checkbox--check\">
                                                  <i class=\"vs-icon feather icon-check\"></i>
                                              </span>
                                          </span>
                                          <span class=\"\">Yes</span>
                                      </div>
                                  </div>
                                  <div class=\"d-inline-block mr-2\">
                                      <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                          <input type=\"checkbox\" value=\"false\">
                                          <span class=\"vs-checkbox\">
                                              <span class=\"vs-checkbox--check\">
                                                  <i class=\"vs-icon feather icon-check\"></i>
                                              </span>
                                          </span>
                                          <span class=\"\">No</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>    
                  </div> 

                  <div class=\"row\">
                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"subsub-icon\"></label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"subsub-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Haotian\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-hash\"></i>
                              </div>
                            </div>
                            </div>
                      </div>

                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"task-icon\"></label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"task-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Yuan\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-hash\"></i>
                              </div>
                            </div>
                            </div>
                      </div>

                  </div> 
                  
                 
                  <div class=\"row\">
                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"subsub-icon\"></label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"subsub-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"5202727333\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-hash\"></i>
                              </div>
                            </div>
                            </div>
                      </div>

                      <div class=\"col-sm-6\">
                          <div class=\"form-group\">
                              <label for=\"task-icon\"></label>
                              <div class=\"position-relative has-icon-left\">
                              <input type=\"text\" id=\"task-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"1234@uw.edu\">
                              <div class=\"form-control-position\">
                                  <i class=\"feather icon-edit\"></i>
                              </div>
                            </div>
                            </div>
                      </div>

                  </div> 
                  
                 

                  
                  
                  <div class=\"row\" style=\"padding-top: 20px; padding-bottom: 20px;\">
                      <div class=\"col-sm-12 text-center\">
                          <button type=\"button\" class=\"btn btn-outline-primary mr-1 mb-1 waves-effect waves-light\"><a href=\"travelRequest.html\">Save</a></button>
                      </div>

                  </div>   

              </fieldset>";
}
else if($id="addHotel"){
echo "      <fieldset>
                    <h2>Hotel Information</h2>
                    <div class=\"row\">
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"expense-icon\">Hotel Name</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"vendor-icon\" class=\"form-control\" name=\"fname-icon\" >
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-clipboard\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"expense-icon\">Address</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" >
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-clipboard\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"business-icon\">People</label>
                                <div class=\"position-relative has-icon-left\">
                                    <form>
                                        <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"1\">
                                    </form>
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-disc\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"amount-icon\">Zip</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" >
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-disc\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"business-icon\">Move in</label>
                                <div class=\"position-relative has-icon-left\">
                                    <form>
                                        <input type='text' class=\"form-control pickadate\" />
                                    </form>
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-arrow-up-right\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"amount-icon\">Move out</label>
                                <div class=\"position-relative has-icon-left\">
                                    <form>
                                        <input type='text' class=\"form-control pickadate\" />
                                    </form>
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-arrow-down-right\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"business-icon\">Amount</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"USD$\" >
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-bold\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                        
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"amount-icon\">Link</label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"\">
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-link\"></i>
                                </div>
                              </div>
                              </div>
                        </div>
                       
                        

                    </div>

                    <div class=\"row\">
                        <div class=\"col-sm-2\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <label class=\"mr-2\" >Was Sales Tax Paid</label>
                            </div>
                        </div> 


                        
                        <div class=\"col-sm-10\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <div class=\"c-inputs-stacked\">
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">Yes</span>
                                        </div>
                                    </div>
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">No</span>
                                        </div>
                                    </div>
                                    <div class=\"d-inline-block\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">Item Not Taxable</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>    
                    </div> 


                    <div class=\"row\">
                        <div class=\"col-sm-2\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <label class=\"mr-2\" >Attach a File </label>
                                
                            </div>        
                        </div>
                        
                        <div class=\"col-sm-10\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <div class=\"c-inputs-stacked\">
                                    <div class=\"d-inline-block mr-2\">
                                        <input type=\"file\">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div class=\"row\">
                        <div class=\"col-sm-2\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <label class=\"mr-2\" >Will you pay by yourself?</label>
                            </div>
                        </div> 


                        
                        <div class=\"col-sm-10\">
                            <div class=\"form-group d-flex align-items-center pt-md-2\">
                                <div class=\"c-inputs-stacked\">
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">Yes</span>
                                        </div>
                                    </div>
                                    <div class=\"d-inline-block mr-2\">
                                        <div class=\"vs-checkbox-con vs-checkbox-primary\">
                                            <input type=\"checkbox\" value=\"false\">
                                            <span class=\"vs-checkbox\">
                                                <span class=\"vs-checkbox--check\">
                                                    <i class=\"vs-icon feather icon-check\"></i>
                                                </span>
                                            </span>
                                            <span class=\"\">No</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div> 

                    <div class=\"row\">
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"subsub-icon\"></label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"subsub-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"First Name\">
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-hash\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"task-icon\"></label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"task-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Last Name\">
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-hash\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                    </div> 
                    
                   
                    <div class=\"row\">
                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"subsub-icon\"></label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"subsub-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Phone Number\">
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-hash\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                        <div class=\"col-sm-6\">
                            <div class=\"form-group\">
                                <label for=\"task-icon\"></label>
                                <div class=\"position-relative has-icon-left\">
                                <input type=\"text\" id=\"task-icon\" class=\"form-control\" name=\"fname-icon\" placeholder=\"Email\">
                                <div class=\"form-control-position\">
                                    <i class=\"feather icon-edit\"></i>
                                </div>
                              </div>
                              </div>
                        </div>

                    </div> 
                    
                   

                    
                    
                    <div class=\"row\" style=\"padding-top: 20px; padding-bottom: 20px;\">
                        <div class=\"col-sm-12 text-center\">
                            <button type=\"button\" class=\"btn btn-outline-primary mr-1 mb-1 waves-effect waves-light\"><a href=\"travelRequest.html\">Save</a></button>
                        </div>

                    </div>   

                </fieldset>";
}

?>