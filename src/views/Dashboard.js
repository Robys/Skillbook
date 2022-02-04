import { useContext } from "react"
import { Context } from "../utils/AppContext"
import TopBar from "../components/TopBar"
import AllCoursesListComponent from '../components/AllCoursesListComponent'

const Dashboard = () =>{
    const {user} = useContext(Context)

    return (
        <div>
            <TopBar user={user}/>

            <AllCoursesListComponent/>
        </div>
    )

}

export default Dashboard