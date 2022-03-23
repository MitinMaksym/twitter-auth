import GoogleStrategy from 'passport-google-oauth20'
import mongoose from 'mongoose'
import { User as UserType } from '../models/User'
import passport, { PassportStatic } from 'passport'
import User from '../models/User'

export const configurePassport = (passport: PassportStatic) => {

  passport.use(new GoogleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "test",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "client",
    callbackURL: '/auth/google/callback'
  }, async function (accessToken: any, refreshToken: any, profile: any, done: any) {
    console.log(accessToken, refreshToken)
    console.log(profile)
    const newUser: UserType = {
      googleId: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
      image: profile.photos[0].value
    }

    try {
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
        done(null,user)
      } else {
         user = await User.create(newUser)
         done(null,user)
      }

    } catch (e) {
      console.log(e)
    }


  }))

  passport.serializeUser(function (user: any, cb: any) {
    process.nextTick(function () {
      //@ts-ignore
      cb(null, user.id);
    });
  });

  passport.deserializeUser(function (user: any, cb: any) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}