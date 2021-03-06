// Require Mongoose
var mongoose = require('mongoose');

// Require Database files
var db = require('./../db/database-connect.js');
var ToDo = require('./../db/task-database.js');

// Require bluebird as promise
var Promise = require('bluebird');
mongoose.Promise = Promise;

// Function to Delete items from database
module.exports = function (app) {
    app.delete('/api/todos/:_id', function (req, res) {
        console.log(req.params._id);
        ToDo.findByIdAndRemove(req.params._id, function (err, todo) {
            if(err) return (err);
            res.redirect('/#!');
        })

    })
}