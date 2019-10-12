import React from "react";
import Dashboard from "./Dashboard";
import Layout from "../layout/Layout";
import { withAuthenticator } from "aws-amplify-react";

function index() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default withAuthenticator(index);
