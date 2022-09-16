const express = require("express");
const commentRouter = express.Router();

const Comment= require("../models/Comment");

commentRouter.post("/addcomment", (req, res) => {
  console.log("hello1");
  const { comment, media, BID,email,name,picture ,date,time,upvote,downvote} = req.body;

  const newComment = new Comment({
    comment,
    media,
    BID,
    email,
    name,
    picture,
    date,
    time,
    upvote,
    downvote,
  });
  newComment.save((err) => {
    if (err) {
      console.log(err);

      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    } else
      res.status(201).json({
        message: {
          msgBody: "Comment successfully added",
          msgError: false,
        },
      });
  });
});

commentRouter.post("/delcomment", (req, res) => {
  Comment.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Comment failed to delete");
      res.status(500).json({
        message: { msgBody: "Comment failed to delete", msgError: true },
      });
    } else {
      console.log("Comment deleted successfully");
    }
  });
});
commentRouter.post("/editcomment", (req, res) => {
  Comment.findByIdAndUpdate(req.body.CID,req.body.comment, (err) => {
    if (err) {
      console.log("Comment failed to update");
      res.status(500).json({
        message: { msgBody: "Comment failed to delete", msgError: true },
      });
    } else {
      console.log("Comment deleted successfully");
    }
  });
});
commentRouter.post("/comments", (req, res) => {
  console.log("Fetching comments", req.body.BID);
  Comment.find().exec((err, document) => {
    if (err) {
      console.log("comments failed to fetch");
      res.status(500).json({
        message: { msgBody: "comments failed to fetch", msgError: true },
      });
    } else {
      console.log("comments fetched successfully");
      var comm = [];
      for (const doc of document) {
        if (doc.BID === req.body.BID) {
          comm.push(doc);
        }
      }
      res.status(200).json({ comments: comm });
    }
  });
});

module.exports = commentRouter;
