define(["backbone", "models/list"], function(Backbone, List) {
	return Backbone.Collection.extend({
		model: List,
		url: "/lists"
	});
});