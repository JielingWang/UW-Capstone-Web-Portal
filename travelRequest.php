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
                                <label for=\"amount-icon\">Returning</label>
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
                                <input type=\"text\" id=\"expense-icon\" class=\"form-control\" name=\"fname-icon\" >
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