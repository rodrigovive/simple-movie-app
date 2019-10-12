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
                title={`Editar "${rowData[1].substr(0, 40)}"`}
                movie={getDataEditMovie(rowData)}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }, 1000);
                }}
              />
            </Modal>
            <RemoveMovieDialog
              title={`Desea remover la pelicula "${rowData[1].substr(0, 40)}"`}
              renderButton={({ handleOpen, ...props }) => {
                return <DeleteSharpIcon onClick={handleOpen} />;
              }}
            />
          </Fragment>
        )
      }
    }
  ];

  const data = [[1, "Gabby George", new Date().toISOString(), "Activo"]];

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
        data={data}
        columns={columns}
        options={options}
      />
    </Fragment>
  );
}

export default Table;
