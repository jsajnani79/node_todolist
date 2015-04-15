define(["backbone", "events", "collections/list", "views/listcollection", "views/detailedlist", "views/taskcollection", "views/task", "collections/task"
  ], function(Backbone, Events, ListCollection, ListCollectionView, DetailedListView, TaskCollectionView, TaskView, TaskCollection) {
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
      "lists/103/tasks": "singleTodo"
    },
    _setupCollection: function() {
      // if(this.collection) return;
      // var data = $("#initialContent").html();
      // this.collection = new ListCollection(JSON.parse(data));
      if(this.collection) return;
      this.collection = new TaskCollection();
      this.collection.fetch({reset:true});
      console.log("collection: ", this.collection);
      // var data = $("#initialContent").html();
      // this.collection = new ListCollection(JSON.parse(data));
    },
    _renderView: function(view) {
      $(".app").html(view.render().el);
    },
    index: function() {
      // var view = new ListCollectionView({ collection: this.collection});
      // this._renderView(view);
      var view = new TaskCollectionView({ collection: this.collection});
      this._renderView(view);
    },
    singleTodo: function() {
      // var view = new ListCollectionView({ collection: this.collection});
      // this._renderView(view);
      console.log("called single todo");
      var view = new TaskCollectionView({ collection: this.collection});
      this._renderView(view);
    },
    singleList: function(id) {
      // var list = this.collection.get(id);
      // var view = new DetailedListView({ model: list });
      // this._renderView(view);
      // var task = this.collection.get(id);
      // var view = new DetailedListView({ model: list });
      // this._renderView(view);
    }
  });
  return Router;
});