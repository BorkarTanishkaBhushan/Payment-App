import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/Dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { SendMoney } from './pages/SendMoney'
import LandSection from './pages/LandSection';



function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandSection/>} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/send" element={<SendMoney/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
