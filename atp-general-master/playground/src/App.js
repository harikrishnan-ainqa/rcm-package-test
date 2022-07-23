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
                    <GeneralMaster URl="https://arangodbservice.dev.ainqaplatform.in" db_name="ipmo" metadataId="8fd7c4c8-706a-4edc-ab27-534cb7e9ad8a" metadata_dbname ="ATP_Platform_DEV"  />
                }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default (App);
