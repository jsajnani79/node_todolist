define(["backbone", "handlebars"], function(Backbone, Handlebars) {
  var DetailedListView = Backbone.View.extend({
    render: function() {
      var template = $("#detailedlisttemplate").html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    }
  });

  return DetailedListView;
});