import React, { useState } from "react";

import {
    Box,
    Button,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    InputLabel, FormControl, OutlinedInput,
    Switch,
    FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import TableBody from "@material-ui/core/TableBody";
import { FaRegStar, FaFile, FaTrash } from 'react-icons/fa';
// import { IconName } from "react-icons/fa";
// import { FaFile, FaRegStar, FaTrash } from "react-icons/fa";
import {
    Browse,
    Edit,
    Delete,
    FavoriteBorder,
    FileCopy,
} from "@material-ui/icons";


const useStyles = makeStyles({
    table: {
        minWidth: 650,

    },
});


const data = [
    {
        key: "TwittFintech sentiment Api key 1",
        files: 6,
        size: "1.1kb"
    },
    {
        key: "TwittFintech sentiment Api key 2",
        files: 7,
        size: "1.0mb"
    },
    {
        key: "TwittFintech sentiment Api key 3",
        files: 8,
        size: "2.0kb"
    },
    {
        key: "TwittFintech sentiment Api key 4",
        files: 9,
        size: "3.0mb"
    },
];

const TableData = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.key}>

                        <TableCell >

                            <TableCell style={{ border: "0px" }} align="left">
                                <FaRegStar />
                            </TableCell>

                            <TableCell style={{ border: "0px" }} align="right">
                                <br />
                                {row.key}
                                <div style={{ display: "flex", flexDirection: "row" }}>

                                    <span>{row.files} <FaFile /></span>
                                    <span>{row.size}</span>
                                </div>
                            </TableCell>


                        </TableCell>

                        <TableCell align="right">
                            <Button variant="contained" color="primary" >
                                <FaFile />
                                <span style={{ width: "5px" }}></span>
                                Browser
                            </Button>


                            <Button variant="contained" color="primary" >
                                <FaRegStar />
                                <span style={{ width: "5px" }}></span>
                                Edit
                            </Button>


                            <Button variant="contained" color="danger" >
                                <FaTrash />
                                <span style={{ width: "5px" }}></span>
                                Delete
                            </Button>


                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableData;
