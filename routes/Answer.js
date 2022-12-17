const express = require("express");
const answerRouter = express.Router();

const Answer= require("../models/Answer");

answerRouter.post("/addanswer", (req, res) => {
  console.log("hello1");
  const { answer, media, SEID,email,name,picture ,date,time,upvote,downvote} = req.body;

  const newAnswer = new Answer({
    answer,
    media,
    SEID,
    email,
    name,
    picture,
    date,
    time,
    upvote,
    downvote,
  });
  newAnswer.save((err) => {
    if (err) {
      console.log(err);

      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    } else
      res.status(201).json({
        message: {
          msgBody: "Answer successfully added",
          msgError: false,
        },
      });
  });
});

answerRouter.post("/delanswer", (req, res) => {
  Answer.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Answers failed to delete");
      res.status(500).json({
        message: { msgBody: "Answers failed to delete", msgError: true },
      });
    } else {
      console.log("Answers deleted successfully");
    }
  });
});
answerRouter.post("/editanswer", (req, res) => {
  Answer.findByIdAndUpdate(req.body.AID,req.body.answer, (err) => {
    if (err) {
      console.log("Answer failed to update");
      res.status(500).json({
        message: { msgBody: "Answer failed to delete", msgError: true },
      });
    } else {
      console.log("Answer edited successfully");
    }
  });
});
answerRouter.post("/answers", (req, res) => {
  console.log("Fetching answers", req.body.SEID);
  Answer.find().exec((err, document) => {
    if (err) {
      console.log("answers failed to fetch");
      res.status(500).json({
        message: { msgBody: "answers failed to fetch", msgError: true },
      });
    } else {
      console.log("answers fetched successfully");
      var reso = [];
      for (const doc of document) {
        if (doc.SEID === req.body.SEID) {
          reso.push(doc);
        }
      }
      res.status(200).json({ answers: reso });
    }
  });
});

module.exports = answerRouter;
