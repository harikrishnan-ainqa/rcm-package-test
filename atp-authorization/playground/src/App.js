import React from "react";
import { Switch, Route } from "react-router-dom";
import { Authorization } from "atp-authorization";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <Switch>
     
      <Route
        exact
        path="/"
        render={(props) => {
          return <Authorization  />;
        }}
      />
    </Switch>
  );
};

export default App;
