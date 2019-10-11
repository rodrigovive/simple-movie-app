import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../Modal/Modal";
import AddMovie from "../Modal/AddMovie";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    padding: theme.spacing(2),
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function BoxHeader() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Modal
        renderButton={({ handleOpen, ...props }) => {
          return (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleOpen}
            >
              Agregar Pelicula
            </Button>
          );
        }}
      >
        <AddMovie
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        />
      </Modal>
    </Grid>
  );
}
export default BoxHeader;
