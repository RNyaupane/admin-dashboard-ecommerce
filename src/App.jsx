import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './components/MainLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Enquiries from './pages/Enquiries'
import Dashboard from './pages/Dashboard'
import BlogList from './pages/BlogList'
import BlogcatList from './pages/BlogcatList'
import Orders from './pages/Orders'
import Customers from './pages/Customers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path='/customers' element={<Customers />}></Route>
            <Route path='/enquiries' element={<Enquiries />}></Route>
            <Route path='/blog-list' element={<BlogList/>}></Route>
            <Route path='/blog-catrogry-list' element={<BlogcatList/>}></Route>
            <Route path='/orders' element={<Orders/>}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
