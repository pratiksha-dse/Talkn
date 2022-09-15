const express = require("express");
const resourceRouter = express.Router();

const Resource = require("../models/Resource");

resourceRouter.post("/addresource", (req, res) => {
  console.log("hello1");
  const { title, description, media, SEID } = req.body;

  const newResource = new Resource({
    title,
    description,
    media,
    SEID,
  });
  newResource.save((err) => {
    if (err) {
      console.log(err);

      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    } else
      res.status(201).json({
        message: {
          msgBody: "Resource successfully added",
          msgError: false,
        },
      });
  });
});

resourceRouter.post("/delresource", (req, res) => {
  Resource.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("Resources failed to delete");
      res.status(500).json({
        message: { msgBody: "Resources failed to delete", msgError: true },
      });
    } else {
      console.log("Resources deleted successfully");
    }
  });
});

resourceRouter.post("/resources", (req, res) => {
  console.log("Fetching Resources", req.body.SEID);
  Resource.find().exec((err, document) => {
    if (err) {
      console.log("Resources failed to fetch");
      res.status(500).json({
        message: { msgBody: "Resources failed to fetch", msgError: true },
      });
    } else {
      console.log("Resources fetched successfully");
      var reso = [];
      for (const doc of document) {
        if (doc.SEID === req.body.SEID) {
          reso.push(doc);
        }
      }
      res.status(200).json({ resources: reso });
    }
  });
});

module.exports = resourceRouter;
