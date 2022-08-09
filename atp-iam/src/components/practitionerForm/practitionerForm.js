import {
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Divider,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import { RequiredField } from "../common";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "atp-iam-binder";
import { Autocomplete } from "@material-ui/lab";
const PractitionerForm = (props) => {
  const dispatch = useDispatch();
  const EntityType = useSelector(
    (state) => state?.personSlice.facilityList?.data
  );
  const organizationSlice = useSelector(
    (state) => state?.personSlice.orgname?.data
  );
  const Gender = useSelector((state) => state?.personSlice.gender_master?.data);
  const Prefix = useSelector((state) => state?.personSlice.prefix_master?.data);
  const Suffix = useSelector(
    (state) => state?.personSlice.surffix_master?.data
  );
  const roleList = useSelector((state) => state?.rolesSlice?.role_read?.data);
  console.log("rolelist", roleList, organizationSlice, EntityType);
  const [imageFile, setImageFile] = React.useState({
    file: "",
  });
  const imageHandle = (event) => {
    setImageFile({ file: URL.createObjectURL(event.target.files[0]) });
  };
  const entityList = [
    { label: "Organization" },
    { label: "Facility" },
    { label: "Ward" },
    { label: "Room" },
    { label: "Bed" },
  ];
  // const [name, setNameDetails] = React.useState({
  //   use: "",
  //   text: "",
  //   family: "",
  //   given: "",
  //   prefix: "",
  //   suffix: "",
  //   period: [],
  //   id: 0,
  // });
  const name = React.useRef({
    use: "",
    text: "",
    family: "",
    given: "",
    prefix: "",
    suffix: "",
    period: [],
    id: 0,
  });
  const telecom = React.useRef({
    system: "",
    value: "",
    use: "",
    rank: "",
    period: [],
    id: 0,
  });
  const [roleID, setRoleID] = React.useState({});
  const [state, setState] = React.useState([]);
  const [photo, setPhotoDetails] = React.useState({
    date: "",
    url: "",
    id: 0,
    fileName: "",
    fileid: "",
    filetype: "",
  });
  const address = React.useRef({
    country: "",
    Type: "",
    city: "",
    line: "",
    use: "0",
    postalCode: "",
    state: "",
  });
  const [OrgID, setOrgId] = React.useState({});
  const [orgType, setOrgType] = React.useState([]);
  const [parentEntity, setParent] = React.useState([]);
  React.useLayoutEffect(() => {
    dispatch(actions.ROLE_READ());
    dispatch(actions.ORGANIZATION_GET_LEVEL_CARE());
    dispatch(actions.GENDERMASTER());
    dispatch(actions.PREFIXMASTER());
    dispatch(actions.SURFFIXMASTER());
    // dispatch(actions.GET_PARENT_ENTITY("Facility"));
    dispatch(actions.ORGNAME());
  }, []);

  const getParent = async (type) => {
    let res = await dispatch(actions.FACILITYLIST(type)); // console.log("getParent", res.payload.data);

    setParent(res.payload.data);
    // console.log("parent", parent);
  };
  const handleChange = (value) => {
    getParent(value?.id);
  };
  console.log({ parentEntity });
  return (
    <React.Fragment>
      {!props.loading && (
        <div
          style={{
            textAlign: "center",
            paddingTop: "90px",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            zIndex: "2",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div style={{ filter: !props.loading ? "blur(2px)" : "blur(0px)" }}>
        <Grid container>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
            {/**
                 /* PRACTITIONER IDENTIFICATION
                   */}
            {/* <Grid item xl={12} lg={12} md={12} xs={12}>
            <Paper style={{ padding: "10px", margin: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography>PRACTITIONER IDENTIFICATION</Typography>
                </div>
                <div>
                  <Button>+Add New</Button>
                </div>
              </div>
              <Grid container spacing={3}>
                <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>
                    ID Type
                    <RequiredField color="red" />
                  </Typography>

                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>
                    ID Number
                    <RequiredField color="red" />
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>Expiry Date</Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
              </Grid>
            </Paper>
          </Grid> */}
            {/**
                 /* PRACTITIONER DETAILS
                   */}
            <Grid
              container
              item
              xl={12}
              lg={12}
              md={12}
              xs={12}
              spacing={1}
              style={{ margin: "5px" }}
            >
              {/* <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Paper style={{ padding: "10px", height: "100%" }}>
                <div style={{ width: "100%" }}>Image upload</div>
              </Paper>
            </Grid> */}
              {/* <Grid item xl={9} lg={9} md={9} sm={12} xs={12}> */}
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Paper style={{ padding: "10px" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Typography>Registration Details</Typography>
                    </div>
                    <div>{/* <Button>+Add New</Button> */}</div>
                  </div>
                  <Grid
                    container
                    spacing={3}
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Grid
                      container
                      item
                      xl={12}
                      lg={12}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <Grid container item xl={2} lg={2} md={2} sm={4} xs={12}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <div
                            style={{
                              width: "90%",
                              display: "flex",
                              maxHeight: "150px",
                            }}
                          >
                            <img
                              style={{ width: "100%" }}
                              src={
                                imageFile.file.length !== 0
                                  ? imageFile.file
                                  : "https://st.depositphotos.com/1116329/5039/v/450/depositphotos_50398461-stock-illustration-vector-black-web-icon-on.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <Button
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <input
                              hidden
                              accept="image/*"
                              type="file"
                              onChange={(e) => imageHandle(e)}
                            />
                            <CloudUploadIcon style={{ margin: "0 5" }} />
                            Upload
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        item
                        xl={10}
                        lg={10}
                        md={10}
                        sm={8}
                        xs={12}
                        spacing={3}
                      >
                        {/* <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography>
                            Use <RequiredField color="red" />
                          </Typography>
                          
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={name.use}
                            onChange={(e) => {
                              setNameDetails({ ...name, use: e.target.value });
                              props.sendData("name", name);
                            }}
                          />
                        </Grid> */}
                        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography noWrap>
                            Prefix
                            <RequiredField color="red" />
                          </Typography>
                          {/* <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={name.prefix}
                            onChange={(e) => {
                              setNameDetails({
                                ...name,
                                prefix: e.target.value,
                              });
                              props.sendData("name", name);
                            }}
                          /> */}
                          <Autocomplete
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Prefix"
                                variant="outlined"
                              />
                            )}
                            options={Prefix ?? []}
                            getOptionLabel={(option) => option.display ?? []}
                            onChange={(e, newvalue) => {
                              props.sendData("prefix", newvalue);
                            }}
                            fullWidth
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography noWrap>
                            First Name
                            <RequiredField color="red" />
                          </Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={name?.text}
                            onChange={(e) => {
                              name.current = {
                                ...name.current,
                                text: e.target.value,
                              };
                              props.sendData("name", name.current);
                            }}
                          />
                        </Grid>
                        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography noWrap>Middle Name</Typography>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={name.family}
                            onChange={(e) => {
                              name.current = {
                                ...name.current,
                                family: e.target.value,
                              };
                              props.sendData("name", name.current);
                            }}
                          />
                        </Grid>
                        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography noWrap>
                            Last Name
                            <RequiredField color="red" />
                          </Typography>

                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={name.given}
                            onChange={(e) => {
                              name.current = {
                                ...name.current,
                                given: e.target.value,
                              };
                              props.sendData("name", name.current);
                            }}
                          />
                        </Grid>
                        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography>
                            Suffix
                            <RequiredField color="red" />
                          </Typography>
                          {/* <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            value={name.suffix}
                            onChange={(e) => {
                              setNameDetails({
                                ...name,
                                suffix: e.target.value,
                              });
                              props.sendData("name", name);
                            }}
                          /> */}
                          <Autocomplete
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Suffix"
                                variant="outlined"
                              />
                            )}
                            options={Suffix ?? []}
                            getOptionLabel={(option) => option.display ?? []}
                            fullWidth
                            onChange={(e, newvalue) => {
                              props.sendData("suffix", newvalue);
                            }}
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography>
                            Gender
                            <RequiredField color="red" />
                          </Typography>
                          {/* <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            onChange={(e) => {
                              props.sendData("gender", e.target.value);
                            }}
                          /> */}
                          <Autocomplete
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Gender"
                                variant="outlined"
                              />
                            )}
                            options={Gender ?? []}
                            getOptionLabel={(option) => option.display ?? []}
                            fullWidth
                            variant="outlined"
                            size="small"
                            onChange={(e, newvalue) => {
                              props.sendData("gender", newvalue);
                            }}
                          />
                        </Grid>
                        <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                          <Typography noWrap>
                            Date of Birth
                            <RequiredField color="red" />
                          </Typography>
                          <TextField
                            size="small"
                            variant="outlined"
                            id="date"
                            type="date"
                            fullWidth
                            onChange={(e) => {
                              props.sendData(
                                "birthDay",
                                e.target.value.split("-").reverse().join("/")
                              );
                            }}
                            // defaultValue={new Date().toISOString().slice(0, 10)}
                            // className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* <Grid
                  container
                  spacing={3}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                    <Typography>
                      Gender
                      <RequiredField color="red" />
                    </Typography>
                    <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Combo box"
                          variant="outlined"
                        />
                      )}
                      options={[]}
                      getOptionLabel={(option) => option ?? []}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xl={2} lg={2} md={3} sm={6} xs={12}>
                    <Typography noWrap>
                      Date of Birth
                      <RequiredField color="red" />
                    </Typography>
                    <TextField
                      size="small"
                      variant="outlined"
                      id="date"
                      type="date"
                      fullWidth
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      // className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid> */}
                </Paper>
              </Grid>
            </Grid>
            {/**
                  /*Telecom Details */}
            {/* <Grid item xl={12} lg={12} md={12} xs={12}>
            <Paper style={{ padding: "10px", margin: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Typography>PRACTITIONER DESCRIPTION</Typography>
                </div>
                <div>
                  <Button>+Add New</Button>
                </div>
              </div>
              <Grid container spacing={3}>
                <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>
                    Practitioner Type <RequiredField color="red" />
                  </Typography>

                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>
                    Position
                    <RequiredField color="red" />
                  </Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>Employee Type</Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
                <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>Communication Languages</Typography>
                  <TextField fullWidth variant="outlined" size="small" />
                </Grid>
              </Grid>
            </Paper>
          </Grid> */}
            {/**
                  /*CONTACT DETAILS */}
            <Grid item xl={12} lg={12} md={12} xs={12} sm={12}>
              <Paper style={{ padding: "10px", margin: "10px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography>Contact Details</Typography>
                  </div>
                  <div>{/* <Button>+Add New</Button> */}</div>
                </div>
                <Grid container spacing={3}>
                  {/* <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>use</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setTelecomDetails({
                          ...telecom,
                          use: e.target.value,
                        });
                        props.sendData("telecom", telecom);
                      }}
                    />
                  </Grid> */}
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>
                      Email
                      <RequiredField color="red" />
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        telecom.current = {
                          ...telecom.current,
                          value: e.target.value,
                        };
                        props.sendData("telecom", telecom.current);
                      }}
                    />
                  </Grid>
                  {/* <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                  <Typography>Priority</Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      setTelecomDetails({
                        ...telecom,
                        rank: e.target.value,
                      });
                      props.sendData("telecom", telecom);
                    }}
                  />
                </Grid> */}
                </Grid>
              </Paper>
            </Grid>
            {/**
          /*Address
 */}
            <Grid item xl={12} lg={12} md={12} xs={12}>
              <Paper style={{ padding: "10px", margin: "10px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Typography>Address Details</Typography>
                  </div>
                  <div>{/* <Button>+Add New</Button> */}</div>
                </div>
                <Grid container spacing={3}>
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>
                      City
                      <RequiredField color="red" />
                    </Typography>
                    {/* <Autocomplete
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="City"
                        variant="outlined"
                      />
                    )}
                    options={[]}
                    getOptionLabel={(option) => option ?? []}
                    fullWidth
                    variant="outlined"
                    size="small"
                  /> */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={address.city}
                      onChange={(e) => {
                        address.current = {
                          ...address.current,
                          city: e.target.value,
                        };
                        props.sendData("address", address.current);
                      }}
                    />
                  </Grid>
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>Postal Code</Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={address.postalCode}
                      onChange={(e) => {
                        address.current = {
                          ...address.current,
                          postalCode: e.target.value,
                        };
                        props.sendData("address", address.current);
                      }}
                    />
                  </Grid>
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>State</Typography>
                    {/* <Autocomplete
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="State"
                        variant="outlined"
                      />
                    )}
                    options={[]}
                    getOptionLabel={(option) => option ?? []}
                    fullWidth
                    variant="outlined"
                    size="small"
                  /> */}
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={address.state}
                      onChange={(e) => {
                        address.current = {
                          ...address.current,
                          state: e.target.value,
                        };
                        props.sendData("address", address.current);
                      }}
                    />
                  </Grid>
                  {/* <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>
                      Use
                      <RequiredField color="red" />
                    </Typography>

                    <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Use"
                          variant="outlined"
                        />
                      )}
                      options={[]}
                      getOptionLabel={(option) => option ?? []}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid> */}
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>
                      Country
                      <RequiredField color="red" />
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={address.country}
                      onChange={(e) => {
                        address.current = {
                          ...address.current,
                          country: e.target.value,
                        };
                        props.sendData("address", address.current);
                      }}
                    />
                    {/* <Autocomplete
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Country"
                        variant="outlined"
                      />
                    )}
                    options={[]}
                    getOptionLabel={(option) => option ?? []}
                    fullWidth
                    variant="outlined"
                    size="small"
                  /> */}
                  </Grid>
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>
                      Select Role
                      <RequiredField color="red" />
                    </Typography>

                    <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Role"
                          variant="outlined"
                        />
                      )}
                      options={roleList ?? []}
                      value={roleID}
                      onChange={(e, newvalue) => {
                        console.log(newvalue);
                        setRoleID(newvalue);
                        props.sendData("roleid", newvalue);
                      }}
                      getOptionLabel={(option) => option?.rolename ?? []}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>
                      Select Entity
                      <RequiredField color="red" />
                    </Typography>

                    {/* <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Entity"
                          variant="outlined"
                        />
                      )}
                      options={organizationSlice ?? []}
                      // value={OrgID}
                      value={OrgID}
                      onChange={(e, newvalue) => {
                        console.log(newvalue);
                        setOrgId(newvalue);
                        props.sendData("OrgID", newvalue);
                      }}
                      getOptionLabel={(option) => option.title ?? []}
                      fullWidth
                      variant="outlined"
                      size="small"
                    /> */}
                    <Autocomplete
                      // id={`${parent_id}-Entity-Type-autocomplete`}
                      options={organizationSlice}
                      getOptionLabel={(option) => option.name || ""}
                      size={"small"}
                      value={OrgID ?? []}
                      onChange={(e, value) => {
                        handleChange(value);
                        setOrgId(value);
                        props.sendData("OrgID", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          // id={`${parent_id}-Entity-Type-textField`}
                          {...params}
                          variant="outlined"
                          // error={props.data?.error?.EntityType}
                          placeholder={"Select Entity"}
                          autoComplete="off"
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xl={2} lg={3} md={3} sm={6} xs={12}>
                    <Typography>
                      Entity Name
                      <RequiredField color="red" />
                    </Typography>

                    {/* <Autocomplete
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Entity Name"
                          variant="outlined"
                        />
                      )}
                      options={EntityType ?? []}
                      value={orgType}
                      onChange={(e, newvalue) => {
                        setOrgType(newvalue);
                        props.sendData("orgType", newvalue);
                      }}
                      getOptionLabel={(option) => option.title ?? []}
                      fullWidth
                      variant="outlined"
                      size="small"
                    /> */}
                    <Autocomplete
                      // id={`${parent_id}-Entity-Type-autocomplete`}
                      options={parentEntity ?? []}
                      getOptionLabel={(option) => option.name}
                      size={"small"}
                      onChange={(e, value) => {
                        props.sendData("orgType", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          // id={`${parent_id}-Entity-Type-textField`}
                          {...params}
                          variant="outlined"
                          // error={props.data?.error?.EntityType}
                          placeholder={"Entity Name"}
                          autoComplete="off"
                          size="small"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default PractitionerForm;
