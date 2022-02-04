const {Schema,Types,model} = require('mongoose')

const ActivitySchema = new Schema({
    questions:[{type:Types.ObjectId,ref:"Question"}]
})

const ACTIVITY = model("Activity",ActivitySchema)

module.exports = {
    FINDACTIVITIES: () => ACTIVITY.find(),
    FINDACTIVITYBYID : (_id) => ACTIVITY.findById(_id),
    ADDACTIVITY: () => ACTIVITY.create(),
    DELETEACTIVITY: (_id) => ACTIVITY.findByIdAndDelete(_id),
    ADDQUESTIONTOACTIVITY: (_id,question) => ACTIVITY.updateOne({_id:_id}, {$push: {"questions":question}})
   
}