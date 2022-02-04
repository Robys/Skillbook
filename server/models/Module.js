const {Schema,Types,model} = require('mongoose')

const ModuleSchema = new Schema({
    name:String,
    lessons: [{type:Types.ObjectId,ref:"Lesson"}],
    activities:[{type:Types.ObjectId,ref:"Activity"}],
})

const MODULE = model("Module",ModuleSchema)

module.exports = {
    FINDMODULEBYID : (_id) => MODULE.findById(_id),
    ADDMODULE: (module) => MODULE.create(module),
    DELETEMODULE: (_id) => MODULE.findByIdAndDelete(_id),
    ADDLESSONTOMODULE: (_id,lesson) => MODULE.updateOne({_id:_id}, {$push: {"lessons":lesson}}), 
    ADDACTIVITIESTOMODULE: (_id,activity) => MODULE.updateOne({_id:_id}, {$push: {"activities":activity}}), 
}