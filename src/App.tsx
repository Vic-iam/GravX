import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Calculator from './routes/Calculator'
import Nutrition from './routes/Nutrition'
import Workouts from './routes/Workouts'
import Dashboard from './routes/Dashboard'
import Login from "./utils/Login"
import Register from './utils/Register'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoutes'
import { AuthProvider } from "./Context/AuthContext"

function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
         <Route path='/' element={<Home />} />
         <Route path='/Login' element={<Login />} />
         <Route path='/Register' element={<Register />} />
         <Route path='/Calculator' element={<Calculator />} />
         <Route path='/Nutrition' element={<Nutrition />} />
         <Route path='/Workouts' element={<Workouts />} />
         <Route path='/Dashboard' element={<ProtectedRoute>
          <Dashboard />
         </ProtectedRoute>} />
         <Route path='/Register' element={<ProtectedRoute>
          <Register />
         </ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
