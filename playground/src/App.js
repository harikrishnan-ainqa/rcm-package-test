import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Card, HelloWorld, Layout } from 'rcm-package-test';

const App = () => {
    return (
        <Switch>
            <Route exact path="/" render={(props) => {
                return (
                    <Layout {...props}>
                        <Card />
                    </Layout>
                )
            }} />
            <Route exact path="/hello-world">
                <Layout>
                    <HelloWorld />
                </Layout>
            </Route>
        </Switch>
    );
}

export default App;
