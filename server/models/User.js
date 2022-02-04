const {Schema,Types,model} = require('mongoose')

const UserSchema = new Schema({
    name:String,
    email:String,
    password:String,
    progress: {type:Types.ObjectId,ref:"Progress"},
    role:{
        type: String,
        enum : ['USER','ADMIN','MANAGER'],
        default: 'USER'
    },
})

const USER = model("User",UserSchema)

module.exports = {
    USER,
    FINDUSERBYEMAIL: (email) => USER.findOne({email:email}),
    FINDUSERS: () => USER.find(),
    FINDUSERBYID: (_id) => USER.findById(_id),
    ADDUSER : (user) => USER.create(user),
    DELETEUSER : (_id) => USER.findByIdAndDelete(_id),
    UPDATEUSERROLE: (_id,role) => USER.findByIdAndUpdate(_id,{role:role}),
}