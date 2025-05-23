
import './App.css'
import Registration from './Registration'

import Forgot from './forgot'
import { Route, Routes } from 'react-router-dom'
import Notfound from './Notfound'
import Dashboard from './Dashboard'

import Login from './login'


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
