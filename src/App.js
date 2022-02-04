import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Access from './views/Access'
import Home from './views/Home';
import ProcessLogin from './views/ProcessLogin'
import {Provider} from './utils/AppContext';
import Dashboard from './views/Dashboard';
import Course from './views/Course'

function App() {
  return (
    <Provider>

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/access" element={<Access/>}/>
      <Route path="/processLogin" element={<ProcessLogin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/course" element={<Course/>}/>

      </Routes>
      
      </BrowserRouter>
    </Provider>

  );
}

export default App;
