define(["backbone", "views/list"], function(Backbone, ListView) {
  var ListCollectionView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
    },
    tagName: "ul",
    className: "lists",
    render: function() {
      this.$el.html("");
      
      this.collection.each(function(list) {
        var listView = new ListView({ model: list });
        this.$el.append(listView.render().el);
      }, this);
      return this;
    }
  });

  return ListCollectionView;
});