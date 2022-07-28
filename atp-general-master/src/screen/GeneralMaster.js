import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import {
    lighten,
    darken,
    fade,
} from '@material-ui/core/styles/colorManipulator'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import withTheme from '../themeProvider'
import withStyleFix from '../stylefix'
import TestComp from '../components/model/comptest'
import LeftTabs from '../components/leftside/leftTabs';
import { makeStyles } from '@material-ui/core/styles';
import CenterTab from '../components/centerTab/table';
import RightTab from '../components/rightTab/RightTab';
//import { AinqaRequestSend } from "ainqa-request";
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        paddingRight: theme.spacing(1),
    },
    rootTable: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        margingBottom: '15px',
        backgroundColor: '#fff',
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
    flex: {
        display: 'flex',
    },
    actionsToolbar: {
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
    },
    textField: {
        flexBasis: 200,
        width: 300,
        marginTop: 4,
    },
    table: {
        minWidth: "85vh",
        border: '1px solid #f4f4f5',
    },

    tableSmall: {
        minWidth: 500,
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    toolbar: {
        backgroundColor: '#f4f4f5',
        minHeight: 36,
        // border:`1px solid ${theme.palette.grey[900]}`,
        borderRadius: '5px',
        marginTop: '8px',
    },
    tableWrapper: {
        marginTop: '5px',
        padding: '20px',
    },
    title: {
        flex: '0 0 auto',
        '& h6': {
            fontSize: 20,
            fontWeight: 'bold',
            color:
                theme.palette.type === 'dark'
                    ? darken(theme.palette.primary.light, 0.2)
                    : darken(theme.palette.primary.dark, 0.2),
        },
    },
    Button: {
        margin: `${theme.spacing(1)}px 0`,
        padding: '5px 16px',
        float: 'right',
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#f15836 !important',
        },
    },

    iconSmall: {
        fontSize: 20,
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    tableChip: {
        margin: theme.spacing(1),
        color: theme.palette.common.white,
    },
    /*
        -----------------------
        ** Table Style **
        ** - Odd Even Stripped
        ** - Hover Style
        ** - Bordered Style
        ** - Empty Table
        ** - Table SIze
        -----------------------
        */
    stripped: {
        '& tbody tr:nth-child(even)': {
            background: '#f4f4f5',
        },
    },
    hover: {
        '& tbody tr:hover': {
            background: '#f4f4f5',
        },
        '&Button:hover': {
            backgroundColor: '#f15836 !important',
        }
    },
    bordered: {
        border: '1px solid #f4f4f5',
        '& thead tr': {
            background: '#f4f4f5',
        },
        '& td, th': {
            border: '#f4f4f5',
        },
        '& tr td, tr th': {
            '&:first-child': {
                borderLeft: 'none',
            },
            '&:last-child': {
                borderRight: 'none',
            },
        },
    },
    nodata: {
        textAlign: 'center',
        padding: '10px 10px 40px',
        fontSize: 24,
        lineHeight: '16px',
        color: theme.palette.grey[500],
        '& svg': {
            position: 'relative',
            top: -2,
            width: 26,
            height: 26,
            margin: '0 6px',
            fill: theme.palette.grey[500],
        },
    },
    small: {
        '& tr': {
            height: 24,
            '& td, th': {
                padding: '4px 10px',
                fontSize: 12,
            },
        },
    },
    medium: {
        '& tr': {
            height: 48,
            '&th': {
                padding: '4px 56px 4px 24px',
                fontSize: 15,
                color: "#403f3f"
            },

            '& td': {
                padding: '4px 56px 4px 24px',
                fontSize: 14,
                fontWeight: "550",
                color: "#403f3f"
            },
        },
    },
    big: {
        '& tr': {
            height: 64,
            '& td, th': {
                padding: '8px 56px 8px 24px',
                fontSize: 18,
            },
        },
    },
    settings: {
        //background: theme.palette.background.default,
        padding: 20,
        // borderRadius: theme.rounded.medium
    },
    up: {
        color: green[500],
        '& svg': {
            fill: green[500],
        },
    },
    down: {
        color: red[500],
        '& svg': {
            fill: red[500],
        },
    },
    flat: {
        color: theme.palette.divider,
        '& svg': {
            fill: theme.palette.divider,
        },
    },
    chartTable: {
        '& svg': {
            '& [class*="recharts-bar-rectangle"] path': {
                fill: fade(theme.palette.primary.main, 0.5),
            },
        },
    },

    Buttonleft: {
        float: "left",
        backgroundColor: theme.palette.primary.main,
    },

    spanStyle: {
        fontSize: "14px",
        textTransform: "none",
        fontWeight: "bold",
        color: "#fff",
        justifyContent: "flex-start",
    },

    appbarstyle: {
        height: "85vh",
        boxShadow: 'none !important'

    },
    Tabsstyle: {
        backgroundColor: "#fafafa",
        flexDirection: "inherit !important",
        justifyContent: "left !important"
    },

    leftsidebar: {
        backgroundColor: "#fafafa",
        border: "1px solid #f9f1f1",
        padding: "10px 10px",
        borderRadius: "12px",
        marginLeft: "10px"
    },
    SearchButton: {

        marginBottom: "20px"
    },
    inputstyle: {
        padding: "11px 6px",
        border: "1px solid #e5dddd",
        borderRadius: "5px"
    },
    iconLabelWrapper2: {
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between"
    },
    tabIconStyle: {
        fontSize: "20px",
        float: "right"

    },
    labelContainer: {
        width: "auto",
        padding: 0
    },
    inputstyle1: {
        padding: "11px 19px",
        border: "1px solid #e5dddd",
        borderRadius: "5px",
        width: "300px"

    },
    spaninp: {

        color: "#f70404"
    },


    Addnewbutton: {
        float: "right"

    },

    content: {
        marginTop: "10px",
        marginLeft: "10px"
    },
    labelStyle: {

        fontSize: "13px !important"
    },
    drawerstyle: {
        overflow: "hidden",
        width: "400px"
    },
    titleStyle: {
        fontSize: "16px",
        fontWeight: "bold",
        marginLeft: "10px"
    },
    gridstyle: {

        marginBottom: "20px",
        marginLeft: "10px"
    },
    btnstyl: {

        textAlign: "center"

    },
    editiconstyle: {
        fontSize: "18px",
        cursor: "pointer"

    },
    contentStyle: {
        overflowX: "hidden"
    }
}))

function Generalmaster(props) {
    const classes = useStyles({ ...props })
    const [gmfilter, setgmfilter] = useState("");
    const [value, setValue] = React.useState(0);
    const [gmdata, setgmData] = useState([]);
    const [columnType, setColumnType] = useState([]);
    const [editTable, setEditTable] = useState(false);
    const [editvalue, setEditValue] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [AnchorEl, setAnchorE1] = useState(false)
    const [ModelEditValue, setModelEditValue] = useState([])
    const [EditModel, setEditModel] = useState(false)
    const [formState, setFormState] = useState({
        order: props.order,
        orderBy: props.orderBy,
        selected: props.selected,
        columnData: props.columnData,
        data: [],
        page: props.page,
        rowsPerPage: props.rowsPerPage,
        defaultPerPage: props.defaultPerPage,
        filterText: props.filterText,
        size: props.size,
        bordered: props.bordered,
        stripped: props.stripped,
        hovered: props.hovered,
        toolbar: props.toolbar,
        checkcell: props.checkcell,
        pagination: props.pagination,
        filterText: props.filterText,
        showSearch: props.showSearch,
        showButton: props.showButton,
        showTitle: props.showTitle,
        title: props.title,
        rowsPerPageOptions: props.rowsPerPageOptions,
    })

    useEffect(() => {
        getResponse();
        getQdmType();

    }, []);

    const getResponse = async () => {
        const { URl, db_name } = props;
        let payload = {
            db_name: db_name,
            entity: "GMdefinition",
            filter: "GMdefinition.activestatus==true",
            sort: "GMdefinition.gentype",
            return_fields: "merge(GMdefinition,{additionalcolumns:(for ad in to_array(GMdefinition.additionalcolumns) return merge(ad,{columntype:document(ad.columntype)}))})"

        }
        await axios
            .post(`${URl}/api/read_documents`, payload)
            .then(async (response) => {
                if (response?.data?.Code === 201) {
                    setgmData(response?.data?.result)
                    const selecteddata = response?.data?.result[value];
                    getCurrentData(selecteddata.gentype);
                }
                else {
                }
            })
    }


    const getQdmType = async () => {
        let payload = {
            db_name: props.db_name,
            entity: "CodingMaster",
            filter: "CodingMaster.Type=='QDMDATATYPE' && CodingMaster.activestatus==true && CodingMaster.status==true",
            return_fields: "KEEP(CodingMaster,'_id','id','_key','code','display','Type')"

        }
        await axios
            .post(`${props.URl}/api/read_documents`, payload)
            .then(async (response) => {
                if (response?.data?.Code === 201) {
                    setColumnType(response?.data?.result)

                }
                else {
                }
            })
    }

    const getCurrentData = async (newValue) => {
        let payloadvalue = {
            db_name: props.db_name,
            entity: "CodeableConceptMaster",
            sort: "document(CodeableConceptMaster.coding[0]).display",
            filter: `CodeableConceptMaster.Type=="${newValue}" && CodeableConceptMaster.activestatus==true`,
            return_fields: "MERGE(CodeableConceptMaster,{coding:document(CodeableConceptMaster.coding)})"
        }

        await axios
            .post(`${props.URl}/api/read_documents`, payloadvalue)
            .then(async (response) => {
                if (response?.data?.Code === 201) {
                    setFormState({ ...formState, data: response?.data?.result, title: newValue })

                }
                else {
                }
            })

    }
    const handleOpen = () => {
        setOpenModel(true);
    };
    const handleClose = () => {
        setModelEditValue([]);
        setEditModel(false);
        setOpenModel(false);
    };
    const handleChange = async (data) => {
        getCurrentData(data.gentype);
        setValue(value);
    };

    const handlegmFilterChange = (e) => {
        const datassss = gmdata.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toString().toLowerCase().includes(e.target.value.toLowerCase())
            );
        })
        if (datassss !== undefined) {
            if (datassss && datassss.length > 0) {
                getCurrentData(datassss[0].gentype)
            }

            else {
                getCurrentData("")
            }
        }
        setgmfilter(e.target.value.toLowerCase());
    }

    const handleAnchorClose = () => {
        setAnchorE1(false);
        setEditTable(false);
        setEditValue([]);
    }

    const handleAnchorOpen = () => {
        setAnchorE1(true);
    }

    const EditAnchorOpen = (data) => {
        setEditValue(data);
        setEditTable(true);
        setAnchorE1(true);
    }

    const EditStatus = async (dataArray) => {
        const doc = {
           
            coding: [
                {
                    _key: dataArray.coding[0]._key,
                    status: !dataArray.coding[0].status
                  }
            ],
           
            status: !dataArray.status
        }

        const payload = {
            db_name: props.db_name,
            entity: "CodeableConceptMaster",
            is_metadata: true,
            metadataId: props.metadataId,
            metadata_dbname: props.metadata_dbname,
            filter: {
                "_key": dataArray._key
            },
            doc: doc
        }
        let datass = JSON.stringify([payload])

        var config = {
            method: 'post',
            url: `${props.URl}/api/upsert_document`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: datass
        }
        await axios(config)
            .then(async response => {
                getCurrentData(dataArray.Type)
                toast.success('Updated Successfully', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })

           

    }


    const EditModelopen = (data) => {
        setModelEditValue(data);
        setEditModel(true);
        setOpenModel(true);

    }

    const handleCloseAdd = (title) => {
        setAnchorE1(false);
        setEditTable(false);
        setEditValue([]);
        getCurrentData(title);

    }

    const handleCloseModal = (EditModel, response) => {
        setModelEditValue([]);
        setEditModel(false);
        setOpenModel(false);
        getlefttabValue(EditModel, response)
    }
    const getlefttabValue = (EditModelvaleee, response) => {
        if (response.length > 0) {
            if (EditModelvaleee === true) {
                const data = [...gmdata];
                data.splice(data.findIndex(a => a._key === response[0].properties.doc._key), 1)
                data.push(response[0].properties.doc);
                setgmData(data);
                getCurrentData(response[0].properties.doc.gentype)
            }
            else {
                const data = [...gmdata];
                data.push(response[0].properties.doc);
                setgmData(data)
            }
        }

    }
    const handleGMDelete = (EditModel, response) => {

        setModelEditValue([]);
        setEditModel(false);
        setOpenModel(false);
        deleteGMValue(EditModel, response);
        toast.success('Deleted Successfully', {
            position: toast.POSITION.TOP_RIGHT
        });
    }


    const deleteGMValue = (EditModelvaleee, response) => {

        if (EditModelvaleee === true) {
            const data = [...gmdata];
            data.splice(data.findIndex(a => a._key === response[0].properties.doc._key), 1)
            setgmData(data);
            getCurrentData(data[0].gentype)
        }
    }

    


    const handleUserInput = (toSearch) => {
        setFormState({
            ...formState, filterText: toSearch.toLowerCase()

        })
    }
    const handleRequestSort = (event, property) => {
        const { orderBy, order, data } = formState
        const orderByConst = property
        let orderLet = 'desc'

        if (orderBy === property && order === 'desc') {
            orderLet = 'asc'
        }

        const dataConst =
            orderLet === 'desc'
                ? data.sort((a, b) => (b[orderByConst] < a[orderByConst] ? -1 : 1))
                : data.sort((a, b) => (a[orderByConst] < b[orderByConst] ? -1 : 1))

        setFormState({
            ...formState,
            data: dataConst,
            order: orderLet,
            orderBy: orderByConst,
        })
    }

    const handlepageChange = (event) => {
        setFormState({
            ...formState,
            page: event - 1,
        })
    }

    const handleChangeRowsPerPage = (event) => {
        setFormState({
            ...formState,
            rowsPerPage: event,
        })
    }




    return (
        <div {...props}>
            <Grid container className={classes.rootTable} spacing={2}>
                <Grid item xs={2}>
                    <LeftTabs
                        handleChange={handleChange}
                        handlegmFilterChange={handlegmFilterChange}
                        gmdata={gmdata}
                        gmfilter={gmfilter}
                        handleOpen={handleOpen}
                        value={value}
                        getCurrentData={getCurrentData}
                        EditModelopen={EditModelopen}
                        classes={classes} />
                </Grid>
                <Grid item xs={10}>
                    <CenterTab
                        toolbar={props.toolbar}
                        value={value}
                        showTitle={props.showTitle}
                        showSearch={props.showSearch}
                        showButton={props.showButton}
                        columnData={props.columnData}
                        rowsPerPage={formState.rowsPerPage}
                        rowsPerPageOptions={props.rowsPerPageOptions}
                        size={props.size}
                        stripped={props.stripped}
                        hovered={props.hovered}
                        checkcell={props.checkcell}
                        bordered={props.bordered}
                        data={formState.data}
                        formState={formState}
                        handleOpen={handleOpen}
                        page={formState.page}
                        filterText={props.filterText}
                        title={formState.title}
                        orderBy={props.orderBy}
                        handleAnchorOpen={handleAnchorOpen}
                        pagination={props.pagination}
                        EditAnchorOpen={EditAnchorOpen}
                        handleUserInput={handleUserInput}
                        handleRequestSort={handleRequestSort}
                        handlepageChange={handlepageChange}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        URL={props.URl}
                        db_name={props.db_name}
                        metadataId={props.metadataId}
                        metadata_dbname={props.metadata_dbname}
                        classes={classes}
                        EditStatus={EditStatus}

                    />
                </Grid>
            </Grid>
            <TestComp
                open={openModel}
                onClose={handleClose}
                getResponse={getResponse}
                ModelEditValue={ModelEditValue}
                EditModel={EditModel}
                columnType={columnType}
                URL={props.URl}
                db_name={props.db_name}
                metadataId={props.metadataId}
                metadata_dbname={props.metadata_dbname}
                handleCloseModal={handleCloseModal}
                handleGMDelete={handleGMDelete}
                classes={classes}
            />

            <RightTab
                AnchorEl={AnchorEl}
                handleAnchorClose={handleAnchorClose}
                title={formState.title}
                editTable={editTable}
                editvalue={editvalue}
                URL={props.URl}
                db_name={props.db_name}
                metadataId={props.metadataId}
                metadata_dbname={props.metadata_dbname}
                handleCloseAdd={handleCloseAdd}
                classes={classes}
            />
            <ToastContainer />
        </div>
    )


}

Generalmaster.defaultProps = {
    toolbar: false,
    showTitle: true,
    showSearch: true,
    showButton: true,
    columnData: [
        {
            id: 'code',
            numeric: false,
            label: 'Code',
        },
        {
            id: 'shortdesc',
            numeric: false,
            label: 'ShortDescription',
        },
        {
            id: 'display',
            numeric: false,
            label: 'LongDescription',
        },
        {
            id: 'status',
            numeric: false,
            label: 'Status',
        },
        {
            id: 'Edit',
            numeric: false,
            label: 'Edit',
        }

    ],
    page: 0,
    rowsPerPage: 10,
    defaultPerPage: 5,
    filterText: '',
    size: 'medium',
    bordered: false,
    stripped: false,
    hovered: true,
    toolbar: true,
    checkcell: false,
    pagination: true,
    title: 'Table',
    TableCount: 10,
    rowsPerPageOptions: [
        { label: '10 Rows', value: 10 },
        { label: '20 Rows', value: 20 },
        { label: '30 Rows', value: 30 },
    ],



}

export default withStyleFix(withTheme(Generalmaster))