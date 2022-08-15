import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Products from '../pages/Products';
import SingleProd from '../pages/SingleProd';

const AllRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/products" element={<Products/>} />
    <Route path="/login" element={<h1>Login</h1>} />
    <Route path="/products/:id" element={<SingleProd/>} />
  </Routes>
  )
}

export default AllRoutes