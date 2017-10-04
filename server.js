var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
app.use(bodyParser.json());

var mongoose = require('mongoose');

var Todo = require('./db/task-database.js');

// API files
require('./api/get-library')(app);
require('./api/post-library')(app);

// This line directs the server to the Angular App
app.use(express.static(__dirname + "/app"));

//app.use("/", express.static(__dirname));


//PORT
var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("App running on port:", port);
}); 

// Mongoose Promise
mongoose.Promise = Promise;

// Mongoose Database Config
mongoose.connect("mongodb://heroku_8mkc7nl7:5j8nnk4ta9lpih6ktmatsg1cqa@ds149144.mlab.com:49144/heroku_8mkc7nl7");

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Database Routes

app.get("/api/todos", function(req, res) {

	Todo.find({}, function(err, data){
        if (err) return handleError(err); 
          	res.json(data);
    });

});

app.put("/api/todo", function(req, res) {

	 Todo.findByIdAndUpdate(req.body._id, {completed: req.body.completed}, function(err, post){
          if(err) return next(err);
            console.log(post);
            res.send(200);
        });

});

app.post("/api/todo", function(req, res) {

	   var newToDo = new ToDo({
            todo: req.body.todo,
            completeBy: req.body.completeBy
        });

	    newToDo.save(function(err, newTodo){
            if (err) return handleError(err);
            res.send(200);
        });

});

// Solve this route

// app.get("/", function(req, res) {
//   // res.send('app/index.html');
//   //res.render('/app/index.html');
//   //res.sendFile('/app/index.html');
//   // res.sendFile(path.join(__dirname + 'app/index.html'));

// });