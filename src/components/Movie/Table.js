import React, { Fragment } from "react";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import FormMovie from "./FormMovie";
import Modal from "./Modal";
import contants from "../../utils/constants";
import RemoveMovieDialog from "./RemoveMovieDialog";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";

const FAKE_DATA = [[1, "Gabby George", new Date().toISOString(), "Activo"]];

function Table() {
  function getDataEditMovie(row) {
    const [id, movie, release, status, ...others] = row;
    const statusCurrent = String(status).toLowerCase();
    return {
      movie: String(movie),
      release: release instanceof Date ? release : new Date().toISOString(),
      status: contants.STATUS.includes(statusCurrent) ? statusCurrent : ""
    };
  }
  const [
    updateMovieMutation,
    {
      loading: loadingUpdateMovie,
      error: errorUpdateMovie,
      data: dataUpdateMovie
    }
  ] = useMutation(gql(mutations.updateMovie));

  const [
    deleteMovieMutation,
    {
      loading: loadingDeleteMovie,
      error: errorDeleteMovie,
      data: dataDeleteMovie
    }
  ] = useMutation(gql(mutations.deleteMovie));

  const {
    loading: loadingMovies,
    error: errorMovies,
    data: dataMovies
  } = useQuery(gql(queries.listMovies));

  if (loadingMovies) {
    return <h2>Loading</h2>;
  }
  if (errorMovies) {
    console.log("loading", errorMovies);
    return <h2>Error</h2>;
  }

  const {
    listMovies: { items: movieItems }
  } = dataMovies;

  const data = movieItems.map(
    ({ release, id, status, title, description }, index) => {
      return [index + 1, title, release, status, id];
    }
  );
  console.log("data", data);

  const columns = [
    {
      name: "ID"
    },
    {
      name: "Nombre"
    },
    {
      name: "F. Publicacion"
    },
    {
      name: "Estado"
    },
    {
      name: "Accion",
      options: {
        filter: false,
        customBodyRender: (value, { rowData = [], rowIndex }, updateValue) => (
          <Fragment>
            <Modal
              renderButton={({ handleOpen, ...props }) => {
                return <EditSharpIcon onClick={handleOpen} />;
              }}
            >
              <FormMovie
                title={`Editar "${rowData[1]}"`}
                movie={getDataEditMovie(rowData)}
                onSubmit={async ({ movie, release, status }, actions) => {
                  try {
                    await updateMovieMutation({
                      variables: {
                        input: {
                          id: rowData[4],
                          title: movie,
                          release,
                          status
                        }
                      }
                    });
                  } catch (error) {
                    console.log(error);
                  }
                  actions.setSubmitting(false);
                }}
              />
            </Modal>
            <RemoveMovieDialog
              title={`Desea remover la pelicula "${rowData[1]}"`}
              onConfirm={async () => {
                try {
                  await deleteMovieMutation({
                    variables: {
                      input: {
                        id: rowData[4]
                      }
                    }
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
              renderButton={({ handleOpen, ...props }) => {
                return <DeleteSharpIcon onClick={handleOpen} />;
              }}
            />
          </Fragment>
        )
      }
    }
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    print: false,
    download: false,
    filter: false,
    viewColumns: false,
    selectableRowsOnClick: false,
    selectableRowsHeader: false,
    textLabels: {
      body: {
        noMatch: "Pelicula no encontrada",
        toolTip: "Ordenar",
        columnHeaderTooltip: column => `Ordenar por ${column.label}`
      },
      pagination: {
        next: "Proxima Pagina",
        previous: "Anterior Pagina",
        rowsPerPage: "Filas por pagina",
        displayRows: "of"
      }
    }
  };

  return (
    <Fragment>
      <MUIDataTable
        title={"Peliculas"}
        data={data || FAKE_DATA}
        columns={columns}
        options={options}
      />
    </Fragment>
  );
}

export default Table;
