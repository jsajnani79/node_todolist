var express = require('express');
var router = express.Router();
var fs = require('fs');

// var getData = function(filename, callback){
// 	console.log('called getData');
// 	fs.readFile(filename, function(err, data) {
//   		if(err) return; //FIX
//   		var obj = JSON.parse(data);
//   		callback(obj);
//   	});
// };

// var callback = function(data){
// 	console.log("data", data);
// };

exports.index = function(req,res){
	var file = fs.readFile('data.json', function(err, data) {
  		if(err) return; //FIX
  		// var obj = .parse(data);
    	res.render("index", {
    		appData: data
    	});
  	});
};
exports.lists = {}

exports.lists.all = function(req,res){
  var file = fs.readFile('data.json', function(err, data) {
  	if(err) return; //FIX
  	var obj = JSON.parse(data);
    res.json(obj);
  });
	// var response = getData('data.json', callback);
	// console.log(response);
	// res.json("hello");
};

exports.lists.one = function(req,res){
	var listId = req.params.id;
	var file = fs.readFile('data.json', function(err, data) {
  		if(err) return; //FIX
  		var obj = JSON.parse(data);
  		var result = obj.filter(function(obj) {
  			return (obj['id'] == listId);
  		})[0];
    	res.json(result);
  	});

 }; 

 exports.lists.create = function(req, res){

// read file then, 
	// var obj = JSON.parse(data);
 //  	obj.push({
 //  		"name": "Todo List 17", 
	// 	"id": 200,
	// 	"items": [{"value": "First Item", "checked": false}, {"value": "Second Item", "checked": false}]
 //  	});
 //  	var txt = JSON.stringify(obj);
 //  	console.log(txt);
 //  	var filePath = __dirname + '/../data.json';
 //  	fs.writeFile(filePath, txt, function(err, txt){
 //  		if (err){
 //  			return console.log(err); //FIX
 //  		}
 //  	});

 	res.json(req.body);

 };