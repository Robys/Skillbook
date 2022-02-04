import { useState } from "react";
import {ADDUSER} from '../utils/mutations'

import {Form,Button} from 'react-bootstrap'

export const AddUserComponent = (name,email,password) =>{
    const [userName,setUserName] = useState()
    const [userEmail,setUserEmail] = useState()
    const [userPassword,setUserPassword] = useState()
    const [ready,SetReady] = useState(false)

    const [err,SetError] = useState({enable:false,code:'',message:''})
    
    
    const HandleSubmit = async (e) =>{
        e.preventDefault()
        const response = await ADDUSER(userName,userEmail,userPassword)

        if(response.data.addUser!==undefined)
            SetReady(true)

        if(response.errors !== undefined)
            response.errors.map(error => SetError({enable:true,code:error.extensions.code,message:error.message}))
    }

    return (
        <Form className="access-form">

            <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" 
                onChange={e => setUserName(e.target.value === null ? name : e.target.value)}/>

                <Form.Label>Email</Form.Label>
                <Form.Control type="text" 
                onChange={e => setUserEmail(e.target.value === null ? email : e.target.value)}/>

                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" 
                onChange={e => setUserPassword(e.target.value === null ? password : e.target.value)}/>

                <Button variant="primary" onClick={HandleSubmit}>criar conta</Button>
            </Form.Group>

            {err.enable === true ? 
            <div>
                <h4>Erro!</h4>

                <p>{err.code} - {err.message}</p>

            </div>
            :""}

            {ready ? 
            <div>
                <h4>Usuário registrado com sucesso!</h4>
            </div> 
            : ""} 

        </Form>
    )
}
