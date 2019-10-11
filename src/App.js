import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./components/Routes";
import Landing from "./components/Landing";
import ErrorBoundary from "./components/Routes/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact component={Routes} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
