var List = Backbone.Model.extend({
	// idAttribute: "id"
});

var ListCollection = Backbone.Collection.extend({
	model: List,
	url: "/lists"
});

var ListView = Backbone.View.extend({
	tagName: "li",
	classname: "list",
	render: function(){
		var template = $("#listtemplate").html();
		var compiled = Handlebars.compile(template);
		var html = compiled(this.model.attributes);
		this.$el.html(html);
		return this;
	}
});

var ListCollectionView = Backbone.View.extend({
	initialize:  function(){
		this.listenTo(this.collection, "reset", this.render);
	},
	tagName: "ul",
	className: "lists", 
	render: function(){
		this.$el.html("");
		this.collection.each(function(list){
			var listView = new ListView({model: list});
			this.$el.append(listView.render().el);
		}, this);
		return this;
	}
});

var AppRouter = Backbone.Router.extend({
	initialize: function(){
		this._setupCollection();
	},
	routes: {
		"": "index",
		"list/:id": "singleList"
	}, 
	_setupCollection: function(){
		if(this.collection) return;
		var data = $("#initialContent").html();
		this.collection = new ListCollection(JSON.parse(data));
	},
	_renderView: function(view){
		$(".app").html(view.render().el);
	},
	index: function(){
		var view = new ListCollectionView({collection: this.collection});
		this._renderView(view);
	},
	singleList: function(id){

	}
});