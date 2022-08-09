import React from "react";
import { Switch, Route } from "react-router-dom";
import { Authentication , HelloWorld } from "atp-authentication";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => {
          return <Authentication  />;
        }}
      />
      <Route
        exact
        path="/Home"
        render={(props) => {
          return <HelloWorld  />;
        }}
      />
    </Switch>
  );
};

export default App;
