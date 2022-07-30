import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import {
    lighten,
    darken,
    fade,
} from '@material-ui/core/styles/colorManipulator';

import Drawer from "@material-ui/core/Drawer"
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import axios from "axios";



const RightTab = (props) => {

    //const classes = useStyles({ ...props });

    const { handleAnchorClose, AnchorEl, classes, title, editvalue, editTable, URL, db_name, metadata_dbname, metadataId, handleCloseAdd } = props;
    const [field, setField] = useState({

        Code: "",
        ShortDescription: "",
        LongDescription: ""

    })
    useEffect(() => {


        if (editTable === true) {
            getData(editvalue);
        }

        else if (editTable === false) {
            setField({
                Code: "",
                ShortDescription: "",
                LongDescription: ""
            })
        }

    }, [editTable])

    const getData = (editvalue) => {
        setField({
            Code: editvalue.coding[0].code,
            ShortDescription: editvalue.coding[0].shortdesc,
            LongDescription: editvalue.coding[0].display
        })
    }

    const handleChangefield = (event) => {

        setField({ ...field, [event.target.name]: event.target.value })
    }

    const handleSubmit = () => {
        if (editTable === false) {
            AddCodingMaster();
        }

        else if (editTable === true) {
            EditCodingMaster(editvalue);
        }
    }



    const EditCodingMaster = async (editvalue) => {
        const doc = {
            text: field.Code,
            coding: [
                {
                    code: field.Code,
                    display: field.LongDescription,
                    id: 0,
                    Type: title,
                    shortdesc: field.ShortDescription,
                    _key: editvalue.coding[0]._key,
                    gmconfigvalues: {

                    },
                    status: true
                }
            ],
            Type: title,
            status: true
        }

        const payload = {
            db_name: db_name,
            entity: "CodeableConceptMaster",
            is_metadata: true,
            metadataId: metadataId,
            metadata_dbname: metadata_dbname,
            filter: {
                "_key": editvalue._key
            },
            doc: doc
        }
        let datass = JSON.stringify([payload])

        var config = {
            method: 'post',
            url: `${URL}/api/upsert_document`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: datass
        }

        await axios(config)
            .then(async response => {
                handleCloseAdd(title)
            })
    }

    const AddCodingMaster = async () => {

        const doc = {
            text: field.Code,
            coding: [
                {
                    code: field.Code,
                    display: field.LongDescription,
                    id: 0,
                    Type: title,
                    shortdesc: field.ShortDescription,
                    gmconfigvalues: {},
                    status: true
                }
            ],
            Type: title,
            status: true
        }

        const payload = {
            db_name: db_name,
            entity: "CodeableConceptMaster",
            is_metadata: true,
            metadataId: metadataId,
            metadata_dbname: metadata_dbname,
            doc: doc
        }
        let datass = JSON.stringify([payload])

        var config = {
            method: 'post',
            url: `${URL}/api/upsert_document`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: datass
        }

        await axios(config)
            .then(async response => {
                if (response.data.Code === 201) {
                    handleCloseAdd(title);
                }

            })


    }

    return (
        <div {...props}>
            <Drawer anchor={"right"} open={Boolean(AnchorEl)} onClose={handleAnchorClose} >
                <div className={classes.drawerstyle}>
                    <Grid>
                        <p className={classes.titleStyle}> {editTable ? `Edit${title}` : `Add New ${title}`}
                            <CloseIcon onClick={handleAnchorClose} style={{ float: "right", cursor: "pointer" }} />
                        </p>
                    </Grid>

                    <Grid item xs={12} className={classes.gridstyle}>
                        <FormLabel> Code <span className={classes.spaninp}>*</span></FormLabel>
                        <br />
                        <input aria-invalid="false" type="text" name="Code" disabled={editTable} value={field.Code} onChange={handleChangefield} className={classes.inputstyle1} />
                    </Grid>

                    <Grid item xs={12} className={classes.gridstyle}>
                        <FormLabel> Short Description <span className={classes.spaninp}>*</span></FormLabel>
                        <br />
                        <input aria-invalid="false" type="text" name="ShortDescription" value={field.ShortDescription} onChange={handleChangefield} className={classes.inputstyle1} />
                    </Grid>

                    <Grid item xs={12} className={classes.gridstyle}>
                        <FormLabel> Long Description <span className={classes.spaninp}>*</span></FormLabel>
                        <br />
                        <input aria-invalid="false" type="text" name="LongDescription" value={field.LongDescription} onChange={handleChangefield} className={classes.inputstyle1} />
                    </Grid>
                    <Grid item xs={12} className={classes.gridstyle}>
                        <Button variant="contained" size="small" color="primary" onClick={handleSubmit} className={classes.btnstyl}>
                            {editTable === false ? "Save" : "Update"}
                        </Button>
                    </Grid>

                </div>
            </Drawer>
        </div>

    )

}

export default RightTab
