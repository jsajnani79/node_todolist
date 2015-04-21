var express = require('express');
var router = express.Router();
var fs = require('fs');

var dataFilePath = __dirname + '/../data.json';

exports.lists = {}
exports.tasks = {}

var writeFile = function(filePath, data){
  fs.writeFile(filePath, data, function(err, data){
    if (err) throw err;
  });
};

var readFile = function(filePath, callback, req, res, options, next){
  fs.readFile('data.json', function(err, data) {
    if(err){
      next();
    } if(data != ""){
      var obj = JSON.parse(data);
      callback(req, res, obj, next);
    } else if(options == 'Append'){
      var formData = req.body.formData;
        writeFile(dataFilePath, formData); //File does not exist yet, create and then append  
      }
    });
};

var getAllLists = function(req, res, obj, next){
  // next();
  res.json(obj);
};

var getListById = function(req, res, obj, next){
  var result = obj.filter(function(obj) {
    return (obj['id'] == listId);
  })[0];
  if(result == undefined){
    next();
  }
  console.log("RESULT: ", result);
  res.json(result);
};

var getAllTasks = function(req, res, obj, next){
  var listId = req.params.id;
  var result = obj.filter(function(obj) {
    return (obj['id'] == listId);
  })[0];
  if(result == undefined) {
    next();
  }
  res.json(result);
};

var updateExistingFile = function(req, res, obj, next){
  var formData = JSON.parse(req.body.formData)[0];
  var contained = -1;
  for (var i=0; i<obj.length; i++) {
    if (obj[i].id == formData.id) {
      contained = i;
      break;
    }
  }
  if(contained == -1){
    obj.push(formData);
  }else{
    obj[contained].name = formData.name;
    obj[contained].items = formData.items;
  }
  writeFile(dataFilePath, JSON.stringify(obj));
}

exports.index = function(req,res, next){
	var file = fs.readFile('data.json', function(err, data) {
    if(err){
      res.render("index")
    }
    res.render("index", {
      appData: data
    });
  });
};

exports.lists.all = function(req,res, next){
  readFile('data.json', getAllLists, req, res, {}, next);
};

exports.lists.one = function(req,res, next){
  readFile('data.json', getListById, req, res, {}, next);
}; 

exports.tasks.all = function(req,res, next){
  readFile('data.json', getAllTasks, req, res, {}, next);
}; 

exports.tasks.create = function(req, res, next){
  if(fs.existsSync(dataFilePath)){ //Will be deprecated, update if possible (fs.open, etc)
    readFile(dataFilePath, updateExistingFile, req, res, 'Append');
  } else{
    var formData = req.body.formData;
    writeFile(dataFilePath, formData); //File does not exist yet, create and then append
  }
  res.render('index.jade');
  res.end();
};

