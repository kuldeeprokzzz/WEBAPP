inloopAppApp.service('completeModel',function(localStorageService){
 
  
        this._completeModel = undefined;


        // this function gets complete model, in case it doesnt find one
        // it tries to retrieve it from local storage, if it fails there also
        // it just redirects to login page
        this.getCompleteModel = function(){  
            if(this._completeModel != null){
                return this._completeModel;
            }else{
                var localModel = localStorageService.get('completeModel');
                if(localModel != undefined){
                    this._completeModel = localModel;
                    return this._completeModel;
                }else{
                    // to the logout/login page
                }
            }
        }

        // saves complete model into loca storage
        this.saveCompleteModel = function(param){
            this._completeModel = param;
            localStorageService.set('completeModel',param);
        }


}); 
