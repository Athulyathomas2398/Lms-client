import React, { useState } from "react";
import "./AuthenticationPage.css"; // For custom styles
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { loginAPI, registerAPI } from "../services/allAPI";
import Spinner from 'react-bootstrap/Spinner';

const AuthenticationPage = ({ insideRegister }) => {
  const navigate=useNavigate()
  const[isLogin,setIsLogin]=useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  console.log(formData);
  

  const handleRegister =async (e) => {
    e.preventDefault()
    if(formData.username && formData.email && formData.password){
      //api call
      try{
      const result=  await registerAPI(formData)
      console.log(result);
      if(result.status==200){
        toast.success(`welcome ${result.data.username} please login explore our website`)
        setFormData({username: "",
          email: "",
          password: ""})
          navigate('/login')
      }
      else{
        if(result.status==406){
          toast.warning(result.response.data)
          setFormData({username: "",
            email: "",
            password: ""})
        }
      }

      }
      catch(err){
        console.log(err);
        
      }

    }
    else{
      toast.warning("enter all the fields completely")

    }

  }

  const handleLogin=async(e)=>{
    e.preventDefault()
    if(formData.email && formData.password){
      //api call
      try{
        const result=await loginAPI(formData)
        
        console.log(result);
        if(result.status==200&& result?.data){
          sessionStorage.setItem("token",result.data.token)
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          setIsLogin(true)
          setTimeout(() => {
            setIsLogin(false)
            setFormData({username: "",
              email: "",
              password: ""})
              // Redirect based on user role
              const role = result.data.user.role;
          if (role === 'admin') {
            navigate('/instructorDashboard');
          } else {
            navigate('/studentpage')
          }
          
           
            
          }, 2000);
          

        }
        else{
          if(result.status==404){
            toast.error(result.response.data)
            setFormData({username: "",
              email: "",
              password: ""})
          
            
          }
        }
        

      }
      catch(err){
        console.log(err);
        
      }
    }
    else{
      toast.warning("Please enter email and password")
    }
  }


  return (
    <>
      <Header />
      <div className="auth-container">
        <div className="auth-card">
          <h2>{!insideRegister ? "Login" : "Sign Up"}</h2>
          <form >
            {insideRegister && (
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter Your Name "
                  required
                />
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
              />
            </div>

            {!insideRegister ?
              <div>
                <button onClick={handleLogin} type="submit" className="auth-btn">

                  Login
                 
                </button>
                <div className="mt-1">
                {
                    isLogin &&
                    <Spinner animation="border" variant="danger" />
                  }
                </div>
                <p className="toggle-text">Don't have an account?<Link className="text-decoration-none text-info" to={'/register'}>Register</Link></p>
              </div>
              :
              <div>
                <button onClick={handleRegister} type="submit" className="auth-btn">
                  Sign Up
                </button>
                <p className="toggle-text ">Already have an account?<Link className="text-decoration-none text-info" to={'/login'}>Login</Link></p>
              </div>
            }
          </form>

        </div>
      </div>
    </>
  );
};

export default AuthenticationPage;
