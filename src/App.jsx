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
import Products from './pages/ProductList'
import ProductCatList from './pages/ProductCatList'
import BrandList from './pages/BrandList'
import BrandCatList from './pages/BrandCatList'
import AddBlog from './pages/AddBlog'
import AddBlogCat from './pages/AddBlogCat'
import AddProductCat from './pages/AddProductCat'
import AddBrand from './pages/AddBrand'
import AddProduct from './pages/AddProduct'
import ColorList from './pages/ColorList'
import AddColor from './pages/AddColor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/admin' element={<MainLayout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path='customers' element={<Customers />}></Route>

            <Route path='products' element={<Products />}></Route>
            <Route path='product-category-list' element={<ProductCatList />}></Route>
            <Route path='add-product' element={<AddProduct />}></Route>
            <Route path='add-product-category' element={<AddProductCat />}></Route>

            <Route path='brands' element={<BrandList />}></Route>
            <Route path='add-brand' element={<AddBrand />}></Route>

            <Route path='blog-list' element={<BlogList />}></Route>
            <Route path='blog-catrogry-list' element={<BlogcatList />}></Route>
            <Route path='add-blog' element={<AddBlog />}></Route>
            <Route path='add-blog-category' element={<AddBlogCat />}></Route>

            <Route path='color-list' element={<ColorList />}></Route>
            <Route path='add-color' element={<AddColor />}></Route>

            <Route path='enquiries' element={<Enquiries />}></Route>
            <Route path='orders' element={<Orders />}></Route>
          </Route>
          <Route path='/' element={<Login />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


// 19:00