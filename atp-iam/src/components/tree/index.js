/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { TreeItem, TreeView } from "@material-ui/lab";
import { Checkbox, Chip, makeStyles, SvgIcon } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  root: {

    flexGrow: 1,

  },
  fontEdits: {
    fontSize: "16px",
    fontFamily: "poppin",

  },

  group: {
    marginLeft: 7,
    paddingLeft: 15,
    borderLeft: "1px solid #B6B6B6",
  },
  selected: {
    backgroundColor: "#E0EBF9",
  },
  chipRoot: {
    borderRadius: 4,
    height: 22,
    color: theme?.palette?.text?.secondary,
    background: "#F0F0F0",
  },

  checkboxRoot: {
    padding: "0px 8px 0px 0px",
  },

  treeLabelFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // gridTemplateColumns: "1fr calc(33.333333% + 22px)"
  },
}));

export default function Tree(props) {
  const classes = useStyles(props);
  // const [expanded, setExpanded] = useState([])
  const [orgCheck, setOrgCheck] = useState({
    orgData: props?.orgAccess ?? [],
  });
  useEffect(() => {
    setOrgCheck({
      orgData: props?.orgAccess,
    });
  }, [props?.orgAccess]);

  const handleCheck = (e, item, i) => {
    let { orgData } = orgCheck;

    if (orgData?.indexOf(item?.id) > -1) {
      orgData.splice(orgData?.indexOf(item?.id), 1);
    } else {
      orgData = orgData ? orgData : [];
      orgData.push(item?.id);
    }

    // }else{
    setOrgCheck({
      ...orgCheck,
      orgData,
    });
    // }
    props.handleOrgCheck(orgData);
  };

  const handleAccessChange = (event, actionName, _key, permissionList) => {
    const updatedPermissionList = permissionList?.map((item) => {
      if (item?._key === _key) {
        item[actionName] = event.target.checked;
      }
      return item;
    });

    props.handlePermission(updatedPermissionList);
  };

  // Function to check if an Access is checked
  const isAccessChecked = (actionName, _key, permissionList) => {
    let is_check = false;
    permissionList?.map((_) => {
      if (_?._key === _key) {
        is_check = _?.[actionName];
      }
    });
    return is_check;
  };

  // Handler for full repo change
  const handleFullRepoCheck = (
    event,
    { rep_id: selected_rep_id },
    permissionList
  ) => {

    const parent_ids = [selected_rep_id];

    const updatedPermissionList = permissionList?.map((item) => {
      // Change current repo status
      if (item?.id === selected_rep_id) {
        item["permsnwrite"] = event?.target?.checked;
        item["permsnread"] = event?.target?.checked;
        item["permsnupdate"] = event?.target?.checked;
        item["permsndelete"] = event?.target?.checked;
      }

      if (parent_ids?.includes(item?.parent_rep)) {
        if (item?.id) {
          parent_ids.push(item?.id);
        }
        item["permsnwrite"] = event?.target?.checked;
        item["permsnread"] = event?.target?.checked;
        item["permsnupdate"] = event?.target?.checked;
        item["permsndelete"] = event?.target?.checked;
      }

      return item;
    });

    // event, item?._key,
    //                   item?.parent_rep,
    //                   props?.permission_list
    props?.handlePermission(updatedPermissionList);
  };

  

  const isAnyChildRepoChecked = (id, parent_rep, permissionList) => {

    if(permissionList?.length === 0) return false;

    const res = permissionList.filter(permission => permission?.parent_rep === id || permission?.id === id)?.every(
      (item) =>
        item?.permsnwrite && item?.permsnread && item?.permsnupdate && item?.permsndelete
    )
    return res
  };

  const renderTree = (treelist, i) => {
    treelist =
      Array.isArray(treelist) &&
      treelist?.map((item, i) => (
        <TreeItem
          key={item?.rep_id}
          nodeId={item?.rep_id}
          //   icon={<img src={ico} alt="dummy" />}
          label={
            props.isCrudNeeded ? (
              <div className={classes.treeLabelFlex}>
                <Checkbox
                  checked={
                    isAnyChildRepoChecked(
                      item?.rep_id,
                      item?.parent_rep,
                      props?.permission_list
                    )
                  
                  }
                  onChange={(event) =>
                    handleFullRepoCheck(event, item, props?.permission_list)
                  }
                  // style={{ color: "#0071F2" }}
                  // size="small"
                  color="primary"
                  size="small"
                  // classes={{ root: classes.checkboxRoot }}
                  disabled={!props.editMode}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  {item?.rep_name}
                  {item?.component_type ? (
                    <Chip
                      label={item?.component_type ?? ""}
                      classes={{ root: classes.chipRoot }}
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div style={{ display: "flex" }}>
                  {[
                    "permsnwrite",
                    "permsnread",
                    "permsnupdate",
                    "permsndelete",
                  ].map((actionName) => (
                    <div
                      key={actionName}
                      style={{
                        minWidth: 60,
                        maxWidth: 62,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        checked={
                          isAccessChecked(
                            actionName,
                            item?._key,
                            props.permission_list
                          ) == true

                         
                        }
                        onChange={(event) =>
                          {
                           
                            handleAccessChange(
                              event,
                              actionName,
                              item?._key,
                              props.permission_list
                            )
                          }
                        }
                        
                        color="primary"
                        size="small"
                        disabled={!props.editMode}
                       
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : props.editMode ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  checked={
                    orgCheck.orgData?.indexOf(item?.id) > -1 ? true : false
                  }
                  onChange={(e) => handleCheck(e, item, i)}
                  style={{ color: "#0071F2" }}
                  size="small"
                  classes={{ root: classes.checkboxRoot }}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  {item?.rep_name}
                  {item?.component_type ? (
                    <Chip
                      label={item?.component_type ?? ""}
                      classes={{ root: classes.chipRoot }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                {item?.rep_name}

                {item?.component_type ? (
                  <Chip
                    label={item?.component_type ?? ""}
                    classes={{ root: classes.chipRoot }}
                  />
                ) : (
                  ""
                )}
              </div>
            )
          }
          classes={{
            label: classes.fontEdits,
            root: classes.editLine,
            group: classes.group,
          }}
        >
          {Array.isArray(item?.children) ? renderTree(item?.children, i) : null}
        </TreeItem>
      ));
    return treelist;
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<InfoIcon />}
      
    >
      {renderTree(props.repository)}
    </TreeView>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}
