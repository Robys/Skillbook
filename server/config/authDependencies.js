require('dotenv').config()
const passport = require('passport')
const {GraphQLLocalStrategy,buildContext} = require('graphql-passport')
const GoogleStrategy = require('passport-google-oidc')
const {FINDUSERBYEMAIL,FINDUSERBYID} = require('../models/User')

const googleSettings = 
    {clientID: process.env.GOOGLE_API_ID,
    clientSecret: process.env.GOOGLE_SECRET_KEY,
    callbackURL: process.env.AUTH_CALLBACK_URL}


module.exports = {passport,googleSettings,GraphQLLocalStrategy,GoogleStrategy,buildContext,FINDUSERBYEMAIL,FINDUSERBYID}