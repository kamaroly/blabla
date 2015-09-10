
tigoApp.controller('ServicesCtrl', function($scope,$http,$state,$ionicFilterBar,$ionicScrollDelegate, $ionicHistory,$stateParams,CategoryRepository,ServiceRepository) {

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

    function getItems(){
      $http.get('services.json').success(function(data){
        $scope.services = data.services;
     });
    };

    $scope.showFilterBar = function () {
        // First refresh data
         $http.get('services.json').success(function(data){
        $scope.services = data.services;
     });
        filterBarInstance = $ionicFilterBar.show({
        items: $scope.services,
        update: function (filteredItems) {
          $scope.services = filteredItems;
        }
      });
    };

    $scope.refreshItems = function () {
      
      getItems();
      if (filterBarInstance) {

        filterBarInstance();
        filterBarInstance = null;
      }

      $timeout(function () {
        getItems();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

  /**
   * ----- END OF TESTING 
   */
   console.log('You are in the search controller');
   var  keyword = $stateParams.keyword;
   
   $scope.windowTitle = keyword;

   if (keyword == "") {
     $scope.windowTitle = "Services";
   };
     // Refresh services
     getItems();

    // Search service per category
     var getServicePerCategory = function(categoryId){
      
      $http.get('services.json',{'categoryId':categoryId}).success(function(data) {  
        var results = [];
         for (var i = data.services.length - 1; i >= 0; i--) {
           if(data.services[i].category_id == categoryId){
            results.push(data.services[i]);
           }
         };
        $scope.services = results;
      });
     };
    
    // Serach service per category
     var getCategoryName = function(categoryId){
      
      $http.get('categories.json',{'categoryId':categoryId}).success(function(data) {  
         for (var i = data.categories.length - 1; i >= 0; i--) {
           if(data.categories[i].id == categoryId){
              $scope.windowTitle = data.categories[i].name;
              return data.categories;
           }
         };
        });
     };
   // if the user has entered number we assume that 
   // He is looking for categories
    if(keyword.match(/^\d+$/)){
      //valid integer
      getCategoryName(keyword);
      $scope.services = getServicePerCategory(keyword);
    }
    else if(keyword && keyword.length){
        
    }

 // Define what happens when someone wants to see more details of the service
 $scope.details = function(item){

   console.log('Want to see the details of the '+item);
 
   $state.go('tabs.details',{'item':item});
 };
 
});