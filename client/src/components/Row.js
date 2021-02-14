import React from "react";
import { Paper, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        width: "100%",
        height: 100,
        backgroundColor: "lightcyan"
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
    },
    highlightedPieceCell: {
        width: "100%",
        height: 100,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
        backgroundColor: "yellow"
    },
    chosenPieceCell: {
        width: "100%",
        height: 100,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
        backgroundColor: "pink"
    },
    highlightedLegalAll: {
        width: "100%",
        height: 100,
        backgroundColor: "yellow"
    },
    moveToReturnOrigin: {
        width: "100%",
        height: 100,
        borderWidth: 10,
        borderStyle: "solid",
        borderColor: "cyan",
        backgroundColor: "lightcyan"
    },
    moveToReturnDestination: {
        width: "100%",
        height: 100,
        backgroundColor: "cyan"
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
                <div key={index} className="col-1">
                    { piece ?
                    <Paper elevation={10}
                        className={(props.chosenPiece.row === props.rowIndex &&
                            props.chosenPiece.column === index) ?
                            classes.chosenPieceCell :
                            (props.highlightedPiece.row === props.rowIndex &&
                            props.highlightedPiece.column === index) ?
                            classes.highlightedPieceCell :
                            (props.highlightedLegalAll &&
                            props.highlightedLegalAll.includes(index)) ?
                            classes.highlightedLegalAll :
                            (props.moveToReturnDestination.row === props.rowIndex &&
                            props.moveToReturnDestination.column === index) ?
                            classes.moveToReturnDestination :
                            classes.root}
                        square>
                        <Avatar id={piece.id}
                            className={`${classes.piece}
                            ${piece.side === "Dad" ?
                            classes.DadPiece : classes.myPiece}`}
                            onClick={handleClick}
                            onMouseEnter={handleHover}>
                            {piece.character}
                        </Avatar>
                    </Paper> :
                    <Paper id={`${props.rowIndex},${index}`}
                        className={(props.highlightedLegalAll &&
                            props.highlightedLegalAll.includes(index)) ?
                            classes.highlightedLegalAll :
                            (props.moveToReturnOrigin.row === props.rowIndex &&
                            props.moveToReturnOrigin.column === index) ?
                            classes.moveToReturnOrigin :
                            classes.empty}
                        onClick={handleClick}
                        square />}
                </div>
            ))}
        </div>
    );
}

export default Row;
