import React, { useState, useEffect } from "react";
import { Container } from '@material-ui/core';
import Row from "./Row";
import API from "../utils/API";

function Board(props) {
    // Will have to make way to translate your piece's name/side saved in DB into the correct traditional character
    const [piecesAll, setPiecesAll] = useState([]);
    const [piecesAllMatrix, setPiecesAllMatrix] = useState([]);
    const [highlightedPiece, setHighlightedPiece] = useState("");
    const [chosenPiece, setChosenPiece] = useState("");
    const [chosenDestination, setChosenDestination] = useState("");

    useEffect(() => {
        loadPiecesAll();
        populateBoard();
    }, [piecesAll]);

    function loadPiecesAll() {
        API.getPiecesAll().then(res => {
            setPiecesAll(res.data);
            console.log("All pieces set");
        }).catch(err => console.log(err));
    }

    function populateBoard() {
        // Populate Board with All Pieces (where !isTaken) Saved in DB
        console.log("Populating Board...");
        let pieceIndex = 0;
        let populateBoardMatrix = [];
        if (piecesAll.length) {
            for (let i = 0; i < 10; i++) {
                populateBoardMatrix[i] = [];
                for (let j = 0; j < 9; j++) {
                    if (piecesAll[pieceIndex].row === i && piecesAll[pieceIndex].column === j) {
                        if (!piecesAll[pieceIndex].isTaken) {
                            piecesAll[pieceIndex].character = translatePiece(piecesAll[pieceIndex].type, piecesAll[pieceIndex].side);
                            populateBoardMatrix[i][j] = piecesAll[pieceIndex];
                        }
                        pieceIndex++;
                    } else {
                        populateBoardMatrix[i][j] = null;
                    }
                }
            }
        }
        setPiecesAllMatrix(populateBoardMatrix);
        console.log("Finished Populating Board");
    }

    function translatePiece(pieceType, pieceSide) {
        console.log(`Piece to be translated is of type ${pieceType} and on side ${pieceSide}`);
        if (pieceSide === "Dad") {
            switch (pieceType) {
                case "Rook":
                    return "車";
                case "Knight":
                    return "馬";
                case "Bishop":
                    return "象";
                case "Advisor":
                    return "士";
                case "King":
                    return "將";
                case "Cannon":
                    return "砲";
                case "Pawn":
                    return "卒";
            }
        } else {
            switch (pieceType) {
                case "Rook":
                    return "俥";
                case "Knight":
                    return "傌";
                case "Bishop":
                    return "相";
                case "Advisor":
                    return "仕";
                case "King":
                    return "帥";
                case "Cannon":
                    return "炮";
                case "Pawn":
                    return "兵";
            }
        }
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

    function movePiece(id, destinationRow, destinationColumn) {
        API.updatePiece(id, {
            row: destinationRow,
            column: destinationColumn
        }).then(res => {
            console.log("Piece row/column updated");
        }).catch(err => console.log(err));
    }

    function takePiece(id) {
        API.updatePiece(id, {
            isTaken: true
        }).then(res => {
            console.log("Piece taken");
        }).catch(err => console.log(err));
    }

    return (
        <Container>
            <div>
                Highlighted Piece: {highlightedPiece}<br />
                Chosen Piece: {chosenPiece}<br />
                Chosen Destination: {chosenDestination}
            </div>
            {piecesAllMatrix.length ?
            piecesAllMatrix.map((row, index) => (
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
            )) : ""}
        </Container>
    );
}

export default Board;
