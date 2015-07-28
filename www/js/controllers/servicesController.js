
tigoApp.controller('ServicesCtrl', function($scope,$state,$ionicFilterBar,$ionicScrollDelegate, $ionicHistory,$stateParams,CategoryRepository,ServiceRepository) {

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

  /**
   * ---------TESTING BAR SEARCH 
   */
  
     var filterBarInstance;
     
     $scope.updateServices = function() {
      ServiceRepository.all().then(function(services){
         $scope.services = services;
         console.log(services);
      });
    };

    $scope.showFilterBar = function () {
        // First refresh data
        $scope.updateServices();

        filterBarInstance = $ionicFilterBar.show({
        items: $scope.services,
        update: function (filteredItems) {
          $scope.services = filteredItems;
        }
      });
    };

    $scope.refreshItems = function () {
      
      $scope.updateServices();

      if (filterBarInstance) {

        filterBarInstance();
        filterBarInstance = null;
      }

      $timeout(function () {
        $scope.updateServices();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

  /**
   * ----- END OF TESTING 
   */
   console.log('You are in the services controller');
   var  keyword = $stateParams.keyword;
  
   if (keyword == "") {
     $scope.windowTitle = "Services";
      // Refresh services
     $scope.updateServices();
   };
    
     // Search service per category
     var getServicePerCategory = function(categoryId){  
      ServiceRepository.getByCategory(categoryId).then(function(services){
        console.log(services);
       $scope.services = services;
      });
     };
    
    // Serach service per category
     var getCategoryName = function(categoryId){
       CategoryRepository.get(categoryId).then(function(category){
        $scope.windowTitle = category.name;
      });
   
     };
     // if the user has entered number we assume that 
     // He is looking for categories
    if(keyword.match(/^\d+$/)){

      //valid integer
      getCategoryName(keyword);
       getServicePerCategory(keyword);
    }
    else if(keyword && keyword.length){
        
    }

 // Define what happens when someone wants to see more details of the service
 $scope.details = function(item){
   console.log('Want to see the details of the '+item);
   $state.go('tabs.details',{'item':item});
 };
 
});