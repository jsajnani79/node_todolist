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
      // "lists/:id/tasks": "listTasks", 
      "lists/:id/tasks": "singleTodo",
      "new/:id": "newList"
      // "lists/103/tasks": "singleTodo"
    },
    _setupCollection: function() {
      // if(this.collection) return;
      // var data = $("#initialContent").html();
      // this.collection = new ListCollection(JSON.parse(data));

      // if(this.collection) return;//here
      // this.collection = new TaskCollection();
      // this.collection.fetch({reset:true});
      // console.log("collection: ", this.collection);//end

      // var data = $("#initialContent").html();
      // this.collection = new ListCollection(JSON.parse(data));
    },
    _renderView: function(view) {
      $(".app").html(view.render().el);
    },
    index: function() {
      var listCollection = new ListCollection();
      listCollection.fetch({reset:true});
      var view = new ListCollectionView({ collection: listCollection});
      this._renderView(view);
    },
    newList: function(id){
      console.log("CALLED NEW LIST");
      var todoCollection = new TaskCollection([], {'listId': id, 'new': true, 'title': "Your Todo List"});
      var view = new TaskCollectionView({collection: todoCollection});
      this._renderView(view);
    },
    singleTodo: function(id) {
      // var view = new ListCollectionView({ collection: this.collection});
      // this._renderView(view);
      // console.log("called single todo, id: ", id, "title: ", title);
      var todoCollection = new TaskCollection([], {'listId': id});
      todoCollection.fetch({reset:true});
      var view = new TaskCollectionView({ collection: todoCollection});
      this._renderView(view);
    },
    // listTasks: function(id){
    //   this.singleTodo(id);
    // },
    singleList: function(id) {
      this.singleTodo(id);
      // this.singleTodo(id);
    }
  });
  return Router;
});


//     "product/:id": "showProduct",
//     "product/:id/details/:did": "showDetails"

// showProduct: function(id) {
//     this.showDetails(id);
// },

// showDetails: function(id, did) {
//     // Check did for undefined

// }