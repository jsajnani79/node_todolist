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

exports.tasks = {}
exports.tasks.all = function(req,res){
  var listId = req.params.id;
  var file = fs.readFile('data.json', function(err, data) {
      if(err) return; //FIX
      var obj = JSON.parse(data);
      var result = obj.filter(function(obj) {
        return (obj['id'] == listId);
      })[0]["items"];
      res.json(result);
    });
 }; 

exports.tasks.one = function(req,res){
  var listId = req.params.id;
  var taskId = req.params.task_id;
  // console.log(listId, "task:",taskId);
  var file = fs.readFile('data.json', function(err, data) {
      if(err) return; //FIX
      var obj = JSON.parse(data);
      var result = obj.filter(function(obj) {
        return (obj['id'] == listId);
      })[0]["items"];

      result = result.filter(function(result) {
        return (result['id'] == taskId);
      })[0];
      res.json(result);
    });
 }; 

exports.tasks.create = function(req, res){
  console.log("POST TASK CALLED");
  res.send(req);
  // console.log("request: ", req);
};

exports.tasks.one.create = function(req, res){
  console.log("POST SINGLE TASK CALLED");
  // console.log("request: ", req);
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


