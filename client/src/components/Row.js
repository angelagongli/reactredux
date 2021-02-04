import React from "react";
import { Paper, Avatar } from '@material-ui/core';
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
    },
    piece: {
        width: "100%",
        height: "100%",
        fontFamily: "fangsong",
        fontWeight: "bold",
        fontSize: 32,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: "lightyellow"
    },
    DadPiece: {
        color: "black",
        borderColor: "black"
    },
    myPiece: {
        color: "red",
        borderColor: "red"
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
                    <Paper id={`r${props.rowIndex}c${index}`} elevation={10} className={classes.root} onClick={handleClick} onMouseEnter={handleHover} square>
                        <Avatar className={`${classes.piece} ${piece.side === "Dad" ? classes.DadPiece : classes.myPiece}`}>
                            {piece.character}
                        </Avatar>
                    </Paper> :
                    <Paper id={`r${props.rowIndex}c${index}`} className={classes.empty} onClick={handleClick} square />}
                </div>
            ))}
        </div>
    );
}

export default Row;
