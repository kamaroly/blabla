tigoApp.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterceptor');
});