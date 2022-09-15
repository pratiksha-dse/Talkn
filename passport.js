const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("373151948151-5k1he8abmr2a1ok10g07c9phkmjld2jk.apps.googleusercontent.com");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "NoobCoder",
    },
    (payload, done) => {
      // User.findById({ _id: payload.sub }, (err, user) => {
      //   if (err) return done(err, false);
      //   if (user) return done(null, user);
      //   else return done(null, false);
      // });
      const ticket = async () => {
      const ticket = await client.verifyIdToken({
        idToken: payload.sub,
        // audience: process.env.CLIENT_ID,
      });
      const user = ticket.getPayload();
      if (user) {
        return done(null, user);
      } else return done(null, false);
    }
    ticket();
  }
  )
);

// authenticated local strategy using username and password
// passport.use(
//   new LocalStrategy((token, done) => {
//     console.log("dgjhgdshj", token);
//     // User.findOne({ username }, (err, user) => {
//     //   // something went wrong with database
//     //   if (err) return done(err);
//     //   // if no user exist
//     //   if (!user) return done(null, false);
//     //   // check if password is correct
//     //   // user.comparePassword(password, done);
//     //   return done(user,true);
//     // });
//     return done(null,true);
//   })
// );
