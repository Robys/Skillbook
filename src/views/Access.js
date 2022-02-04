import { LoginComponent } from "../components/LoginComponent"
import {AddUserComponent} from "../components/AddUserComponent"

import {Tabs,Tab,Card} from 'react-bootstrap'
import CardHeader from "react-bootstrap/esm/CardHeader"

const Access = () =>{

    return ( 
    <div>

        <Card className="access-card">
            <CardHeader>
                Entar/Cadastrar
            </CardHeader>
            <Tabs defaultActiveKey="register" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="login" title="Login">
                    <LoginComponent/>
                </Tab>
                <Tab eventKey="register" title="Register">
                    <AddUserComponent/>
                </Tab>

            </Tabs>

        </Card>


    </div>)
}

export default Access