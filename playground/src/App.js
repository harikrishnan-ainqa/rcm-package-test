import React from 'react';
import { AuthContext, AuthProvider } from './contexts/authContext';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
  
import { SignIn, Profile,CustLayout,HelloWorld } from 'functional-components-boilerplate';

const App = ()  => {

    const mockAPI = 'http://localhost:3000'

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <CustLayout>
                         <SignIn 
                            authContext={ AuthContext } 
                            authUrl={ `${mockAPI}/auth` }
                        />
                    </CustLayout>
                  } 
                />
                <Route path="/hello-world" element={
                        <HelloWorld/>
                  } 
                />
                <Route path="/profile" element={
                     <CustLayout>
                        <Profile
                        profileURL={ `${mockAPI}/profile` } 
                    />
                    </CustLayout>
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
