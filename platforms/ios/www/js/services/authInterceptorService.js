tigoApp.factory('AuthInterceptor',['$rootScope','$q','AUTH_EVENTS',function ($rootScope,$q,AUTH_EVENTS) {
  return {
    responseError : function(response){
       $rootScope.$broadcast({
       401: AUTH_EVENTS.notAuthenticated,
       403: AUTH_EVENTS.notAuthorized,
     }[response.status],response);

       return $q.reject(response);
    }
  };
}]);