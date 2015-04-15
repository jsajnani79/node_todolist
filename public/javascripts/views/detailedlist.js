define(["backbone", "handlebars"], function(Backbone, Handlebars) {
  var DetailedListView = Backbone.View.extend({
    render: function() {
      var template = $("#detailedlisttemplate").html();
      var taskPartial = $("#task-partial").html();
      var compiled = Handlebars.compile(template);
      Handlebars.registerPartial("task", taskPartial);

      Handlebars.registerHelper("isChecked", function(checked) {
        if(checked) return "checked = \"checked\"";
        else return "";
      });

      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    }
  });

  return DetailedListView;
});