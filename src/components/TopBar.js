import {useState} from 'react'
import {LOGOUT} from '../utils/mutations'

import HandleCourse from '../utils/HandleCourse'

import {Navbar,Offcanvas,Button,Nav} from 'react-bootstrap'
import { Navigate } from 'react-router-dom'

const TopBar = ({user}) =>{

    const [show,setShow] = useState(false)
    const [back,setBack] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const HandleLogout = async () =>{
        const response = await LOGOUT()
        setBack(true)
    }


    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand onClick={handleShow}>SkillBook</Navbar.Brand>
            
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>{user.name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav>
                        {user.role === 'ADMIN' ? 
                        <>
                        <HandleCourse user={user}/>
                        </>:""}
                        <Nav.Link>Meus Cursos</Nav.Link>
                        <Nav.Link>Opções</Nav.Link>
                        <Button variant="danger" onClick={HandleLogout} >Logout</Button>

                    </Nav>
                   
                </Offcanvas.Body>
            </Offcanvas>
            {back ? <Navigate to="/"/> :""}
        </Navbar>
    )
}

export default TopBar