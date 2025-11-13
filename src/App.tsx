import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Calculator from './routes/Calculator'
import Nutrition from './routes/Nutrition'
import Workouts from './routes/Workouts'
import Dashboard from './routes/Dashboard'
import Login from "./utils/Login"
import Admin from './utils/Admin'
import Register from './Register'
import Footer from './components/Footer'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/Login' element={<Login />} />
         <Route path='/Register' element={<Register />} />
         <Route path='/Calculator' element={<Calculator />} />
         <Route path='/Nutrition' element={<Nutrition />} />
         <Route path='/Workouts' element={<Workouts />} />
         <Route path='/Dashboard' element={<Dashboard />} />
         <Route path='/Admin' element={<Admin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
