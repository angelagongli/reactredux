import React, { useState, useEffect } from "react";
import { Container, Paper } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import API from "../utils/API";

function MoveHistory(props) {
    // Will have to make way to render our move history in the correct 象棋/Elephant Chess 棋谱/notation
    const [piecesAllLookup, setPiecesAllLookup] = useState({});
    const [movesAll, setMovesAll] = useState([]);

    useEffect(() => {
        loadPiecesAll();
        loadMovesAll();
    }, [props.moveSubmission]);

    function loadPiecesAll() {
        // Move always has only one Piece and can have only one PieceTaken =>
        // Keep Move model/Piece model connected by PieceID/Piece Name lookup, not M:M model relationship
        API.getPiecesAll().then(res => {
            let pieceIDNameLookup = {};
            for (const piece of res.data) {
                pieceIDNameLookup[piece.id] = piece.name;
            }
            setPiecesAllLookup(pieceIDNameLookup);
            console.log("All pieces in PieceID/Piece Name Lookup set");
        }).catch(err => console.log(err));
    }

    function loadMovesAll() {
        API.getMovesAllByGame(1).then(res => {
            setMovesAll(res.data);
            console.log("All moves in ongoing game set");
            if (res.data.length) {
                props.pullMoveToReturn(res.data[0]);
            }
        }).catch(err => console.log(err));
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Mover</TableCell>
                            <TableCell align="right">Piece</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Start</TableCell>
                            <TableCell align="right">Destination</TableCell>
                            <TableCell align="right">Piece Taken</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movesAll.length ?
                        movesAll.map(move => (
                            <TableRow key={move.id}>
                                <TableCell>{move.id}</TableCell>
                                <TableCell align="right">{move.mover}</TableCell>
                                <TableCell align="right">{piecesAllLookup[move.pieceID]}</TableCell>
                                <TableCell align="right">{move.createdAt}</TableCell>
                                <TableCell align="right">Row {move.startRow}/Column {move.startColumn}</TableCell>
                                <TableCell align="right">Row {move.destinationRow}/Column {move.destinationColumn}</TableCell>
                                <TableCell align="right">{move.pieceTaken ? piecesAllLookup[move.pieceTakenID] : ""}</TableCell>
                            </TableRow>
                        )) : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MoveHistory;
