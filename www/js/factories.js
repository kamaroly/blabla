

tigoApp.factory('ProductService', function () {

  var products = [];

  for (var i=0; i<3000; i++) {
    products[i] = {
      id: i,
      'firstName': 'Name of the product ' + i
    };

  }
  return {
    all: function () {
      return products;
    },
    get: function (productId) {

      return products[petId];
    }
  };

});

tigoApp.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  });