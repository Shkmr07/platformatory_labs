const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { UserModel } = require("../models/user.model");

passport.serializeUser((user, done) => {
  done(null, user.id); // MongoDB _id
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await UserModel.findOne({ googleId: profile.id });

    if (existingUser) return done(null, existingUser);

    const newUser = new UserModel({
      googleId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      profileImg : profile.photos[0].value
    });

    const savedUser = await newUser.save();
    done(null, savedUser);
  } catch (err) {
    done(err, null);
  }
}));
