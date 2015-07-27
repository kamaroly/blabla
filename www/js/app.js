var tigoApp = angular.module('tigoApp', ['ionic','ngCordova','ngMessages','jett.ionic.filter.bar'])
tigoApp.run(function($ionicPlatform,$rootScope,$ionicSideMenuDelegate) {

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
        // Add some sample data to the storage
    var services = [
    {id: 0, name: "Brian Leroux", pic: "brian_leroux.jpg", title: "Developer", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {id: 1, name: "Christophe Coenraets", pic: "christophe.jpg", title: "Developer", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {id: 2, name: "Brett Rudd", pic: "brett.jpg", title: "Developer", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {id: 3, name: "Joe Bowser", pic: "joe_bowser.jpg", title: "Developer", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {id: 4, name: "Michael Brooks", pic: "mwbrooks.jpeg", title: "Developer", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {id: 5, name: "Jason Weathersby", pic: "jasonweathersby.jpeg", title: "Developer", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."},
    {id: 6, name: "Holly Schinsky", pic: "holly.jpg", title: "Developer", bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
    ];

    window.localStorage.setItem('services',JSON.stringify(services));
    
    });

     $rootScope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
});


