 // Detail controller
tigoApp.controller('DetailCtrl', function($scope, $ionicScrollDelegate, $ionicHistory,$stateParams,$ionicPopup,$ionicModal,helperService,ServiceRepository,ServiceLinksRepository) {
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
  
  // Get service details 
  $scope.getServiceDetails = function(serviceId){
     ServiceRepository.get(serviceId).then(function(service){
        $scope.serviceDetails = service;
       $scope.windowTitle = service.name;
        //Get service details
        ServiceLinksRepository.getByService(service.id)
            .then(function(links){
              $scope.serviceLinks = links;
            });
        
        // Get service related services 
        ServiceRepository.getRelated(service.category_id)
            .then(function(relatedServices){
              $scope.relatedServices = relatedServices;
            });
      });
  };
  
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
      console.log('pushes is fureshi');
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