const {Schema,Types,model} = require('mongoose')

const QuestionSchema = new Schema({
    queries:[String],
    answer:String,
})

const QUESTION = model("Question",QuestionSchema)

module.exports = {
    FINDQUESTIONS: () => QUESTION.find(),
    FINDQUESTIONBYID: (_id) => QUESTION.findById(_id),
    ADDQUESTION: (question) => QUESTION.create(question),
    DELETEQUESTION: (_id) => QUESTION.findById(_id),
   
}