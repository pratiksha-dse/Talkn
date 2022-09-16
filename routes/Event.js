const express = require("express");
const eventRouter = express.Router();

const Event = require("../models/Event");

eventRouter.post("/addevent", (req, res) => {
  console.log("doing2");
  const { tag, img, date, time,  description,email ,name,picture} = req.body;
  // const { title,  date,time,reglink,description} = req.body;

  const newEvent = new Event({
    tag:tag,
    img:img,
    date:date,
    time:time,
    description:description,
    email:email,
    name:name,
    picture:picture,

  });
  
console.log("adding event",newEvent)
  newEvent.save((err) => {
    console.log("err",err)
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "Event successfully added",
          msgError: false,
        },
      });
  });
});

eventRouter.post("/delevent", (req, res) => {
  Event.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Event failed to delete");
      res.status(500).json({
        message: { msgBody: "Event failed to delete", msgError: true },
      });
    } else {
      console.log("Event deleted successfully");
    }
  });
});
eventRouter.post("/editevent", (req, res) => {
  console.log(req.body.event)
  Event.findByIdAndUpdate(req.body.SEID, req.body.event, (err) => {
    if (err) {
      console.log("Event failed to update");
      res.status(500).json({
        message: { msgBody: "Event failed to update", msgError: true },
      });
    } else {
      console.log("Event updated successfully");
    }
  });
});


eventRouter.get("/events", (req, res) => {
  console.log("Fetching Events");
  Event.find().exec((err, document) => {
    if (err) {
      console.log("Events failed to fetch");
      res.status(500).json({
        message: { msgBody: "Events failed to fetch", msgError: true },
      });
    } else {
      console.log("Events fetched successfully");
      res.status(200).json({ events: document });
    }
  });
});
eventRouter.post("/geteventbyid", (req, res) => {
  console.log("Fetching Event");
  Event.findById(req.body._id).exec((err, document) => {
    if (err) {
      console.log("Events failed to fetch");
      res.status(500).json({
        message: { msgBody: "Events failed to fetch", msgError: true },
      });
    } else {
      console.log("Events fetched successfully");
      res.status(200).json({ event: document });
    }
  });
});
module.exports = eventRouter;
