define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events) {
  var ListView = Backbone.View.extend({
    events: {
      "click .name": "singleListLink"
    },
    tagName: "li",
    className: "list",
    render: function() {
      var template = $("#listtemplate").html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    },
    singleListLink: function(e) {
      e.preventDefault();
      var id = this.model.get("id");
      var url = "lists/" + id + "/tasks";
      Events.trigger("router:navigate", url);
    }
  });

  return ListView;
});