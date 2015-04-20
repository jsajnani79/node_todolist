define(["backbone", "handlebars", "jquery", "underscore"], function(Backbone, Handlebars, $, _) {
  var TaskView = Backbone.View.extend({

    events: {
        "click .toggle"   : "toggleDone",
        "dblclick .view"  : "edit",
        "click a.destroy" : "clear",
        "keypress .edit"  : "updateOnEnter",
        "blur .edit"      : "close"
    },

    initialize: function(options) {
        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
        return this;
    },

    render: function() {
      var template = $("#tasktemplate").html();
      var compiled = Handlebars.compile(template);
      Handlebars.registerHelper("isChecked", function(checked) {
        if(checked) return "checked = \"checked\" id=checked";
        else return "";
      });
      var html = compiled(this.model.attributes);
      this.$el.html(html);
      this.input = this.$el.find('.edit');
      return this;
    },

    edit: function() {
          console.log("EDIT CALLED");
            this.$el.addClass("editing");
            this.input.focus();
            return this;
        },

    close: function() {
        var value = this.input.val();
        console.log("value: ", value);
        if (!value) {
          this.clear();
        } else {
          this.model.save({taskName: value});
          this.$el.removeClass("editing");
        }
        return this;
    },

    toggleDone: function() {
        this.model.save({checked: !this.model.get('checked')});
        return this;
    },

    updateOnEnter: function(e) {
        if (e.keyCode == 13)
            this.close();
        return this;
    },

    clear: function() {
      this.model.destroy();
      return this;
    }

  });

  return TaskView;
});