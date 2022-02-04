const {Schema,Types,model} = require('mongoose')

const ProgressSchema = new Schema({
    user:{type:Types.ObjectId,ref:"USER"},
    courses: [{type:Types.ObjectId,ref:"Course"}],
    completedModules: [{type:Types.ObjectId,ref:"Module"}],
    watchedLessons: [{type:Types.ObjectId,ref:"Lesson"}],
    completedActivities: [{type:Types.ObjectId,ref:"Activity"}],

})

const PROGRESS = model('Progress',ProgressSchema)

module.exports = {
    PROGRESS,
    ALLPROGRESS: () => PROGRESS.find(),
    FINDPROGRESS : (_id) => PROGRESS.findById(_id),
    SIGNUPCOURSE: (_id,course) => PROGRESS.updateOne({_id:_id}, {$push: {"courses":course}}),
    PROGRESSUPDADEMODULES: (_id,module) =>  PROGRESS.updateOne({_id:_id}, {$push: {"modules":module}}),
    PROGRESSUPDADELESSONS: (_id,lesson) =>  PROGRESS.updateOne({_id:_id}, {$push: {"watchedLessons":lesson}}),
    PROGRESSUPDADEACTIVITIES: (_id,activity) =>  PROGRESS.updateOne({_id:_id}, {$push: {"completedActivities":activity}}),

}
/**
 * ADDLESSONTOMODULE: (_id,lesson) => MODULE.updateOne({_id:_id}, {$push: {"lessons":lesson}}), 
    ADDACTIVITIESTOMODULE: (_id,activity) => MODULE.updateOne({_id:_id}, {$push: {"activities":activity}}),
 */