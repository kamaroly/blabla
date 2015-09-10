tigoApp.service('AuthService', function ($q,$http,$state,$ionicPopup,helperService,USER_ROLES,SERVER_CONSTANTS) {
  var LOCAL_TOKEN_KEY   = 'YourTokenKey';
  var msisdn  = '';
  var isAuthenitcated  = false;
  var role = '';
  var authToken;

  function loadUserCredentials(){
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if(token){
      useCredentials(token);
    }
  };

  var isLoggedIn = function(){
    return window.localStorage.getItem('authenticated')=='true';
  };

  //Store our Token in the local store
  function storeUserCredentials(key,value){

     window.localStorage.setItem(key,value);
     console.log(key,value);
     // useCredentials(token);
  };

  // LOG OUT USER
  function destroyUserCredentials(){
    authToken = undefined;
    msisdn    = '';
    isAuthenitcated = false;

    $http.defaults.headers.common['X-Auth-token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  };


  var logout = function(){
    destroyUserCredentials();
  };

  var login = function(msisdn){
        // Try to get some token
        serverAuthentication('250'+msisdn);             
  };

  var serverAuthentication = function(msisdn){
    // Attempt to auntenticate
    console.log('FIRING EVENT AT '+SERVER_CONSTANTS.host+SERVER_CONSTANTS.authMsisdnUrl+msisdn);

     // Attempt to auntenticate
    $http.get(SERVER_CONSTANTS.host+SERVER_CONSTANTS.authMsisdnUrl+msisdn)
    .success(function(token){
      // Store the tocken and msisdn
      storeUserCredentials(LOCAL_TOKEN_KEY,token);
      storeUserCredentials('msisdn',msisdn);
       
      // Try to send the code
      $state.go('code-verification');    


    }).error(function(error){
      console.log(error);
    });
  };

  // Verify the provided token
  var verifyCode = function(code){
    var msisdn = window.localStorage.getItem('msisdn');
    $http.get(SERVER_CONSTANTS.host+SERVER_CONSTANTS.authCodeUrl+msisdn+'/'+code)
    .success(function(response){
      // if response == 1 then code is valid
      if(response == '1' ){
        storeUserCredentials('authenticated',true);
        $state.go('tabs.home');
        return true;
      }
    $ionicPopup.alert({
        title:'Error',
        content: 'You provided invalid code. Please check your sms and provide valid code'
      }).then(function(res){
        console.log('Code verification error');
      });
                
      })
    .error(function(error){
      console.log(error);
    });
  };

  return {
    login:login,
    isLoggedIn : isLoggedIn,
    verifyCode:verifyCode,
    logout: logout,
    isAuthenitcated : function(){return isAuthenitcated;},
    msisdn : function(){return msisdn;},

  }
});

// tigoApp.factory('AuthInterceptor', function ($rootScope,$q,AUTH_EVENTS) {
//   return {
//     responseError : function(response){
//        $rootScope.broadcast({
//        401: AUTH_EVENTS.notAuthenticated,
//        403: AUTH_EVENTS.notAuthorized,
//      }[response.status],response);

//        return $q.reject(response);
//     }
//   };
// });

tigoApp.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});