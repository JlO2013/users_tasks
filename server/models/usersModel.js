const mongoose = require('mongoose');

let tasksSchema = new mongoose.Schema({
    title: String,
    deadline: Date,
    completed: Boolean
});


let postsSchema = new mongoose.Schema({
    title: String,
    body: String
});


let usersSchema = new mongoose.Schema({
    id: Number,
    name : String,
    email : String,
    street : String,
    city : String,
    zipCode : Number,
    tasks :  [tasksSchema],
    posts :  [postsSchema]
})

const users = mongoose.model('user', usersSchema)

module.exports = users