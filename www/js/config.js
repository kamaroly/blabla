tigoApp.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
// Start by providing configuratiosn 
$ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    })
    .state('tabs.products',{
      url: "/products",
       views: {
        'services-tab': {
          templateUrl: "templates/product-details.html"
        }
      }
    })
    .state('tabs.services',{
      url: "/services/:keyword",
      views:{
        'services-tab':{
          controller : 'SearchCtrl',
          templateUrl: "templates/services.html"
        }
      }
    })
    .state('tabs.details', {
    url: "/detail/:item",
    views: {
      'services-tab': {
        controller:'DetailCtrl',
        templateUrl: "templates/detail.html"
      }
    }
  })
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'LoginCtrl'
    })
    .state('code-verification',{
      url:'/code-verification',
      templateUrl:'templates/code-verification.html',
      controller:'VerifyCode'
    });
    
    $urlRouterProvider.otherwise('/sign-in');
});
