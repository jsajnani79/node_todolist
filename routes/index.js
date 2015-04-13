var express = require('express');
var router = express.Router();
var fs = require('fs');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

// function readJSONFile(filename, callback) {
//   fs.readFile(filename, function (err, data) {
//     if(err) {
//       callback(err);
//       return;
//     }
//     try {
//       callback(null, JSON.parse(data));
//     } catch(exception) {
//       callback(exception);
//     }
//   });
// }




exports.lists = {}

exports.lists.all = function(req,res){
  var file = fs.readFile('data.json', function(err, data) {
  	if(err) return; //FIX
    res.json(JSON.parse(data));
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