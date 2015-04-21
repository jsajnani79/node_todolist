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
	 	console.log("CALLED COLLECTION UPDATE TITLE");
	 	if(newTitle.length > 0){
	 		this.title = newTitle;
	 	}
	 	console.log("updated title: ", this.title);
	 }

	// fetch: function (options) {
        // var resp = Backbone.Collection.prototype.fetch.call(this, options);
        // console.log("fetch response: ", resp.getAllResponseHeaders());
 //        return resp;
 //    }


  });
});