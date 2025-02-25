import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { authContextApi } from '../contexts/AuthContext';


function HeaderStudent() {
  const{isAuthorized,setIsAuthorized,user,setUser}=useContext(authContextApi)
  const navigate=useNavigate()
   useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

     const handleLogout = () => {
          // sessionStorage.clear();
          sessionStorage.removeItem("user");
          setUser(null)
          setIsAuthorized(false)
          navigate('/login');
        };
    
  return (
    <>
     <header className="lms-header ">
            <div className="logo container-fluid pt-3 pb-3 d-flex " data-aos="fade-down">
                <img width={'50px'} height={'50px'} src={logo} alt="" />
                <Link to={'/'}  className='mt-2 ms-3 text-decoration-none'><h2>Eduzo</h2></Link>
                <div className="links container-fluid pt-3 pb-3 d-flex">
                
                <Link to={'/mycourses'}  className='mt-2 ms-auto text-decoration-none text-info'><h5>My Courses</h5></Link>
                <Link to={'/'}  className='mt-2 ms-3 text-decoration-none text-warning'><h5 onClick={handleLogout}>Logout</h5></Link>

            </div>
            </div>
            
            
        </header>
    </>
  )
}

export default HeaderStudent