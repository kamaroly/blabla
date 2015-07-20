// Registration and Signin Controller
tigoApp.controller('LoginCtrl', function($scope, $state,$ionicPopup,AuthService,helperService) {
  
  // First check if this user is already authenticated
  if(AuthService.isLoggedIn()){
    $state.go('tabs.home');
  }

  // if we reach here then the user didn't login before, let's continue with verification
  $scope.login = function(user) {
    console.log(user);
    // Check if the input is number 
    if(user == undefined || isNaN(user.msisdn)){
     var alertPopup = $ionicPopup.alert({
         title: 'You must provide your phone number!',
         template: 'Please provide your phone number before continue.'
       });
      
      alertPopup.then(function(res) {
           console.log('User did not provider msisdn');
         });  

       return false;        
     }
     
     // if we reach here it's good, let's continue with the Login process
     // attempt to login 
     if(AuthService.login(user.msisdn) == false){
        // if we reach here it means that there was an error during login
       var alertPopup = $ionicPopup.alert({
           title: 'We could not verify your phone number',
           // template: 'Please provide your phone number before continue.'
         });
        
        alertPopup.then(function(res) {
             console.log('unable to verify user\'s msisdn');
       });    
      return false;
     }     
     // if we reach here it means that the user was successfully authenticated
     $state.go('code-verification');    
  };  
});

tigoApp.controller('VerifyCode', function($scope, $state,$ionicPopup,AuthService) {
  
  $scope.verifyCode = function(user){
    AuthService.verifyCode(user.code);
  }

});

// Home controller
tigoApp.controller('HomeTabCtrl', function($scope,$state) {
    console.log('In home controller');

    $scope.search = function(key){
      console.log('searching for '+key);
      $scope.windowTitle = key;
      $state.go('tabs.services',{'keyword':key});
     };
});

tigoApp.controller('SearchCtrl', function($scope,$state, ProductService, $ionicScrollDelegate, $ionicHistory,$stateParams) {

  $scope.$on('$ionicView.afterLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeEnter', function(){
    //$ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.afterEnter', function(){
    $ionicHistory.clearCache();
  });

  console.log('You are in the search controller');
 
 // Set the window title
 $scope.windowTitle = 'Results for : '+$stateParams.keyword;

 // Define what happens when someone wants to see more details of the service
 $scope.details = function(item){

   console.log('Want to see the details of the '+item);

   $state.go('tabs.details',{'item':item});
 };
 
});
 
 // Detail controller
tigoApp.controller('DetailCtrl', function($scope, $ionicScrollDelegate, $ionicHistory,$stateParams,$ionicModal,helperService) {
  $scope.$on('$ionicView.afterLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeEnter', function(){
    //$ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.afterEnter', function(){
    $ionicHistory.clearCache();
  });
  console.log('you are in details controller for the item :'+$stateParams.item);

  $scope.windowTitle = 'Details for '+$stateParams.item;

  $scope.buyMe = function(){
    console.log('You are buying...');

    $scope.item = {'amount' : helperService.getRandomInt(1000,100000)};
    $scope.user    = {'msisdn' : window.localStorage.getItem('msisdn')};

    $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
     $scope.modal.show();
    },function(error){
      console.log(error);
    });
  }
});



