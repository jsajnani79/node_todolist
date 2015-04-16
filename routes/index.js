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

  console.log("REQ, ", req.params);


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
  console.log("req formdata: ", req.body.formData);
  var formData = req.body.formData;
  var file = fs.readFile('data.json', function(err, data) {
      if(err) return; //FIX
      var obj = JSON.parse(data);
      formData = JSON.parse(formData)[0];
console.log("FORM DATA: ", formData);
      var contained = -1;
      for (var i=0; i<obj.length; i++) {
        if (obj[i].id == formData.id) {
          contained = i;
          break;
        }
      }
      console.log("CONTAINED: ", contained);

      if(contained == -1){
        obj.push(formData);
        console.log("PUSHING NEW");
      }else{
        console.log("APPENDING");
        obj[contained].title = formData.title;
        obj[contained].items = formData.items;
      }



      // var result = obj.filter(function(obj) {
      //   retVal = (obj['id'] == formData.id);
      
      // if(retVal.length == 0){
      //   obj.push(formData);
      //   console.log("PUSHING NEW");
      // }else{
      //   console.log("APPENDING");
      //   retVal[0].title = formData.title;
      //   retVal[0].items = formData.items;
      // }
      // });
// callthis();
    // obj.push(formData[0]);
    // console.log("formData[0]", JSON.parse(formData)[0]);
    var txt = JSON.stringify(obj);
    console.log("txt: ", txt);
    var filePath = __dirname + '/../data.json';
    fs.writeFile(filePath, txt, function(err, txt){
      if (err){
        return console.log(err); //FIX
      }
 
    });

  });
  res.render('index.jade');
  res.end()
  return true;
};

exports.tasks.one.create = function(req, res){
  console.log("POST SINGLE TASK CALLED");
  return true;
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
  	// var txt = JSON.stringify(obj);
  	// console.log(txt);
  	// var filePath = __dirname + '/../data.json';
  	// fs.writeFile(filePath, txt, function(err, txt){
  	// 	if (err){
  	// 		return console.log(err); //FIX
  	// 	}
  	// });
 	res.json(req.body);
 };


