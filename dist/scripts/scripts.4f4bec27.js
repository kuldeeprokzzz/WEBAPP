"use strict";var inloopAppApp=angular.module("inloopAppApp",["ngAnimate","ngCookies","ngResource","ngRoute","ui.router","ngSanitize","ngTouch","LocalStorageModule"]).config(["localStorageServiceProvider",function(a){a.setPrefix("webApp")}]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("login",{url:"/",templateUrl:"../views/login.html",controller:"MainCtrl"}).state("loadManager",{url:"/loadManager",templateUrl:"../views/base.html",controller:"roleManagerController"}).state("loadManager.job",{url:"/job/{jobType}/{message}",templateUrl:"../views/jobs.html",controller:"loadManagerController"}).state("accountReceivable",{url:"/accountReceivable",templateUrl:"../views/base.html",controller:"roleManagerController"}).state("accountReceivable.invoice",{url:"/invoice/{invoiceType}/{message}",templateUrl:"../views/billing.html",controller:"accountReceivableController"}).state("accountPayable",{url:"/accountPayable",templateUrl:"../views/base.html",controller:"roleManagerController"}).state("accountPayable.invoice",{url:"/invoice/{invoiceType}/{message}",templateUrl:"../views/accountPayableInvoice.html",controller:"accountPayableController"}).state("provisioning",{url:"/provisioning",templateUrl:"../views/provisioning.html"})}]).config(["$provide","$httpProvider","localStorageServiceProvider",function(a,b,c){a.factory("sessionInterceptor",["localStorageService","$location",function(a,b){return{request:function(c){var d=a.get("completeModel");return void 0!=d&&""!=d&&(new Date-new Date(d.loginTime)>d.tokenTime&&(a.set("completeModel",void 0),console.log("user session time out"),b.path("/")),-1!=c.url.indexOf("api")&&-1!=c.url.indexOf("login")&&(c.headers.Authorization="Token 3562QEQQ%$&898921@")),c}}}]),b.interceptors.push("sessionInterceptor")}]);inloopAppApp.service("sharedProperties",["$location","$filter",function(a,b){this._baseURL="http://54.169.251.56:10010/api/v1",this._authToken="",this._roles={shipperAccountPayableManager:{id:1,name:"Accounts Payable Manager",organizationType:"SHIPPER",redirectURL:"shipper:accounts-payables-profiling"},shipperFleetManager:{id:2,name:"Fleet Manager",organizationType:"SHIPPER",redirectURL:"shipper:shipper-fleet-manager-profiling"},shipperDeliveryAssociate:{id:3,name:"Delivery Associate",organizationType:"SHIPPER",redirectURL:"shipper:delivery-associate-profiling"},shipperAdmin:{id:4,name:"Admin",organizationType:"SHIPPER",redirectURL:"core:shipper-view"},providerAccountReceivableManager:{id:5,name:"Accounts Receivable Manager",organizationType:"PROVIDER",redirectURL:"provider:accounts-receivables-profile"},providerFleetManager:{id:6,name:"Fleet Manager",organizationType:"PROVIDER",redirectURL:"provider:fleet-manager-profile"},providerDriver:{id:7,name:"Driver",organizationType:"PROVIDER",redirectURL:"provider:driver-profile"},providerAdmin:{id:8,name:"Admin",organizationType:"PROVIDER",redirectURL:"core:provider-view"},orchestratorOperationManager:{id:9,name:"Operations Manager",organizationType:"ORCHESTRATOR",redirectURL:"orchestrator:operations-manager-profiling"},orchestratorProvisioningManager:{id:10,name:"Provisioning Manager",organizationType:"ORCHESTRATOR",redirectURL:"core:orchestrator-view"},orchestratorTransactionManager:{id:11,name:"Transactions Manager",organizationType:"ORCHESTRATOR",redirectURL:"orchestrator:transactions-manager-profiling"},shipperLoadingManager:{id:12,name:"Loading Manager",organizationType:"SHIPPER",redirectURL:"shipper:loading-manager-profiling"},providerNotVerifiedAdmin:{id:13,name:"Not Verified Admin",organizationType:"PROVIDER",redirectURL:"provider:not-verified-provider-profiling"},shipperNotVerifiedAdmin:{id:14,name:"Not Verified Admin",organizationType:"SHIPPER",redirectURL:"shipper:not-verified-shipper-profiling"}},this._invoiceType={created:{key:"CREATED",value:"GENERATED"},submitted:{key:"SUBMITTED",value:"SUBMITTED"},approved:{key:"APPROVED",value:"APPROVED"},paid:{key:"PAID",value:"PAID"},archieved:{key:"ARCHIEVED",value:"ARCHIEVED"}},this._contractTaskType={created:{key:"CREATED",value:"CREATED"},dispatched:{key:"DISPATCHED",value:"DISPATCHED"},arrived:{key:"ARRIVED",value:"ARRIVED"},checkedIn:{key:"CHECKED_IN",value:"CHECKED_IN"},assignedJob:{key:"ASSIGNED_JOB",value:"ASSIGNED_JOB"},returning:{key:"RETURNING",value:"RETURNING"}},this._jobTypes={unassigned:{key:"UNASSIGNED",value:"UNASSIGNED"},assigned:{key:"ASSIGNED",value:"ASSIGNED"},completed:{key:"COMPLETED",value:"COMPLETED"}},this._cardType={blankCard:{type:"CREATED",text:"CREATED"},yellowCard:{type:"DISPATCHED_ARRIVED",text:"ARRIVED"},orangeCard:{type:"RETURNING_ARRIVED",text:"ARRIVED"},greenCard:{type:"CHECKED_IN",text:"CHECKED IN"},blueCard:{type:"ASSIGNED_JOB",text:"JOB ASSIGNED"}},this._daMenu={drivers:{name:"DRIVERS",items:{all:"All",available:"Available",assigned:"Assigned",returning:"Dispatched"}},jobs:{name:"JOBS",items:{unassigned:"Unassigned",assigned:"Assigned",completed:"Completed"}}},this._lmMenu={drivers:{name:"DRIVERS",items:{all:"All",available:"Available",assigned:"Assigned",returning:"Dispatched"}},jobs:{name:"JOBS",items:{unassigned:"Unassigned",assigned:"Assigned",completed:"Completed"}}},this._tripType={created:{key:"CREATED",value:"CREATED"},loadingStart:{key:"LOADING_START",value:"LOADING_START"},tripStart:{key:"TRIP_START",value:"TRIP_START"},tripEnd:{key:"TRIP_END",value:"TRIP_END"}},this._packageType={"new":"NEW",delivered:"DELIVERED",damaged:"DAMAGED",incorrectAddress:"INCORRECT_ADDRESS",notAvailable:"NOT_AVAILABLE",returned:"RETURNED",rescheduled:"RESCHEDULED"},this.getTodayDate=function(){return b("date")(new Date,"yyyy-MM-dd")},this.getTodatUTCDateTime=function(){return b("date")(new Date,"yyyy-MM-ddTHH:mm:ssZ")},this.getTimeFromUTCDateTime=function(a){return b("date")(a,"hh:mm a")},this.getUrl=function(){return this._baseURL},this.getAuthToken=function(){return this._authToken},this.setAuthToken=function(a){this._authToken=a},this.setPath=function(b){return a.path(b)},this.getContractStatusType=function(){return this._contractStatusType},this.getContractTaskType=function(){return this._contractTaskType},this.getJobsTypes=function(){return this._jobTypes},this.getCardTypes=function(){return this._cardType},this.getdaMenu=function(){return this._daMenu},this.getLmMenu=function(){return this._lmMenu},this.getRoles=function(){return this._roles},this.getTripTypes=function(){return this._tripType},this.getPackageType=function(){return this._packageType},this.getInvoiceType=function(){return this._invoiceType}}]),inloopAppApp.service("completeModel",["localStorageService","$location",function(a,b){this._completeModel=void 0,this.getCompleteModel=function(){if(void 0!=this._completeModel)return this._completeModel;var c=a.get("completeModel");return void 0!=c?(this._completeModel=c,this._completeModel):void b.path("/")},this.saveCompleteModel=function(b){this._completeModel=b,a.set("completeModel",b)}}]),inloopAppApp.service("loginService",["sharedProperties","$http",function(a,b){this.getLoginToken=function(c){return b({method:"POST",url:a.getUrl()+"/login",headers:{"Content-Type":"application/json"},data:c}).success(function(a){return a}).error(function(a){return a})},this.getProfile=function(){return b({method:"GET",url:a.getUrl()+"/profiles/me",headers:{Authorization:"Token 3562QEQQ%$&898921@"}}).success(function(a){return a}).error(function(a){return a})},this.getRoleType=function(){return b({method:"GET",url:a.getUrl()+"/roles"}).success(function(a){return a}).error(function(a){return a})}}]),inloopAppApp.service("contractTaskService",["sharedProperties","$http",function(a,b){this.getTodaysContractTaskByDeliveryCenterIdAndStatus=function(c,d){var e=a.getTodayDate();return e="today",c=5,b({method:"GET",url:a.getUrl()+"/contract_tasks/?status="+d+"&delivery_centreid="+c+"&task_date="+e}).success(function(a){return a}).error(function(a){return a})},this.updateContractTaskStateToAssignedJob=function(c,d,e,f,g,h,i){var j=a.getTodatUTCDateTime(),k={type:a.getContractTaskType().assignedJob.value,time:j,location:{longitude:d,latitute:c},odometer:e,contract_taskid:f,performed_by:g,jobid:h,tripid:i};return b.post(a.getUrl()+"/contract_tasks/"+f+"/states",k,{}).then(function(a){return a},function(a){return a})},this.getContractTaskById=function(c){return b({method:"GET",url:a.getUrl()+"/contract_tasks/"+c}).success(function(a){return a}).error(function(a){return a})}}]),inloopAppApp.service("jobService",["sharedProperties","$http",function(a,b){this.getTodaysJobsByDeliveryCenterIdShipperIdAndStatus=function(c,d,e){var f=a.getTodayDate();return f="today",c=5,b({method:"GET",url:a.getUrl()+"/jobs?job_date="+f+"&delivery_centreid="+c+"&shippered="+d+"&status="+e}).success(function(a){return a}).error(function(a){return a})},this.updateJobStateWithJobIdPerformedByAndType=function(c,d,e){var f=a.getTodatUTCDateTime(),g={type:e,time:f,performed_by:d};return b.post(a.getUrl()+"/jobs/"+c+"/states",g,{}).then(function(a){return a},function(a){return a})},this.updateJobWithJobIdContractTaskIdAndTripId=function(c,d,e){var f={contract_taskid:d,tripid:e};return b.put(a.getUrl()+"/jobs/"+c+"/",f,{}).then(function(a){return a},function(a){return a})},this.getAllJobsByShipperIdAndStatus=function(c,d){return b({method:"GET",url:a.getUrl()+"/jobs?shippered="+c+"&status="+d}).success(function(a){return a}).error(function(a){return a})},this.getJobDetailByJobId=function(c){return b({method:"GET",url:a.getUrl()+"/jobs/"+c}).success(function(a){return a}).error(function(a){return a})}}]),inloopAppApp.service("tripService",["sharedProperties","$http",function(a,b){this.createNewTripForJob=function(c,d,e,f,g){var h=a.getTodatUTCDateTime(),i={vehicleid:c,driverid:d,contract_taskid:e,jobid:f,odometer_deviceid:g,status:a.getTripTypes.created.value,trip_date:h};return b.post(a.getUrl()+"/trips",i,{}).then(function(a){return a},function(a){return a})},this.getTripDetailsbyId=function(c){return b({method:"GET",url:a.getUrl()+"/trips/"+c}).success(function(a){return a}).error(function(a){return a})},this.getTripDataByTripId=function(c){return b({method:"GET",url:a.getUrl()+"/trips/"+c+"/tripdata"}).success(function(a){return a}).error(function(a){return a})},this.getTripStatesByTripId=function(c){return b({method:"GET",url:a.getUrl()+"/trips/"+c+"/states"}).success(function(a){return a}).error(function(a){return a})}}]),inloopAppApp.service("invoiceService",["sharedProperties","$http",function(a,b){this.getAllInvoicesByPayerIdAndStatus=function(c,d){return b({method:"GET",url:a.getUrl()+"/invoices/"}).success(function(a){return a}).error(function(a){return a})},this.getAllInvoicesByPayeeIdAndStatus=function(c,d){return b({method:"GET",url:a.getUrl()+"/invoices/"}).success(function(a){return a}).error(function(a){return a})},this.updateInvoiceState=function(c,d,e,f){var g=a.getTodatUTCDateTime(),h={invoiceid:c,type:d,time:g,performed_by:e,organizationid:f,remarks:"string"};return b.post(a.getUrl()+"/invoices/"+c+"/states",h,{}).then(function(a){return a},function(a){return a})}}]),angular.module("inloopAppApp").controller("MainCtrl",["$scope","$location","sharedProperties","completeModel","loginService",function(a,b,c,d,e){a.initialize=function(){a.username="",a.password=""},a.submitLogin=function(){var f={username:a.username,password:a.password};e.getLoginToken(f).then(function(f){if(200==f.status){var g={};g.accessToken=f.data.token,g.tokenTime=f.data.expires,g.loginTime=new Date,e.getProfile().then(function(e){200==e.status&&(g.profile=e.data,"loadM"==a.username&&(g.profile.roleIdtemp=c.getRoles().shipperLoadingManager.id,d.saveCompleteModel(g),b.path("/loadManager/job/"+c.getJobsTypes().unassigned.value+"/")),"accountR"==a.username&&(g.profile.roleIdtemp=c.getRoles().providerAccountReceivableManager.id,d.saveCompleteModel(g),b.path("/accountReceivable/invoice/ALL/")),"accountP"==a.username&&(g.profile.roleIdtemp=c.getRoles().shipperAccountPayableManager.id,d.saveCompleteModel(g),b.path("/accountPayable/invoice/ALL/")))})}})}}]),angular.module("inloopAppApp").controller("roleManagerController",["$scope","$stateParams","sharedProperties","completeModel","jobService",function(a,b,c,d,e){a.initialize=function(){if(void 0!=d.getCompleteModel())var b=d.getCompleteModel();a.roleId=b.profile.roleIdtemp,a.rolesTypes=c.getRoles()}}]),angular.module("inloopAppApp").controller("headerController",["$scope","$location","$stateParams","sharedProperties","completeModel","jobService",function(a,b,c,d,e,f){a.initialize=function(){if(void 0!=e.getCompleteModel())var b=e.getCompleteModel();a.roleId=b.profile.roleIdtemp,a.rolesTypes=d.getRoles(),a.username=b.profile.first_name,a.image=b.profile.image},a.logOut=function(){e.saveCompleteModel(void 0),b.path("/")}}]),angular.module("inloopAppApp").controller("sectionController",["$scope","$stateParams","sharedProperties","completeModel","jobService",function(a,b,c,d,e){a.initialize=function(){if(void 0!=d.getCompleteModel())var b=d.getCompleteModel();a.roleId=b.profile.roleIdtemp,a.rolesTypes=c.getRoles(),a.jobsTypes=c.getJobsTypes()}}]),angular.module("inloopAppApp").controller("loadManagerController",["$scope","$stateParams","sharedProperties","completeModel","contractTaskService","jobService","tripService",function(a,b,c,d,e,f,g){a.initialize=function(){void 0!=d.getCompleteModel()&&(a.model=d.getCompleteModel()),a.jobsTypes=c.getJobsTypes(),a.contractTaskTypes=c.getContractTaskType(),a.jobType=b.jobType,a.message=b.message,a.deliveryCenterId=a.model.profile.delivery_centreid,a.shipperId=a.model.profile.organizationid,a.status=b.jobType,f.getTodaysJobsByDeliveryCenterIdShipperIdAndStatus(a.deliveryCenterId,a.shipperId,a.status).then(function(b){200==b.status?0!=b.data.length?a.jobs=b.data:a.message="No Job Found":a.message="Something went wrong. Try Again !"})},a.submitAssignDriver=function(b){e.getTodaysContractTaskByDeliveryCenterIdAndStatus(a.deliveryCenterId,a.contractTaskTypes.checkedIn.value).then(function(c){200==c.status?0!=c.data.length?(a.message="",a.jobToBeAssigned=b,a.contractTasks=c.data,$("#centerModal").modal("toggle")):a.message="No driver found to assign job, Try after Some Time !":a.message="Something went wront. Try Again !"})},a.assignJobToDriver=function(b){f.updateJobStateWithJobIdPerformedByAndType(a.jobToBeAssigned.id,a.model.profile.username,a.jobsTypes.assigned.value).then(function(d){200==d.status&&g.createNewTripForJob(b.vehicleid,b.driverid,b.id,a.jobToBeAssigned.id,b.odometer_deviceid).then(function(a){if(200==a.status){var d=a.data.id;jobServiceupdateJobWithJobIdContractTaskIdAndTripId($jobToBeAssigned.id,b.id,d).then(function(a){200==a.status&&e.updateContractTaskStateToAssignedJob(b.latest_state.location.latitude,b.latest_state.location.latitude,b.latest_state.odometer,b.id,$model.profile.username,job.id,d).then(function(a){200==a.status&&($("#centerModal").modal("toggle"),$location.path("/loadManager/job/"+c.getJobsTypes().unassigned.value+"/Jon Assigned Successfully !"))})})}}),a.message="Something went wront. Assign job again !",$("#centerModal").modal("toggle")})},a.showDetails=function(b){e.getContractTaskById(b.contract_taskid).then(function(c){200==c.status?(a.contractTask=c.data,a.contractTask.jobName=b.name,$("#detailsModal").modal("toggle")):a.message="Unable to show details, Please try again !"})}}]),angular.module("inloopAppApp").controller("accountPayableController",["$scope","$timeout","$stateParams","$location","sharedProperties","completeModel","contractTaskService","jobService","tripService","invoiceService",function(a,b,c,d,e,f,g,h,i,j){a.initialize=function(){void 0!=f.getCompleteModel()&&(a.model=f.getCompleteModel()),a.invoiceTypes=e.getInvoiceType(),a.createdCount=0,a.createdTotalAmount=0,a.createdTotalPackages=0,a.approveAllInvoiceList=[],void 0!=c.invoiceType&&("ALL"==c.invoiceType?a.invoiceType=a.invoiceTypes.submitted.value+","+a.invoiceTypes.approved.value+","+a.invoiceTypes.paid.value+","+a.invoiceTypes.archieved.value:a.invoiceType=c.invoiceType),void 0!=c.message&&(a.errorMessage=c.message),console.log(a.invoiceType),a.payeeId=a.model.profile.organizationid,j.getAllInvoicesByPayeeIdAndStatus(a.payeeId,a.invoiceType).then(function(b){200==b.status?0!=b.data.length?(a.jobInvoiceTripList=[],angular.forEach(b.data,function(b,c){var d=b;g.getContractTaskById(d.contract_tasks[0]).then(function(b){if(200==b.status){var e=b.data,f=119+c,g=1+c;h.getJobDetailByJobId(f).then(function(b){if(200==b.status){var c=b.data;i.getTripDetailsbyId(g).then(function(b){if(200==b.status){var f=b.data;i.getTripDataByTripId(g).then(function(b){if(200==b.status){var h=b.data;i.getTripStatesByTripId(g).then(function(b){if(200==b.status){var g={job:c,trip:f,tripData:h,contractTask:e,invoice:d,tripStates:b.data};a.jobInvoiceTripList.push(g),g.invoice.status==a.invoiceTypes.submitted.value&&(a.approveAllInvoiceList.push(g),a.createdCount=a.createdCount+1,a.createdTotalAmount=a.createdTotalAmount+g.invoice.total_amount,a.createdTotalPackages=a.createdTotalPackages+g.job.number_of_packages)}})}})}})}})}})})):a.errorMessage="No Jobs Found.!":a.errorMessage="Some thing went wrong. Try Again !"}),console.log(JSON.stringify(a.jobInvoiceTripList))},a.approveInvoice=function(b){a.invoiceTobeApproved=b,$("#centerModal").modal("toggle")},a.approveModalInvoice=function(){var b=a.invoiceTobeApproved;j.updateInvoiceState(b.invoice.id,a.invoiceTypes.approved.value,a.model.profile.username,a.model.profile.organizationId).then(function(b){201==b.status?($("#centerModal").modal("toggle"),d.path("/accountPayable/invoice/ALL/Invoice Approved Successfully !")):a.errorMessage="Unable to Approve Invoice. Try Again !"})},a.approveAllInvoice=function(){$("#approveAllModal").modal("toggle")},a.approveAllInvoiceModal=function(){var c=0;angular.forEach(a.approveAllInvoiceList,function(e,f){j.updateInvoiceState(e.invoice.id,a.invoiceTypes.approved.value,a.model.profile.username,a.model.profile.organizationId).then(function(e){201==e.status&&(c+=1),f+1==a.jobInvoiceTripList.length&&($("#approveAllModal").modal("toggle"),b(function(){c==a.jobInvoiceTripList.length?d.path("/accountPayable/invoice/ALL/All Invoices Approved Successfully !"):d.path("/accountPayable/invoice/ALL/One or More Invoice not  Approved. Please Try again !")},1e3))})})}}]),angular.module("inloopAppApp").controller("accountReceivableController",["$scope","$timeout","$stateParams","$location","sharedProperties","completeModel","contractTaskService","jobService","tripService","invoiceService",function(a,b,c,d,e,f,g,h,i,j){a.initialize=function(){void 0!=f.getCompleteModel()&&(a.model=f.getCompleteModel()),a.invoiceTypes=e.getInvoiceType(),a.createdCount=0,a.createdTotalAmount=0,a.createdTotalPackages=0,a.submitAllInvoiceList=[],void 0!=c.invoiceType&&("ALL"==c.invoiceType?a.invoiceType=a.invoiceTypes.created.value+","+a.invoiceTypes.submitted.value+","+a.invoiceTypes.approved.value+","+a.invoiceTypes.paid.value+","+a.invoiceTypes.archieved.value:a.invoiceType=c.invoiceType),void 0!=c.message&&(a.errorMessage=c.message),console.log(a.invoiceType),a.payerId=a.model.profile.organizationid,j.getAllInvoicesByPayerIdAndStatus(a.payerId,a.invoiceType).then(function(b){200==b.status?0!=b.data.length?(a.jobInvoiceTripList=[],angular.forEach(b.data,function(b,c){var d=b;g.getContractTaskById(d.contract_tasks[0]).then(function(b){if(200==b.status){var e=b.data,f=119+c,g=1+c;h.getJobDetailByJobId(f).then(function(b){if(200==b.status){var c=b.data;i.getTripDetailsbyId(g).then(function(b){if(200==b.status){var f=b.data;i.getTripDataByTripId(g).then(function(b){if(200==b.status){var h=b.data;i.getTripStatesByTripId(g).then(function(b){if(200==b.status){var g={job:c,trip:f,tripData:h,contractTask:e,invoice:d,tripStates:b.data};a.jobInvoiceTripList.push(g),g.invoice.status==a.invoiceTypes.submitted.value&&(a.approveAllInvoiceList.push(g),a.createdCount=a.createdCount+1,a.createdTotalAmount=a.createdTotalAmount+g.invoice.total_amount,a.createdTotalPackages=a.createdTotalPackages+g.job.number_of_packages)}})}})}})}})}})})):a.errorMessage="No Jobs Found.!":a.errorMessage="Some thing went wrong. Try Again !"})},a.submitInvoice=function(b){a.invoiceTobeSubmitted=b,$("#centerModal").modal("toggle")},a.submitModalInvoice=function(){var b=a.invoiceTobeSubmitted;j.updateInvoiceState(b.invoice.id,a.invoiceTypes.submitted.value,a.model.profile.username,a.model.profile.organizationId).then(function(b){201==b.status?($("#centerModal").modal("toggle"),d.path("/accountReceivable/invoice/ALL/Invoice Submitted Successfully !")):a.errorMessage="Unable to Submit Invoice. Try Again !"})},a.submitAllInvoice=function(){$("#submitAllModal").modal("toggle")},a.submitAllInvoiceModal=function(){var c=0;angular.forEach(a.submitAllInvoiceList,function(e,f){j.updateInvoiceState(e.invoice.id,a.invoiceTypes.submitted.value,a.model.profile.username,a.model.profile.organizationId).then(function(e){201==e.status&&(c+=1),f+1==a.jobInvoiceTripList.length&&($("#submitAllModal").modal("toggle"),b(function(){c==a.jobInvoiceTripList.length?d.path("/accountReceivable/invoice/ALL/All Invoices Submitted Successfully !"):d.path("/accountReceivable/invoice/ALL/One or More Invoice Submission Falied. Please Submit again !")},1e3))})})}}]),angular.module("inloopAppApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);