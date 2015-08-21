(function(){
	var module = angular.module('todos-directives', []);

	module.config(function($httpProvider){
		$httpProvider.interceptors.push(function($rootScope){
			return {
				request: function(config){
					$rootScope.$broadcast('request');
					return config;
				},
				response: function(response){
					$rootScope.$broadcast('response');
					return response;
				},
				requestError: function(error){
					$rootScope.$broadcast('requestError`');
					return error;
				},
				responseError: function(error){
					$rootScope.$broadcast('responseError');
					return error;
				}
			};
		});
	});

	module.directive('ajaxContainer', function(){
		return {
			link: function(scope, element, attrs){
				var loader = $('<span>Loading...</span>');
				scope.$on('request', function(){					
					loader.appendTo(element);
				});
				scope.$on('response', function(){
					loader.remove();
				});
			}
		};
	});
})();