define(["backbone", "handlebars"], function(Backbone, Handlebars) {
  var TaskView = Backbone.View.extend({
    render: function() {
      var template = $("#tasktemplate").html();
      // var taskPartial = $("#task-partial").html();
      var compiled = Handlebars.compile(template);
      // Handlebars.registerPartial("task", taskPartial);

      // Handlebars.registerHelper("isChecked", function(checked) {
      //   if(checked) return "checked = \"checked\"";
      //   else return "";
      // });

      var html = compiled(this.model.attributes);
      this.$el.html(html);
      return this;
    }
  });

  return TaskView;
});