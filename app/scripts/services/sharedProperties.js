inloopAppApp.service('sharedProperties',function($location,$filter){
 
  
        this._baseURL = 'http://54.169.251.56:10010/api/v1';
          // http://54.169.251.56:10010
        this._authToken = '';

        this._roles = {

            shipperAccountPayableManager: {
                                                "id": 1,
                                                "name": "Accounts Payable Manager",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "shipper:accounts-payables-profiling"
                                              },
                        shipperFleetManager : {
                                                "id": 2,
                                                "name": "Fleet Manager",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "shipper:shipper-fleet-manager-profiling"
                                              },
                   shipperDeliveryAssociate : {
                                                "id": 3,
                                                "name": "Delivery Associate",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "shipper:delivery-associate-profiling"
                                              },
                               shipperAdmin : {
                                                "id": 4,
                                                "name": "Admin",
                                                "organizationType": "SHIPPER",
                                                "redirectURL": "core:shipper-view"
                                              },

           providerAccountReceivableManager : {
                                                "id": 5,
                                                "name": "Accounts Receivable Manager",
                                                "organizationType": "PROVIDER",
                                                "redirectURL": "provider:accounts-receivables-profile"
                                               },
                        providerFleetManager : {
                                                "id": 6,
                                                "name": "Fleet Manager",
                                                "organizationType": "PROVIDER",
                                                "redirectURL": "provider:fleet-manager-profile"
                                                },
                                providerDriver : {
                                                    "id": 7,
                                                    "name": "Driver",
                                                    "organizationType": "PROVIDER",
                                                    "redirectURL": "provider:driver-profile"
                                                  },
                                providerAdmin : {
                                                    "id": 8,
                                                    "name": "Admin",
                                                    "organizationType": "PROVIDER",
                                                    "redirectURL": "core:provider-view"
                                                  },

                orchestratorOperationManager : {
                                                    "id": 9,
                                                    "name": "Operations Manager",
                                                    "organizationType": "ORCHESTRATOR",
                                                    "redirectURL": "orchestrator:operations-manager-profiling"
                                                  },
                orchestratorProvisioningManager : {
                                                    "id": 10,
                                                    "name": "Provisioning Manager",
                                                    "organizationType": "ORCHESTRATOR",
                                                    "redirectURL": "core:orchestrator-view"
                                                  },
                orchestratorTransactionManager : {
                                                    "id": 11,
                                                    "name": "Transactions Manager",
                                                    "organizationType": "ORCHESTRATOR",
                                                    "redirectURL": "orchestrator:transactions-manager-profiling"
                                                  },

                shipperLoadingManager : {
                                            "id": 12,
                                            "name": "Loading Manager",
                                            "organizationType": "SHIPPER",
                                            "redirectURL": "shipper:loading-manager-profiling"
                                          },

                providerNotVerifiedAdmin : {
                                            "id": 13,
                                            "name": "Not Verified Admin",
                                            "organizationType": "PROVIDER",
                                            "redirectURL": "provider:not-verified-provider-profiling"
                                          },

                shipperNotVerifiedAdmin : {
                                            "id": 14,
                                            "name": "Not Verified Admin",
                                            "organizationType": "SHIPPER",
                                            "redirectURL": "shipper:not-verified-shipper-profiling"
                                          }
            };       

/*        this._contractStatusType = {

            onWay : {id : 0,type : 'ON_WAY'},
            checkedIn : {id : 1,type : 'CHECKED_IN'},
            returning : {id : 2,type : 'RETURNING'}
            
        };*/

        this._invoiceType = {
            created :   {
                            "key": "CREATED",
                            "value": "GENERATED"
                          },
            submitted : {
                            "key": "SUBMITTED",
                            "value": "SUBMITTED"
                          },
            approved :   {
                            "key": "APPROVED",
                            "value": "APPROVED"
                          },
            paid :   {
                        "key": "PAID",
                        "value": "PAID"
                      },
            archieved : {
                            "key": "ARCHIEVED",
                            "value": "ARCHIEVED"
                          }
        };

        this._contractTaskType = {
            created : {
                        "key": "CREATED",
                        "value": "CREATED"
                      },
            dispatched : {
                            "key": "DISPATCHED",
                            "value": "DISPATCHED"
                         },
            arrived : {
                        "key": "ARRIVED",
                        "value": "ARRIVED"
                      },
            checkedIn : {
                            "key": "CHECKED_IN",
                            "value": "CHECKED_IN"
                        },
            assignedJob : {
                            "key": "ASSIGNED_JOB",
                            "value": "ASSIGNED_JOB"
                          },
            returning : {
                            "key": "RETURNING",
                            "value": "RETURNING"
                        },
            completed : {
                            "key": "COMPLETED",
                            "value": "COMPLETED",
                        },                        
        };

        this._contractTaskCardType = {
            created : {
                        "key": "CREATED",
                        "value": "WHITE"
                      },
            dispatched : {
                            "key": "DISPATCHED",
                            "value": "RED"
                         },
            arrivedDispatched :   {
                                    "key": "ARRIVED_DISPATCHED",
                                    "value": "YELLOW"
                                  },
            arrivedReturning :   {
                                    "key": "ARRIVED_RETURNING",
                                    "value": "ORANGE"
                                  },
            checkedIn :   {
                            "key": "CHECKED_IN",
                            "value": "GREEN"
                          },
            assignedJob :   {
                                "key": "ASSIGNED_JOB",
                                "value": "BLUE"
                              },
            returning :   {
                            "key": "RETURNING",
                            "value": "RED"
                          }
        };

        this._jobTypes = {

            unassigned : {
                            "key": "UNASSIGNED",
                            "value": "UNASSIGNED"
                         },
            assigned :   {
                            "key": "ASSIGNED",
                            "value": "ASSIGNED"
                         },
            completed :  {
                            "key": "COMPLETED",
                            "value": "COMPLETED"
                         }
        }

        this._cardType = {
            blankCard : { type : 'CREATED', text : 'CREATED'},
            yellowCard : { type : 'DISPATCHED_ARRIVED', text : 'ARRIVED'},
            orangeCard : {type : 'RETURNING_ARRIVED' , text : 'ARRIVED'},
            greenCard : { type : 'CHECKED_IN' , text : 'CHECKED IN' },
            blueCard : { type : 'ASSIGNED_JOB' , text : 'JOB ASSIGNED' },
        }

        this._daMenu = {
            drivers : { name : 'DRIVERS',
                        items : {
                            all : 'All',
                            available : 'Available',
                            assigned : 'Assigned',
                            returning : 'Dispatched',
                        }
                    },
            jobs : { name : 'JOBS', 
                     items : {
                        unassigned : 'Unassigned',
                        assigned : 'Assigned',
                        completed : 'Completed',
                     }},
        }

        this._lmMenu = {
            drivers : { name : 'DRIVERS',
                        items : {
                            all : 'All',
                            available : 'Available',
                            assigned : 'Assigned',
                            returning : 'Dispatched',
                        }
                    },
            jobs : { name : 'JOBS', 
                     items : {
                        unassigned : 'Unassigned',
                        assigned : 'Assigned',
                        completed : 'Completed',
                     }},
        }

        this._tripType = {
            created : {
                        "key": "CREATED",
                        "value": "CREATED"
                      },
            loadingStart : {
                                "key": "LOADING_START",
                                "value": "LOADING_START"
                            },
            tripStart  : {
                            "key": "TRIP_START",
                            "value": "TRIP_START"
                         },
            tripEnd : {
                        "key": "TRIP_END",
                        "value": "TRIP_END"
                      },
        };

        this._packageType = {
            new : 'NEW',
            delivered : 'DELIVERED',
            damaged : 'DAMAGED', 
            incorrectAddress : 'INCORRECT_ADDRESS',
            notAvailable : 'NOT_AVAILABLE', 
            returned : 'RETURNED',
            rescheduled : 'RESCHEDULED',
        };

        this._orchestratorProvisioningTabType = {
            shippers : 'shippers',
            providers : '3plProviders',
            operationsManagers : 'operationsManagers', 
            transactionsManagers : 'transactionsManager',
        };

        this.mapStyle = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];

        this.getMapStyle = function(){
            return this.mapStyle;
        }

        this.getOrchestratorProvisioningTabType = function(){
            return this._orchestratorProvisioningTabType;
        }

        this.getTodayDate = function(){
            return $filter('date')(new Date(),'yyyy-MM-dd');
        }

        this.getTodatUTCDateTime = function(){
            return $filter('date')(new Date(),'yyyy-MM-ddTHH:mm:ssZ');
        }

        this.getTimeFromUTCDateTime = function(date){
            return $filter('date')(date,'hh:mm a');
        }

        this.getUrl = function(){
            return this._baseURL;
        };

        this.getAuthToken = function(){
            return this._authToken;
        };

        this.setAuthToken = function(token){
            this._authToken = token;
        };
        
        this.setPath = function (path) {
            return $location.path(path);
        };

        this.getContractStatusType = function(){
            return this._contractStatusType;
        };

        this.getContractTaskType = function(){
            return this._contractTaskType;
        };

        this.getContractTaskCardType = function(){
            return this._contractTaskCardType;
        };

        this.getJobsTypes = function(){
            return this._jobTypes;
        }

        this.getCardTypes = function(){
            return this._cardType;
        }

        this.getdaMenu = function(){
            return this._daMenu;
        }
        this.getLmMenu = function(){
            return this._lmMenu;
        }
        this.getRoles = function(){
            return this._roles;
        }
        this.getTripTypes = function(){
            return this._tripType;
        }
        this.getPackageType = function(){
            return this._packageType;
        }
        this.getInvoiceType = function(){
            return this._invoiceType;
        }
}); 
