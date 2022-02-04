
import {useState} from 'react'
import {ADDCOURSE} from '../utils/mutations'
import {Modal,Button,Form} from 'react-bootstrap'

const categories = [
    {id:0,name:'Design'},
    {id:1,name:'Programação'},
    {id:2,name:'Telecomunicações'},
    {id:3,name:'Recursos Humanos'},
]


const AddCourseComponent = ({user,show,handleHide}) =>{
    
    const [name,SetName] = useState()
    const [category,SetCategory] = useState()
    const [description,SetDescription] = useState()


    const HandleSelectCategory = e =>{
        SetCategory(e.target.value)
    }

    const HandleCreateCourse = async (e) =>{
        e.preventDefault()
        const author = user.id
        const response = await ADDCOURSE(author,name,category,description)
        console.log(response.data)
    }
    
    const MoveToAddModules = () =>{
        handleHide()

    }

    return (
        <Modal show={show} onHide={handleHide}>
            <Modal.Header>
               <Modal.Title> Adicionar Curso </Modal.Title> 
            </Modal.Header>

            <Modal.Body>
               <Form>
               <Form.Group> 
               <Form.Label>Nome</Form.Label>
                <Form.Control type="text" 
                onChange={e => SetName(e.target.value)}/>
               </Form.Group>

               <Form.Group> 
               <Form.Label>Categoria</Form.Label>
                <Form.Select onChange={HandleSelectCategory}>
                    <option>selection uma área</option>
                    {categories.map(item =>
                        <option key={item.id}>
                        {item.name}</option>)}
                </Form.Select>
               </Form.Group>

               <Form.Group> 
               <Form.Label>Descrição</Form.Label>
                <Form.Control as="textarea" rows={3} 
                onChange={e => SetDescription(e.target.value)} />
               </Form.Group>

               </Form>

                <Modal.Footer>
                    <Button onClick={HandleCreateCourse}>Avançar</Button>
                    <Button variant="danger" onClick={handleHide}>Cancelar</Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )

}

export default AddCourseComponent;