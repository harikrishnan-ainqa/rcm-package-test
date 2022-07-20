import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import { GeneralMaster } from 'atp-general-master';

const App = (props) => {
   
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <GeneralMaster />
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default (App);
