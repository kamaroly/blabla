 // Detail controller
tigoApp.controller('DetailCtrl', function($scope, $ionicScrollDelegate, $ionicHistory,$stateParams,$ionicModal,helperService,ServiceRepository,ServiceLinksRepository) {
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
        
        $scope.windowTitle = service.name;
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