import React, { Fragment } from "react";
import MUIDataTable from "mui-datatables";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import EditSharpIcon from "@material-ui/icons/EditSharp";
const options = {
  filterType: "checkbox"
};

function Table() {
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
        customBodyRender: (value, tableMeta, updateValue) => (
          <Fragment>
            <DeleteSharpIcon
              onClick={() => {
                console.log("value", value);
                console.log("tableMeta", tableMeta);
                console.log("updateValue", updateValue);

                alert("test");
              }}
            />
            {/* <FormControlLabel
            value={value}
            control={<TextField value={value} />}
            onChange={event => updateValue(event.target.value)}
          /> */}
            <EditSharpIcon />
          </Fragment>
        )
      }
    }
  ];

  const data = [["Gabby George", "Business Analyst", "Minneapolis", 30]];

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
        noMatch: "Sorry, no matching records found",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
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
    <MUIDataTable
      title={"Peliculas"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default Table;
