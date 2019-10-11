import React, { Fragment } from "react";
import Table from "./Table";
import BoxHeader from "./BoxHeader";
import Container from "@material-ui/core/Container";

function Dashboard() {
  return (
    <Container fixed>
      <BoxHeader />
      <Table />
    </Container>
  );
}

export default Dashboard;
