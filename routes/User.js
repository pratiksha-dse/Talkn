const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "373151948151-7ucdilvhgce7u17fv2s1vs67bbvjesh3.apps.googleusercontent.com"
);
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { name, username, email, phone, univ, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username is already taken", msgError: true },
      });
    else {
      const newUser = new User({
        name,
        username,
        email,
        phone,
        univ,
        password,
      });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully created",
              msgError: false,
            },
          });
      });
    }
  });
});
userRouter.post("/changepwd", (req, res) => {
  const { name, username, email, phone, univ, password } = req.body.user;
  const newpwd = req.body.newpwd;
  User.findOneAndDelete({ username }, function (err, docs) {
    if (err) {
      // console.log(err);
    } else {
      console.log("Deleted User");
    }
  });

  const newUser = new User({
    name: name,
    username: username,
    email: email,
    phone: phone,
    univ: univ,
    password: newpwd,
  });
  newUser.save((err) => {
    if (err) {
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
      console.log(err);
    } else {
      res.status(201).json({
        message: {
          msgBody: "Account successfully created",
          msgError: false,
        },
      });
      console.log("Changed successfully");
    }
  });
});
userRouter.post("/adduser", (req, res) => {
  console.log("doing2");
  const {id,name,email,image} = req.body;
  console.log(req.body);
  // const { title,  date,time,reglink,description} = req.body;
  const newUser = new User({
    id,
   name,
   email,
   image
  });
  newUser.save((err) => {
    if (err)
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    else
      res.status(201).json({
        message: {
          msgBody: "User successfully added",
          msgError: false,
        },
      });
  });
});

userRouter.post("/login", (req, res) => {
  console.log(req.body.token);
  const { token } = req.body;
  const ticket = async () => {
    const ticket = await client.verifyIdToken({
      idToken: token,
      // audience: process.env.CLIENT_ID,
    });
    const user = ticket.getPayload();

    // if (user) {
    // const { _id, name, username, email, phone, univ } = req.user;
    if (true
    
      // true
    ) {
      const tokenn = signToken(token);
      res.cookie("access_token", tokenn, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: user,
        isAdmin:user.email=="b20165@students.iitmandi.ac.in"
      });
    } else {
      res.status(500).json({
        message: {
          msgBody: "Please login via edu email id only",
          msgError: true,
        },
        user: { name: "", username: "", email: "", phone: "", univ: " " },
        success: true,
        isAuthenticated: false,
        isAdmin: false,
      });
    }
    // }
  };
  ticket();
});
userRouter.post("/getuserbyemail", (req, res) => {
  console.log("Fetching User");
  User.findOne({email:req.body.email}).exec((err, document) => {
    if (err) {
      console.log("User failed to fetch");
      res.status(500).json({
        message: { msgBody: "User failed to fetch", msgError: true },
      });
    } else {
      console.log("User fetched successfully");
      res.status(200).json({ user: document });
    }
  });
});
userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({
      user: { name: "", username: "", email: "", phone: "", univ: " " },
      success: true,
    });
  }
);

// userRouter.get('/admin',passport.authenticate('jwt',{session : false}),(req,res)=>{
//     if(req.user.role === 'admin'){
//         res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
//     }
//     else
//         res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
// });

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { name, email, picture } = req.user;
    // console.log("route",req.user);
    res.status(200).json({
      isAuthenticated: true,
      user: { name, email, picture },
    });
  }
);



module.exports = userRouter;
