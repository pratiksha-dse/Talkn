const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
    title: {
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
    contact:{
        type: String,
        required:true,
        min:1
    },
    email:{
        type: String,
        required:true,
        min:1
    },
    status:{
        type:String,
        required:true,
        min:1,
    },
 
   
   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
});

module.exports = mongoose.model('Blog', EventSchema);
