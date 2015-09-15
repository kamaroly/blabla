 // Detail controller
tigoApp.controller('DetailCtrl', function($scope, $ionicScrollDelegate,$http,$ionicLoading, $ionicHistory,$stateParams,$ionicPopup,$ionicModal,helperService,SERVER_CONSTANTS) {
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

  var serviceId = $stateParams.item;
  
  // Get the service we are looking for
  $scope.getServiceDetails = function(){
      $http.get('services.json',{'serviceId':serviceId}).success(function(data) {  
        var results = [];
         for (var i = data.services.length - 1; i >= 0; i--) {
           if(data.services[i].id == serviceId){
            $scope.serviceDetails = data.services[i];
            $scope.serviceLinks = data.services[i].services; 
            $scope.windowTitle = data.services[i].name;
            return true;            
           }
         };
      });
  };
  $scope.contact = function(){

    $ionicModal.fromTemplateUrl('templates/contact.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.modal = modal;
     $scope.modal.show();
    },function(error){
      console.log(error);
    });
  }
  $scope.sendingNotification = function(){
     $scope.showLoading("You are giving feedback for "+$scope.serviceDetails.name+"...");
     setTimeout(function() {
      $scope.hideLoading();
      $scope.notification("Thank you for your feedback.");
     }, 3000);
  }
  
  $scope.getServiceDetails(serviceId);

  $scope.pay = function (){
    $scope.showLoading("You are buying "+$scope.serviceDetails.name+"...");
     $http.get(SERVER_CONSTANTS.host+SERVER_CONSTANTS.airtimeProductsUrl+$scope.user.msisdn+'/'+$scope.serviceDetails.product_id)
    .success(function(results){
        $scope.hideLoading();
        console.log(results);
        $scope.notification(results);
    }).error(function(error){
      $scope.hideLoading();
      console.log(error);
      $scope.notification(error);
    });
  };

  $scope.buyMe = function(){
    console.log('You are buying...');
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

  $scope.submitPayment = function() {
    
    if (typeof $scope.user.pin == 'undefined' || typeof $scope.serviceDetails.price =='undefined') 
      {
        var error = '<p class="item assertive">Invaild Pin or Amount</p>';
        $scope.notification(error);
        return ;
      };
    $scope.showLoading('paying with Tigo Cash....');
    // Attempt to buy  {msisdn}/{amount}/{code}/{company}
    $http.get(SERVER_CONSTANTS.host+SERVER_CONSTANTS.mfsPaymentUrl+$scope.user.msisdn+'/'+$scope.serviceDetails.price+'/'+$scope.user.pin+'/'+$scope.serviceDetails.company_msisdn)
    .success(function(results){
        $scope.hideLoading();
        console.log(results);
        $scope.notification(results);
    }).error(function(error){
      $scope.hideLoading();
      console.log(error);
      $scope.notification(error);
    });
  };

  $scope.notification = function(message){
    $scope.modal.hide();
    $ionicPopup.alert({
      title:'Notification',
      content: message
    }).then(function(res){
      console.log('all went well');
    });
  };

  $scope.showLoading = function(message) {
    $ionicLoading.show({
      template: message+'...'
    });
  };
   $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });


  $scope.openInBrowser = function(url){
    console.log(url);
    window.open(url, '_system', 'location=yes'); 
  };

});