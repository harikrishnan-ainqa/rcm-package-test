import React, { useLayoutEffect } from "react";
import { Typography, Grid, Divider, useTheme } from "@material-ui/core";
import styles from "./styles";
import Tree from "../../../components/tree";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "atp-iam-binder";


const RepositoryMain = (props) => {
     const classes = styles();
    const dispatch = useDispatch();

    const repository_list = useSelector(
        (state) => state?.repositorySlice?.repository_read?.data
      );

    const repositoryTree = repository_list?.length > 0 ? repository_list[0] : {};
    
      useLayoutEffect(() => {
        // dispatch(actions.ROLE_READ());
        dispatch(actions.REPOSITORY_READ_DOCUMENT());
      }, []);


      return (
        <div className={classes.contentBox}>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
              <div
                style={{
                  // backgroundColor: "#fff",
                 // background: theme.palette.background.table,
                  borderRadius: "10px",
                  // padding: "10px 20px",
                  border: "1px solid #DCDCDC",
                }}
              >
                <Typography className={classes.numbersEdit}>Repository</Typography>
                <Divider />
                {repository_list?.length > 0 ? (
                  <div style={{ padding: "10px 20px 6px 38px" }}>
                    <Tree repository={repositoryTree?.project_component} />
                  </div>
                ) : (
                  <div
                    style={{ padding: "10px 20px 6px 38px" }}
                    className={classes.nodatafound}
                  >
                    <span>No data found.</span>
                  </div>
                )}
              </div>
            </Grid>
    
            {/* -------------------------------- delete ----------------------------------  */}
            {/* <DeleteComponent open={open} deleteClose={handleClose} /> */}
          </Grid>
        </div>
      );
}

export default RepositoryMain;