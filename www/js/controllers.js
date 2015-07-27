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

tigoApp.controller('SearchCtrl', function($scope,$state,$http, ProductService,$ionicFilterBar,$ionicScrollDelegate, $ionicHistory,$stateParams) {

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


 // Detail controller
tigoApp.controller('DetailCtrl', function($scope, $ionicScrollDelegate, $ionicHistory,$stateParams,$ionicModal,helperService,$http) {
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
  $http.get('services.json',{'serviceId':serviceId}).success(function(data) {  
        var results = [];
         for (var i = data.services.length - 1; i >= 0; i--) {
           if(data.services[i].id == serviceId){
            
            $scope.serviceDetails = data.services[i];

            $scope.windowTitle = 'Details for '+data.services[i].name;

            return true;            
           }
         };
      });
  

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


/**
 * CATEGORIES CONTROLLER
 */
tigoApp.controller('categoryCtrl', function ($scope,$http,$state,$ionicHistory,$ionicFilterBar) { 
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

    function getItems(){
      $http.get('categories.json').success(function(data){
      $scope.categories = data.categories;
     });
    };

    $scope.showFilterBar = function () {

        // First refresh data
        getItems();

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
        getItems();
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



