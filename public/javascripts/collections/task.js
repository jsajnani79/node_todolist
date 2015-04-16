define(["backbone", "models/task"], function(Backbone, Task) {
  return Backbone.Collection.extend({
    model: Task,
    // url: "/lists/103/tasks",
	url:  function(){

		// var listId = this.at(0).get("listId");
		var retVal = "/lists/" + this.listId + "/tasks";
		console.log("THIS:", retVal);
	    return "/lists/" + this.listId + "/tasks";
	},

	initialize: function(models, options) {
		console.log("options: ", options);
	        options || (options = {});
	        this.listId = options.listId;
	        this.url = "/lists/" + this.listId + "/tasks";
	        if (options.title) {
	            this.title = options.title;
	        } else {
	        	this.title = "Todo App Title"
	        };
	    }

  });
});