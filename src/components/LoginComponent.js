import { useState } from "react";
import {Navigate} from 'react-router-dom'
import {LOGIN} from '../utils/mutations'

import {Form,Button} from 'react-bootstrap'

export const LoginComponent = (email,password) =>{
    const [userEmail,setUserEmail] = useState()
    const [userPassword,setUserPassword] = useState()
    const [ready,SetReady] = useState(false)

    const [err,SetError] = useState({enable:false,code:'',message:''})
    
    const HandleSubmit = async (e) =>{
        e.preventDefault()
        const response = await LOGIN(userEmail,userPassword)

        if(response.data.data.login!==null)
            SetReady(true)

        if(response.data.errors !== undefined)
            response.data.errors.map(error => SetError({enable:true,code:error.extensions.code,message:error.message}))
    }

    return (
        <Form className="access-form">

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" 
                onChange={e => setUserEmail(e.target.value === null ? email : e.target.value)}/>

                <Form.Label>Password</Form.Label>
                <Form.Control type="password" 
                onChange={e => setUserPassword(e.target.value === null ? password : e.target.value)}/>

                <Button variant="primary" onClick={HandleSubmit}>Entrar</Button>
            </Form.Group>

            {err.enable ? 
            <div>
                <h4>Erro!</h4>

                <p>{err.code} - {err.message}</p>

            </div>
            :""}


            {ready ? <Navigate to="/processLogin"/> :""}

        </Form>
    )
}