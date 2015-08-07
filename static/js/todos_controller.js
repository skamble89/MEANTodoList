(function(){
	var app = angular.module('todosApp',[]);

	app.controller('TodosController',function($scope, $http){
		function _success(data){
			$scope.todos = data.data;
		}

		function _error(){

		}

		$scope.get = function(){
			$http
			.get('/api/todos')
			.then(_success,_error);	
		}

		$scope.save = function(){
			$http.post('/api/todos',{
				title:'',
				description:''
			},_success,_error);
		}

		$scope.get();
	});
})();