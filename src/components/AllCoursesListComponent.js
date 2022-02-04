import { useEffect,useState } from "react"
import { Card,Button,ListGroup,ListGroupItem } from "react-bootstrap"
import {ALLCOURSES} from '../utils/queries'


const AllCoursesListComponent = () =>{
    const [courses,SetCourses] = useState()

    useEffect(() =>{
        const GetCourses = async () =>{
            const response = await ALLCOURSES()
            SetCourses(response.data.data.allcourses)
        }

        GetCourses()
    },[])

    return(
        <div>
            {courses ? 
            <ListGroup>
                {courses.map(item => 
                    <ListGroupItem key={item.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Subtitle>por: {item.author.name}</Card.Subtitle>
                                <Card.Text>
                                   descrição: {item.description}
                                </Card.Text>
                            
                            </Card.Body>

                            <Card.Footer>
                            <Button href={`/course/${item.id}`}>Mais Detalhes</Button>
                            </Card.Footer>
                        </Card>
                    </ListGroupItem>)}
            </ListGroup>
            
            :""}

        </div>

    )
}

export default AllCoursesListComponent