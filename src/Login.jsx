import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import './Login.css'
import axios from 'axios';
// import { data, NavLink } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader';
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export default function (){
    const{register,handleSubmit,formState:{errors},setValue}= useForm()
    const [isLoading, setLoading] = useState(false);
    const navigate=useNavigate()
    
   
    const onSubmit = (data) => {
      setLoading(true);
      setTimeout(async () => {
         const res = await axios.post(
            'https://mangodb-firstproject.vercel.app/login',
            data
          );
          const resData = res.data;
          if(resData.status){
            toast.success(resData.message);
            Cookies.set('app-user',data.userName,{expires:7})
            setTimeout(()=>{
               navigate('/dashboard')
             },3500)
          }else{
  
          if (resData.message="User does not exist") {
            setValue("userName",'')
            setValue("Password",'')
          } else if(resData.message="wrong password"){
            setValue("Password",'')
          }
          toast.error(resData.message)
         }
      }, 1000);
    };
  
      
    useEffect(()=>{
      if(Cookies.get('app-user')){
         navigate('/dashboard')
      }

    },[])
      
      
return(
<>
{isLoading && <Loader/>}
<Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

<div className="login-container">
            <form onSubmit={handleSubmit(onSubmit)} >
               <h2>Login</h2>
               
               <div className="input-field">
                <label>Email</label>
                <input type='email' {...register('userName',{required:'email is required',pattern:{
                     value:/^\S+@\S+$/i,
                     message:'invalid Username'

                }})}></input>
                {errors.userName && <p>{errors.userName.message}</p>}
               </div>
              
               <div className="input-field">
                <label>Password</label>
                <input type='password' {...register('Password',{required:'password is required',
                  minLength:{
                     value:6,
                     message:'password must be greater than 6 characters'
                  }
                })} ></input>
               {errors.Password && <p>{errors.Password.message}</p>}
               </div>
               
               <NavLink to={'/forgot-password'} className="end">Forgot Password?</NavLink>

               <button type='submit'>Login</button>
               <NavLink to={'/register'} className="nav">Create an account</NavLink>
            </form> 
            </div>
       



</>

)




}