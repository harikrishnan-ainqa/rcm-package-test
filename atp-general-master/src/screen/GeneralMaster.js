import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'

import withTheme from '../themeProvider'
import withStyleFix from '../stylefix'
import TestComp from '../components/model/comptest'
import LeftTabs from '../components/leftside/leftTabs';
import CenterTab from '../components/centerTab/table';
import RightTab from '../components/rightTab/RightTab';
//import { AinqaRequestSend } from "ainqa-request";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import useStyles from './style'


function Generalmaster(props) {
    const classes = useStyles({ ...props });
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
    const [selecteddatavalue , setSelectedDatavalue] = useState([]);
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
                    setSelectedDatavalue([selecteddata])
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
                 if(gmdata.length > 0)
                 {
                    const selctValue = gmdata.filter(li => li.gentype === newValue);
                    setSelectedDatavalue(selctValue)
                 }
          
             
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
                        selecteddatavalue={selecteddatavalue}

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
                selecteddatavalue={selecteddatavalue}
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