import React, { useState } from "react";
import { Container } from '@material-ui/core';
import Row from "./Row";

function Board(props) {
    const [piecesAll, setPiecesAll] = useState([
        ["車/Chariot (Rook)", "馬/Horse (Knight)", "象/Elephant (Bishop)", "士/Advisor", "将/General (King)", "士/Advisor", "象/Elephant (Bishop)", "馬/Horse (Knight)", "車/Chariot (Rook)"],
        ["", "", "", "", "", "", "", "", ""],
        ["", "砲/Cannon", "", "", "", "", "", "砲/Cannon", ""],
        ["卒/Soldier (Pawn)", "", "卒/Soldier (Pawn)", "", "卒/Soldier (Pawn)", "", "卒/Soldier (Pawn)", "", "卒/Soldier (Pawn)"],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["兵/Soldier (Pawn)", "", "兵/Soldier (Pawn)", "", "兵/Soldier (Pawn)", "", "兵/Soldier (Pawn)", "", "兵/Soldier (Pawn)"],
        ["", "炮/Cannon", "", "", "", "", "", "炮/Cannon", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["俥/Chariot (Rook)", "傌/Horse (Knight)", "相/Elephant (Bishop)", "仕/Advisor", "帥/General (King)", "仕/Advisor", "相/Elephant (Bishop)", "傌/Horse (Knight)", "俥/Chariot (Rook)"]
    ]);
    const [highlightedPiece, setHighlightedPiece] = useState("");
    const [chosenPiece, setChosenPiece] = useState("");
    const [chosenDestination, setChosenDestination] = useState("");

    function highlightPiece(pieceID) {
        // Keep Legal Move Highlighting in Local State
        setHighlightedPiece(pieceID);
    }

    function clickCell(cellID) {
        // @TODO: Make Chosen Piece/Chosen Destination into Action Dispatched to Update Global State
        if (chosenPiece) {
            if (chosenPiece === cellID) {
                setChosenPiece("");
            } else {
                setChosenDestination(cellID);
                makeMove();
            }
        } else {
            setChosenPiece(cellID);
        }
    }

    function makeMove() {
        // @TODO: Ascertain Move Legality Based on Rule Computation
    }
    
    return (
        <Container>
            <div>
                Highlighted Piece: {highlightedPiece}<br />
                Chosen Piece: {chosenPiece}<br />
                Chosen Destination: {chosenDestination}
            </div>
            {piecesAll.map((row, index) => (
                <Row rowIndex={index} pieces={row} highlightPiece={highlightPiece} clickCell={clickCell} />
            ))}
        </Container>
    );
}

export default Board;
