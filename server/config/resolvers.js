const bcrypt = require('bcrypt')


const {USER,FINDUSERS,FINDUSERBYEMAIL,FINDUSERBYID,
    ADDUSER,UPDATEUSERROLE,
    DELETEUSER} = require('../models/User')

const {FINDCOURSES,FINDCOURSEBYID,ADDCOURSE,
    ADDMODULETOCOURSE,FINDCOURSEBYCATEGORY,
    DELETECOURSE} = require('../models/Course')

const {FINDMODULEBYID,ADDMODULE,ADDLESSONTOMODULE,
    ADDACTIVITIESTOMODULE,DELETEMODULE} = require('../models/Module')

const {FINDLESSONBYID,ADDLESSON,
    DELETELESSON} = require('../models/Lesson')

const {FINDACTIVITYBYID,FINDACTIVITIES,
    ADDACTIVITY,ADDQUESTIONTOACTIVITY,
    DELETEACTIVITY} = require('../models/Activity')

const {FINDQUESTIONBYID,FINDQUESTIONS,
    ADDQUESTION,DELETEQUESTION} = require('../models/Question')

const {FINDPROGRESS,ALLPROGRESS,PROGRESS} = require('../models/Progress')


const resolvers ={

    User:{
         progress : async ({progress}) =>{ 
             return await FINDPROGRESS(progress) 
            }
    },

    Progress:{
        user: async ({user}) => {return await FINDUSERBYID(user)},
        courses: async({courses}) => { return await FINDCOURSEBYID(courses) },
        completedModules: async({completedModules}) => { return await FINDMODULEBYID(completedModules)},
        watchedLessons: async({watchedLessons}) => {return await FINDLESSONBYID(watchedLessons)},
        completedActivities: async({completedActivities}) => {return await FINDACTIVITYBYID(completedActivities)}
    },

    Course:{
        modules: async({modules}) => {return await FINDMODULEBYID(modules)},
        author: async({author}) => {return await FINDUSERBYID(author)},
    },

    Module:{
        lessons: async({lessons}) => {return await FINDLESSONBYID(lessons)},
        activities: async({activities}) => {return await FINDACTIVITYBYID(activities)}
    },

    Activity:{
        questions: async({questions}) => {return await FINDQUESTIONBYID(questions)}
    },
    

    Query:{
        me: (parent,args,context) => {return context.getUser() },
        users: async () => { return await FINDUSERS() },
        course: (parent,{_id},context) => {return FINDCOURSEBYID(_id)},
        activity: (parent,{_id},context) => {return FINDACTIVITYBYID(_id)},
        user: (parent,{_id},context)=>{return FINDUSERBYID(_id)},
        allcourses: async () => {return await FINDCOURSES()},
        courseByCategory: async (parent,{category},context) => {return await FINDCOURSEBYCATEGORY(category)},
        courseByAuthor: (parent,{author},context) => {},
        allprogress: async () => {return await ALLPROGRESS()}
    },

    Mutation:{

        logout: async (parent,args,context) => await context.logout(),

        login: async (parent,{email,password},context) =>{

            if(!email || !password){
                throw new Error("email ou senha não preenchidos")
            }

            const { user } = await context.authenticate("graphql-local", {email,password});
            
            const match = await bcrypt.compare(password,user.password)
            if(!match){
                throw new Error("senha incorreta")
            }
            
            else{
                context.login(user)
                return {user}
            }
         
        },

        addUser: async (parent,{name,email,password},context) =>{
            //console.log(name)
            /*
            const existingUser = await FINDUSERBYEMAIL(email)

            if(existingUser !== null)
                return new Error(`${existingUser.email} já está em uso`);
                */
            if(password.length < 5)
                return new Error('A senha deve conter mais de 5 caractéres')

                
                const hash = await bcrypt.hash(password,10);
                const user = await ADDUSER({
                    name:name,
                    email:email,
                    password:hash,
                    role:'USER'
                })
                const progress = await PROGRESS.create({user:user});

                await USER.updateOne({_id:user},{progress:progress._id})
                
                return await user;

        },

        addCourse: async (parent,{author,name,category,description},context)=>{
            const creator = await FINDUSERBYID(author)
            if(!creator)
                return new Error('O Curso não pode ser criado');
            
            const course = await ADDCOURSE({
                author:author,
                name:name,
                category:category,
                description:description,
                completed:false
            })

            return course;
        },

        addModule: async (parent,{courseID,name},context)=>{
            const module = await ADDMODULE({name:name,completed:false})
            await ADDMODULETOCOURSE(courseID,module._id);

            return module;
        },

        addLesson: async (parent,{moduleID,title,url},context) =>{
            const lesson = await ADDLESSON({title:title,url:url})
            await ADDLESSONTOMODULE(moduleID,lesson._id)

            return lesson;
        },

        addActivity: async (parent,{moduleID},context)=>{
            const activity = await ADDACTIVITY()
            await ADDACTIVITIESTOMODULE(moduleID,activity._id)

            return activity;
        },

        addQuestion: (parent,{activityID,queries,answer},context)=>{
            console.log(activityID,queries,answer)

            return null
        },
        updateUserRole: async (parent,{_id,role},context) =>{ 
            return await UPDATEUSERROLE(_id,role)
        },
        deleteUser: async (parent,{id},context)=>{
            return await DELETEUSER(id)
        },
        deleteProgress: async (parent,{id},context)=>{
            return await DELETEPROGRESS(id)
        },
        
    }

}

module.exports = resolvers;