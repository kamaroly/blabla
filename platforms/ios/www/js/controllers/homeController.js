// Home controller
tigoApp.controller('HomeTabCtrl', function($scope,$state) {
  $scope.search = function(keyword){
      console.log('searching for '+keyword);
      $scope.windowTitle = keyword;
      $state.go('tabs.services',{'keyword':keyword});
    };

     // Define what happens when someone wants to see more details of the service
 $scope.details = function(item){
   console.log('Want to see the details of the '+item);
   $state.go('tabs.details',{'item':item});
 };
 
});