import React from "react";
import {
  Card,
  CircularProgress,
  useTheme,
  // Drawer
} from "@material-ui/core";
import { AlertProps, DrawerProps } from "../../utils/constants";
// import "../../components/font.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actions } from "atp-iam-binder";
import { CommonTable } from "../../components/common";
//import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { withAllContexts } from "../../HOCs";
import { SearchWithFilter } from "./SearchWithFilter";
import { makeStyles } from "@material-ui/core/styles";

import {
  Dialog,
  Slide,
  Toolbar,
  Typography,
  Button,
  IconButton,
  AppBar,
} from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import { PractitionerForm } from "../../components";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//import { AlertProps } from "../../utils";

//const drawerWidth = "94%";
// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
// }));

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
function PractitionerTable(props) {
  const [loader, setLoader] = React.useState(true);
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { parent_id } = props;
  //const classes = useStyles();
  const history = useHistory();
  const listData = useSelector(
    (state) => state?.practitionerSlice?.practitioner_list?.data
  );
  const organizationSlice = useSelector((state) => state.organizationSlice);
  console.log("org", listData, organizationSlice);
  const loading = useSelector(
    (state) => state?.practitionerSlice?.practitioner_list?.loading
  );
  //const saveloading = useSelector((state) => state?.practitionerSlice?.practitioner_upsert?.loading);
  const [state, setState] = React.useState({
    open: false,
    edit_data: null,
  });

  const [perPage, setPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [personDetails, setPersonDetails] = React.useState([]);
  const handlepageChange = async (currentPage, PerPage) => {
    setPage((currentPage - 1) * PerPage);
    setPerPage(PerPage);
    await dispatch(
      actions.PRACTITIONER_LIST_READ({
        page: (currentPage - 1) * PerPage,
        perPage: PerPage,
      })
    );
  };

  const handleDrawerOpen = () => {
    console.log("pressed");
    setState({
      ...state,
      open: true,
    });
  };

  // Backdrop Helpers
  const showBackdrop = () => {
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: true,
      message: "processing....",
    });
  };
  const hideBackdrop = () => {
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: false,
    });
  };
  // const handleDrawerClose = () => {
  //   setState({
  //     ...state,
  //     open: false,
  //     edit_data: null
  //   });
  // };

  React.useLayoutEffect(() => {
    const getdata = async () => {
      await dispatch(actions.ORGANIZATION_ENTITY_TYPE());
      await dispatch(actions.ORGANIZATION_GET_LEVEL_CARE());
      await dispatch(
        actions.PRACTITIONER_LIST_READ({ page: page, perPage: perPage })
      );
    };
    getdata();
  }, []);

  // const savePractitionerRole = async (values) => {
  //   let data = {
  //     code: values.type_code,
  //     description: values.type_description,
  //     type: props.type,
  //     status: values.status,
  //   }
  //   if (state?.edit_data) {
  //     data["_key"] = state?.edit_data._key
  //     data["id"] = state?.edit_data.id
  //   }
  //   await dispatch(actions.PRACTITIONER_ROLE_UPSERT(data));
  //   await dispatch(actions.PRACTITIONER_LIST_READ({ type: props.type }));
  //   await handleDrawerClose()
  // }

  const handleEdit = (e, values, index) => {
    // let data = {
    //   code: values.code_type,
    //   description: values.description,
    //   type: props.type,
    //   status: values.status,
    //   _key: values._key,
    //   id: values.id
    // }
    // setState({
    //   ...state,
    //   edit_data: data,
    //   open: true
    // })
  };
  const handleSave = async () => {
    debugger;
    console.log("personDetails?.address?.Type?.roleid", personDetails);
    const payload = {
      name: [
        {
          use: "",
          text: personDetails?.name?.text,
          family: personDetails?.name?.family,
          given: personDetails?.name?.given,
          prefix: personDetails?.prefix?.display,
          suffix: personDetails?.suffix?.display,
          period: [],
          id: 0,
        },
      ],
      telecom: [personDetails?.telecom],
      gender: personDetails?.gender?.display,
      birthDay: personDetails?.birthDay,
      address: [personDetails?.address],
      photo: [
        {
          date: "",
          url: "",
          id: 0,
          fileName: "test",
          fileid: "101",
          filetype: "png",
        },
      ],
      active: true,
      link: [
        {
          isPractitioner: false,
          asurrance: "",
          patientID: [],
          PractitionerID: [],
        },
      ],
      Id: 0,
      RelatedPersonID: [],
      OrgID: [personDetails?.OrgID],
      alias: "",
      usertype: "",
      orgType: personDetails?.orgType?.name,
      roleid: [
        {
          roleid: personDetails?.roleid?.roleid,
          rolename: personDetails?.roleid?.rolename,
        },
      ],
      keycloackid: "",
    };
    console.log("final payload from ui", payload);
    try {
      // const response = [];
      const response = await dispatch(actions.PERSON_UPSERT(payload));

      if (response?.payload?.data?.Code === 201) {
        setLoader(true);
        hideBackdrop();
        props?.alert?.setSnack({
          ...props?.alert,
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
    setLoader(true);
    handleClose();
  };

  const sendData = (keyValue, value) => {
    console.log("proppps", keyValue, value);
    setPersonDetails({ ...personDetails, [keyValue]: value });
  };
  console.log("personDetails", personDetails);
  const handleClose = () => {
    setState({ ...state, open: false });
    setPersonDetails([]);
  };
  const statusChange = async (e, values, index) => {
    let data = {
      code: values.code_type,
      description: values.description,
      type: props.type,
      status: e.target.checked,
      _key: values._key,
      id: values.id,
    };
    setState({
      ...state,
      edit_data: data,
    });
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: true,
      message: "Status Updating",
    });

    await dispatch(actions.PRACTITIONER_STATUS_CHANGE(data));
    await dispatch(
      actions.PRACTITIONER_LIST_READ({
        page: page,
        perPage: perPage,
        type: props.type,
      })
    );
    setState({
      ...state,
      edit_data: null,
    });
    props.backDrop.setBackDrop({
      ...props.backDrop,
      open: false,
      message: "",
    });
    props.alert.setSnack("update");
  };

  console.log(personDetails);
  const onSearchChange = (value = "") => {
    if (value?.length > 2) {
      dispatch(
        actions.PRACTITIONER_LIST_READ({
          type: props.type,
          search: value.trim(),
          page: page,
          perPage: perPage,
        })
      );
    } else if (!value) {
      dispatch(
        actions.PRACTITIONER_LIST_READ({
          type: props.type,
          page: page,
          perPage: perPage,
        })
      );
    }
  };

  return (
    <React.Fragment>
      <Card id={`${parent_id}-parent-card`} style={{ borderRadius: "12px" }}>
        <div id={`${parent_id}-parent-div`} style={{ width: "100%" }}>
          <Card
            id={`${parent_id}-parent-card`}
            style={{ borderRadius: "12px" }}
          >
            <div
              id={`${parent_id}-parent-div`}
              style={{
                borderRadius: "6px",
              }}
            >
              <div
                id={`${parent_id}-header-button-div`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: theme?.palette?.background?.table,
                }}
              >
                <div
                  id={`${parent_id}-header-div`}
                  style={{ marginLeft: "18px" }}
                >
                  <p
                    id={`${parent_id}-${props?.header?.replaceAll?.(
                      " ",
                      "-"
                    )}-p`}
                    style={{
                      fontFamily: "poppinsemibold",
                      fontSize: "16px",
                      marginBottom: "0px",
                    }}
                  >
                    {props.header}
                  </p>
                </div>
                <div
                  id={`${parent_id}-Add-New-button-div`}
                  style={{
                    marginTop: "16px",
                    float: "right",
                    marginRight: "20px",
                    display: "flex",
                  }}
                >
                  <SearchWithFilter
                    id="symptomyandspeciality"
                    placeholder="Search code and Description!"
                    //  loading={data?.length > 0 ? loading : false}
                    onSearchChange={onSearchChange}
                    hideSearchBar={false}
                    hideFilter={true}
                    //  onFilterClicked={onFilterClicked}
                    //  isFilterApplied={props?.isFilterApplied}
                  />
                  &nbsp;
                  <button
                    id={`${parent_id}-Add-New-button`}
                    style={{
                      backgroundColor: "#0071F2",
                      color: "white",
                      border: "none",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                      borderRadius: "5px",
                      fontFamily: "poppin",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                    onClick={handleDrawerOpen}
                  >
                    +Add New
                  </button>
                </div>
              </div>

              {/* table */}
              <div
                id={`${parent_id}-CommonTable-div`}
                style={{
                  padding: 20,
                  height: "71vh",
                  overflow: "auto",
                  background: theme?.palette?.background?.table,
                }}
              >
                {/* {
                (loading && state.edit_data === null) ?
                  <div
                    id={`${parent_id}-CircularProgress-div`}
                    style={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: "66vh" }}>
                    <CircularProgress
                      id={`${parent_id}-CircularProgress`}
                    />
                  </div>
                  : */}
                <CommonTable
                  parent_id={"practitioner"}
                  Header={[
                    "S.No",
                    "Name",
                    // "Primary Specialty",
                    "Type",
                    // "Status",
                    // "Action",
                  ]}
                  dataList={listData}
                  tableData={[
                    { type: ["INCRIMENT"], name: "" },
                    { type: ["TEXT"], name: "name" },
                    // { type: ["TEXT"], name: "primaryspeciality" },
                    { type: ["TEXT"], name: "type" },
                    // { type: ["CHECKBOX"], name: "status" },
                    // { type: ["EDIT"], name: "" },
                  ]}
                  handleCheckBox={statusChange}
                  handleEdit={handleEdit}
                  handlepageChange={(currentPage, PerPage) =>
                    handlepageChange(currentPage, PerPage)
                  }
                  TableCount={listData?.[0]?.total_count}
                  incrementCount={page}
                  showPagination={true}
                  rowsPerPageOptions={[
                    { label: "10 Rows", value: 10 },
                    { label: "50 Rows", value: 50 },
                    { label: "100 Rows", value: 100 },
                  ]}
                  loading={loading}
                />
                {/* } */}
              </div>
            </div>
          </Card>
        </div>
      </Card>
      <Dialog
        fullScreen
        open={state.open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: "#F3F4F7",
            boxShadow: "none",
          },
        }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Person Registration
            </Typography>
            <Button autoFocus color="inherit" onClick={() => handleSave()}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <PractitionerForm sendData={sendData} loading={loader} />

        {/* <Addpractitioner /> */}
      </Dialog>
    </React.Fragment>
  );
}
export default withAllContexts(PractitionerTable);
