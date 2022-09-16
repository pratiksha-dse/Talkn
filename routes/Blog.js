const express = require("express");
const blogRouter = express.Router();

const Blog = require("../models/Blog");

blogRouter.post("/addblog", (req, res) => {
  console.log("doing2");
  const { title,tag, img, date, time,  description,email,name,picture,upvote,downvote } = req.body;

  const newBlog = new Blog({
    title:title,
    tag:tag,
    img:img,
    date:date,
    time:time,
    description:description,
    email:email,
    name:name,
    picture:picture,
    upvote:upvote,
    downvote:downvote,
  });
  
console.log("adding blog",newBlog)
  newBlog.save((err) => {
    console.log("err",err)
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Blog successfully added",
          msgError: false,
        },
      });
  });
});

blogRouter.post("/delblog", (req, res) => {
  Blog.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Blog failed to delete");
      res.status(500).json({
        message: { msgBody: "Blog failed to delete", msgError: true },
      });
    } else {
      console.log("Blog deleted successfully");
    }
  });
});
blogRouter.post("/editblog", (req, res) => {
  console.log(req.body.blog)
  Blog.findByIdAndUpdate(req.body.BID, req.body.blog, (err) => {
    if (err) {
      console.log("Blog failed to update");
      res.status(500).json({
        message: { msgBody: "Blog failed to update", msgError: true },
      });
    } else {
      console.log("Blog updated successfully");
    }
  });
});


blogRouter.get("/blogs", (req, res) => {
  console.log("Fetching Blogs");
  Blog.find().exec((err, document) => {
    if (err) {
      console.log("Blogs failed to fetch");
      res.status(500).json({
        message: { msgBody: "Blogs failed to fetch", msgError: true },
      });
    } else {
      console.log("Blogs fetched successfully");
      res.status(200).json({ blogs: document });
    }
  });
});
blogRouter.post("/getblogbyid", (req, res) => {
  console.log("Fetching blog");
  Blog.findById(req.body._id).exec((err, document) => {
    if (err) {
      console.log("Blogs failed to fetch");
      res.status(500).json({
        message: { msgBody: "Blogs failed to fetch", msgError: true },
      });
    } else {
      console.log("Blogs fetched successfully");
      res.status(200).json({ blog: document });
    }
  });
});
module.exports = blogRouter;
