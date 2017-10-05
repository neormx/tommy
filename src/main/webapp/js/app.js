(function(_window, _$, _angular, module) {'use strict';
  /**
   * compile directive factory.
   * @type undefined
   */
  var compileDirectiveFactory = (function() {
    /**
     * This directive handler.
     * @param $compile compiler service.
     */
    var handler = function($compile) {
      /**
       * Helpful directive to in-line compile angular templates in html.
       * @type Object
       */
      var directive = new Object();
      directive.restrict = 'E';
      directive.scope = {
        template : '=',
        scope : '='
      };
      /**
       * This directive link.
       * @param {Object} scope directive scope.
       * @param {Object} element DOM element reference.
       */
      directive.link = function(scope, element) {
        var replace = $compile(scope.template)(scope);
        element.replaceWith(replace);
      };
      return directive;
    };
    var dependencies = new Array();
    dependencies.push('$compile');
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * onEnter directive factory.
   * @type undefined
   */
  var onEnterDirectiveFactory = (function() {
    /**
     * This directive handler.
     */
    var handler = function() {
      /**
       * This directive definition. Evaluates an angular expression when
       * pressing 'Enter' key on an element.
       * @type Object
       */
      var directive = new Object();
      directive.restrict = 'A';
      /**
       * This directive link.
       * @param {Object} scope directive scope.
       * @param {Object} element DOM element reference.
       * @param {Object} attrs DOM element attributes.
       */
      directive.link = function(scope, element, attrs) {
        element.bind("keypress", function(event) {
          if(event.which === 13) {
            scope.$apply(function() {
              scope.$eval(attrs.onEnter);
            });
            event.preventDefault();
          }
        });
      };
      return directive;
    };
    var dependencies = new Array();
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * emptyToNull directive factory.
   * @type undefined
   */
  var emptyToNullDirectiveFactory = (function() {
    /**
     * This directive handler.
     */
    var handler = function() {
      /**
       * Helpful directive to set empty strings to null.
       * @type Object
       */
      var directive = new Object();
      directive.restrict = 'A';
      directive.require = 'ngModel';
      /**
       * This directive link.
       * @param {Object} scope directive scope.
       * @param {Object} element DOM element reference.
       * @param {Object} attrs DOM attributes reference.
       * @param {Object} ctrl control reference.
       */
      directive.link = function(scope, element, attrs, ctrl) {
        ctrl.$parsers.push(function(viewValue) {
            if(viewValue === "") {
                return null;
            }
            return viewValue;
        });
      };
      return directive;
    };
    var dependencies = new Array();
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * destroy-model directive factory.
   * @type undefined
   */
  var destroyModelDirectiveFactory = (function() {
    /**
     * This directive handler.
     * @param $parse parser service.
     */
    var handler = function($parse) {
      /**
       * Destroy control model if model ir removed from DOM.
       * @type Object
       */
      var directive = new Object();
      directive.restrict = 'A';
      /**
       * This directive link.
       * @param {Object} scope directive scope.
       * @param {Object} element DOM element reference.
       * @param {Object} attrs DOM element attributes.
       */
      directive.link = function(scope, element, attrs) {
        var model = attrs.destroyModel || attrs.ngModel;
        if (model) {
            var getter = $parse(model);
            var setter = getter.assign;
            scope.$on('$destroy', function() {
              if(typeof getter(scope) !== 'undefined') {
                  setter(scope, undefined);
              }
            });
        }
      };
      return directive;
    };
    var dependencies = new Array();
    dependencies.push('$parse');
    dependencies.push(handler);
    return dependencies;
  })();
  /**
   * Gets focus to element classified as '.appGetFocus'.
   * @param {Object} $ jquery reference.
   * @param {Object} $timeout timeout service.
   */
  _window.triggerGotFocus = function($, $timeout) {
    $timeout(function() {
      $('.appGetFocus').focus().select();
    }, 100);
  };
  /**
   * triggerGotFocus factory.
   * @param {Object} $ jquery reference.
   * @param {Object} focusGettingFunction reference to triggerGotFocus.
   */
  _window.triggerGotFocusFactory = (function($, focusGettingFunction) {
    /**
     * This phase handler.
     * @param {Object} $timeout timeout service.
     */
    var handler = function($timeout) {
      focusGettingFunction($, $timeout);
    };
    var dependencies = new Array();
    dependencies.push('$timeout');
    dependencies.push(handler);
    return dependencies;
  })(_$, _window.triggerGotFocus);
  /**
   * This module dependencies.
   * @type Array
   */
  var dependencies = new Array();
  /**
   * This module definition.
   * @type type
   */
  var mod = _angular.module(module, dependencies);
  mod.directive('onEnter', onEnterDirectiveFactory);
  mod.directive('emptyToNull', emptyToNullDirectiveFactory);
  mod.directive('destroyModel', destroyModelDirectiveFactory);
  mod.directive('compile', compileDirectiveFactory);
  mod.run(_window.triggerGotFocusFactory);
})(window, $, angular, 'app');