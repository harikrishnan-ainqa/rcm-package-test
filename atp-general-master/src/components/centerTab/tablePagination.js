import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles({
  root: {
    alignItems: "center !important",
    justifyContent: "space-between !important",
    padding: "0% 2% 0% 2%",
  },
  overAllcount: {
    fontWeight: "bold",
    fontSize: "14px",
    color: (props) => (props.isTextDisabled ? "#b3b3b3" : "#060739"),
    fontFamily: "pc_semibold",
  },
  perpageDiv: {
    display: "flex",
    alignContent: "center",
  },
  perpage: {
    color: "#83859B",
    fontSize: "12px",
    marginTop: "auto",
    marginBottom: "auto",
    fontFamily: "pc_regular",
  },
  formControl: {
    marginLeft: 10,
    alignItems: "center",
    display: "inline-grid",
  },
  selectEmpty: {
    "& .MuiOutlinedInput-input": {
      padding: "4.5px 14px",
      paddingRight: "32px",
      fontSize: "14px",
      fontFamily: "pc_regular",
      color: "#060739",
    },
  },
  backicon: {
    borderRadius: "18px",
    cursor: "pointer",
    border: "1px solid #E5E5E5",
    color: "#333558",
  },
  showingPage: {
    fontSize: "12px",
    fontFamily: "pc_regular",
    color: (props) => (props.isTextDisabled ? "#b3b3b3" : "#060739"),
  },
  prevNxtDiv: {
    display: "flex",
    justifyContent: "center",
  },
  prevNxtsubDiv: {
    display: "flex",
  },
  backiconGrid: {
    marginTop: 7,
  },
  Pageno: {
    display: "flex",
  },
  no: {
    padding: 10,
    color: "#86869A",
    fontSize: "12px",
    fontFamily: "pc_regular",
    cursor: "pointer",
  },
  secondContainer: {
    alignItems: "center",
  },
  // isActive: {
  //   color: (props) => props.isActiveColor ? props.isActiveColor : "#0071F2",
  //   fontFamily: "pc_extrabold",
  //   fontWeight: "bold",
  // }
});

const isActive = {
  color: (props) => (props.isActiveColor ? props.isActiveColor : "#0071F2"),
  fontFamily: "pc_extrabold",
  fontWeight: "bold",
};

export const CustomTablePagination = (props) => {
  const {
    count = 0,
    handlepageChange = async () => {},
    handleChangeRowsPerPage = async () => {},
    rowsPerPageOptions = [{ label: "10 Rows", value: 10 }],
    isPerPageDisabled,
    isTextDisabled,
  } = props;
  const classes = useStyles(props);
  const [perpage, setPerpage] = React.useState(
    rowsPerPageOptions[0]?.value || 10
  );
  const [page, setPage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageCount, setPageCount] = React.useState([]);

  //first render use effect.
  React.useEffect(() => {
    let totalpages = Math.ceil(count / perpage);
    setPage(totalpages);
    renderNumber(totalpages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, perpage]);

  //call everytime when perpage change
  React.useEffect(() => {
    let totalpages = Math.ceil(count / perpage);
    setPage(totalpages);
    if (totalpages !== 0) {
      if (currentPage > totalpages) {
        console.log("totalpages", totalpages);

        setCurrentPage(totalpages);
      } else {
        renderNumber(totalpages);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, currentPage, perpage]);

  //call everytime when current page change
  React.useEffect(() => {
    let totalpages = Math.ceil(count / perpage);
    renderNumber(totalpages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, currentPage, perpage]);

  //onclick next page
  const next = async () => {
    if (currentPage + 1 <= page) {
      setCurrentPage(currentPage + 1);
      await handlepageChange(currentPage + 1, perpage);
    }
  };

  //onclick previous page
  const previous = async () => {
    if (currentPage - 1 >= 1) {
      setCurrentPage(currentPage - 1);
      await handlepageChange(currentPage - 1, perpage);
    }
  };

  //handle change on number
  const handleChange = async (value) => {
    let totalpages = Math.ceil(count / value);
    let NewCurrentpage = currentPage;
    if (currentPage > totalpages) {
      NewCurrentpage = totalpages;
    }
    setPerpage(value);

    await handlepageChange(NewCurrentpage, value);
    await handleChangeRowsPerPage(value);
  };

  //render the number based on count
  const renderNumber = (totalpages) => {
    let arr = [];
    const lastpage = currentPage + 4;
    if (currentPage <= 5) {
      if (totalpages > 6) {
        //show first 5 and last number
        arr = [1, 2, 3, 4, 5, 0, totalpages];
      } else {
        //all pages
        for (let index = 0; index < totalpages; index++) {
          arr.push(index + 1);
        }
      }
    } else if (lastpage < totalpages) {
      //show first page , lastpage, current page to next 5
      for (let index = currentPage; index <= lastpage; index++) {
        arr.push(index);
      }
      if (totalpages - lastpage === 1) {
        arr = [...[1, 0], ...arr, ...[totalpages]];
      } else {
        arr = [...[1, 0], ...arr, ...[0, totalpages]];
      }
    } else if (lastpage >= totalpages) {
      //show first page and remaing page from current page
      arr = [1, 0];
      for (let index = totalpages - 4; index <= totalpages; index++) {
        arr.push(index);
      }
    }
    setPageCount(arr);
  };

  return (
    <div {...props}>
      <Grid container className={classes.root}>
        <div>
          <Typography className={classes.showingPage}>
            {(currentPage - 1) * perpage} -{" "}
            {currentPage * perpage > count ? count : currentPage * perpage}
            &nbsp;&nbsp;
            <span className={classes.overAllcount}>of {count}</span>
          </Typography>
        </div>
        <div></div>
        <div className={classes.prevNxtDiv}>
          <Grid className={classes.perpageDiv}>
            <Typography className={classes.perpage} variant="h6">
              Per Page
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              <select
                disabled={isPerPageDisabled}
                id="demo-simple-select-required"
                value={perpage}
                onChange={(e) => handleChange(e.target.value)}
                className={classes.selectEmpty}
              >
                {rowsPerPageOptions?.map((row) => {
                  return <option value={row.value}>{row.label}</option>;
                })}
              </select>
            </FormControl>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Grid>
          <Grid className={classes.prevNxtsubDiv}>
            <Grid className={classes.backiconGrid}>
              <NavigateBeforeIcon
                style={{ color: currentPage === 0 && "#b3b3b3" }}
                className={classes.backicon}
                onClick={() => previous()}
              />
            </Grid>
            <Grid className={classes.Pageno}>
              {pageCount?.map((pg, i) => {
                return (
                  <Typography
                    onClick={async () => {
                      if (pg) {
                        setCurrentPage(pg);
                        await handlepageChange(pg, perpage);
                      }
                    }}
                    style={currentPage === pg ? isActive : undefined}
                    className={classes.no}
                  >
                    {pg ? <>{pg <= 9 ? `0${pg}` : pg}</> : <>...</>}
                  </Typography>
                );
              })}
            </Grid>

            <Grid className={classes.backiconGrid}>
              <NavigateNextIcon
                className={classes.backicon}
                style={{
                  color: pageCount?.length === currentPage && "#b3b3b3",
                }}
                onClick={() => next()}
              />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default CustomTablePagination;
