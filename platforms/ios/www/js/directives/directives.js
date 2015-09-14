tigoApp.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });

      // Removes bound events in the element itself
      // when the scope is destroyed
      scope.$on('$destroy', function() {
        elem.off(attr.eventFocus);
      });
    };
  });

tigoApp.directive('a', function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      if ( !attrs.href ){
        return;
      }
      var url = attrs.href;
      if ( url.lastIndexOf('http',0) === 0 ){
        element.on('click',function(e){
          e.preventDefault();
          if(attrs.ngClick){
              scope.$eval(attrs.ngClick);
          }
          window.open(encodeURI(url), '_system');
        });
      };
    }
  };
})