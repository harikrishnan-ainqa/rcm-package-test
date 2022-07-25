import React from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ToggleButton,
  ToggleButtonGroup,} from "@material-ui/lab"

import { CSSTransition, SwitchTransition } from "react-transition-group";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GridViewRoundedIcon from "@material-ui/icons/GridOff";
import ArrowBackIosNewTwoToneIcon from "@material-ui/icons/ArrowBackIosTwoTone";
import Stylecontent from "../../context/index";
import TableRowsRoundedIcon from "@material-ui/icons/TabletRounded";
import "./style.css";

const Dashboard = (props) => {

  const [alignment, setAlignment] = React.useState("card");  
  const styleprop = React.useContext(Stylecontent);
  const supersetReport = props.data.filter((e) => e.reporttype === "superset");
console.log("supersetReport" ,supersetReport)
  const [viewdetails, setViewDetails] = React.useState({
    data: {},
    view: false,
  });
  const handleView = React.useCallback((viewvalue) => {
    setViewDetails({
      view: true,
      data: viewvalue.url,
    });
    console.log(viewvalue);
  }, []);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) setAlignment(newAlignment);
  };

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
                    supersetReport.map((e, i) => {
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
                                    color: styleprop.visibilityIconColor,
                                  }}
                                  onClick={(evt) => handleView(e)}
                                >
                                  <VisibilityIcon
                                    style={{
                                      fontSize:
                                        styleprop.visibilityIconSize.toString(),
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
                      {supersetReport.map((e, i) => {
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
                                    color: styleprop.visibilityIconColor,
                                  }}
                                  onClick={(evt) => handleView(e)}
                                >
                                  <VisibilityIcon
                                    style={{
                                      fontSize:
                                        styleprop.visibilityIconSize.toString(),
                                    }}
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                            {supersetReport.length - 1 !== i && (
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
                  <div class="container">
                    <div class="h_iframe">
                      <iframe
                        title={viewdetails.data.toString()}
                        src={viewdetails.data}
                        allowfullscreen
                        frameborder="0"
                        width="100%"
                        height="100%"
                      ></iframe>
                    </div>
                  </div>
                </Grid>
              </Grid>
            )}
          </div>
        </CSSTransition>
      </Grid>
    </>
  );
};

export default Dashboard;
