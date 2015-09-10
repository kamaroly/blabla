 // Detail controller
tigoApp.controller('DetailCtrl', function($scope, $ionicScrollDelegate,$http, $ionicHistory,$stateParams,$ionicPopup,$ionicModal,helperService) {
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
            $scope.windowTitle = 'Details for '+data.services[i].name;
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
  
  $scope.getServiceDetails(serviceId);
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

  $scope.submitPayment = function() {
    $scope.modal.hide();
    $ionicPopup.alert({
      title:'Success',
      content: 'Thank you for buying'
    }).then(function(res){
      console.log('pushes took place');
    });
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
    window.open(url, '_system', 'location=yes'); 
    return false;
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
});