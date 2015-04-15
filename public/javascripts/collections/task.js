define(["backbone", "models/task"], function(Backbone, Task) {
  return Backbone.Collection.extend({
    model: Task,
    url: "/lists/103/tasks",
	initialize: function(models, options) {
	        options || (options = {});
	        if (options.title) {
	            this.title = options.title;
	        } else {
	        	this.title = "Todo App Title"
	        };
	    }
  });
});