require("dotenv").config({ path: "./config.env" });
const express = require('express');
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const connection = process.env.MONGODB;
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));
const userRouter = require('./routes/User');
app.use('/user',userRouter);

const answerRouter = require('./routes/Answer');
app.use('/answer',answerRouter);

const commentRouter = require('./routes/Comment');
app.use('/comment',commentRouter);

const eventRouter = require('./routes/Event');
app.use('/event',eventRouter);

const blogRouter = require('./routes/Blog');
app.use('/blog',blogRouter);

const contactRouter = require('./routes/Contact');
app.use('/con',contactRouter);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV==='production') {
    app.use(express.static('client/build'));
}
app.listen(PORT,()=>{
    console.log('Express Server Started');
});