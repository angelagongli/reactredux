import React, { useState } from "react";
import { Container } from '@material-ui/core';
import Row from "./Row";

function Board(props) {
    // Will have to make way to translate your piece's name/side saved in DB into the correct traditional character
    const [piecesAll, setPiecesAll] = useState([
        ["車/Chariot (Rook)", "馬/Horse (Knight)", "象/Elephant (Bishop)", "士/Advisor", "將/General (King)", "士/Advisor", "象/Elephant (Bishop)", "馬/Horse (Knight)", "車/Chariot (Rook)"],
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

    function populateBoard() {
        // Populate Board with All Pieces (where !isTaken) Saved in DB
    }

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
        // since nothing will trying prevent from clicking an illegal move destination cell
    }
    
    return (
        <Container>
            <div>
                Highlighted Piece: {highlightedPiece}<br />
                Chosen Piece: {chosenPiece}<br />
                Chosen Destination: {chosenDestination}
            </div>
            {piecesAll.map((row, index) => (
                <div>
                    <Row rowIndex={index} pieces={row} highlightPiece={highlightPiece} clickCell={clickCell} />
                    {/* Add 楚河/Chu River boundary in the middle of the 象棋/Elephant Chess board */}
                    {index === 4 ?
                    <div className="row justify-content-center g-0">
                        <div className="col-3 chuRiver">楚河/Chu River</div>
                        <div className="col-3 chuRiver"></div>
                        <div className="col-3 chuRiver">汉界/Border of the Han</div>
                    </div>
                    : ""}
                </div>
            ))}
        </Container>
    );
}

export default Board;
