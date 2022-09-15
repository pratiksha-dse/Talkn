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
    account:{
        type: String,
        required:true,
        min:1
    },
    status:{
        type:String,
        required:true,
        min:1,
    },
 
   
//    Eresources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model('Event', EventSchema);
