(function(){
	var module = angular.module('todos-directives', []);

	module.config(function($httpProvider){
		$httpProvider.interceptors.push(function($rootScope, $q){
			return {
				request: function(config){
					$rootScope.$broadcast('request');
					return $q.when(config);
				},
				response: function(response){
					$rootScope.$broadcast('response');
					return $q.when(response);
				},
				requestError: function(error){
					$rootScope.$broadcast('requestError`');
					return $q.reject(error);
				},
				responseError: function(error){
					$rootScope.$broadcast('responseError');
					return $q.reject(error);
				}
			};
		});
	});

	module.directive('ajaxContainer', function(){
		return {
			require: 'ngController',
			link: function(scope, element, attrs, ngController){
				var loader = $('<span>Loading...</span>');
				scope.$on('request', function(){					
					loader.appendTo(element);
				});
				scope.$on('response', function(){
					loader.remove();
				});
				scope.$on('responseError', function(){
					loader.remove();
				});
			}
		};
	});
})();