define(["backbone", "events", "collections/list", "views/listcollection", "views/detailedlist"], function(Backbone, Events, ListCollection, ListCollectionView, DetailedListView) {
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
      "list/:id": "singleList"
    },
    _setupCollection: function() {
      if(this.collection) return;
      var data = $("#initialContent").html();
      this.collection = new ListCollection(JSON.parse(data));
    },
    _renderView: function(view) {
      $(".app").html(view.render().el);
    },
    index: function() {
      var view = new ListCollectionView({ collection: this.collection});
      this._renderView(view);
    },
    singleList: function(id) {
      var list = this.collection.get(id);
      var view = new DetailedListView({ model: list });
      this._renderView(view);
    }
  });
  return Router;
});