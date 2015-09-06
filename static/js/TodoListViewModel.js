(function(){
	function TodoViewModel(obj){
		obj = obj || {};
		this._id = obj._id;
		this.title = ko.observable(obj.title);
		this.description = ko.observable(obj.description);
		this.completed = ko.observable(obj.completed);

		this.reset = function(){
			this.title('');
			this.description('')
			this.completed(false);
		}
	}

	function TodoListViewModel(){
		var self = this;
		self.todo = new TodoViewModel();
		self.todos = ko.observableArray();

		self.get = function(){
			$.getJSON('/api/todos', function(data){
				var todos = $.map(data, function(i){return new TodoViewModel(i);})
				self.todos(todos);
			});
		}

		self.save = function(todo){
			$.ajax({
			    type: 'POST',
			    url: '/api/todos',
			    contentType: 'application/json; charset=utf-8',
			    dataType: 'json',
			    data : ko.toJSON(self.todo),
				success : function(data){
					self.todos.push(new TodoViewModel(data[0]));
					self.todo.reset();
				}
			});			
		}

		self.delete = function(todo){
			$.ajax({
				url : '/api/todos?id=' + todo._id,			
				type : 'DELETE',
				success : function(data){
					if(data)
						self.todos.remove(function(t){ return t._id === todo._id;});
				}
			});
		}

		self.get();
	}

	ko.applyBindings(new TodoListViewModel());
})()