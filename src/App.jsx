
import './App.css'
import Registration from './Registration'
import Login from './login'
import Forgot from './forgot'
import { Route, Routes } from 'react-router-dom'
import Notfound from './Notfound'
import Dashboard from './Dashboard'


function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" Component={Login}/>
      <Route path="/register" Component={Registration}/>
      <Route path="/forgot-password" Component={Forgot}/>
      <Route path='/dashboard' Component={Dashboard}/>
      <Route path="*" Component={Notfound}/>
    </Routes>
    </>
  )
}

export default App
