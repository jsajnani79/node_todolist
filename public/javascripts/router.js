define(["backbone", "events", "jquery","collections/list", "views/listcollection", "views/taskcollection", "views/task", "collections/task"
  ], function(Backbone, Events, $, ListCollection, ListCollectionView, TaskCollectionView, TaskView, TaskCollection) {
  var Router = Backbone.Router.extend({
    
    initialize: function() {
      var self = this;
      this._setupCollection();
      Events.on("router:navigate", function(url) {
        self.navigate(url, { trigger: true });
      });
    },

    routes: {
      "": "index",
      "lists/:id": "singleList",
      "lists/:id/tasks": "singleTodo",
      "new/:id": "newList",
      "*actions" : "pageNotFound"
    },

    pageNotFound: function () {
      $('.app').html('404: Sorry, the page you requested was not found');
    },

    _setupCollection: function() {
    },

    _renderView: function(view) {
      $(".app").html(view.render().el);
    },

    index: function() {
      var listCollection = new ListCollection();
      listCollection.fetch({reset:true,   error: function(model, xhr, options) {
    console.log("something went wrong!");
  }});
      var view = new ListCollectionView({ collection: listCollection});
      this._renderView(view);
    },

    newList: function(id){
      var todoCollection = new TaskCollection([], {'listId': id, 'new': true, 'title': "Your Todo List"});
      var view = new TaskCollectionView({collection: todoCollection});
      this._renderView(view);
    },

    singleTodo: function(id) {
      var todoCollection = new TaskCollection([], {'listId': id});
      todoCollection.fetch({reset:true, error: function(model, xhr, options) {
    console.log("something went wrong!");
  }});
      var view = new TaskCollectionView({ collection: todoCollection});
      this._renderView(view);
    },

    singleList: function(id) {
      this.singleTodo(id);
    }

  });

  return Router;

});