import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { Login } from 'atp-login-components';

const App = (props) => {
    const basicRouters = ["/frequency", "/pharmacy", "/pharmacyverify"];
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Login
                        basicRouters={basicRouters}
                    />
                }
                />
                <Route path="/frequency" element={
                   <p>frequency</p>
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default (App);
