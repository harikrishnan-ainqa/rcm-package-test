import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  Chip,
  OutlinedInput,
  InputAdornment,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  addButton: {
    textTransform: "capitalize",
  },
  chip: {
    margin: "5px",
  },
  labelStyle: {
    fontSize: 16,
  },
}));

export default function CustionAddText(props) {
  console.log("props,", props);
  const classes = useStyles();
  const [values, setValues] = React.useState("");

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  const handleClickAdd = () => {
    if (!values) {
      return false;
    }
    props?.options?.push(values);
    props.addTag(props.options);
    setValues("");
  };

  const handleDelete = (val) => {
    let deleted = props.options.filter((vals) => vals !== val);
    props.addTag(deleted);
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleClickAdd();
    }
  };

  return (
    <div>
      {/*  {
        <Typography
          id={"custom +" + props?.id}
          variant="body1"
          className={classes.labelStyle}
          gutterBottom
        >
          {props.label}{" "}
          {props.isrequired && (
            <Typography variant="caption" style={{ color: "red" }}>
              *
            </Typography>
          )}
        </Typography>
      } */}
      <FormControl size={"small"} fullWidth margin="dense" variant="outlined">
        <OutlinedInput
          readOnly={props?.isReadonly ?? false}
          fullWidth
          disabled={props?.disabled}
          id="outlined-adornment-password"
          type={"text"}
          value={values}
          inputProps={{
            shrink: false,
          }}
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <Button
                id={"+ADDBtn +" + props?.id}
                onClick={handleClickAdd}
                className={classes.addButton}
                size={"small"}
                color={"primary"}
                variant={"text"}
              >
                + Add
              </Button>
            </InputAdornment>
          }
          error={
            props?.errorValidation && props?.errorValidation?.error
              ? props?.errorValidation?.error
              : false
          }
          helperText={
            props?.errorValidation && props?.errorValidation?.errorMessage
              ? props?.errorValidation?.errorMessage
              : ""
          }
          // labelWidth={props.label.length * 8}
        />
      </FormControl>
      {props.options.length > 0 &&
        props.options.map((val) => {
          return (
            <Chip
              id={"chip +" + val}
              className={classes.chip}
              label={val}
              onDelete={() => handleDelete(val)}
            />
          );
        })}
    </div>
  );
}

CustionAddText.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array, // [{value: "", label: ""}]
  addTag: PropTypes.func,
  error: PropTypes.bool,
  readOnly: PropTypes.bool,
};

CustionAddText.defaultProps = {
  label: "",
  options: [],
  addTag: () => {},
  error: false,
};
