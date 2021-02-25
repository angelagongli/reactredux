import React, { useState, useEffect } from "react";
import { Container, Paper } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import API from "../utils/API";

const useStyles = makeStyles({
    root: {
      width: '100%'
    },
    container: {
      maxHeight: 500
    }
});

function MoveHistory(props) {
    // Will have to make way to render our move history in the correct 象棋/Elephant Chess 棋谱/notation
    const [piecesAllLookup, setPiecesAllLookup] = useState({});
    const [movesAll, setMovesAll] = useState([]);
    const [movesAllTablePage, setMovesAllTablePage] = useState(0);
    const [rowCountPerTablePage, setRowCountPerTablePage] = useState(10);
    const classes = useStyles();

    useEffect(() => {
        loadMovesAll();
    }, [props.moveSubmission]);

    function loadMovesAll() {
        if (Object.entries(piecesAllLookup).length) {
            API.getMovesAllByGame(1).then(res => {
                if (res.data.length) {
                    setMovesAll(notateMovesAll(res.data, piecesAllLookup));
                    console.log("All moves in ongoing game set");
                    props.pullMoveToReturn(res.data[0]);
                }
            }).catch(err => console.log(err));
        } else {
            // Move always has only one Piece and can have only one PieceTaken =>
            // Keep Move model/Piece model connected by PieceID/Piece Name lookup, not M:M model relationship
            API.getPiecesAll().then(res => {
                let pieceIDNameLookup = {};
                for (const piece of res.data) {
                    pieceIDNameLookup[piece.id] = piece.name;
                }
                setPiecesAllLookup(pieceIDNameLookup);
                console.log("All pieces in PieceID/Piece Name Lookup set");
                API.getMovesAllByGame(1).then(res => {
                    if (res.data.length) {
                        setMovesAll(notateMovesAll(res.data, pieceIDNameLookup));
                        console.log("All moves in ongoing game set");
                        props.pullMoveToReturn(res.data[0]);
                    }
                });
            }).catch(err => console.log(err));
        }
    }

    function computeNotation(move, piecesAllLookup) {
        return `${move.id} ${move.mover} ${piecesAllLookup[move.pieceID]}:
        ${move.startRow},${move.startColumn} to ${move.destinationRow},${move.destinationColumn}`;
    }

    function notateMovesAll(rawMovesAll, piecesAllLookup) {
        let notatedMovesAll = [];
        for (let i = (rawMovesAll.length % 2 === 0 ? 0 : -1); i < rawMovesAll.length; i += 2) {
            if (i === -1) {
                notatedMovesAll.push({
                    index: Math.ceil(rawMovesAll.length/2),
                    move: computeNotation(rawMovesAll[0], piecesAllLookup)
                });
            } else {
                notatedMovesAll.push({
                    index: Math.ceil(rawMovesAll.length/2) - Math.ceil(i/2),
                    move: computeNotation(rawMovesAll[i + 1], piecesAllLookup),
                    response: computeNotation(rawMovesAll[i], piecesAllLookup)
                });
            }
        }
        return notatedMovesAll;
    }

    const handleChangePage = (event, newPage) => {
        setMovesAllTablePage(newPage);
    };

    const handleChangeRowCountPerTablePage = (event) => {
        setRowCountPerTablePage(+event.target.value);
        setMovesAllTablePage(0);
    };

    return (
        <Container className={classes.root}>
            <TableContainer component={Paper} className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Number</TableCell>
                            <TableCell align="left">Move</TableCell>
                            <TableCell align="left">Response</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movesAll.length ?
                        movesAll.slice(movesAllTablePage * rowCountPerTablePage,
                            movesAllTablePage * rowCountPerTablePage + rowCountPerTablePage).map(move => (
                            <TableRow key={move.index}>
                                <TableCell>{move.index}</TableCell>
                                <TableCell align="left">{move.move}</TableCell>
                                <TableCell align="left">{move.response}</TableCell>
                            </TableRow>
                        )) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={movesAll.length}
                rowsPerPage={rowCountPerTablePage}
                page={movesAllTablePage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowCountPerTablePage}
            />
        </Container>
    );
}

export default MoveHistory;
