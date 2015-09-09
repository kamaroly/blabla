tigoApp.controller('VerifyCode', function($scope, $state,$ionicPopup,AuthService,ServiceRepository,ServiceLinksRepository,CategoryRepository,SettingRepository) {
  $scope.services = [];
  $scope.services = null;

  $scope.seedDatabase = function(){
    ServiceRepository.countAll().then(function(count){
      //We need to seed only if we don't have records 
      //in the database
      // if (count<1) {
        SettingSeeding.forEach(function(setting,index){
          SettingRepository.add(setting);
        });
        
       CategoriesSeeding.forEach(function(category,index){
          $scope.createNewCategory(category);
        });

         ServicesSeeding.forEach(function(service, index){
         ServiceLInksSeeding.forEach(function(serviceLink){
         serviceLink.service_id = Math.floor(Math.random()*9)+1;
         ServiceLinksRepository.add(serviceLink);
         });             

         $scope.createNewService(service);
     
      });
 
      // };
    });
  }
  $scope.seedDatabase();

  $scope.updateServices = function() {
    ServiceRepository.all().then(function(services){
      $scope.services = services;
      $scope.servicesCount = services.length;
    });
  }
  $scope.updateCategories = function(){
      CategoryRepository.all().then(function(categories){
        $scope.categories = categories;
        $scope.categoriesCount = categories.length;
      });
    }

  $scope.updateCategories();
  $scope.updateServices();

  $scope.createNewService = function(service) {
    ServiceRepository.add(service);
    $scope.updateServices();
  };
  

  $scope.createNewCategory = function(category){
    CategoryRepository.add(category);
  };
  
  $scope.removeService = function(service) {
    ServiceRepository.remove(service);
    $scope.updateServices();
  };
  
  $scope.editService = function(orginalService, editService) {
    ServiceRepository.update(orginalService, editService);
    $scope.updateServices();
  };


  $scope.verifyCode = function(user){
    if (typeof user  === 'undefined') {
       console.log('error happened');
       $ionicPopup.alert({
        title:'Error',
        content: 'You provided invalid code. Please check your sms and provide valid code'
      }).then(function(res){
        console.log('Code verification error');
      });
    	return false;
    };
    AuthService.verifyCode(user.code);
  }
});
