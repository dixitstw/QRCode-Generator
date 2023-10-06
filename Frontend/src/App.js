import './App.css';
//rafce=> react arrow function export component
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateProfileForm from './components/CreateProfileForm';
import ViewProfile from './components/ViewProfile';
import UpdateProfile from './components/UpdateProfile';
import CreateQR from './components/CreateQR';


const MyRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path ="/create" element = {<CreateProfileForm/>}/>  
    <Route path ="/view/:id" element = {<ViewProfile/>}/>  
    <Route path ="/update/:id" element = {<UpdateProfile/>}/>  
    <Route path ="/createqr/:id" element = {<CreateQR/>}/>  


    </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes