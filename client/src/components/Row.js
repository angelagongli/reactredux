import React from "react";
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: 100
    },
    empty: {
        width: "100%",
        height: 100,
        backgroundColor: "lightcyan"
    }
}));

function Row(props) {
    const classes = useStyles();
    
    function handleClick(event) {
        props.clickCell(event.target.id);
    }

    function handleHover(event) {
        props.highlightPiece(event.target.id);
    }

    return (
        <div className="row justify-content-center g-0">
            {props.pieces.map((piece, index) => (
                <div name={`r${props.rowIndex}c${index}`} className="col-1">
                    { piece ?
                    <Paper id={`r${props.rowIndex}c${index}`} elevation={10} className={classes.root} onClick={handleClick} onMouseEnter={handleHover} square>{piece}</Paper> :
                    <Paper id={`r${props.rowIndex}c${index}`} className={classes.empty} onClick={handleClick} square />}
                </div>
            ))}
        </div>
    );
}

export default Row;
