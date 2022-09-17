const mongoose = require('mongoose');
const AnswerSchema = new mongoose.Schema({
    answer :{
        type : String,
        required : true,
        min : 1
    },
    media :{
        type : String,
        // required : true,
        min : 5
    },
    SEID :{
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
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

module.exports = mongoose.model('Answer', AnswerSchema);