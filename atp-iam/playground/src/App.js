import React from "react";
import { Switch, Route } from "react-router-dom";
import { AccessManagement , Authentication } from "atp-iam";
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
        path="/Access"
        render={(props) => {
          return <AccessManagement  />;
        }}
      />
    </Switch>
  );
};

export default App;
