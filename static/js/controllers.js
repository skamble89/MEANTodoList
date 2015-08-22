(function(){
	var app = angular.module('todosApp', ['todos-directives']);

	app.controller('TodosController',function($scope, $http){
		$scope.todo = {};

		function _error(){
			$scope.todo = {};
		}

		$scope.get = function(){
			$http
			.get('/api/todos')
			.then(function(data){
				$scope.todos = data.data;
			},_error);	
		}

		$scope.save = function(){
			$http.post('/api/todos',{
				title: $scope.todo.title,
				description: $scope.todo.description
			}).then(function(data){
				$scope.todo = {};
				$scope.todos.push(data.data[0]);
			},_error);
		}

		$scope.delete = function(id){
			$http.delete('/api/todos/',{params: {id: id}}).then(function(data){
				$scope.todos = _.filter($scope.todos,function(t){return t._id !== id;})
			},_error);
		}

		$scope.get();		
	});
})();