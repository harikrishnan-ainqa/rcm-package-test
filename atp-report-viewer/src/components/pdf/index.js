import React from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { ToggleButton,
  ToggleButtonGroup,} from "@material-ui/lab"
import { CSSTransition, SwitchTransition } from "react-transition-group";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GridViewRoundedIcon from "@material-ui/icons/GridOff";
import ArrowBackIosNewTwoToneIcon from "@material-ui/icons/ArrowBackIosTwoTone";
import TableRowsRoundedIcon from "@material-ui/icons/TabletRounded";
import Stylecontent from "../../context/index";
import "./style.css";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
// import PDFViewer from "pdf-viewer-reactjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  root: {
    ".MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "0px",
    },
  },
});

const Pdf = (props) => {

  console.log("props" , props)
  const [alignment, setAlignment] = React.useState("card");
  const styleprop = React.useContext(Stylecontent);
  const jasperReport = props.data.filter((e) => e.reporttype === "jasper");
  console.log("jasperReport" , jasperReport)
  const [listParams, setListParams] = React.useState([]);
  const [finalList, setFinallist] = React.useState({});
  const [pdfReportId, setPdfReportId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [pdf, setPdf] = React.useState("");
  const [viewdetails, setViewDetails] = React.useState({
    data: {},
    view: false,
  });
  const classes = useStyles();
  const handleView = React.useCallback((viewvalue) => {
    console.log(viewvalue.inputparams, viewvalue);
    if (viewvalue.inputparams.length === 0) {
      setViewDetails({
        view: true,
        data: viewvalue,
      });
    } else {
      handleClickOpen(viewvalue.inputparams, viewvalue.reportPdfId);
    }
  }, []);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };

  const handleClickOpen = (getParams, reportid) => {
    setOpen(true);
    setListParams(getParams);
    setPdfReportId(reportid);
  };

  const applyFunction = async () => {
    await axios({
      method: "post",
      url: "https://jasper.reports.dev.ainqaplatform.in/api/generateReport",
      headers: {
        "content-type": "application/json",
      },
      data: {
        reportid: pdfReportId,
        inputparams: finalList,
        result: [],
      },
    })
      .then((res) => {
        console.log(res.data.downloadUrl);
        setViewDetails({
          view: true,
          data: res.data.downloadUrl,
        });
        axios(res.data.downloadUrl, {
          method: "GET",
          responseType: "blob", //Force to receive data in a Blob Format
        })
          .then((response) => {
            //Create a Blob from the PDF Stream
            const file = new Blob([response.data], { type: "application/pdf" });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            setPdf(fileURL);
            //window.open(fileURL);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => console.error(err));
    setOpen(false);
    console.log("qawsed", listParams, finalList);
    setListParams([]);
    setFinallist({});
  };
  console.log("qawsed", listParams, finalList);

  const handleClose = () => {
    setOpen(false);
  };
  const changeHandle = (evt) => {
    console.log(evt.target.name, evt.target.value);
    Object.assign(finalList, { [evt.target.name]: evt.target.value });
    setFinallist(finalList);
  };
  console.log(finalList);
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        style={{
          padding: !viewdetails.view ? "4px" : "0px",
        }}
      >
        {!viewdetails.view && (
          <Grid
            container
            item
            lg={12}
            md={12}
            sm={12}
            justifyContent="flex-end"
            style={{ marginBottom: "10px" }}
          >
            <ToggleButtonGroup
              size="small"
              exclusive
              value={alignment}
              onChange={handleAlignment}
              style={{ height: "30px" }}
            >
              <ToggleButton value="card">
                <GridViewRoundedIcon style={{ fontSize: "15px" }} />
              </ToggleButton>
              <ToggleButton value="table">
                <TableRowsRoundedIcon style={{ fontSize: "15px" }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        )}
        <SwitchTransition mode={"out-in"}>
          <CSSTransition
            key={alignment}
            addEndListener={(node, done) => {
              node.addEventListener("transitionend", done, false);
            }}
            classNames="fade"
          >
            <div className="button-container">
              {
                // View toggle button
              }
              <Grid container item lg={12} md={12} sm={12}>
                {
                  // View the report in card
                }
                <Grid container item spacing={5} lg={12} md={12} sm={12}>
                  {!viewdetails.view &&
                    alignment === "card" &&
                    jasperReport.map((e, i) => {
                      return (
                        <Grid
                          item
                          lg={3}
                          md={4}
                          sm={6}
                          xs={12}
                          key={i}
                          flexWrap
                        >
                          <Paper
                            elevation={0}
                            style={{
                              padding: "10px",
                              border: "1.45px solid #DEE5EC",
                              minWidth: "300px",
                            }}
                          >
                            <Grid container item alignItems={"center"}>
                              <Grid item lg={11} md={11} sm={11} xs={11}>
                                <Typography
                                  variant="h6"
                                  color="text.primary"
                                  style={{
                                    textTransform: "capitalize",
                                    fontFamily:
                                      "Quicksand, sans-serif !important",
                                    fontSize: "16px",
                                  }}
                                >
                                  {e.reportname}
                                </Typography>
                              </Grid>
                              <Grid item lg={1} md={1} sm={1} xs={1}>
                                <IconButton
                                  size="small"
                                  style={{
                                    color: styleprop?.visibilityIconColor,
                                  }}
                                  onClick={(evt) => handleView(e)}
                                >
                                  <VisibilityIcon
                                    style={{
                                      fontSize:
                                        styleprop?.visibilityIconSize?.toString(),
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
              {
                // View the report in list
              }
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                style={{
                  width: "96vw",
                  maxHeight: "60vh",

                  overflowY: "auto !important",
                  padding: "0px 10px",
                }}
              >
                {!viewdetails.view && alignment === "table" && (
                  <Paper
                    style={{
                      border: "1px solid #DEE5EC",
                      borderRadius: "8px",
                    }}
                    elevation={0}
                  >
                    <Grid container item lg={12} md={12} sm={12} xl={12}>
                      {jasperReport.map((e, i) => {
                        return (
                          <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            key={i}
                            flexWrap
                          >
                            <Grid
                              container
                              item
                              alignItems="center"
                              justifyContent="space-between"
                              style={{ padding: "5px 20px" }}
                            >
                              <Grid item lg={10} md={10} sm={10} xs={10}>
                                <Typography
                                  variant="h6"
                                  color="text.primary"
                                  style={{
                                    textTransform: "capitalize",
                                    fontFamily:
                                      "Quicksand, sans-serif !important",
                                    fontSize: "16px",
                                  }}
                                >
                                  {e.reportname}
                                </Typography>
                              </Grid>
                              <Grid
                                container
                                justifyContent="flex-end"
                                item
                                lg={1}
                                md={1}
                                sm={1}
                                xs={1}
                              >
                                <IconButton
                                  size="small"
                                  style={{
                                    color: styleprop?.visibilityIconColor,
                                  }}
                                  onClick={(evt) => handleView(e)}
                                >
                                  <VisibilityIcon
                                    style={{
                                      fontSize:
                                        styleprop?.visibilityIconSize?.toString(),
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                            {jasperReport.length - 1 !== i && (
                              <Divider variant="fullWidth" />
                            )}
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Paper>
                )}
              </Grid>
            </div>
          </CSSTransition>
        </SwitchTransition>

        {
          // This will show the report table
        }
        <CSSTransition in={viewdetails.view} timeout={100} classNames="alert">
          <div
            style={{
              width: "95vw",
            }}
          >
            {viewdetails.view && (
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setViewDetails({ view: false, data: {} });
                      }}
                    >
                      <ArrowBackIosNewTwoToneIcon
                        sx={{ color: "#000" }}
                        fontSize="12"
                      />
                    </IconButton>
                  </div>
                  <div>
                    <div
                      style={{
                        display: "grid",
                        width: "100%",
                      }}
                    >
                      <embed
                        src={pdf}
                        width="100%"
                        style={{ height: "85vh" }}
                      />
                    </div>
                  </div>
                </Grid>
              </Grid>
            )}
          </div>
        </CSSTransition>
      </Grid>
      <Dialog
        fullWidth={"md"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Get Input Params"}</DialogTitle>
        <DialogContent>
          {console.log("listparams", listParams)}
          {listParams.map(
            (e) =>
              e.includes("@") && (
                <>
                  <Typography>{e}</Typography>
                  <TextField
                    className={classes.root}
                    name={e}
                    fullWidth={true}
                    onChange={changeHandle}
                  ></TextField>
                </>
              )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={applyFunction}>Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Pdf;
