import axios from 'axios'


export const CURRENTUSER = async () =>{
    return await axios.post("/graphql",{
        query:`query{
            me{
                id
                name
                email
                role
            }
        }`,
        headers: {
            "Content-Type": 'application/json'
        } 
    }). then(res => res)
    .catch(err => err)
}

export const USERS = async () =>{
    return await axios.post("/graphql",{
        query:`query{
            users{
                id
                name
                email
                role
            }
        }`
    }). then(res => res)
    .catch(err => err)
}

export const USER = async (_id) =>{
    return await axios.post("/graphql",{
        query:`query{
            user(_id:"${_id}"){
                id
                name
                email
                role
                
            }
        }`
    }). then(res => res)
    .catch(err => err)
}

export const ALLCOURSES = async () =>{
    return await axios.post("/graphql",{
        query:`query{
            allcourses{
                id
                name
                category
                description
                author{
                    id
                    name
                }
                
            }
        }`
    }). then(res => res)
    .catch(err => err)
}

export const COURSE = async (_id) =>{
    return await axios.post("/graphql",{
        query:`query{
            course(_id:"${_id}"){
                id
                createdBy
                name
                description
                lessons{
                    id
                    title
                    url
                }
                activities{
                    id
                }
                
            }
        }`
    }). then(res => res)
    .catch(err => err)

}

export const ACTIVITY = async (_id) =>{
    return await axios.post("/graphql",{
        query:`query{
            activity(_id:"${_id}"){
                id
                questions{
                    id
                    answer
                    result
                }
            }
        }`
    }). then(res => res)
    .catch(err => err)
    
}