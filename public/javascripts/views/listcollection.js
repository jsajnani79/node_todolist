define(["backbone", "handlebars", "events", "views/list", "views/taskcollection"], function(Backbone, Handlebars, Events, ListView, TaskCollection) {
  var ListCollectionView = Backbone.View.extend({

    events: {
      "click .create": "createNewList"
    },

    initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
    },
    tagName: "ul",
    className: "lists",
    render: function() {
      this.$el.html("");
      
      


      var template = $("#listindextemplate").html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.collection.attributes);

    
      this.$el.html(html);
      // this.collection.each(function(task) {
      //   // console.log("called function each");
      //   var taskView = new TaskView({ model: task });
      //   this.$el.find("#todo-list").append(taskView.render().$el);
      // }, this);




      this.collection.each(function(list) {
        var listView = new ListView({ model: list });
        // this.$el.append(listView.render().el);
        this.$el.find("#lists").append(listView.render().$el);
      }, this);
      return this;
    }, 
    generateId: function(){
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });

      return uuid;
    },
    createNewList: function(e) {
      e.preventDefault();
      var newId = this.generateId();
      console.log(newId);

      var url = "new/"+newId;
      Events.trigger("router:navigate", url);
    }
  });

  return ListCollectionView;
});