/**
 * CATEGORIES CONTROLLER
 */
tigoApp.controller('categoryCtrl', function ($scope,$http,$state,$ionicHistory,$ionicFilterBar,CategoryRepository,ServiceRepository) { 
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


    $http.get('categories.json').success(function(data) {  
      $scope.categories = data.categories;
    });

    $scope.windowTitle = "Categories";
    /**
   * ---------TESTING BAR SEARCH 
   */
  var filterBarInstance;

    $scope.updateCategories = function(){
      CategoryRepository.all().then(function(categories){
        $scope.categories = categories;
      });
    };
    $scope.showFilterBar = function () {

        // First refresh data
        $scope.updateCategories();
        
        filterBarInstance = $ionicFilterBar.show({
        items: $scope.categories,
        update: function (filteredItems) {
          $scope.categories = filteredItems;
        }
      });

    };

    $scope.refreshItems = function () {
      if (filterBarInstance) {
        filterBarInstance();
        filterBarInstance = null;
      }

      $timeout(function () {
         $scope.updateCategories();
        $scope.$broadcast('scroll.refreshComplete');
      }, 1000);
    };

  /**
   * ----- END OF TESTING 
   */
   $scope.details = function(item){
      $state.go('tabs.services',{'keyword':item});
    };
});