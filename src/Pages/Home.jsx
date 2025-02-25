import React from 'react'
import Header from '../Components/Header'
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
    <Header/>
   
   <div className="container-fluid home w-100 text-center ">
    <div className="row pt-5 d-flex  pt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 pt-5" data-aos="fade-right">
            <p className='pt-5'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda fuga temporibus dolorem quisquam molestias deleniti hic maiores quaerat illo ipsam. Itaque pariatur dolorem quam temporibus exercitationem vitae aperiam quos obcaecati.</p>
              <p className='pt-3'>Contact Us</p>
              <p className='pt-3'>+91 8685904567</p>
            <Link className='text-info text-decoration-none' to={'/gmail.com'}>eduzo@gmail.com</Link>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 " data-aos="fade-left">
            <img id='img' className='pb-3' width={'500px'} height={'300px'} src="https://static.vecteezy.com/system/resources/previews/001/879/420/non_2x/illustration-of-e-learning-makes-it-easy-for-student-to-learn-distance-learning-with-laptop-and-internet-online-home-work-courses-and-study-for-open-knowledge-stationery-and-stack-of-book-free-vector.jpg" alt="" />
        </div>
    </div>

    <Link to={'/login'}  className='btn btn-primary text-center mt-5 mb-5'>Get Started</Link>
{/* data-aos="fade-down" */}
    
   </div>
   {/* <div className='footer'>
    <h6 className='text-center'>copyright@eduzo</h6>
   </div> */}

    </>
  )
}

export default Home