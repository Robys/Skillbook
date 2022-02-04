var {gql} = require('apollo-server-express');

const schema = gql`

enum Role{
    ADMIN #administrador
    USER #usuário comum
    MANAGER #gerente
    }

    type User{
        id:ID!
        name: String
        role:Role
        email:String
        password:String
        progress:Progress
    }

    type AuthPayload{
    #retorno de autenticação, porém possui n funções
    user:User
    }

    type Progress{
        id:ID!
        user:User
        courses:[Course]
        completedModules:[Module]
        watchedLessons:[Lesson]
        completedActivities:[Activity]
    }

    type Course{
        id:ID!
        author: User
        name: String
        category: String
        description:String
        modules:[Module]
    }

    type Module{
        id:ID!
        name:String,
        lessons: [Lesson]
        activities:[Activity]
    }

    type Lesson{
        id:ID!
        title: String
        url:String
    }

    type Activity{
        id:ID!
        questions:[Question]
    }

    type Question{
        id:ID!
        queries:[String]
        answer:String

    }

    input QuestionInput {
        text: String
    }

    type Query{
        me:User
        users: [User]
        allcourses: [Course]
        user (_id:ID!) : User
        course (_id:ID!): Course
        activity (_id:ID!): Activity
        courseByCategory (category:String): [Course]
        courseByAuthor (author:String): [Course]
        allprogress:[Progress] 
    }

    type Mutation{
        #AUTH
        login(email:String!,password:String!): AuthPayload
        logout:Boolean,

        #CREATE
        addUser(name:String,email:String,password:String): User,
        addCourse(author:ID!,name:String,category:String,description:String):Course,
        addModule(courseID:ID!, name:String): Module,
        addLesson(moduleID:ID!,title:String,url:String): Lesson,
        addActivity(moduleID:ID!):Activity,
        addQuestion(activityID:ID!,queries:[QuestionInput],answer:String):Question,
        #DELETE
        deleteUser(id:String): User,
        deleteCourse(id:ID!):Course,
        deleteModule(id:ID!): Module,
        deleteLesson(id:ID!): Lesson,
        deleteActivity(id:ID!):Activity,
        deleteQuestion(id:ID!):Question,

        deleteProgress(id:ID!):Progress
        #UPDATE
        updateUserRole(_id:ID!,role:Role): User 

    }
    `

module.exports = schema;
