/** Server Dependencies **/
require('dotenv').config()
const schema = require('./config/schema')
const resolvers = require('./config/resolvers')
const {path,app,mongoose,startApolloServer} = require('./config/serverDependencies')
/** Auth Dependencies **/
const {passport,buildContext,googleSettings,
    FINDUSERBYID,FINDUSERBYEMAIL,
    GraphQLLocalStrategy,GoogleStrategy} = require('./config/authDependencies')

mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser: true,useUnifiedTopology: true })


passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser(async (id,done)=>{
   const match = await FINDUSERBYID(id)
    done(null,match)
})


passport.use(new GraphQLLocalStrategy(async (email,password,done) => {
    const match = await FINDUSERBYEMAIL(email)
    const err = match ? null : new Error('usuário ou senha não confere') 
    
    done(err,match)
}) )

app.use(passport.initialize())
app.use(passport.session())

startApolloServer(schema,resolvers)



