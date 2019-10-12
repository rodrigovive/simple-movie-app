import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "../Movie/Modal";
import FormMovie from "../Movie/FormMovie";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as mutations from "../../graphql/mutations";
import { listMovies as listMoviesQuery } from "../../graphql/queries";

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
  const [
    createMovieMutation,
    { loading: loadingMovies, error: errorMovies, data: dataMovies }
  ] = useMutation(gql(mutations.createMovie), {
    update(
      cache,
      {
        data: { createMovie }
      }
    ) {
      const moviesCache = cache.readQuery({ query: gql(listMoviesQuery) });
      const {
        listMovies: { items: listMoviesItems, ...others }
      } = moviesCache;

      cache.writeQuery({
        query: gql(listMoviesQuery),
        data: {
          listMovies: {
            items: listMoviesItems.concat(createMovie),
            ...others
          }
        }
      });
    }
  });

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
        renderForm={({ handleClose, ...props }) => {
          return (
            <FormMovie
              onSubmit={async ({ movie, release, status }, actions) => {
                try {
                  await createMovieMutation({
                    variables: {
                      input: {
                        title: movie,
                        release,
                        status
                      }
                    },
                    optimisticResponse: {
                      __typename: "Mutation",
                      createMovie: {
                        __typename: "Movie",
                        id: 9999999,
                        title: movie,
                        release,
                        status,
                        description: ""
                      }
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
                handleClose();
                actions.setSubmitting(false);
              }}
            />
          );
        }}
      />
    </Grid>
  );
}
export default BoxHeader;
