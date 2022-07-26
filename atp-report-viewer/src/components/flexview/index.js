import React from "react";
import * as FlexmonsterReact from "react-flexmonster";
import "flexmonster/flexmonster.css";
// import { IsRequired } from "../Required";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Avatar,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio,
  MenuItem,
  InputBase,
  Select,
} from "@material-ui/core";

import { Skeleton } from "@material-ui/lab"
import styled from "styled-components";
import CustionAddText from "../customAddTextBox";
import FilterListIcon from "@material-ui/icons/FilterList";
import { AlertContext } from "../../Alert.context";
import config from "../../utils/config"

const useSytle = makeStyles((theme) => ({
  toggle: {
    "& .MuiToggleButtonGroup-grouped": {
      marginLeft: "10px",
      marginRight: "10px",
      border: "1px solid #e0e0e0",
      fontSize: 12,
      minWidth: 60,

      "&:not(:first-of-type)": {
        borderRadius: "8px",
      },
      "&:first-of-type": {
        borderRadius: "8px",
      },
    },
    "& .Mui-selected": {
      backgroundColor: `#2A60BC !important`,
      borderColor: ` #2A60BC !important`,
      color: "#fff !important",
      marginLeft: "10px",
      marginRight: "10px",

      "& .MuiToggleButton-label": {
        color: "#fff !important",
      },
    },
  },
  paper: {
    borderRadius: 12,
    marginTop: 8,
  },
  list: {
    paddingTop: 0,
    paddingBottom: 0,

    "& li": {
      // fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "1rem",
      fontFamily: "TDS_Regular",
    },
    "& li:hover": {
      color: "white",
      background: "#2A60BC",
    },
    "& li.Mui-selected": {
      color: "black",
      background: "#e0f2ff",
    },
    "& li.Mui-selected:hover": {
      // background: "#6EC177",
      color: "white",
      background: "#2A60BC",
    },
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #e0e0e0",
    fontSize: "1rem",
    fontFamily: "TDS_Regular",
    padding: "10px 26px 10px 12px",
  },
}));

const Flexview = (props) => {
  const alertMessage = React.useContext(AlertContext);
  const pivot = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [QueryFilter, setQueryFilter] = React.useState([]);
  const [QueryObj, setQueryobj] = React.useState({});
  const [sampleMetaJson, setsampleMetaJson] = React.useState(
    props.data.querySchema
  );
  const [MetaJson, setMetaJson] = React.useState({});
  const [isAnd, setIsAnd] = React.useState(false);
  const [isRequiredJson, setisRequiredJson] = React.useState({});
  const [openFilter, setCloseFilter] = React.useState(false);
  const [arraysType, setArraysType] = React.useState({});
  // const [isOr, setIsOr] = React.useState(false);
  console.log(props.data);
  const classes = useSytle();

  const menuProps = {
    classes: {
      list: classes.list,
      paper: classes.paper,
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    getContentAnchorEl: null,
  };

  const OnArrayHandle = (key, value) => {
    setArraysType({ ...arraysType, [key]: value });
  };

  const onready = () => {
    console.log("ready");
  };

  const getQueryObjectForArray = (string, entity) => {
    debugger;
    let stringOfArr = string
      .replaceAll(" any in ", '":"')
      .replaceAll(" any == ", '":"')
      .replaceAll(" any== ", '":"')
      .replaceAll(" ANY ==", '":"')
      .replaceAll(" ANY== ", '":"')
      .replaceAll(" in ", "")
      .replaceAll(" ANY in", '":"')
      .replaceAll(" IN ", '":"')
      .replaceAll(" ", "")
      .replaceAll("@", "")
      .replaceAll("==", '":"')
      .replaceAll(`${entity}.`, "")
      .replaceAll("&&", '","');
    let value = '{"' + stringOfArr + '"}';
    setQueryFilter(JSON.parse(value));
    const arrayKeys = Object.keys(JSON.parse(value));
    let object = {};
    arrayKeys.forEach((key) => {
      object[key] = "";
    });
    setQueryobj(object);
    return object;
  };

  const filterStringtoobj = (filter, entity) => {
    let getarray = filter
      .replaceAll("'", '"')
      .replaceAll(`${entity}.`, '"')
      .replaceAll("==", '":')
      .replaceAll("!=", '":')
      .replaceAll("&&", '",')
      .replaceAll("||", '",')
      .replaceAll("AND", '",')
      .replaceAll("OR", '",')
      .replaceAll("@", '"')
      .replaceAll(" ", "");
    let final = "{" + getarray + '"}';

    return final;
  };

  const getQueryObject = React.useCallback((string, entity) => {
    setIsAnd(string.includes("&&"));
    // setIsOr(string.includes("||"));
    let final = filterStringtoobj(string, entity);
    setQueryFilter(JSON.parse(final));
    const arrayKeys = Object.keys(JSON.parse(final));
    let object = {};
    arrayKeys.forEach((key) => {
      object[key] = "";
    });
    setQueryobj(object);
    return object;
  }, []);

  const getFilterFormQuery = React.useCallback(() => {
    let readquery = JSON.parse(props.data.readquery);
    debugger;
    if (Object.keys(readquery).includes("filter")) {
      let isMultipleEntity = readquery?.entity?.includes(",");
      let filter = readquery.filter;
      let metaData = props.data.querySchema;
      setsampleMetaJson(metaData);
      if (isMultipleEntity) {
        if (typeof filter === "object") {
          let entities = readquery?.entity?.split(",");
          let getFormObject = filter[entities[0]];
          if (getFormObject.includes("@")) {
            if (
              getFormObject.includes("@") &&
              (getFormObject.includes("ANY IN") ||
                getFormObject.includes("any in") ||
                getFormObject.includes("any ==") ||
                getFormObject.includes("ANY ==") ||
                getFormObject.includes("ANY==") ||
                getFormObject.includes(" in ") ||
                getFormObject.includes(" IN ") ||
                getFormObject.includes("any=="))
            ) {
              let l = getFormObject.includes("@");
              let object = getQueryObjectForArray(
                getFormObject,
                readquery.entity
              );
              return { metaData, object, l };
            } else {
              let l = getFormObject.includes("@");
              let object = getQueryObject(getFormObject, entities[0]);
              return { metaData, object, l };
            }
          } else {
            let obj = {};
            let l = false;
            return { metaData, obj, l };
          }
        }
      } else {
        if (typeof filter === "string") {
          if (filter.includes("@")) {
            if (
              filter.includes("@") &&
              (filter.includes("ANY IN") ||
                filter.includes("any in") ||
                filter.includes("any ==") ||
                filter.includes("any==") ||
                filter.includes(" in " || filter.includes(" IN ")))
            ) {
              let l = filter.includes("@");
              let object = getQueryObjectForArray(filter, readquery.entity);
              return { metaData, object, l };
            } else {
              let l = filter.includes("@");
              let object = getQueryObject(filter, readquery.entity);
              return { metaData, object, l };
            }
          } else {
            let obj = {};
            let l = false;
            return { metaData, obj, l };
          }
        } else if (typeof filter === "object") {
          let getFormObject = filter[readquery.entity];
          if (getFormObject.includes("@")) {
            if (
              getFormObject.includes("@") &&
              (getFormObject.includes("ANY IN") ||
                getFormObject.includes("any in")) &&
              (getFormObject.includes("in") || getFormObject.includes("IN"))
            ) {
              let l = getFormObject.includes("@");
              let object = getQueryObjectForArray(
                getFormObject,
                readquery.entity
              );
              return { metaData, object, l };
            } else {
              let l = getFormObject.includes("@");
              let object = getQueryObject(getFormObject, readquery.entity);

              return { metaData, object, l };
            }
          } else {
            let obj = {};
            let l = false;
            return { metaData, obj, l };
          }
        }
      }
    } else {
      let metaData = {};
      let obj = {};
      let l = false;

      return { metaData, obj, l };
    }
  }, [getQueryObject, props.data.querySchema, props.data.readquery]);
  React.useLayoutEffect( () => {

    getFunc()
   
    
  },[getFilterFormQuery, props]);

  const getFunc = async () => {

    let { metaData } = getFilterFormQuery(JSON.parse(props.data.readquery));
    setMetaJson(metaData);
    let filtervalue = JSON.parse(props.data.readquery);
    let regtest = /@/g;
    if (filtervalue.filter === undefined || filtervalue.filter === null) {
      filtervalue = JSON.parse(props.data.readquery);
    } else if (
      regtest.test(props.data.readquery) &&
      filtervalue.filter !== undefined
    ) {
      delete filtervalue.filter;
    } else {
      filtervalue = JSON.parse(props.data.readquery);
    }

var url =config.Api_Url;

  await fetch(`${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filtervalue),
    })
      .then((data) => data.json())
      .then((res) => {
      console.log("res" , res)
var report = {
  
  dataSource: {
    data: res.result,
  },
  options: {
    grid: {
      type: "flat",
      showGrandTotals: "off",
      showTotals: "off",
    },
  },
};
// console.log(report);
// setQueryobj({});
// if (pivot.current != null) {
pivot.current.flexmonster.setReport(report);
setLoading(false);
getFilterFormQuery();
// }

      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onHandleChange = (key, value) => {
    setQueryobj({ ...QueryObj, [key]: value });
  };

  const closeFilter = () => {
    setCloseFilter(false);
  };

  const OnFilterClicked = () => {
    setCloseFilter(true);
  };

  const onReportComplete = () => {
    console.log(">>>>", pivot.current.flexmonster.getReport());
    getFilterFormQuery();
  };

  const readFilterQuery = async (temp) => {
    

    var url = config.Api_Url;
    // console.log("config of read", config);
    await fetch(`${url}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log("response" , res)

        var report = {
          dataSource: {
            data: res.result,
          },
          options: {
            grid: {
              type: "flat",
              showGrandTotals: "off",
              showTotals: "off",
            },
          },
        };
        // console.log(report);
        // setQueryobj({});
        closeFilter();
        // if (pivot.current != null) {
        pivot.current.flexmonster.setReport(report);
        getFilterFormQuery();
        // }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const onFlexResetClicked = () => {
    var readQ = JSON.parse(props.data.readquery);
    delete readQ.filter;
    readFilterQuery(readQ);
    setQueryobj([]);
  };
  const IsValid = (obj) => {
    debugger;
    if (isAnd && Object.keys(MetaJson)?.length > 0) {
      let objKey = Object.keys(obj);
      if (objKey.length > 0) {
        let g = objKey.map((l) =>
          obj[`${l}`]?.trim()?.length === 0 ? false : true
        );
        // console.log(g.includes(false));
        return !g.includes(false);
      } else {
        return false;
      }
    } else if (Object.keys(isRequiredJson)?.length > 0) {
      let objKey = Object.keys(obj);
      let g = objKey.map((l) => {
        if (isRequiredJson[`${l}`]) {
          if (typeof sampleMetaJson[`${l}`]) {
            return obj[`${l}`]?.length === 0 ? false : true;
          } else {
            return obj[`${l}`]?.trim()?.length === 0 ? false : true;
          }
        }
        return obj;
      });

      // console.log(g.includes(false));
      return !g.includes(false);
    } else {
      let objKey = Object.keys(obj);
      let g = objKey.map((l) => {
        if (typeof sampleMetaJson[`${l}`]) {
          return obj[`${l}`]?.length === 0 ? false : true;
        } else {
          return obj[`${l}`]?.trim()?.length === 0 ? false : true;
        }
      });
      // console.log(g.includes(false));
      return !g.includes(false);
    }
    /* else if (isOr) {
      let objKey = Object.keys(QueryObj);
      let g = objKey.map((l) =>
        QueryObj[`${l}`]?.trim()?.length === 0 ? false : true
      );
      console.log(g.some(false));
      return g.includes(false);
    } */
  };
  console.log("QueryObj", QueryObj);
  const onFlexFilterClicked = async () => {
    debugger;
    /* console.log(QueryObj);
    let obj = Object.keys(QueryObj).forEach((key) => {
      if (QueryObj[key] === "") {
        delete QueryObj[key];
      }
    }); */
    let valid = IsValid(QueryObj);

    if (valid) {
      var data = QueryObj;

      // let filterMap=filterArr.map(l=>Object)
      var readQ = JSON.parse(props.data.readquery);

      if (Object.keys(readQ).includes("filter")) {
        if (typeof readQ.filter === "object") {
          var strings = readQ.filter[Object.keys(readQ.filter)[0]];
          var getad = strings.split("@").join(" ").split(" ");
          getad.map((e, i) =>
            Object.keys(data).map((v) => {
              if (v === e) {
                if (sampleMetaJson[`${v}`] === "string") {
                  return (getad[i] = "'" + data[e] + "'");
                } else if (Array.isArray(data[e])) {
                  if (arraysType[`${v}`] === "string") {
                    let d = data[e].map((l) => "'" + l + "'");
                    return (getad[i] = "[" + d + "]");
                    // let d = JSON.stringify(data[e]);
                    // return (getad[i] = d);
                    // return (getad1[i] = data[e]);
                  } else {
                    return (getad[i] = "[" + data[e] + "]");
                  }
                } else {
                  return (getad[i] = data[e]);
                }
              }
              return getad;
            })
          );

          console.log(getad.join(" "));
          //  Object.keys(readQ.filter)[0]
          let entity = Object.keys(readQ.filter)[0];
          var updatedFilterQuery = {
            ...readQ,
            filter: {
              ...readQ.filter,
              [entity]: getad.join(" "),
            },
          };
          readFilterQuery(updatedFilterQuery);
        } else if (typeof readQ.filter === "string") {
          var strings1 = readQ.filter;
          var getad1 = strings1.split("@").join(" ").split(" ");
          getad1.map((e, i) =>
            Object.keys(data).map((v) => {
              if (v === e) {
                if (sampleMetaJson[`${v}`] === "string") {
                  return (getad1[i] = "'" + data[e] + "'");
                } else if (Array.isArray(data[e])) {
                  if (arraysType[`${v}`] === "string") {
                    let d = data[e].map((l) => "'" + l + "'");
                    return (getad1[i] = "[" + d + "]");
                    // let d = JSON.stringify(data[e]);
                    // return (getad1[i] = d);
                    // return (getad1[i] = data[e]);
                  } else {
                    return (getad1[i] = "[" + data[e] + "]");
                  }
                } else {
                  return (getad1[i] = data[e]);
                }
              }
              return getad1;
            })
          );

          console.log(getad1.join(" "));
          var updatedFilterQuery2 = { ...readQ, filter: getad1.join(" ") };
          readFilterQuery(updatedFilterQuery2);
        }
      }
    } else {
      // alert("Required Fields Are Empty");
      alertMessage.setAlert({
        ...alertMessage,
        open: true,
        severity: "error",
        message: "Required Field Are Empty!",
      });
    }
  };
  return (
    <div>
      {loading && (
        <>
          <Grid container justifyContent="space-between">
            <Grid item lg={4}>
              <Box style={{ display: "flex" }}>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton sx={{ margin: 1 }} variant="circular">
                  <Avatar />
                </Skeleton>
              </Box>
            </Grid>
          </Grid>
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: "35%" }} />
          </Skeleton>
        </>
      )}
      {
        <div style={{ display: `${!loading ? "block" : "none"}` }}>
          {Object.values(QueryFilter)?.length > 0 && (
            <div style={{ margin: "8px" }}>
              <Button
                startIcon={<FilterListIcon />}
                onClick={() => OnFilterClicked()}
                variant="outlined"
              >
                Filter By
              </Button>
              <Button
                onClick={() => onFlexResetClicked()}
                variant="outlined"
                style={{ marginLeft: "8px" }}
              >
                Reset
              </Button>
            </div>
          )}

          <FlexmonsterReact.Pivot
            ref={pivot}
            toolbar={true}
            width="100%"
            height={500}
            ready={() => onready()}
            reportcomplete={() => onReportComplete()}
            //   beforetoolbarcreated={customizeToolbar}
          />
          <Dialog
            open={openFilter}
            onClose={() => closeFilter()}
            value="sm"
            fullWidth
            autoFocus
          >
            <DialogTitle>
              <Typography variant="body1">Filter By</Typography>
            </DialogTitle>
            <DialogContent dividers>
              <>
                <Grid container spacing={2} direction="row" alignItems="center">
                  {Object.keys(QueryFilter)?.map((l) => (
                    <>
                      {sampleMetaJson[`${l}`] === "array" && (
                        <Grid item ls={3} xs={3}>
                          <Typography
                            variant="body2"
                            color="GrayText"
                            style={{ textTransform: "capitalize" }}
                          >{`${l} Type`}</Typography>
                          <FormControl size="small" fullWidth margin="dense">
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              value={arraysType[`${l}`]}
                              onChange={(e) =>
                                OnArrayHandle(`${l}`, e.target.value)
                              }
                              fullWidth
                              input={<BootstrapInput />}
                              MenuProps={menuProps}
                            >
                              {arrayType?.map((v, index) => {
                                return (
                                  <MenuItem key={index} value={v.value}>
                                    {v.type}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                      )}
                      <Grid
                        item
                        xs={sampleMetaJson[`${l}`] === "array" ? 8 : 12}
                      >
                        <Typography
                          variant="body2"
                          color="GrayText"
                          style={{ textTransform: "capitalize" }}
                        >
                          {`${l}`}
                          {/* {isRequiredJson[`${l}`] && <IsRequired />} */}
                        </Typography>

                        {sampleMetaJson[`${l}`] === "number" ? (
                          <TextField
                            onChange={(e) =>
                              onHandleChange(`${l}`, e.target.value)
                            }
                            value={QueryObj[`${l}`] ?? ""}
                            fullWidth
                            placeholder={`Enter ${l}`}
                            id="textfield"
                            variant="outlined"
                            size="small"
                            margin="dense"
                            type="number"
                          />
                        ) : sampleMetaJson[`${l}`] === "boolean" ? (
                          <RadioGroup
                            aria-label={`${l}`}
                            name={`${l}`}
                            row
                            value={QueryObj[`${l}`] ?? ""}
                            onChange={(e) =>
                              onHandleChange(`${l}`, e.target.value)
                            }
                          >
                            <FormControlLabel
                              value="true"
                              control={<Radio color="primary" />}
                              label="True"
                            />
                            <FormControlLabel
                              value="false"
                              control={<Radio color="primary" />}
                              label="False"
                            />
                          </RadioGroup>
                        ) : sampleMetaJson[`${l}`] === "array" ? (
                          <CustionAddText
                            // label={data?.question}
                            label={"Add "}
                            options={
                              typeof QueryObj[`${l}`] === "string"
                                ? []
                                : QueryObj[`${l}`]
                            }
                            addTag={(value) => onHandleChange(`${l}`, value)}
                            // isReadonly={isReadyOnly}
                            // isrequired={isrequired}
                          />
                        ) : `${l}` === "activestatus" ? (
                          <RadioGroup
                            aria-label={`${l}`}
                            name={`${l}`}
                            row
                            value={QueryObj[`${l}`] ?? ""}
                            onChange={(e) =>
                              onHandleChange(`${l}`, e.target.value)
                            }
                          >
                            <FormControlLabel
                              value="true"
                              control={<Radio />}
                              label="True"
                            />
                            <FormControlLabel
                              value="false"
                              control={<Radio />}
                              label="False"
                            />
                          </RadioGroup>
                        ) : (
                          <TextField
                            onChange={(e) =>
                              onHandleChange(`${l}`, e.target.value)
                            }
                            value={QueryObj[`${l}`] ?? ""}
                            fullWidth
                            placeholder={`Enter ${l}`}
                            id="textfield"
                            variant="outlined"
                            size="small"
                            margin="dense"
                          />
                        )}
                      </Grid>
                    </>
                  ))}
                </Grid>
              </>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => closeFilter()}>Cancel</Button>
              <Button onClick={() => onFlexFilterClicked()}>Filter</Button>
            </DialogActions>
          </Dialog>
        </div>
      }
    </div>
  );
};

export default Flexview;
export const list = [
  { type: "String", value: "string" },
  { type: "Number", value: "number" },
  { type: "Boolean", value: "boolean" },
  { type: "Array", value: "array" },
];
export const arrayType = [
  { type: "String", value: "string" },
  { type: "Number", value: "number" },
];
