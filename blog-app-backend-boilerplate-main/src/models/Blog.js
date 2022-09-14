const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic : {type :String, required : true},
    description : {type: String, required : true},
    posted_by : {type: String, required : true},
},{timestamps:{createdAt:"posted_at"}})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;