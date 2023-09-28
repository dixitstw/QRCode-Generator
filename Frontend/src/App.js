import './App.css';
//rafce=> react arrow function export component
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateProfileForm from './components/CreateProfileForm';
import ViewProfile from './components/ViewProfile';
import UpdateProfile from './components/UpdateProfile';
import ViewQRCode from './components/ViewQRCode';
import DownloadQRCode from './components/DownloadQRCode';
import ScannableQRCode from './components/ScannableQRCode';


const MyRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path ="/create" element = {<CreateProfileForm/>}/>  
    <Route path ="/view/:id" element = {<ViewProfile/>}/>  
    <Route path ="/update/:id" element = {<UpdateProfile/>}/>  
    <Route path ="/viewqr/:id" element = {<ViewQRCode/>}/>  
    <Route path ="/downloadqr/:id" element = {<DownloadQRCode/>}/>  
    <Route path ="/scannableqr/:id" element = {<ScannableQRCode/>}/>  


    </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes