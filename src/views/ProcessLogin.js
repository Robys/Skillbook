import {useContext,useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {Context} from '../utils/AppContext'
import {CURRENTUSER} from '../utils/queries'

const ProcessLogin = () =>{
    const {user,loading,SetUser} = useContext(Context)

    useEffect(() =>{
        const GetUserData = async () =>{
            const response = await CURRENTUSER()
            //console.log(response.data.data)
            SetUser(response.data.data.me)
        }

        GetUserData();

    },[])

    return (
        <div>
            {user===undefined ? 
            <h4>Autenticando...</h4> 
            : 
            <Navigate to="/dashboard"/>}
        </div>
    )
}

export default ProcessLogin

/**
 */