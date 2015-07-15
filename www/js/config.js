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
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "templates/facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html"
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
    .state('tabs.lists',{
      url: "/lists",
      views:{
        'services-tab':{
          controller : 'ListController',
          templateUrl: "templates/list.html"
        }
      }
    })
    .state('tabs.detail', {
    url: "/detail/:petsId",
    views: {
      'main': {
        controller:'DetailCtrl',
        templateUrl: "templates/detail.html"
      }
    }
  })
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/sign-in.html',
      controller: 'LoginCtrl'
    });

    $urlRouterProvider.otherwise('/sign-in');
});
