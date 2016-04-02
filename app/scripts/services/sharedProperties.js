inloopAppApp.service('sharedProperties',function($location,$filter){
 
  
        this._baseURL = 'http://54.169.251.56:10010/api/v1';
          
        this._authToken = '';

        this._roles = {

                driver : 0,
                deliveryAssociate : 2,
                loadManager : 3,

            };       

/*        this._contractStatusType = {

            onWay : {id : 0,type : 'ON_WAY'},
            checkedIn : {id : 1,type : 'CHECKED_IN'},
            returning : {id : 2,type : 'RETURNING'}
            
        };*/

        this._contractTaskType = {
            dispatched : { id : 0, type : 'DISPATCHED', text : 'IN TRANSIT'},
            arrived : { id : 1, type : 'ARRIVED', text : 'ARRIVED'},
            checkedIn :{ id : 2, type : 'CHECKED_IN', text : 'CHECKED IN'}, 
            assignedJob : { id : 3, type : 'ASSIGNED_JOB', text : 'ASSIGNED'},
            returning : { id : 4, type : 'RETURNING', text : 'IN TRANSIT'},
        };

        this._jobTypes = {
            unassigned : { id : 0, type : "UNASSIGNED"},
            assigned : {id : 1, type : "ASSIGNED"},
            completed : {id : 2, type : "COMPLETED"},
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
            loadingStart : 'LOADING_START',
            tripStart  : 'TRIP_START',
            tripEnd : 'TRIP_END',
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
}); 
