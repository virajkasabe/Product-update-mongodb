import { useForm } from 'react-hook-form'
import './forgot.css'
export default function Forgot(){
    const{register,handleSubmit,formState:{errors},watch}= useForm()
  
    const onSubmit = (data) => console.log(data)
return(
<>
<div className="login-container">
            <form onSubmit={handleSubmit(onSubmit)} >
               <h2>Forget Password</h2>
               
               <div className="input-field">
                <label>Email</label>
                <input type='email' {...register('email',{required:'email is required',pattern:{
                     value:/^\S+@\S+$/i,
                     message:'invalid email address'

                }})}></input>
                {errors.email && <p>{errors.email.message}</p>}
               </div>
              
              
             
              

               <button type='submit'>Forget Password</button>
               
            </form> 
            </div>
       



</>

)




}