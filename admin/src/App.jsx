import React from 'react'
import { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import { storeContext } from './Context/StoreContext'
import Home from './pages/Home/Home'
import DashBoard from './pages/DashBoard/DashBoard'

const App = () => {
  
  const {URL, token,setToken} = useContext(storeContext)

  return (
    <div>
      <Routes>
        {
          token?<></>:
        <Route path='/' element={<Home />} />
        }
        <Route path='/dashboard' element={<DashBoard />} />
        
      </Routes>
    </div>
  )
}

export default App