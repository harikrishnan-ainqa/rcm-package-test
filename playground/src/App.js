import React from 'react';
import { AuthContext, AuthProvider } from './contexts/authContext';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
  
import { Card,HelloWorld } from 'rcm-package-test';

const App = ()  => {

    const mockAPI = 'http://localhost:3000'

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
            <Card
                cardTitle="A card title"
                cardTitleType="card option"
                toolTip
              ></Card>
                  } 
                />
                <Route path="/hello-world" element={
                        <HelloWorld/>
                  } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
