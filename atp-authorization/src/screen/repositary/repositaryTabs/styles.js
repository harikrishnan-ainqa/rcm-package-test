import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
  editButton: {
    marginLeft: "10px",
    backgroundColor: "#0071F2",
    borderRadius: "0px",
    color: "#fff",
  },
  drawerHead: {
    display: "flex",
    padding: "25px",
    borderBottom: "1px solid #eee",
  },
  drawerSubHead: {
    fontFamily: "poppin",
    color: "#6F6F6F",
    fontSize: "12px",
    paddingBottom: "8px",
  },
  addDrawerBtn: {
    backgroundColor: "#0071F2",
    color: "#fff",
    fontFamily: "poppin",
    textTransform: "none",
    padding: "8px 60px",
    marginTop: "20px",
  },
  textTotalArea: {
    padding: "20px 30px",
  },
  headerMain: {
    fontFamily: "poppinsemibold",
  },
  btnPosition: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    color: "#ff0000",
  },
  root: {
    borderRadius: "0px",
    width: "100%",
  },
  firstSec: {
    padding: "15px 45px",
    borderBottom: "3px solid #9b9999",
  },
  firstSecRepository: {
    padding: "15px 45px",
  },
  btn: {
    backgroundColor: "#0071F2",
    color: "#fff",
    padding: "6px 16px",
    fontFamily: "poppin",
    fontSize: "12px",
    textTransform: "none",
  },
  rolesDisplay: {
    width: "80%",
    border: "1px solid #DCDCDC",
    display: "flex",
    padding: "14px 30px",
    borderRadius: "8px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  lowerDisplay: {
    width: "99%",
    border: "1px solid #DCDCDC",
    display: "flex",
    padding: "14px 16px",
    borderRadius: "8px",
    alignItems: "center",
  },
  secondSec: {
    padding: "20px 45px",
  },
  tabs: {
    "& .App1-MuiTabs-indicator": {
      background: "#0071F2",
    },
    "& .App1-MuiTabs-flexContainer": {
      borderBottom: "2px solid #f4f4f5",
    },
  },
  tabEdit: {
    textTransform: "none",
  },
  Section2: {
    height: `calc(100vh - 452px)`,
    overflow: "auto",
    paddingBottom: "25px",
  },
  Section2NoMain: {
    height: `calc(100vh - 192px)`,
    overflow: "auto",
    paddingBottom: "25px",
  },
  // numbersEdit: {
  //   marginTop: "8px",

  // },
  mainAreaRepository: {
    height: `calc(100vh - 216px)`,
    overflow: "auto",
    margin: "10px 0px",
    paddingBottom: "20px",
  },
  mainArea: {
    height: "250px",
    overflow: "auto",
    marginTop: "10px",
  },
  mainAreaNoData: {
    height: "0px",
  },
  selectedCell: {
    cursor: "pointer",
    border: "1px solid #0071F2",
    width: "80%",
    display: "flex",
    padding: "14px 30px",
    borderRadius: "8px",
  },
  numbersEdit: {
    marginTop: "4px",
    fontFamily: "poppinsemibold",
    padding: "10px 20px 6px",
    fontWeight:700
  },
  paperEdit: {
    borderRadius: "0px",
  },
  innerText: {
    fontSize: "14px",
    fontFamily: "poppinsemibold",
    fontWeight:600
  },
  descriptionTab: {
    display: "flex",
    border: "1px solid #DCDCDC",
    padding: "14px 60px 14px 30px",
    borderRadius: "8px",
    marginTop: "15px",
    // backgroundColor: "#f6f6f6",
    background: theme?.palette?.background?.tableHeader,
  },
  // contentBox: {
  //   position: "fixed",
  //   minHeight: `calc(100% - 140px)`,
  //   width: `calc(100% - 105px)`,
  // },
  table: {
    minWidth: 650,
  },
  tableHeader: {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontFamily: "poppin",
    fontSize: "12px",
    color: "gray",
    backgroundColor: "#f9f9f9",
  },
  tableBody: {
    width: "120px",
    padding: "12px",
    fontFamily: "poppinsemibold",
    fontSize: "12px",
  },
  tableContainer: {
    borderRadius: "8px",
    marginTop: "20px",
    boxShadow: "none",
    border: "1px solid #E0E0E0",
    height: `calc(100vh - 218px)`,
  },
  repoLeftSide: {
    height: `calc(100vh - 143px)`,
    borderRadius: "10px",
    backgroundColor: "#fff",
    border: "1px solid #DCDCDC",
  },
  active: {
    backgroundColor: "#E0EBF9 !important",
    color: "#0071F2 !important",
  },
  groupedBtnAlign: {
    padding: "5px",
    margin: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },

  rolesChipRoot: {
    borderRadius: 4,
    height: 26,
    //color: theme?.palette?.text?.primary,
    fontFamily: "poppinsemibold",
    background: "#F0F0F0",
  },
  autocompleteTag: {
    borderRadius: 8,
    height: 26,
    //color: theme?.palette?.text?.primary,
    fontFamily: "poppinsemibold",
    background: "#F0F0F0",
    "& .App1-MuiChip-label": {
      paddingRight: 24,
    },
  },

  // Users Detail Display
  boxFirstDiv: {
    marginRight: "2%",
    marginBottom: "2%",
  },
  detailBox: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "1%",
    color: "#6f6f6f"
  },
  iconStyle: {
    fontSize: 18,
    color: "#0071F2",
    marginRight: 6,
  },
  detailData: {
    // marginLeft: "2.8vh",
    marginLeft: "18px",
    textAlign: "left",
    fontFamily: "poppinsemibold",
    fontSize: "0.9rem"
  },
  displaySectionTitle: {
    fontFamily: "poppinsemibold",
    padding: "10px 6px",
    display: "inline-block",
  },
  nodatafound: {
    height: "50vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold"
  },
  dropDownPaper: {
    color: "#6a7888"
  },
  containedButton: {
    background: theme?.palette?.button?.background,
    //color: theme?.palette?.button?.text,
    "&:hover": {
      background: theme?.palette?.button?.hover,
    }
  },
  TreeStyle: {
    padding: "10px 20px 6px 38px",
    width: "100%"
  },
  Typostyle: {
    fontFamily: "poppinsemibold",
    padding: "6px 8px 6px",
  },
  TypedivStyle: {

    width: "100%"
  },
  treeviewStyle: {

    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 60,
    maxWidth: 62,
    textAlign: "center",
  },
  tableStyle: {

    display: "flex",
    width: "100%"
  },
  TypeHeadStyle: {
    fontFamily: "poppinsemibold",
    padding: "6px 20px 6px",
    fontWeight:"bold"
  },
  GriddivStyle: {

    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 20,
  },
  containerStyle: {

    borderRadius: "10px",
    border: "1px solid #DCDCDC",
  },
  RightTab: {

    margin: 14
  },
  btndivStyle: {

    margin: "8px 14px 8px 0px",
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
  },
  Editgrid:{

    display: "flex", 
    justifyContent: "space-between" 
  },
  Editdiv:{
    padding: "10px 20px 6px 20px" 
  },
  IconbtnStyle:{
    height: 24, 
    width: 24
  },
  EditMode:{
    display: "flex",
     gap: 8, 
     alignItems: "center" 
  },
  RepositarySide:{
     backgroundColor: "#fff",
     background: theme.palette.background.table,
    borderRadius: "10px",
    border: "1px solid #DCDCDC",
  },
  RepogridStyle:{

    overflow: "hidden"
  },
  EditIconStyle:{
   fontSize:"18px",
   marginLeft:"16px",
   color:"#b3a1a1"
  },
  DeleteIconStyle:{
    fontSize:"18px",
    marginLeft:"16px",
    color:"#fd6161"
  },
  SearchStyle:{
    padding: "8px 20px",
    width:"86%"
  },
  TypeleftHeadStyle:{
    marginTop: "4px",
    fontFamily: "poppinsemibold",
    fontWeight:700,
    fontSize:"16px"
  },
  leftTab:{
    border: "1px solid #DCDCDC",
    borderRadius: "10px",
  },
  TitleTab:{
    display: "flex", 
    margin: "16px 20px 8px"
  }

}));

export default styles;
