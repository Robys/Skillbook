const {Schema,Types,model} = require('mongoose')

const CourseSchema = new Schema({
    name:String,
    description:String,
    category:String,
    modules:[{type:Types.ObjectId,ref:"Module"}],
    author:{type:Types.ObjectId,ref:"User"}
})

const COURSE = model("Course",CourseSchema)

module.exports = {
    FINDCOURSES: () => COURSE.find(),
    FINDCOURSEBYID : (_id) => COURSE.findById(_id),
    ADDCOURSE : (course) => COURSE.create(course),
    DELETECOURSE: (_id) => COURSE.findByIdAndDelete(_id),
    ADDMODULETOCOURSE: (_id,module) => COURSE.updateOne({_id:_id}, {$push: {"modules":module}}),
    FINDCOURSEBYCATEGORY: (category) => COURSE.find({category:category})
}