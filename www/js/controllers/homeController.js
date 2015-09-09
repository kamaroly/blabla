// Home controller
tigoApp.controller('HomeTabCtrl', function($scope,$state) {
  $scope.search = function(keyword){
      console.log('searching for '+keyword);
      $scope.windowTitle = keyword;
      $state.go('tabs.services',{'keyword':keyword});
    };
});