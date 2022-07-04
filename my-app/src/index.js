import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignUp from './signUp';
import SignIn from './signIn';
import Clinic from './clinic';
import VideoChat from'./videoChat';
import ClinicHomePage from './clinicHomePage';
import WaitingPage from'./waitingPage';
import reportWebVitals from './reportWebVitals';
import MemberInform from './memberInformation';
import ClinicSignIn from './clinicSignIn';
import IndividualRecord from './individualRecord';
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

        <Route path ="/memberInform" element={ 
          <ChakraProvider>
            <MemberInform/>
          </ChakraProvider>} 
        />
         <Route path ="/waitingPage" element={ 
          <ChakraProvider>
            <WaitingPage/>
          </ChakraProvider>} 
        />
         <Route path ="/clinicSignIn" element={ 
          <ChakraProvider>
            <ClinicSignIn/>
          </ChakraProvider>} 
        />
        <Route path ="/individualRecord" element={ 
          <ChakraProvider>
            <IndividualRecord/>
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
