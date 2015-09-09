var tigoApp = angular.module('tigoApp', ['ionic','ngCordova','ngMessages','jett.ionic.filter.bar'])
tigoApp.run(function($ionicPlatform,$rootScope,$ionicSideMenuDelegate,$cordovaSQLite,$cordovaKeyboard) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

     if(window.cordova && window.cordova.loggger){
        window.cordova.loggger.__onDeviceReady();
     }

    /**
     * Create database if we don't have it 
     * 
     */
    
    if(window.cordova) {
      // App syntax
      db = $cordovaSQLite.openDB(databaseName);
    } else {
      // Ionic serve syntax
      db = window.openDatabase(databaseName, "1.0", "imbeheApp", -1);
    }
    $cordovaSQLite.execute(db,createServicesTable);  
    $cordovaSQLite.execute(db,createServiceLinksTable);  
    $cordovaSQLite.execute(db,createCategoriesTable);
    $cordovaSQLite.execute(db,createSettingsTable);
    });

 });


