/*global angular */
/*
 jQuery UI datepick plugin wrapper

 @param [ui-date] {object} Options to pass to $.fn.datepick() merged onto ui.config
 */

angular.module('ui.directives.date', ['ui.directives'])

.directive('uiDate', ['ui.config', function (uiConfig) {
  'use strict';
  var options;
  options = {};
  if (angular.isObject(uiConfig.date)) {
    angular.extend(options, uiConfig.date);
  }
  return {
    require:'?ngModel',
    link:function (scope, element, attrs, controller) {
      var getOptions = function () {
        return angular.extend({}, uiConfig.date, scope.$eval(attrs.uiDate));
      };
      var initDateWidget = function () {
        var opts = getOptions();

        // If we have a controller (i.e. ngModelController) then wire it up
        if (controller) {
          var updateModel = function () {
             if (!scope.$$phase) scope.$apply(function () {
              var date = element.datepick("getDate")[0];
              element.datepick("setDate", element.val());
              controller.$setViewValue(date[0]);
            });
console.log(scope);
         };
          if (opts.onSelect) {
            // Caller has specified onSelect, so call this as well as updating the model
            var userHandler = opts.onSelect;
            opts.onSelect = function (value, picker) {
              updateModel();
              return userHandler(value, picker);
            };
          } else {
            // No onSelect already specified so just update the model
            opts.onSelect = updateModel;
          }
          // In case the user changes the text directly in the input box
          element.bind('change', updateModel);

          // Update the date picker when the model changes
          controller.$render = function () {
            var date = controller.$viewValue;
            if ( date && !angular.isDate(date) ) {
              throw new Error('ng-Model value must be a Date object - currently it is a ' + typeof date + ' - use ui-date-format to convert it from a string');
            }
            element.datepick("setDate", date);
          };
        }
        // If we don't destroy the old one it doesn't update properly when the config changes
        element.datepick('destroy');
        // Create the new datepick widget
        element.datepick(opts);
        // Force a render to override whatever is in the input text box
        controller.$render();
      };
      // Watch for changes to the directives options
      scope.$watch(getOptions, initDateWidget, true);
    }
  };
}
])

.directive('uiDateFormat', [function() {
  var directive = {
    require:'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      if ( attrs.uiDateFormat === '' ) {
        // Default to ISO formatting
        modelCtrl.$formatters.push(function(value) {
          return new Date(value);
        });
        modelCtrl.$parsers.push(function(value){
          return value.toISOString();
        });
      } else {
        var format = attrs.uiDateFormat;
        // Use the datepick with the attribute value as the format string to convert to and from a string
        modelCtrl.$formatters.push(function(value) {
          return $.datepick.parseDate(format, value);
        });
        modelCtrl.$parsers.push(function(value){
          return $.datepick.formatDate(format, value);
        });
      }
    }
  };
  return directive;
}]);
