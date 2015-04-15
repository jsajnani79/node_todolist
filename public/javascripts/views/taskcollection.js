define(["backbone", "handlebars", "views/task"], function(Backbone, Handlebars, TaskView) {
  var TaskCollectionView = Backbone.View.extend({
    initialize: function() {
      this.listenTo(this.collection, "reset", this.render);
    },
    tagName: "ul",
    className: "lists",

    events: {
        "keypress #new-todo":  "createOnEnter",
        "click #clear-completed": "saveAll",
        "click #toggle-all": "toggleAllComplete"

    },
  
    initialize: function(options){
      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.addAll, this);
      this.collection.on('all', this.render, this);
    },

    render: function() {
      // this.$el.html("");
      // console.log("rendering collection view");
      // console.log("collection: ", this.collection);
      // this.collection.each(function(task) {
      //   console.log("called function each");
      //   var taskView = new TaskView({ model: task });
      //   this.$el.append(taskView.render().el);
      // }, this);
      // return this;


      var template = $("#taskcollectiontemplate").html();
      var compiled = Handlebars.compile(template);
      var html = compiled(this.collection.attributes);
      console.log("view collection:", this.collection);
      this.$el.html(html);
      this.collection.each(function(task) {
        // console.log("called function each");
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
      return this;
    },


      addOne: function(task) {
          var view = new TaskView({model: task});
          this.$el.find("#todo-list").append(view.render().$el);
          return this;
      },

      addAll: function() {
          this.collection.each(this.addOne, this);
          return this;
      },

      createOnEnter: function(e) {
          if (e.keyCode != 13) return;
          if (!this.$el.find("#new-todo").val()) return;
          this.collection.create({taskName: this.$el.find("#new-todo").val(),checked:false}); // sync new model and add to our collection
          this.$el.find("#new-todo").val('');
          return this;
      },

      clearCompleted: function() {
          _.invoke(this.collection.done(), 'destroy');
          return false;
      },
      
      toggleAllComplete: function () {
          var done = this.$el.find("#toggle-all")[0].checked;
          this.collection.each(function (task) { task.save({'done': done}); });
          return this;
      }, 

      saveAll: function() {
          // Create the submission form
          var form = document.createElement( 'form' );
          form.setAttribute( "method", 'POST' )
          form.setAttribute( 'action', '/lists/103/tasks' );

          console.log("EACH")
          this.collection.each(function(task){console.log(task);});
          console.log(this.collection.title)
          console.log("END EACH")
          // Jsonify all of the models in the collection
          var itemData = []
            this.collection.each( function(post) {
              itemData.push(post.toJSON() );
          } );
          // itemData = JSON.stringify( itemData );
          var formData = [];
          formData.push({'items': itemData, 'title': this.collection.title});
          formData = JSON.stringify( formData );
          console.log("FORMDATA");
          console.log(formData);
          console.log("END FORMDATA");

          // Store the array in a hidden field
          var hidden = document.createElement( 'input' );
          hidden.setAttribute( 'type', 'hidden' );
          hidden.setAttribute( 'name', 'formData' );
          hidden.setAttribute( 'value', formData );
          form.appendChild( hidden );
          console.log(form);
          // Save to the server.
          form.submit();
          this.render;
      }


  });
  return TaskCollectionView;
});



















