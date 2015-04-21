define(["backbone", "models/task"], function(Backbone, Task) {
	return Backbone.Collection.extend({
		model: Task,
		url:  function(){
			var retVal = "/lists/" + this.listId + "/tasks";
			return "/lists/" + this.listId + "/tasks";
		},

		initialize: function(models, options) {
			options || (options = {});
			this.listId = options.listId;
			this.url = "/lists/" + this.listId + "/tasks";
			if (options.title) {
				this.title = options.title;
			} 
		}, 

		parse: function(data){
			if (!data){
				this.title = "Your Todo List"
				return [];
			}
			this.title = data.name;
			var tasks = _(data.items).map(
				function(item_data){
					var task = {};
					task['taskName'] = item_data.taskName;
					task['checked'] = item_data.checked;
					return task;
				}
				);
			return tasks;
		},


		updateTitle: function(newTitle){
			if(newTitle.length > 0){
				this.title = newTitle;
			}
		}
		
	});
});