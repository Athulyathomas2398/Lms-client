import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import AuthenticationPage from './Components/AuthenticationPage'
import InstructorDashboard from './Components/InstructorDashboard'
import Courses from './Components/Courses'
import CreateCourse from './Pages/CreateCourse'
import StudentPage from './Pages/StudentPage'
import CourseIntroduction from './Pages/CourseIntroduction'
import CourseContent from './Pages/CourseContent'
import { ToastContainer, toast } from 'react-toastify';
import EditCourse from './Pages/EditCourse'
import MyCourses from './Pages/MyCourses'

function App() {
  

  return (
    <>

<ToastContainer
position="top-right"
autoClose={5000}

theme="colored"

/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<AuthenticationPage />}/>
      <Route path='/register' element={<AuthenticationPage insideRegister={true}/>}/>
      <Route path='/instructorDashboard' element={<InstructorDashboard />}/>
      <Route path='/instructorcourses' element={<Courses />}/>
      <Route path='/createcourse' element={<CreateCourse />}/>
      <Route path='/studentpage' element={<StudentPage />}/>
      <Route path='/courseintroduction/:courseId' element={<CourseIntroduction />}/>
      <Route path='/coursecontent/:courseId' element={<CourseContent />}/>
      <Route path='/editcourse/:courseId' element={<EditCourse />} />
      <Route path='/mycourses' element={<MyCourses />} />
    </Routes>
      
    </>
  )
}

export default App
