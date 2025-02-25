import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'

function Header() {
  return (
    <>
      <header className="lms-header ">
            <div className="logo container-fluid pt-3 pb-3 d-flex">
                <img width={'50px'} height={'50px'} src={logo} alt="" />
                <Link to={'/'}  className='mt-2 ms-3 text-decoration-none'><h2>Eduzo</h2></Link>
            </div>
            
        </header>

    
    
    </>
  )
}

export default Header