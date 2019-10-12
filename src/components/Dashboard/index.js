import React from "react";
import Dashboard from "./Dashboard";
import Layout from "../layout/Layout";
import BoxHeader from "./BoxHeader";
import {
  ConfirmSignIn,
  ConfirmSignUp,
  ForgotPassword,
  RequireNewPassword,
  SignIn,
  SignUp,
  VerifyContact,
  Authenticator,
  withAuthenticator,
  Loading,
  Greetings
} from "aws-amplify-react";

function index() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default withAuthenticator(index);
