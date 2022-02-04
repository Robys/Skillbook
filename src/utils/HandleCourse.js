import {useState,Fragment} from 'react'
import AddCourseComponent from '../components/AddCourseComponent'
import {NavLink} from 'react-bootstrap'

const HandleCourse = ({user}) =>{
    const [show,SetShow] = useState(false)

    const handleHide = () => SetShow(false)
    const handleShow = () => SetShow(true)

    return (
        <Fragment>
            <AddCourseComponent user={user} show={show} handleHide={handleHide}/>
            <NavLink onClick={SetShow}>Criar Curso</NavLink>
        </Fragment>
    )

}

export default HandleCourse