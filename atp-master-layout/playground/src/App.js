import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Layout } from 'rcm-package-test';

const App = () => {
    return (
        <Switch>
            <Route exact path="/" render={(props) => {
                return (
                    <Layout {...props}>
                        <p>Master Layout</p>
                    </Layout>
                )
            }} />
        </Switch>
    );
}

export default App;
