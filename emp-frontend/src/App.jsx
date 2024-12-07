import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeListComp from './component/EmployeeListComp'
import HeaderComp from './component/HeaderComp'
import FooterComp from './component/FooterComp'
import EmployeeComp from './component/EmployeeComp'
function App() {


  return (
    <>
      <BrowserRouter>

       <HeaderComp></HeaderComp>

        <Routes>

          <Route path='/' element={<EmployeeListComp />}></Route>

          <Route path='/employees' element={<EmployeeListComp />}></Route>

          <Route path='/add-employee' element={<EmployeeComp />}></Route>

          <Route path='/update-employee/:id' element={<EmployeeComp />}></Route>

        </Routes>

        <FooterComp></FooterComp>

      </BrowserRouter>
    </>
  )
}

export default App
