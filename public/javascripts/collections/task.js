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
	        this.getTitle();
	        if (options.title) {
	            this.title = options.title;
	        } else {
	        	this.title = "Your Todo List"
	        };
	    }, 
	 updateTitle: function(newTitle){
	 	console.log("CALLED COLLECTION UPDATE TITLE");
	 	if(newTitle.length > 0){
	 		this.title = newTitle;
	 	}
	 	console.log("updated title: ", this.title);
	 }, 

	// fetch: function (options) {
        // var resp = Backbone.Collection.prototype.fetch.call(this, options);
        // console.log("fetch response: ", resp.getAllResponseHeaders());
 //        return resp;
 //    }

	 getTitle: function(){
	 	var options = {
	 		url: '/lists/103'
	 	};
		var resp = Backbone.Collection.prototype.fetch.call(this, options);
		console.log("fetch response: ", resp);
	 	// this.get("/lists/"+this.listId);
	 }

  });
});