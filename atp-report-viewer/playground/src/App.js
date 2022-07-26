import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import { ReportViewer } from "atp-report-viewer";
import "flexmonster/flexmonster.css";
const App = () => {

    return (
        <Switch>
            <Route exact path="/" render={(props) => {
                return (
                    <ReportViewer 
                     projectId="projects/187315907" 
                     />
                )
            }} />
        </Switch>
    );
}

export default App;
