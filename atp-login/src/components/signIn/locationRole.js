import React from "react";
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useDispatch } from "react-redux";
import { actions } from "atp-login-binder";

const useStyles = makeStyles({
  root: {
    minWidth: 240,
    minHeight: 300,
  },
  normal: {
    minWidth: 80,
    backgroundColor: "#ffff",
    marginLeft: "13px",
    boxShadow: "none",
    borderRadius: "8px",
    border: "1px solid #DFE1E6",
  },
  selected: {
    minWidth: 80,
    backgroundColor: "#01205C",
    color: "white !important",
    marginLeft: "13px",
    boxShadow: "none",
    borderRadius: "8px",
    border: "1px solid #DFE1E6",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  div: {
    marginTop: "20px",
    marginLeft: "23px",
  },
  align: {
    marginTop: "19px",
    marginLeft: "23px",
  },
  heading: {
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: "10px",
  },
});

const initialOptions = {
  enterprisesList: [],
  organisationList: [],
  facilityList: [],
  locationList: [],
};
const initialState = {
  enterprise: null,
  organisation: null,
  facility: null,
  location: null,
};

const LocationRoles = (props) => {
  const classes = useStyles();
  // const { practitonerDetails } = props;
  const [practitionerCode, setPractitionerCode] = React.useState(null);
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = React.useState(null);
  const [optionsData, setOptionsData] = React.useState(initialOptions);
  const [state, setState] = React.useState(initialState);
  const [practitonerDetails, setPractitonerDetails] = React.useState([]);

  const fetchOptions = async (dropdownType, id, queryType) => {
    if (dropdownType === "enterprise") {
      const enterpriseList = await dispatch(
        actions.GetEnterPriseList({
          id: id,
        })
      );
      if (enterpriseList?.payload?.data) {
        setOptionsData({
          ...optionsData,
          enterprisesList: enterpriseList?.payload?.data?.result,
        });
      }
    } else if (dropdownType === "organisation") {
      const organisationList = await dispatch(
        actions.GetOrganisationList({
          id: id,
          queryType: queryType,
        })
      );
      if (organisationList?.payload?.data) {
        setOptionsData({
          ...optionsData,
          organisationList:
            queryType === 1
              ? organisationList?.payload?.data
              : organisationList?.payload?.data?.result,
        });
      }
    } else if (dropdownType === "facility") {
      const facilityList = await dispatch(
        actions.GetFacilityList({
          id: id,
        })
      );
      if (facilityList?.payload?.data) {
        setOptionsData({
          ...optionsData,
          facilityList: facilityList?.payload?.data?.result,
        });
      }
    } else if (dropdownType === "facilityReadQuery") {
      const facilityList = await dispatch(
        actions.GetOrganisationList({
          id: id,
          queryType: queryType,
        })
      );
      if (facilityList?.payload?.data) {
        setOptionsData({
          ...optionsData,
          facilityList: facilityList?.payload?.data,
        });
      }
    } else if (dropdownType === "location") {
      const locationList = await dispatch(
        actions.GetLocationList({
          id: id,
        })
      );
      if (locationList?.payload?.data) {
        setOptionsData({
          ...optionsData,
          locationList: locationList?.payload?.data?.result,
        });
      }
    }
  };

  const handleDropdown = (data, dropdownType, statics) => {
    if (!data) {
      let stateData = state;
      let options = optionsData;
      statics.forEach((item) => {
        stateData[item] = null;
        options[item] = [];
      });
      setState(stateData);
      setOptionsData(options);
    } else {
      if (dropdownType === "enterprise") {
        fetchOptions("organisation", data.id, 2);
      } else if (dropdownType === "organisation") {
        fetchOptions("facility", data.id);
      } else if (dropdownType === "facility") {
        fetchOptions("location", data._id);
      }
    }
    setState({
      ...state,
      [dropdownType]: data,
    });
  };

  const getRole = async () => {
    let practitioner_role = await dispatch(
      actions.GetPractionerRole({
        id: props?.practitonerId,
      })
    );
    setPractitonerDetails(practitioner_role?.payload?.data?.result ?? []);
  };
  React.useEffect(() => {
    getRole();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props?.practitonerId]);

  React.useEffect(() => {
    if (practitonerDetails?.length > 0) {
      handleRole(0);
    }
  }, [practitonerDetails]);

  const handleRole = (index) => {
    let practitionerCode = practitonerDetails?.[index]?.EntityType?.[0]?.code;
    let practitionerId = practitonerDetails?.[index]?.OrgID?._id;
    setPractitionerCode(practitionerCode);
    if (practitionerCode === "OT001") {
      fetchOptions("enterprise", practitionerId);
    } else if (practitionerCode === "OT002") {
      fetchOptions("organisation", practitionerId, 1);
    } else if (practitionerCode === "OT003") {
      fetchOptions("facilityReadQuery", practitionerId, 1);
    }
    setState(initialState);
    setOptionsData(initialOptions);
    if (selectedRole === index) setSelectedRole(null);
    else setSelectedRole(index);
  };

  const validate = (code) => {
    switch (code) {
      case "OT001":
        if (
          state.location &&
          state.facility &&
          state.organisation &&
          state.enterprise
        ) {
          return true;
        } else {
          return false;
        }
      case "OT002":
        if (state.location && state.facility && state.organisation) {
          return true;
        } else {
          return false;
        }
      case "OT003":
        if (state.location && state.facility) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.div}>
        <Typography className={classes.heading}>ROLE :</Typography>
        <div style={{ display: "flex", marginTop: "15px" }}>
          {practitonerDetails?.map((data1, index) => {
            let data = data1?.role?.[0];
            return (
              <div>
                <Card
                  onClick={() => handleRole(index)}
                  className={
                    selectedRole === index ? classes.selected : classes.normal
                  }
                >
                  <CardContent
                    style={{
                      paddingBottom: "12px",
                      paddingTop: "12px",
                      paddingRight: "5px",
                      paddingLeft: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      {data?.display}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      {/* ENTERPRISE START */}
      {practitionerCode === "OT001" && (
        <Grid className={classes.align}>
          <Typography className={classes.heading}>Enterprise</Typography>
          <Autocomplete
            id="combo-box-demo"
            size={"small"}
            options={optionsData?.enterprisesList ?? []}
            value={state?.enterprise}
            onChange={(e, newValue) =>
              handleDropdown(newValue, "enterprise", [
                "enterprise",
                "organisation",
                "facility",
                "location",
              ])
            }
            getOptionLabel={(option) => option?.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Grid>
      )}
      {/* ENTERPRISE END */}
      {/* ORGANIZATION START */}
      {(practitionerCode === "OT001" || practitionerCode === "OT002") && (
        <Grid className={classes.align}>
          <Typography className={classes.heading}>Organization</Typography>
          <Autocomplete
            id="combo-box-demo"
            size={"small"}
            options={optionsData?.organisationList ?? []}
            value={state?.organisation}
            onChange={(e, newValue) =>
              handleDropdown(newValue, "organisation", [
                "organisation",
                "facility",
                "location",
              ])
            }
            getOptionLabel={(option) => option?.name}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </Grid>
      )}
      {/* ORGANIZATION END */}
      {/* FACILITY START */}
      {(practitionerCode === "OT001" ||
        practitionerCode === "OT002" ||
        practitionerCode === "OT003") && (
          <Grid className={classes.align}>
            <Typography className={classes.heading}>Facility</Typography>
            <Autocomplete
              id="combo-box-demo"
              size={"small"}
              options={optionsData?.facilityList ?? []}
              value={state?.facility}
              onChange={(e, newValue) =>
                handleDropdown(newValue, "facility", ["facility", "location"])
              }
              getOptionLabel={(option) => option?.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </Grid>
        )}
      {/* FACILITY END */}
      {/* Location START */}
      {practitionerCode && (
        <Grid className={classes.align}>
          <Typography className={classes.heading}>Location</Typography>
          <Autocomplete
            id="combo-box-demo"
            size={"small"}
            options={optionsData?.locationList ?? []}
            value={state?.location}
            onChange={(e, newValue) =>
              handleDropdown(newValue, "location", ["location"])
            }
            getOptionLabel={(option) => option?.locationID}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
          {/* Location End */}
        </Grid>
      )}
      {practitionerCode && (
        <Button
          onClick={() => {
            props.onNextClick(
              state.location,
              state.facility,
              state.organisation,
              state.enterprise,
              practitonerDetails[selectedRole],
              practitionerCode,
              props?.practitonerId,
              props?.person_id
            );
          }}
          disabled={!validate(practitionerCode)}
          color="primary"
          style={{ float: "right", marginTop: "20px" }}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default LocationRoles;
