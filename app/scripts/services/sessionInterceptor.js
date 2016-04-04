// Intercepting HTTP calls with AngularJS.
inloopAppApp.config(function ($provide, $httpProvider,completeModel) {
  
  // Intercept http calls.
  $provide.factory('sessionInterceptor', function () {
    return {
      
      request: function (config) {
        alert(';aknakgn');
        if(config.url.indexOf('api') != -1){
          if(config.url.indexOf('login') == -1){
            alert('kanlkn');
            config.headers['Authorization'] = 'Token 3562QEQQ%$&898921@';
            //completeModel.getCompleteModel().accessToken
          }
        }
        return config;
      },
    };
  });

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('sessionInterceptor');

});