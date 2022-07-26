import * as React from "react";
import { Box, Tabs, Tab, Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Dashboard, Cardview, Pdf } from "../../components";
import { NetworkReadCall } from "../../utils/network";
import Stylecontent from "../../context/index";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import config from "../../utils/config";



const CenteredTabs = (props) => {
  const styleprop = React.useContext(Stylecontent);
  const [value, setValue] = React.useState(0);
  const [reportList, setReportList] = React.useState([]);
  const [transition, setTransition] = React.useState(false);

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      transition: "all 0.5s ease-out",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 100,
      width: "100%",
      backgroundColor: styleprop.color,
      transition: "all 0.5s ease-out",
    },
  });

  const StyledTab = styled((props) =>
   <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: "none",
      fontWeight: 600,
      fontFamily: "sans-serif",
      color: styleprop.color,
      "&.Mui-selected": {
        color: styleprop.color,
        transition: "all 0.5s ease-out",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
        transition: "all 0.5s ease-out",
      },
      transition: "all 0.5s ease-out",
    })
  );
  const handleChange = (event, newValue) => {
    setTransition(!transition);
    setValue(newValue);
  };

  React.useEffect(() => {
    
    let res_data = NetworkReadCall({
      URl:config.Api_Url,
      db_name:config.reportdbname,
      entity:config.reportentity,
      filter: `${config.reportentity}.projectid=='${props.projectId}'`,
      ismime_read: "true",
      return_fields: `${config.reportentity}`,
    });
    res_data
      .then((res) => setReportList(res.result))
      .catch((err) => console.error(err));
  }, [props.projectId]);
  return (
    <>
      <Box
        sx={{ width: "100%", bgcolor: "background.paper" }}
        style={{ backgroundColor: styleprop.backgroundColor }}
      >
        <StyledTabs value={value} onChange={handleChange} centered>
          <StyledTab label={styleprop.tab1} />
          <StyledTab label={styleprop.tab2} />
          <StyledTab label={styleprop.tab3} />
        </StyledTabs>
      </Box>

      <SwitchTransition mode={"out-in"}>
        <CSSTransition
          key={transition}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="alert"
        >
          <div className="button-container">
            {props.projectId.length !== 0 ? (
              <Grid container style={{ marginTop: "10px" }}>
                <Grid item lg={12}>
                  {value === 0 && <Cardview data={reportList} />}
                  {value === 1 && <Dashboard data={reportList} />}
                  {value === 2 && <Pdf data={reportList} />}
                </Grid>
              </Grid>
            ) : (
              <Box
                style={{
                  display: "grid",
                  placeContent: "center",
                  placeItems: "center",
                  height: "85vh",
                }}
              >
                <Box>
                  <img
                    src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    alt="No Data"
                  />
                  <Typography style={{ textAlign: "center" }}>
                    No Data
                  </Typography>
                </Box>
              </Box>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};
export default CenteredTabs;
