import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./components/Routes";
import Landing from "./components/Landing";
import ErrorBoundary from "./components/Routes/ErrorBoundary";
import Dashboard from "./components/Dashboard";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-hooks";
import config from "./aws-exports";
import Amplify, { Auth } from "aws-amplify";

Amplify.configure(config);

const client = new AWSAppSyncClient({
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  disableOffline: true
});

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          <ApolloProvider client={client}>
            <Route exact path="/" component={Dashboard} />
          </ApolloProvider>
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
