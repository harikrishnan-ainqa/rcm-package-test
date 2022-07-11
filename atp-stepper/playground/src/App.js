import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { MuiStepper } from "atp-stepper";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" render={(props) => {
                return (
                    <MuiStepper />
                )
            }} />
        </Switch>
    );
}

export default App;
