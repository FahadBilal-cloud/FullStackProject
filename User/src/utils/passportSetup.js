import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";

dotenv.config();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5173/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // If user does not exist, create a new user
        user = new Userd({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails?.[0]?.value,
        });
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
)
);

passport.serializeUser((user, done)=>{
    done(null,user)
})

passport.deserializeUser((obj,done)=>{
    done(null,obj)
})

export {passport}
