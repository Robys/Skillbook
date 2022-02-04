const {Schema,Types,model} = require('mongoose')

const LessonSchema = new Schema({
    title: String,
    url:String,
})

const LESSON = model("Lesson",LessonSchema)

module.exports = {
    FINDLESSONBYID: (_id) => LESSON.findById(_id),
    ADDLESSON : (lesson) => LESSON.create(lesson),
    DELETELESSON : (_id) => LESSON.findByIdAndDelete(_id)
}