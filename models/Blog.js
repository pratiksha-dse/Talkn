const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:1,
    },
    tag: {
        type: String,
        required: true,
        min: 1,
    },
    img: {
        type: String,
        required: true,
        min: 1
    },
    date: {
        type: String,
        required: true,
        min: 1
    },
    time: {
        type: String,
        required: true,
        min: 1
    },

    description: {
        type: String,
        required: true,
        min: 1
    },
    email:{
        type: String,
        required:true,
        min:1
    },
    name:{
        type:String,
        required:true,
        min:1
    },
    picture:{
        type:String,
        required:true,
        min:1
    },
    upvote:{
        type:Number,
        reuired:true,
        min:0
    },
    downvote:{
        type:Number,
        reuired:true,
        min:0
    },
   
   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

module.exports = mongoose.model('Blog', BlogSchema);
