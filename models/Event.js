const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
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
   
   answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model('Event', EventSchema);
