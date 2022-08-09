/* eslint-disable */

import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Switch,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Divider,
  IconButton,
  useTheme,
} from "@material-ui/core";
import styles from "./styles";
import DeleteComponent from "./deleteComp";
import { withStyles } from "@material-ui/core/styles";
import Tree from "../../../components/tree";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "atp-iam-binder";
import { v4 as uuidV4 } from "uuid";
import { AlertProps } from "../../../utils/constants";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Search from "@material-ui/icons/Search";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    // margin: theme.spacing(1),
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

const PermissionMapping = (props) =>  {
  const classes = styles();
  const permissionListSeed = useSelector(
    (state) => state?.permissionSlice?.permission_read?.data?.result
  );
  const repository_list = useSelector(
    (state) => state?.repositorySlice?.repository_read?.data
  );
  const repositoryTree = repository_list?.length > 0 ? repository_list[0] : {};

  // Component State
  const [editMode, setEditMode] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteKey, setDeleteKey] = useState("");
  const [fileredPermissionList, setFilteredPermissionList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [permissionListState, setPermissionListState] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [permsnname, setPermsnName] = useState("");
  const [permsnNameError, setPermsnNameError] = useState({});

  const handleDelete = (_key) => {
    setDeleteKey(_key);
    setOpen(true);
  };

  // HANDLE DELETE
  const handleClose = async (status) => {
    if (!status) {
      setOpen(false);
      return;
    }

    try {
      let delete_data = await dispatch(
        actions.PERMISSION_DELETE({ _key: deleteKey })
      );
      if (
        delete_data?.payload?.error ||
        delete_data?.payload?.data?.Code !== 201
      ) {
        handleAlerts("Failed to delete Permission!", false);
        return;
      }
      setLoader(true);
      setSelectedPermission(fileredPermissionList?.[0]);
      fetchPermissions();
      setLoader(false);
      handleAlerts("Permission deleted successfully!", true);
    } catch (error) {
      // setOpen(false);
      handleAlerts("Failed to delete Permission", false);
      setOpen(false);
    }
    setOpen(false);
  };

  //API CALL FOR CHANGE PERMISSION STATUS
  const handlePermissionStatus = async (event, item) => {
    // let list = {
    //   is_active: !item?.is_active,
    //   _key: item._key,
    // };

    const payload = {
      status: event.target.checked,
      _key: item?._key,
    };

    try {
      let status_update = await dispatch(actions.PERMISSION_UPSERT(payload));
      // setOpen(false);
      if (
        status_update?.payload?.error ||
        status_update?.payload?.data?.Code !== 201
      ) {
        handleAlerts("Failed to update Permission status", false);
        return;
      }
      setLoader(true);
      fetchPermissions();
      setLoader(false);
      handleAlerts("Permission status changed successfully!", true);
    } catch (error) {
      // setOpen(false);
      handleAlerts("Failed to update Permission status", false);
    }
  };

  //SEARCH FOR PROCESS
  const searchChange = (event) => {
    let val = event.target.value.toLowerCase();
    const filteredData = permissionListSeed.filter((item) => {
      return item?.permsnname?.toLowerCase()?.includes(val);
    });
    setFilteredPermissionList(filteredData);
  };

  const handleAlerts = (message, status) => {
    const { alert } = props;
    let { setSnack } = alert;
    setSnack({
      ...alert,
      horizontal: "right",
      msg: message,
      autoHideDuration: 6000,
      open: true,
      severity: status ? "success" : "error",
      vertical: "top",
    });
  };

  const handleAddClick = () => {
    setPermsnName("");
    setEditMode(true);
    setIsAdd(true);

    const newPermissionList = [];

    const generateNewPermissionList = (data) => {
      data?.map((item) => {
        newPermissionList.push({
          permsndelete: false,
          permsnread: false,
          permsnupdate: false,
          permsnwrite: false,
          _key: item?._key,
          repoid: item?._id,
          parent_rep: item?.parent_rep,
          id: item?.rep_id,
        });

        if (
          item?.children &&
          Array.isArray(item?.children) &&
          item?.children?.length > 0
        ) {
          generateNewPermissionList(item?.children);
        }
      });
    };

    generateNewPermissionList(repositoryTree?.project_component);

    setPermissionListState(newPermissionList);
  };

  // Handle Detail Permission Edit
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    // setInitialize();
    fetchRepoAndPermissions();
  }, []);

  const dispatch = useDispatch();

  // Edit Handler for Repo Permission Change
  const handlePermissionNameChange = (value) => {
    setPermsnName(value);

    if (value.length <= 0) {
      setPermsnNameError({
        error: true,
        errorMsg: "Please enter the field",
      });
    } else {
      setPermsnNameError({});
    }
  };

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

  const findDuplicate = (name, _id) => {
    const isError = permissionListSeed?.some(
      (item) => item?.permsnname === name && item?._id !== _id
    );
    return isError
      ? {
          error: isError,
          errorMsg: "Permission name must be unique",
        }
      : {};
  };

  const handlePermissionSave = async () => {
    //showBackdrop();

    const duplicate = findDuplicate(permsnname, selectedPermission?._id);

    if (
      permsnname?.length === 0 ||
      permsnNameError?.error ||
      duplicate?.error
    ) {
      hideBackdrop();
      return props.alert.setSnack({
        ...props.alert,
        horizontal: AlertProps.horizontal.right,
        msg:
          permsnname?.length === 0
            ? "Please enter the field"
            : permsnNameError?.error
            ? permsnNameError?.errorMsg
            : duplicate?.errorMsg,
        open: true,
        severity: AlertProps.severity.error,
        vertical: AlertProps.vertical.top,
      });
    }

    const payload = {
      permsnid: isAdd ? uuidV4() : selectedPermission?.permsnid,
      permsnname: permsnname,
      status: isAdd ? true : selectedPermission?.status,
      permsn_repo: permissionListState.map((item) => {
        const { parent_rep, _key, id, permissionRepo_key, ...rest } = item;
        return {
          ...rest,
          ...(Boolean(permissionRepo_key) && { _key: permissionRepo_key }), // This is IDM_permissionRepoMapping key not repo key
        };
      }),
      ...(isAdd ? {} : { _key: selectedPermission?._key }),
    };
    try {
      const response = await dispatch(actions.PERMISSION_UPSERT(payload));

      hideBackdrop();

      if (response?.payload?.data?.Code === 201) {
        setIsAdd(false);
        setPermissionListState(permissionList);
        toggleEditMode();
        setLoader(true);
        await fetchPermissions();
        setLoader(false);
        props.alert.setSnack({
          ...props.alert,
          horizontal: AlertProps.horizontal.right,
          msg: "Permission upserted successfully",
          open: true,
          severity: AlertProps.severity.success,
          vertical: AlertProps.vertical.top,
        });
      } else {
        return props.alert.setSnack({
          ...props.alert,
          horizontal: AlertProps.horizontal.right,
          msg: "Permission upsert failed!",
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
  };

  const handleCancel = () => {
    // Reset the changes to initial state
    setPermissionListState([...permissionList]);
    setPermsnNameError({});
    setIsAdd(false);
    toggleEditMode();
  };

  // Handler for Tree Checkbox change
  const handlePermission = (_permission) => {
    setPermissionListState(_permission);
    // setSelectedPermissionDetail({
    //   ...selectedPermissionDetail,
    //   repo_list: _permission,
    // });
  };

  const fetchPermissions = async () => {
    let permission_list = await dispatch(actions.PERMISSION_READ());
    setFilteredPermissionList(permission_list?.payload?.data?.result);
    return permission_list;
  };

  const fetchRepoAndPermissions = async () => {
    let repo_list = await dispatch(actions.REPOSITORY_READ_DOCUMENT());
    if (repo_list?.payload?.error) {
      setLoader(false);
      return;
    }

    let permission_list = await fetchPermissions(); // This will fetch and set State

    if (permission_list?.payload?.error) {
      setLoader(false);
      return;
    }
    setLoader(false);
    fetchPermissionById(permission_list?.payload?.data?.result?.[0]);
  };

  // New Permission Handler
  const fetchPermissionById = (permission) => {
    // Set active permission Id & permission name
    setSelectedPermission(permission);
    setPermsnName(permission?.permsnname);

    Promise.resolve(
      dispatch(actions.PERMISSION_READ_BY_ID({ _id: permission?._id ?? "" }))
    )
      .then((res) => {
        // FIX: CLMM-2219
        // Priorly, the permission list was taken from save permissions,
        // so if a new repo is added then there will be no ID in the newly created repo
        // To overcome this issue, we are mapping the repository and
        // finding the permission item to create a new permission list.

        const permissionArray = res?.payload?.data?.result?.[0];

        // const mappedPermission =
        //   Array.isArray(permissionArray?.permsn_repo) &&
        //   permissionArray?.permsn_repo?.map((item) => ({
        //     permissionRepo_key: item?._key,
        //     permsndelete: item?.permsndelete,
        //     permsnread: item?.permsnread,
        //     permsnupdate: item?.permsnupdate,
        //     permsnwrite: item?.permsnwrite,
        //     _key: item?.repoid?._key,
        //     repoid: item?.repoid?._id,
        //     parent_rep: item?.repoid?.parent_rep,
        //     id: item?.repoid?.rep_id, // Used to handle Full check, will be removed on payload.
        //   }));

        // setPermissionList(mappedPermission);
        // setPermissionListState(mappedPermission);

        const createdPermissionList = [];

        const generatePermissionListWithPermissions = (data) => {
          data?.map((item) => {
            const permissionItem = permissionArray?.permsn_repo?.filter(
              (permission) => permission?.repoid?._key === item?._key
            )?.[0];

            createdPermissionList.push({
              permissionRepo_key: permissionItem?._key,
              permsndelete: permissionItem?.permsndelete,
              permsnread: permissionItem?.permsnread,
              permsnupdate: permissionItem?.permsnupdate,
              permsnwrite: permissionItem?.permsnwrite,
              _key: item?._key,
              repoid: item?._id,
              parent_rep: item?.parent_rep,
              id: item?.rep_id,
            });

            if (
              item?.children &&
              Array.isArray(item?.children) &&
              item?.children?.length > 0
            ) {
              generatePermissionListWithPermissions(item?.children);
            }
          });
        };

        generatePermissionListWithPermissions(
          repositoryTree?.project_component
        );

        setPermissionList(createdPermissionList);
        setPermissionListState(createdPermissionList);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={classes.contentBox}>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={4}>
          <div className={classes.leftTab}>
            <div>
              {/* ------------------------------Title---------------------- */}
              <div className={classes.TitleTab}>
                <Typography  className={classes.TypeleftHeadStyle}>
                  {loader
                    ? "Permission"
                    : fileredPermissionList?.length + " Permissions"}
                </Typography>
                <div style={{ flexGrow: 1 }}></div>

                <Button
                  className={classes.btn}
                  onClick={handleAddClick}
                  contained
                >
                  + Add
                </Button>
              </div>

              {/* -----------------------------Search---------------------------- */}
              <div>
                <TextField
                  id="outlined-search"
                  placeholder="Search field"
                  onChange={searchChange}
                  className={classes.SearchStyle}
                  size="small"
                  style={{
                
                   
                  }}
                  type="search"
                  variant="outlined"
                  
                  InputProps={{
                    style: {
                      fontFamily: "poppin",
                      fontSize: "12px",
                      //background: theme.palette.background.tableHeader,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                      <Search />
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
                  Permission Name
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
                {Array.isArray(fileredPermissionList) &&
                  fileredPermissionList?.map((item, index) => (
                    <div style={{ padding: "8px 0px" }}>
                      <div
                        className={
                          selectedPermission?.permsnid === item?.permsnid
                            ? classes.selectedCell
                            : classes.rolesDisplay
                        }
                        onClick={(e) => fetchPermissionById(item)}
                        selected={
                          selectedPermission?.permsnid === item?.permsnid
                        }
                      >
                        <Typography className={classes.innerText}>
                          {item?.permsnname}
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <IOSSwitch
                          checked={item?.status === true ? true : false}
                          onChange={(e) => handlePermissionStatus(e, item)}
                        />
                         <Edit className={classes.EditIconStyle} onClick={(e) => {
                            toggleEditMode();
                            setPermsnName(selectedPermission?.permsnname);
                          }}
                          />
                        <Delete className={classes.DeleteIconStyle} onClick={() => handleDelete(item?._key)} />
                        
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Grid>

        {/* Repository Side */}
        <Grid item xs={8} className={classes.RepogridStyle} >
          <div className={classes.RepositarySide}>
            {!editMode && (
              <div className={classes.EditMode}>
                <Typography
                  className={classes.numbersEdit} >
                  {selectedPermission?.permsnname}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => {
                    toggleEditMode();
                    setPermsnName(selectedPermission?.permsnname);
                  }}
                  className={classes.IconbtnStyle}
                
                >
                  <CreateOutlinedIcon fontSize="small" />
                </IconButton>
              </div>
            )}
            {editMode && (
              <>
                <Grid container className={classes.Editgrid}>
                  <div className={classes.Editdiv}>
                    <TextField
                      id="permission-name"
                      onChange={(e) =>
                        handlePermissionNameChange(e.target.value)
                      }
                      value={permsnname}
                      placeholder="Permission Name *"
                      size="small"
                      style={{
                        fontFamily: "poppinsemibold",
                      }}
                      error={permsnNameError?.error ? true : false}
                      helperText={
                        permsnNameError?.error ? permsnNameError?.errorMsg : ""
                      }
                      // fullWidth
                      InputProps={{
                        
                        style: {
                          fontFamily: "poppinsemibold !important",
                          fontSize: "1rem",
                        },
                      }}
                    />
                  </div>
                  <div className={classes.btndivStyle}>
                    <Button
                      variant="outlined"
                      onClick={handleCancel}
                      style={{ height: 32, borderRadius: 8 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color={"primary"}
                      style={{ height: 32, borderRadius: 8 }}
                      onClick={() => handlePermissionSave()}
                    >
                      Update
                    </Button>
                  </div>
                </Grid>
              </>
            )}
            <Divider />
            <div className={classes.RightTab}>
              <Grid container className={classes.containerStyle}>
                <Grid item container xs={12} md={12}>
                  <div className={classes.GriddivStyle}>
                    <div item xs={8}>
                      <Typography
                        className={classes.TypeHeadStyle}
                        color="textSecondary"
                        variant="body2"
                      >
                        Repository
                      </Typography>
                    </div>
                    <div item xs={4}>
                      <div className={classes.tableStyle}>
                        {["Create", "Read", "Update", "Delete"].map(
                          (action) => (
                            <div className={classes.treeviewStyle}>
                              <div className={classes.TypedivStyle}>
                                <Typography
                                   className={classes.Typostyle}
                                  color="textSecondary"
                                  variant="body2"
                                >
                                  {action}
                                </Typography>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <div className={classes.TreeStyle}>
                    <Tree
                      repository={repositoryTree?.project_component}
                      permission_list={permissionListState}
                      handlePermission={handlePermission}
                      isCrudNeeded
                      editMode={editMode}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>

      {/* -------------------------------- Delete Dialog ----------------------------------  */}
      <DeleteComponent open={open} deleteClose={handleClose} />
    </div>
  );
}
export default PermissionMapping;
