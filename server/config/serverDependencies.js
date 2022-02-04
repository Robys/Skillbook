require('dotenv').config()
const path = require('path')
const mongoose = require('mongoose')

const cors = require('cors')
const express = require('express')

const {ApolloServer} = require('apollo-server-express')

const session = require('express-session')
const uuid = require('uuid').v4;
const { buildContext } = require('graphql-passport')

const {USER} = require('../models/User')

const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET,
  genid: (req) => uuid(),
  resave:false,
  saveUninitialized:false
}))

app.use(cors())

const startApolloServer = (schema,resolvers) =>{

  const server = new ApolloServer({
    typeDefs:schema,
    resolvers:resolvers,
    context: ({req,res}) => buildContext({req,res,USER}),
    introspection:true,
    playground:true
  })

  server.applyMiddleware({app})

  app.listen(process.env.PORT || 4000, () => {
    console.log(`🚀 Server ready`)
  })
}


module.exports = {path,app,session,mongoose,startApolloServer}
