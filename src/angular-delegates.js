'use strict';

(function() {
    //var evtDelegate = {};
    var events = 'click.evtDelegate';// dblclick.evtDelegate mousedown.evtDelegate mouseup.evtDelegate mouseover.evtDelegate mouseout.evtDelegate mousemove.evtDelegate mouseenter.evtDelegate mouseleave.evtDelegate';

    angular.module('EventDelegate', [])
    .directive('evtDelegate', ['$parse', function ($parse) {
        return {
            link: function (scope, element, attrs) {
                element.on(events, '[data-evt-on]', function (evt) {
                    var $el = $(evt.target),
                        args = $el.data().evtOn.split(',');

                    if(args[0] === evt.type) {
                        var scope = $el.scope(),
                            fn = $parse(args[1])(scope);

                        
                        if(angular.isFunction(fn)) fn(scope);
                    }
                })
            },
            controller: ['$scope', function ($scope) {

            }]
        }
    }])
    .controller('TestCtrl', function ($scope) {
        $scope.alertSomething = function () {
            alert('something');
        }
        $scope.alertSomething2 = function () {
            alert('something2');
        }
    });

    /*angular.forEach(
        'Click Dblclick Mousedown Mouseup Mouseover Mouseout Mousemove Mouseenter Mouseleave'.split(' '),
            function(name) {
                var directiveName = 'evt' + name;
                evtDelegate[directiveName] = ['$parse', function($parse) {
                    return function(scope, element, attrs) {
                        
                        var fn = $parse(attrs[directiveName]);
                        element.bind(name.toLowerCase(), function(evt) {
                            scope.$apply(function() {
                                fn(angular.element(evt.target).scope(), {$event:evt});
                            });
                        });
                    
                    };
                }];
        }
    );*/

    
})();
