import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik } from "formik";
import * as yup from "yup";
import { green } from "@material-ui/core/colors";
import { Redirect } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));
function FormMovie({ movie = {}, title, onSubmit, ...props }) {
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize
      initialValues={{
        movie: movie.movie || "",
        release: movie.release || new Date().toISOString(),
        status: movie.status || ""
      }}
      onSubmit={onSubmit ? onSubmit : null}
      validationSchema={yup.object().shape({
        movie: yup
          .string("Formato invalido")
          .min(1, "Nombre de la pelicula")
          .required("Nombre de la pelicula es requerida"),
        release: yup
          .date("Fecha invalida")
          .default(function() {
            return new Date();
          })
          .required("Fecha de la pelicula es requerida"),
        status: yup
          .string("Estado invalido")
          .min(1, "Estado de la pelicula")
          .required("Estado de la pelicula es requerida")
      })}
      render={({
        values,
        errors,
        status,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => (
        <div className={classes.paper}>
          <Typography component="h3" variant="h5">
            {title || "Agregar pelicula"}
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              error={!!errors.movie}
              onChange={handleChange("movie")}
              onBlur={handleBlur}
              value={values.movie}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="movie"
              label="Nombre de la pelicula"
              helperText={errors.movie}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                fullWidth
                margin="normal"
                id="date-picker-dialog"
                label="Fecha de publicacion"
                format="MM/dd/yyyy"
                value={values.release}
                onChange={handleChange("release")}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
            <FormControl
              fullWidth
              className={classes.form}
              error={!!errors.status}
            >
              <InputLabel htmlFor="status-select">
                Estado de la pelicula
              </InputLabel>
              <Select
                inputProps={{
                  name: "status",
                  id: "status-select"
                }}
                fullWidth
                value={values.status}
                onChange={handleChange("status")}
              >
                <MenuItem value={"activo"}>Activo</MenuItem>
                <MenuItem value={"inactivo"}>Inactivo</MenuItem>
              </Select>
            </FormControl>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Agregar Pelicula
              </Button>
              {isSubmitting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </form>
        </div>
      )}
    />
  );
}

export default FormMovie;
