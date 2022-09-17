const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    comment:{
        type : String,
        required : true,
        min : 1
    },
    media :{
        type : String,
        // required : true,
        min : 5
    },
    BID :{
        type : String,
        required : true,
        min : 1
    },
    email:{
        type:String,
        required:true,
        min:10
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
    date:{
        type:String,
        required:true,
        min:1
    },
    time:{
        type:String,
        required:true,
        min:1
    },
    upvote:{
        type:Number,
        required:true,
        min:0
    },
    downvote:{
        type:Number,
        required:true,
        min:0
    },
});

module.exports = mongoose.model('Comment', CommentSchema);