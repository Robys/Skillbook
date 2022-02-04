import axios from "axios";

export const ADDUSER = async (name,email,password) =>{
    return await axios.post("/graphql",{
        query:`mutation {
            addUser(name:"${name}",email:"${email}",password:"${password}"){
                id
                name
                email
            }
           
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res.data)
    .catch(err => err)

}

export const ADDCOURSE = async (author,name,category,description) =>{
    return await axios.post("/graphql",{
        query:`mutation {
            addCourse(author:"${author}",
            name:"${name}",
            category:"${category}",
            description:"${description}"){
                id
                name
                category
                author{
                    id
                    name
                }
            }
           
        }`,
        
        headers: {
            "Content-Type": 'application/json'
        } 
    })
    .then(res => res.data)
    .catch(err => err)
}

export const LOGIN = async (email,password) =>{
    return await axios.post("/graphql",{
        query:`mutation{
            login(email:"${email}",password:"${password}"){
                user{
                    id
                    name
                }
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
          } 
    }).then(res => res).catch(err => err);
}

export const LOGOUT = async () =>{
    return await axios.post("/graphql",{
        query:`mutation{
            logout
        }`,
        headers: {
            "Content-Type": 'application/json'
          } 
    }).then(res => res).catch(err => err);
}


/*
const ADDCOURSE = (author,name,description)=>{
    console.log(author,name,description)
}
*/