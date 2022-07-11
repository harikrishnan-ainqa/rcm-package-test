import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { TableMui } from "atp-table";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" render={(props) => {
                return (
                    <TableMui />
                )
            }} />
        </Switch>
    );
}

export default App;
