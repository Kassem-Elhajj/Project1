import React from 'react'   //rfce to create the default skeleton of a react code (extention)
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    // It should be main, otherwise it won't work!
    <main>         
        <Navbar/>
        <Outlet/>
    </main>
  )
};

export default Layout;