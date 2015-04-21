define(["backbone", "handlebars", "views/task"], function(Backbone, Handlebars, TaskView) {
  var TaskCollectionView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
    },
    
    tagName: "ul",
    
    className: "lists",

    events: {
      "keypress #new-todo":  "createOnEnter",
      "click #save-tasks": "saveAll",
      "dblclick .list-title"  : "edit",
      "keypress .edit-title"  : "updateTitleOnEnter",
      "blur .edit-title"      : "updateTitle",
    },

    initialize: function(options){
      this.collection.on('all', this.render, this);
    },

    edit: function() {
      this.$el.addClass("editing-title");
      this.input.focus();
      return this;
    },

    render: function() {
      var template = $("#taskcollectiontemplate").html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.collection.attributes);
      this.$el.html(html);

      this.$el.find("#title").append(this.collection.title).$el;
      
      this.collection.each(function(task) {
        var taskView = new TaskView({ model: task });
        this.$el.find("#todo-list").append(taskView.render().$el);
      }, this);

      if (this.collection.length) {
        this.$el.find("#main").show();
        this.$el.find("footer").show();
      } else {
        this.$el.find("#main").hide();
        this.$el.find("footer").hide();
      }

      this.input = this.$el.find('.edit-title');

      return this;
    },

    updateTitle: function(){
      var value = this.input.val();
      this.$el.removeClass("editing-title");
      if (/\d/.test(value) || /[a-zA-Z]/.test(value)) {
          this.collection.title = value;
          this.collection.updateTitle(value);
          this.$el.find("#title").text(this.collection.title);
        }
        return this;
      },

    updateTitleOnEnter: function(e) {
      if (e.keyCode == 13)
        this.updateTitle();
      return this;
    },

    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      var value = this.$el.find("#new-todo").val();
      if (!value) return;
      if (/\d/.test(value) || /[a-zA-Z]/.test(value)) {
          this.collection.create({taskName: value,checked:false}); // sync new model and add to our collection
        }
        this.$el.find("#new-todo").val('');
        return this;
      },

      saveAll: function() {
        // Create the submission form
        var form = document.createElement( 'form' );
        form.setAttribute( "method", 'POST' )
        form.setAttribute( 'action', '/' );
        var formData = [];
        formData.push({'items': this.collection, 'name': this.collection.title, 'id': this.collection.listId});
        formData = JSON.stringify(formData);

        // Store the array in a hidden field
        var hidden = document.createElement( 'input' );
        hidden.setAttribute( 'type', 'hidden' );
        hidden.setAttribute( 'name', 'formData' );
        hidden.setAttribute( 'value', formData );
        form.appendChild( hidden );

        // Save to the server.
        form.submit();
        return false;
      }

    });

  return TaskCollectionView;

});



















