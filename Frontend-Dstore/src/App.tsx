import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from '@/pages/Home'
import Layout from '@/layouts/Layout'
import DetailProduct from '@/pages/DetailProduct'
import Cart from '@/pages/Cart'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="detail" element={<DetailProduct />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  )
}

export default App
