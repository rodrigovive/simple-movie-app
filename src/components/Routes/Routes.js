import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard";

const Routes = () => {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/admin" component={Dashboard} />
      </Switch>
    </section>
  );
};

export default Routes;
