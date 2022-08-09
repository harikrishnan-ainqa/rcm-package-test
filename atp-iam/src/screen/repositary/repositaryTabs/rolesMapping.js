/* eslint-disable */

import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Box,
  Switch,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Tooltip,
  IconButton,
  Divider,
  Chip,
  useTheme,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { AlertProps, DrawerProps } from "../../../utils/constants";
import styles from "./styles";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "atp-iam-binder";
import { v4 as uuidV4 } from "uuid";
import DeleteComponent from "./deleteComp";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    // margin: theme.spacing(1),
  },
  saveBtn: {
    position: "absolute",

    bottom: "10px",
    right: "33px",
  },
  switchBase: {
    padding: 2,
    "&$checked": {
      transform: "translateX(12px)",
      color: theme?.palette?.common?.white,
      "& + $track": {
        backgroundColor: "#0071F2",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 12,
    height: 12,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme?.palette?.grey[400]}`,
    backgroundColor: theme?.palette?.grey[50],
    opacity: 1,
    transition: theme?.transitions?.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(Switch);

/**
 *
 * ROLE_READ - READ ALL ROLES
 * PERMISSION_READ_AS_OPTIONS - Options for dropdown
 * PERMISSION_MANAGEMENT_ROLE_READ - Permission Read
 * CODING_UPSERT- Upsert (use the same for Status update)
 *
 * CODABALE_CONCEPT_UPSERT - Delete Action - No Need
 */

function RolesMapping(props) {
  const classes = styles();
  const theme = useTheme();
  const dispatch = useDispatch();

  // Store State -----------------------------------------------------------
  const cloneroleList = useSelector(
    (state) => state?.rolesSlice?.role_read?.data
  ); //ROLE_READ
  const currentRole = useSelector(
    (state) => state?.rolesSlice?.get_role_by_id?.data?.result?.[0]
  );
  // console.log(useSelector((state) => state?.rolesSlice));
  // GET_ROLE_BY_ID
  // const currentRolePermissions = currentRole?.perrolepermsnid?.map((item) => ({
  //   ...item,
  //   label: item?.permsnname,
  //   value: item?._id,
  // }));
  const permissionList = useSelector(
    (state) => state?.permissionSlice?.permission_read_as_options?.data
  ); // PERMISSION_LIST_AS_OPTIONS

  // Component State ----------------------------------------------------------
  const [roleList, setRoleList] = useState(cloneroleList); // State for Full Role List to maintain search further
  const [loader, setLoader] = useState(true); // Toggling loading state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); //
  const [deleteId, setDeleteId] = useState("");
  const [editMode, setEditMode] = useState(false); // Toggle Edit Mode
  const [isAdd, setIsAdd] = useState(false);
  const [roles, setRoles] = useState({
    roleId: "",
    roleName: "",
    permissions: [],
    errorMsg: "",
  });
  const [roleDetails, setRoleDetails] = useState({
    // State for currently selected role
    selectedRole: {},
    roleName: "",
    roleId: "",
    permissions: [],
    id: "",
    activestatus: true,
    _key: "",
    errorMsg: "",
  });

  // Handlers -----------------------------------------------------------------------------------------
  const toggleEditMode = () => {
    setEditMode(!editMode);
    setIsAdd(false);
    setRoleDetails({
      ...roleDetails,
      errorMsg: "",
    });
  };

  const getPermissionOptions = async () => {
    await dispatch(actions.PERMISSION_READ_AS_OPTIONS());
  };

  useEffect(() => {
    fetchRoleList();
    getPermissionOptions();
  }, []);

  // Set Permission
  const handlePermissionChange = (value) => {
    setRoleDetails((prev) => ({
      ...prev,
      permissions: value,
    }));
  };

  // Alerts helper
  const handleAlerts = (message, status) => {
    const { alert } = props;
    let { setSnack } = alert;
    setSnack({
      ...alert,
      horizontal: "right",
      msg: message,
      open: true,
      severity: status ? "success" : "error",
      vertical: "top",
    });
  };

  // Backdrop Helpers
  const showBackdrop = () => {
    props?.backDrop?.setBackDrop({
      ...props.backDrop,
      open: true,
      message: "processing....",
    });
  };
  const hideBackdrop = () => {
    props?.backDrop?.setBackDrop({
      ...props.backDrop,
      open: false,
    });
  };

  // ------------------- UPSERT HANDLER --------------------------------------
  const handleSave = async (rolevalue) => {
    debugger;
    if (
      rolevalue.roleId.length !== 0 &&
      rolevalue.roleName.length !== 0 &&
      rolevalue.permissions.length !== 0
    ) {
      if (/^[0-9]+$/.test(rolevalue.roleId) === true) {
        if (editMode) {
          setRoleDetails({ ...rolevalue, errorMsg: "" });
        } else {
          setRoles({ ...rolevalue, errorMsg: "" });
        }
        //showBackdrop();

        const { roleName, roleId, permissions, id, activestatus, _key } =
          roleDetails;
        var payload = {};
        if (isAdd) {
          payload = {
            id: id ? id : uuidV4(),
            roleid: rolevalue.roleId, //"CodingMaster/11116",
            rolename: rolevalue.roleName, //"Chief Pharmacist",
            perrolepermsnid: rolevalue.permissions.map((item) => item?.value), // ["IDM_PermissionManagement/10007"],
            activestatus: activestatus ? activestatus : true,
            metadataid: "",
            clientid: "",
            projectid: "",
            // _key: _key ? _key : "",
          };
        } else {
          payload = {
            id: id ? id : uuidV4(),
            roleid: rolevalue.roleId, //"CodingMaster/11116",
            rolename: rolevalue.roleName, //"Chief Pharmacist",
            perrolepermsnid: rolevalue.permissions.map((item) => item?.value), // ["IDM_PermissionManagement/10007"],
            activestatus: activestatus ? activestatus : true,
            _key: _key ? _key : "",
            metadataid: "",
            clientid: "",
            projectid: "",
          };
        }
        console.log(payload);
        try {
          const response = await dispatch(
            actions.PERMISSION_ROLE_UPSERT(payload)
          );

          if (response?.payload?.data?.Code === 201) {
            setLoader(true);
            await fetchRoleList();
            setLoader(false);
            hideBackdrop();
            props.alert.setSnack({
              ...props.alert,
              horizontal: AlertProps.horizontal.right,
              msg: "Role Mapped successfully",
              open: true,
              severity: AlertProps.severity.success,
              vertical: AlertProps.vertical.top,
            });
          } else {
            hideBackdrop();
            return props.alert.setSnack({
              ...props.alert,
              horizontal: AlertProps.horizontal.right,
              msg: "Role Mapping failed!",
              open: true,
              severity: AlertProps.severity.error,
              vertical: AlertProps.vertical.top,
            });
          }
        } catch (error) {
          hideBackdrop();
          return props.alert.setSnack({
            ...props.alert,
            horizontal: AlertProps.horizontal.right,
            msg: error,
            open: true,
            severity: AlertProps.severity.error,
            vertical: AlertProps.vertical.top,
          });
        }
        setIsAdd(false);
        setEditMode(false);
        setRoles({
          roleId: "",
          roleName: "",
          permissions: [],
          errorMsg: "",
        });
      } else {
        if (editMode) {
          setRoleDetails({ ...rolevalue, errorMsg: "Only Number Are Allowed" });
        } else {
          setRoles({ ...rolevalue, errorMsg: "Only Number Are Allowed" });
        }
        // setRoles({ ...roles, errorMsg: "Only Number Are Allowed" });
      }
    } else {
      alert("Please Fill the Required Fields");
    }
  };

  // ------------------- DELETE HANDLER --------------------------------------
  const handleDeleteClick = (item) => {
    setDeleteId(item?._key);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async (status) => {
    if (!status) {
      setDeleteDialogOpen(false);
      return;
    }

    try {
      let delete_data = await dispatch(
        actions.ROLE_SOFT_DELETE({ _key: deleteId })
      );
      setDeleteDialogOpen(false);
      if (delete_data?.payload?.error) {
        props.alert.setSnack({
          ...props.alert,
          horizontal: "right",
          msg: "Document delete failed!",
          open: true,
          severity: "error",
          vertical: "top",
        });
        return;
      }
      fetchRoleList();
      props.alert.setSnack({
        ...props.alert,
        horizontal: "right",
        msg: "Document deleted successfully",
        open: true,
        severity: "success",
        vertical: "top",
      });
    } catch (error) {
      console.log(error);
      setDeleteDialogOpen(false);
      props.alert.setSnack({
        ...props.alert,
        horizontal: "right",
        msg: "Document delete failed!",
        open: true,
        severity: "error",
        vertical: "top",
      });
    }
  };

  // ------------------- STATUS HANDLER --------------------------------------
  const handleRoleStateChange = async (event, item) => {
    if (
      currentRole instanceof Object &&
      Object.entries(currentRole).length === 0
    ) {
      await fetchRoleList();
    }

    const { _key } = roleDetails;

    const payload = {
      activestatus: event.target.checked,
      _key: _key ? _key : "",
    };

    try {
      const response = await dispatch(actions.CODING_UPSERT(payload));

      if (response?.payload?.data?.Code === 201) {
        setLoader(true);
        await fetchRoleList();
        setLoader(false);
        props.alert.setSnack({
          ...props.alert,
          horizontal: AlertProps.horizontal.right,
          msg: "Role status updated successfully",
          open: true,
          severity: AlertProps.severity.success,
          vertical: AlertProps.vertical.top,
        });
      } else {
        return props.alert.setSnack({
          ...props.alert,
          horizontal: AlertProps.horizontal.right,
          msg: "Role status update failed!",
          open: true,
          severity: AlertProps.severity.error,
          vertical: AlertProps.vertical.top,
        });
      }
    } catch (error) {
      return props.alert.setSnack({
        ...props.alert,
        horizontal: AlertProps.horizontal.right,
        msg: error,
        open: true,
        severity: AlertProps.severity.error,
        vertical: AlertProps.vertical.top,
      });
    }
  };

  // ------------------- Initial Fetch ---------------------------------------
  const fetchRoleList = async () => {
    try {
      let role_list = await dispatch(actions.ROLE_READ());
      // console.log(role_list);
      if (role_list?.payload?.error) {
        setLoader(false);
        props.alert.setSnack({
          ...alert,
          horizontal: "right",
          msg: "Something went wrong !",
          open: true,
          severity: "error",
          vertical: "top",
        });
        return;
      }
      setLoader(false);

      setRoleList(role_list?.payload?.data);
      fetchPermissionByRoleId(role_list?.payload?.data[0]);
    } catch (error) {}
  };

  const fetchPermissionByRoleId = async (_role) => {
    if (isAdd) {
      setIsAdd(false);
    }
    // if (editMode) {
    //   toggleEditMode();
    // }

    try {
      // Reading Permission based on Role id
      // let roleManagementData = await dispatch(
      //   actions.PERMISSION_MANAGEMENT_ROLE_READ({ role_id: _role.id })
      // );

      const roleById = await dispatch(
        actions.GET_ROLE_BY_ID({ roleid: _role?.roleid })
      );

      const data = roleById?.payload?.data?.result?.[0];

      const preloadOptions = data?.perrolepermsnid?.map((item) => ({
        ...item,
        label: item?.permsnname,
        value: item?._id,
      }));
      // console.log(roleById);
      setRoleDetails((prev) => ({
        ...prev,
        permissions: preloadOptions,
        selectedRole: _role,
        roleName: _role?.rolename ?? "",
        roleId: _role?.roleid ?? "",
        id: data?.id,
        activestatus: data?.activestatus,
        _key: data?._key,
      }));
    } catch (error) {
      props.alert.setSnack({
        ...props.alert,
        horizontal: "right",
        msg: "Something went wrong !",
        open: true,
        severity: "error",
        vertical: "top",
      });
      setRoleDetails({
        ...roleDetails,
        selectedRole: _role,
        roleName: "",
        roleId: "",
        permissions: [],
        id: "",
        activestatus: true,
        _key: "",
      });
    }
  };

  // ------------------- Search Handler -------------------------------------
  const searchChange = (event) => {
    // console.log(cloneroleList, roleDetails);

    let val = event.target.value.toLowerCase();
    const filteredData = cloneroleList.filter((item) => {
      return item?.rolename?.toLowerCase().includes(val);
    });
    setRoleList(filteredData);
  };

  // Lifecycle
  useEffect(() => {
    setRoleList(cloneroleList);
  }, [cloneroleList]);
  console.log(isAdd, editMode);
  return (
    <div className={classes.contentBox}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <div
            // className={classes.firstSec}
            style={{
              // backgroundColor: "#fff",
              backgroundColor: theme?.palette?.background?.table,
              border: "1px solid #DCDCDC",
              // padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div>
              {/* ------------------------------Title---------------------- */}
              <div style={{ display: "flex", margin: "16px 20px 8px" }}>
                <Typography
                   className={classes.numbersEdit}
                  
                >
                  {/* {console.log({ roleList })} */}
                  {loader
                    ? "Roles"
                    : roleList !== undefined
                    ? roleList?.length + " Roles"
                    : 0 + " Roles"}
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Button
                  onClick={() => {
                    setIsAdd(true);
                  }}
                >
                  + Add
                </Button>
              </div>

              {/* -----------------------------Search---------------------------- */}
              <div>
                <TextField
                  id="outlined-search"
                  placeholder="Search field"
                  size="small"
                  onChange={searchChange}
                  style={{
                    // width: "231px",
                    //  height: "32px" ,
                    padding: "8px 20px",
                  }}
                  type="search"
                  variant="outlined"
                  className={classes.SearchStyle}
                  InputProps={{
                    style: {
                      fontFamily: "poppin",
                      fontSize: "12px",
                      background: theme?.palette?.background?.tableHeader,
                      // marginRight: "10px",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                      <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: { fontSize: 12 },
                  }}
                />
              </div>

              <Divider />

              <div
                className={classes.descriptionTab}
                style={{ marginLeft: 20, marginRight: 40 }}
              >
                <Typography className={classes.innerText} color={"primary"}>
                  Role Name
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Typography className={classes.innerText} color={"primary"}>
                  Action
                </Typography>
              </div>

              <div
                className={classes.mainArea}
                style={{
                  height: `calc(100vh - 320px)`,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                {loader ? (
                  <div style={{ textAlign: "center", paddingTop: "90px" }}>
                    <CircularProgress />
                  </div>
                ) : null}
                {roleList?.length > 0 &&
                  roleList?.map(
                    (item, index) =>
                      item?.rolename && (
                        <div style={{ padding: "8px 0px" }} key={item?._id}>
                          <div
                            className={
                              roleDetails?.selectedRole?._id === item?._id
                                ? classes.selectedCell
                                : classes.rolesDisplay
                            }
                            onClick={(e) => fetchPermissionByRoleId(item)}
                            selected={
                              roleDetails?.selectedRole?._id === item?._id
                            }
                          >
                            <Typography className={classes.innerText}>
                              {item?.rolename}
                            </Typography>
                            <div style={{ flexGrow: 1 }}></div>
                            <Tooltip
                              title={
                                item?.activestatus === true
                                  ? "Active"
                                  : "Inactive"
                              }
                              arrow
                            >
                              <IOSSwitch
                                checked={
                                  item?.activestatus === true ? true : false
                                }
                                onChange={(event) =>
                                  handleRoleStateChange(event, item)
                                }
                              />
                            </Tooltip>
                            <Tooltip title="Delete" arrow>
                              <DeleteIcon className={classes.DeleteIconStyle} onClick={() => handleDeleteClick(item)} />
                              
                            </Tooltip>
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </Grid>
        {isAdd === false ? (
          <Grid item xs={8}>
            <div
              style={{
                // backgroundColor: "#fff",
                background: theme?.palette?.background?.table,
                borderRadius: "10px",
                // padding: "10px 20px",
                border: "1px solid #DCDCDC",
              }}
            >
              {isAdd && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <TextField
                    placeholder="Role Id"
                    onChange={(e) =>
                      setRoles({
                        ...roles,
                        roleId: e.target.value,
                      })
                    }
                    error={true}
                    value={roles.roleId}
                  ></TextField>
                  <TextField
                    placeholder="Role Name"
                    value={roles.roleName}
                    onChange={(e) =>
                      setRoles({
                        ...roles,
                        roleName: e.target.value,
                      })
                    }
                  ></TextField>
                </div>
              )}
              {editMode && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <TextField
                    placeholder="Role Id"
                    onChange={(e) => {
                      // console.log("testregex", /^[0-9]+$/.test(e.target.value));
                      // if (/^[0-9]+$/.test(e.target.value))
                      setRoleDetails({
                        ...roleDetails,
                        roleId: e.target.value,
                      });
                    }}
                    error={roleDetails.errorMsg.length !== 0 ? true : false}
                    helperText={roleDetails.errorMsg}
                    value={roleDetails.roleId}
                  ></TextField>
                  <TextField
                    placeholder="Role Name"
                    value={roleDetails.roleName}
                    onChange={(e) =>
                      setRoleDetails({
                        ...roleDetails,
                        roleName: e.target.value,
                      })
                    }
                  ></TextField>
                </div>
              )}
              {!editMode && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <Typography
                    className={classes.numbersEdit}
                    style={{ marginTop: 0, marginRight: 0 }}
                  >
                    {roleDetails?.roleId}
                  </Typography>
                  <Typography
                    className={classes.numbersEdit}
                    style={{ marginTop: 0, marginRight: 0 }}
                  >
                    {roleDetails?.roleName}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={toggleEditMode}
                    style={{ height: 24, width: 24 }}
                  >
                    <CreateOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>
              )}
              {/* {editMode && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Typography
                  className={classes.numbersEdit}
                  style={{ marginTop: 0, marginRight: 0 }}
                >
                  {roleDetails?.roleName}
                </Typography>
              </div>
            )} */}

              <Divider />
              <div
                style={{
                  margin: 14,
                  borderRadius: "10px",
                  border: "1px solid #DCDCDC",
                }}
              >
                <Grid container>
                  {/* Title */}
                  <Grid item xs={12}>
                    <div>
                      <Typography
                        style={{
                          fontFamily: "poppinsemibold",
                          padding: "16px 20px 6px",
                          fontSize: "0.8rem",
                        }}
                        color="textSecondary"
                        variant="body2"
                      >
                        Permission List
                      </Typography>
                    </div>
                  </Grid>

                  {/* Permission list Fields / Chips */}
                  <Grid item xs={12}>
                    {editMode ? (
                      <div style={{ padding: "6px 20px 6px" }}>
                        <Typography
                          id={`permission-list-typography`}
                          style={{
                            color: "#6F6F6F",
                            fontSize: "12px",
                            marginBottom: "6px",
                            fontFamily: "pc_regular",
                          }}
                        >
                          Select Permission List
                          <span style={{ color: "red" }}>*</span>
                        </Typography>
                        <Autocomplete
                          multiple
                          fullWidth
                          size="small"
                          getOptionLabel={(option) => option["label"]}
                          value={roleDetails?.permissions ?? []}
                          options={
                            Array.isArray(permissionList) ? permissionList : []
                          }
                          onChange={(e, value) => handlePermissionChange(value)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={false}
                              variant="outlined"
                              placeholder="Type Here"
                              size="small"
                              error={
                                roleDetails?.error?.permissions ? true : false
                              }
                              helperText={
                                roleDetails?.error?.permissions
                                  ? roleDetails?.errorMsg?.permissions
                                  : ""
                              }
                            />
                          )}
                          classes={{
                            tag: classes.autocompleteTag,
                            paper: classes.dropDownPaper,
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          padding: "6px 20px 6px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        {roleDetails?.permissions?.map((permission) => (
                          <Chip
                            label={permission?.permsnname}
                            classes={{ root: classes.rolesChipRoot }}
                          />
                        ))}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </div>

              {/* Crud action buttons */}
              {editMode && (
                <div
                  style={{
                    margin: "8px 14px 8px 0px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={toggleEditMode}
                    style={{ height: 32, borderRadius: 8 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color={"primary"}
                    style={{ height: 32, borderRadius: 8 }}
                    onClick={(e) => handleSave(roleDetails)}
                    className={classes.containedButton}
                  >
                    Update
                  </Button>
                </div>
              )}
            </div>
          </Grid>
        ) : (
          <Grid item xs={8}>
            <div
              style={{
                // backgroundColor: "#fff",
                background: theme?.palette?.background?.table,
                borderRadius: "10px",
                // padding: "10px 20px",
                border: "1px solid #DCDCDC",
              }}
            >
              {isAdd && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <TextField
                    placeholder="Role Id"
                    onChange={(e) =>
                      setRoles({
                        ...roles,
                        roleId: e.target.value,
                      })
                    }
                    value={roles.roleId}
                    error={roles.errorMsg.length !== 0 ? true : false}
                    helperText={roles.errorMsg}
                  ></TextField>
                  <TextField
                    placeholder="Role Name"
                    value={roles.roleName}
                    onChange={(e) =>
                      setRoles({
                        ...roles,
                        roleName: e.target.value,
                      })
                    }
                  ></TextField>
                </div>
              )}
              <Divider />
              <div
                style={{
                  margin: 14,
                  borderRadius: "10px",
                  border: "1px solid #DCDCDC",
                }}
              >
                <Grid container>
                  {/* Permission list Fields / Chips */}
                  <Grid item xs={12}>
                    <div style={{ padding: "6px 20px 6px" }}>
                      <Typography
                        id={`permission-list-typography`}
                        style={{
                          color: "#6F6F6F",
                          fontSize: "12px",
                          marginBottom: "6px",
                          fontFamily: "pc_regular",
                        }}
                      >
                        Select Permission List
                        <span style={{ color: "red" }}>*</span>
                      </Typography>
                      <Autocomplete
                        multiple
                        fullWidth
                        size="small"
                        getOptionLabel={(option) => option["label"]}
                        value={roles?.permissions ?? []}
                        options={
                          Array.isArray(permissionList) ? permissionList : []
                        }
                        onChange={(e, value) =>
                          setRoles({ ...roles, permissions: value })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={false}
                            variant="outlined"
                            placeholder="Type Here"
                            size="small"
                            error={
                              roleDetails?.error?.permissions ? true : false
                            }
                            helperText={
                              roleDetails?.error?.permissions
                                ? roleDetails?.errorMsg?.permissions
                                : ""
                            }
                          />
                        )}
                        classes={{
                          tag: classes.autocompleteTag,
                          paper: classes.dropDownPaper,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>

              {/* Crud action buttons */}

              <div
                style={{
                  margin: "8px 14px 8px 0px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 12,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsAdd(false);
                    setRoles({
                      roleId: "",
                      roleName: "",
                      permissions: [],
                      errorMsg: "",
                    });
                  }}
                  style={{ height: 32, borderRadius: 8 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color={"primary"}
                  style={{ height: 32, borderRadius: 8 }}
                  onClick={(e) => handleSave(roles)}
                  className={classes.containedButton}
                >
                  Add
                </Button>
              </div>
            </div>
          </Grid>
        )}
      </Grid>
      {/* -------------------------------- delete ----------------------------------  */}
      <DeleteComponent
        open={deleteDialogOpen}
        deleteClose={handleDelete}
        rolesDelete="Roles-Data"
      />
    </div>
  );
}

export default RolesMapping;
