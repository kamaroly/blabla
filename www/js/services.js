tigoApp.service('AuthService', function ($q,$http,USER_ROLES) {
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
    return window.localStorage.getItem(LOCAL_TOKEN_KEY);
  };
  //Store our Token in the local store
  function storeUserCredentials(token){

     window.localStorage.setItem(LOCAL_TOKEN_KEY,token);
     console.log(token);
     useCredentials(token);
  };
  // Use the user credentials
  function useCredentials(token){
    msisdn = token.split('.')[0];

    authToken = token;

    if(msisdn =='722123127'){
      role = USER_ROLES.admin;
    }

    $http.defaults.headers.common['X-Auth-token'] = token;
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

  var isAuthorized = function(authorizedRoles){
      // check if it's a valid array
      if(!angular.isArray(authorizedRoles)){
        authorizedRoles = [authorizedRoles];
      }
      return (isAuthenitcated && authorizedRoles.indexOf(role) !== -1);
  };
  var login = function(msisdn){
      if(msisdn == 722123127) {
        storeUserCredentials(msisdn +'.yourServerToken');
        return true
      }else{
        return false;
    }
  };

  return {
    login:login,
    isLoggedIn : isLoggedIn,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenitcated : function(){return isAuthenitcated;},
    msisdn : function(){return msisdn;},
    role : function(){return role;}
  }
});

tigoApp.factory('AuthInterceptor', function ($rootScope,$q,AUTH_EVENTS) {
  return {
    responseError : function(response){
       $rootScope.broadcast({
       401: AUTH_EVENTS.notAuthenticated,
       403: AUTH_EVENTS.notAuthorized,
     }[response.status],response);

       return $q.reject(response);
    }
  };
});

tigoApp.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});