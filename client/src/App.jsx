import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import CourseList from './Pages/Course/Courselist'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import Profile from './Pages/User/Profile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/denied' element={<Denied />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/user/profile" element={<Profile />}></Route>
        <Route path="/course/description" element={<CourseDescription />}></Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
