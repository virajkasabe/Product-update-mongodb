import { useNavigate } from 'react-router-dom'
import './Notfound.css'
export default function(){
    const navigate = useNavigate()
    const onbuttonClick = () => {
        navigate('/')

       
    }


    return(
        <>
        <div className="notfound-container">
            <div className="box">
            <h2>404 Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <button onClick={onbuttonClick}>Login</button>
            </div>
        </div>
        </>
    )
}