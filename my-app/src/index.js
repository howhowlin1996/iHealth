import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignUp from './signUp';
import SignIn from './signIn';
import Clinic from './clinic';
import VideoChat from'./videoChat';
import ClinicHomePage from './clinicHomePage';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import {Routes,Route, BrowserRouter}from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
   (
    <BrowserRouter >
      <Routes>
         
        <Route path ="/" element={ 
          <ChakraProvider>
            <App/>
          </ChakraProvider>} 
        />
        <Route path ="/signUp" element={ 
          <ChakraProvider>
            <SignUp/>
          </ChakraProvider>} 
        />
        <Route path ="/signIn" element={ 
          <ChakraProvider>
            <SignIn/>
          </ChakraProvider>} 
        />
         <Route path ="/clinic" element={ 
          <ChakraProvider>
            <Clinic/>
          </ChakraProvider>} 
        />
         <Route path ="/clinicHomePage" element={ 
          <ChakraProvider>
            <ClinicHomePage/>
          </ChakraProvider>} 
        />
          <Route path ="/videoChat" element={ 
          <ChakraProvider>
            <VideoChat/>
          </ChakraProvider>} 
        />
         
        </Routes>
    </BrowserRouter>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
