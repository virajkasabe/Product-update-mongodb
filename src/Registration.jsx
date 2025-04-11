import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Registration from "./components/registration";

import { Toaster, toast } from 'react-hot-toast';
import Loader from './Loader'; 
import axios from 'axios';

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios.post(
          'https://mangodb-firstproject.vercel.app/register',
          data
        );
        const resData = res.data;

        if (resData.success) {
          toast.success(resData.message);
        } else {
          toast.error(resData.message);
        }
      } catch (error) {
        toast.error('Something went wrong!');
      } 
    }, 1000);
  };

  return (
 
    <>
    {isLoading&& <Loader/>}
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Registration</h2>

          <div className="input-field">
            <label>User Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Username is required' })}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}
          </div>

          <div className="input-field">
            <label>Email</label>
            <input
              type="email"
              {...register('userName', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.userName && <p>{errors.userName.message}</p>}
          </div>

          <div className="input-field">
            <label>Age</label>
            <input
              type="number"
              {...register('Age', {
                required: 'Age is required',
                min: {
                  value: 18,
                  message: 'Age must be greater than 18',
                },
              })}
            />
            {errors.Age && <p>{errors.Age.message}</p>}
          </div>

          <div className="input-field">
            <label>Password</label>
            <input
              type="Password"
              {...register('Password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.Password && <p>{errors.Password.message}</p>}
          </div>

          

          <button type="submit" >
         submit
          </button>

         
        </form>
      </div>
    </>
  );
}
