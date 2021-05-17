import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setMoveToReturn, selectMoveToReturn } from '../features/legalMoveSubmission/legalMoveSubmissionSlice';
import { Container } from '@material-ui/core';
import Row from "./Row";
import API from "../utils/API";
import enforceRule from "../utils/enforceRule";

function Board() {
    // Will have to make way to keep track of our gameplay's progression/be able to
    // Know when it is my turn, having made sure only my side's pieces are enabled
    // So I am sure the chosen piece is mine to choose/the move is mine to make
    const [piecesAll, setPiecesAll] = useState([]);
    const [piecesAllMatrix, setPiecesAllMatrix] = useState([]);
    const [highlightedPiece, setHighlightedPiece] = useState({});
    const [highlightedLegalAll, setHighlightedLegalAll] = useState({});
    const [chosenPiece, setChosenPiece] = useState({});
    const [chosenDestination, setChosenDestination] = useState({});
    const [message, setMessage] = useState("");
    const moveToReturn = useSelector(selectMoveToReturn);
    const dispatch = useDispatch();

    useEffect(() => {
        loadPiecesAll();
        // My logic will only ever allow my chosenDestination to be set once my chosenPiece has been set,
        // but what if some oversight managing to set chosenDestination without chosenPiece? Keep my condition as it is,
        // since makeMove is only well-defined when my chosenPiece as well as my chosenDestination are set.
        if (Object.entries(chosenPiece).length && Object.entries(chosenDestination).length) {
            makeMove();
        }
    }, [chosenDestination]);

    function loadPiecesAll() {
        API.getPiecesAll().then(res => {
            setPiecesAll(res.data);
            console.log("All pieces set");
            populateBoard(res.data);
        }).catch(err => console.log(err));
    }

    function populateBoard(piecesAll) {
        // Populate Board with All Pieces (where !isTaken) Saved in DB
        console.log("Populating Board...");
        let pieceIndex = 0;
        let populateBoardMatrix = [];
        if (piecesAll.length) {
            let piecesAllToPopulate = piecesAll.filter(piece => !piece.isTaken);
            for (let i = 0; i < 10; i++) {
                populateBoardMatrix[i] = [];
                for (let j = 0; j < 9; j++) {
                    if (piecesAllToPopulate[pieceIndex] && piecesAllToPopulate[pieceIndex].row === i && piecesAllToPopulate[pieceIndex].column === j) {
                        piecesAllToPopulate[pieceIndex].character = translatePiece(piecesAllToPopulate[pieceIndex].type, piecesAllToPopulate[pieceIndex].side);
                        populateBoardMatrix[i][j] = piecesAllToPopulate[pieceIndex];
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
        let pieceToHighlight = piecesAll.find(piece => piece.id === parseInt(pieceID));
        setHighlightedPiece(pieceToHighlight);
        setHighlightedLegalAll(enforceRule.makeLegalMoveObject(pieceToHighlight, piecesAllMatrix));
    }

    function clickCell(cellID) {
        // @TODO: Make Chosen Piece/Chosen Destination into Action Dispatched to Update Global State
        if (Object.entries(chosenPiece).length) {
            // Chosen Piece Is Set => Determine Chosen Destination Cell's Position/Contained Piece and Make Move to Chosen Destination
            if (cellID.includes(",")) {
                // Chosen destination is empty and cellID is the cell's "row,column"
                let [ chosenDestinationRow, chosenDestinationColumn ] = cellID.split(",");
                setChosenDestination({
                    row: chosenDestinationRow,
                    column: chosenDestinationColumn
                });
                setMessage("Making move to empty destination...");
            } else {
                // Chosen destination contains piece and cellID is just the piece's ID
                if (chosenPiece.id === parseInt(cellID)) {
                    // Release Chosen Piece/Set ChosenPiece State Back to Empty
                    setChosenPiece({});
                    setMessage("Chosen Piece Released");
                } else {
                    let pieceToTake = piecesAll.find(piece => piece.id === parseInt(cellID));
                    console.log("Piece to take: " + JSON.stringify(pieceToTake));
                    setChosenDestination(pieceToTake);
                    setMessage("Making move taking piece...");
                }
            }
        } else {
            // Chosen Piece Not Yet Set => Set ChosenPiece State
            if (cellID.includes(",")) {
                // Chosen "piece" is empty, but non-empty piece must be chosen before empty destination can be chosen
                setMessage("Please choose your piece!");
            } else {
                // Chosen piece is indeed non-empty piece and cellID is just the piece's ID
                let pieceToMove = piecesAll.find(piece => piece.id === parseInt(cellID));
                console.log("Piece to move: " + JSON.stringify(pieceToMove));
                if (pieceToMove.side === moveToReturn.mover) {
                    // Chosen piece belongs to the mover having just made move
                    setMessage(`Please wait for your turn, it is ${moveToReturn.mover === "Dad" ? "my" : "Dad's"} turn to return ${moveToReturn.mover === "Dad" ? "Dad's" : "my"} move!`);
                } else {
                    setChosenPiece(pieceToMove);
                    setMessage(`Piece ${pieceToMove.name} at row ${pieceToMove.row}/column ${pieceToMove.column} chosen by ${pieceToMove.side}!`);
                }
            }
        }
    }

    function makeMove() {
        // @TODO: Ascertain Move Legality Based on Rule Computation
        // since nothing will trying prevent from clicking an illegal move destination cell
        console.log(`Move submitted to be verified legal: Piece ${JSON.stringify(chosenPiece)} to ${JSON.stringify(chosenDestination)}`);
        let isLegal = enforceRule.verifyMoveLegality(chosenPiece, chosenDestination, piecesAllMatrix);
        // Move submission to DB once the move has been verified legal
        
        if (isLegal) {
            // On Legal Move: Insert Move Into DB
            let move = {
                PieceId: chosenPiece.id,
                mover: chosenPiece.side,
                startRow: chosenPiece.row,
                startColumn: chosenPiece.column,
                destinationRow: chosenDestination.row,
                destinationColumn: chosenDestination.column,
                pieceTaken: chosenDestination.id ? true : false,
                PieceTakenId: chosenDestination.id ? chosenDestination.id : null,
                GameId: 1
            }
            API.makeMove(move).then(res => {
                console.log("Move made, now show on board");
                setMessage("Move made!");
                movePiece(chosenPiece.id, chosenDestination.row, chosenDestination.column);
                dispatch(setMoveToReturn(move));
            }).catch(err => console.log(err));
        } else {
            // On Illegal Move: Set Chosen Piece/Chosen Destination Back to Empty, Explain Rule Making Move Illegal
            setChosenPiece({});
            setChosenDestination({});
            setMessage(`Move is illegal because of the ${enforceRule.returnRuleExplanation(chosenPiece, chosenDestination, piecesAllMatrix)} rule!`);
        }
    }

    function movePiece(id, destinationRow, destinationColumn) {
        API.updatePiece(id, {
            row: destinationRow,
            column: destinationColumn
        }).then(res => {
            console.log("Piece row/column updated");
            if (chosenDestination.id) {
                takePiece(chosenDestination.id);
            } else {
                setChosenPiece({});
                setChosenDestination({});
            }
        }).catch(err => console.log(err));
    }

    function takePiece(id) {
        API.updatePiece(id, {
            isTaken: true
        }).then(res => {
            console.log("Piece taken");
            setChosenPiece({});
            setChosenDestination({});
        }).catch(err => console.log(err));
    }

    return (
        <Container>
            <div>
                Highlighted Piece: {JSON.stringify(highlightedPiece)}<br />
                Chosen Piece: {JSON.stringify(chosenPiece)}<br />
                Chosen Destination: {JSON.stringify(chosenDestination)}<br />
                Message: {message}<br />
                Move to Make: {moveToReturn.mover === "Dad" ? "I Am" : "Dad Is"} Up
            </div>
            {piecesAllMatrix.length ?
            piecesAllMatrix.map((row, index) => (
                <div key={index}>
                    <Row rowIndex={index}
                        pieces={row}
                        highlightedPiece={highlightedPiece}
                        highlightedLegalAll={highlightedLegalAll[index]}
                        chosenPiece={chosenPiece}
                        highlightPiece={highlightPiece}
                        clickCell={clickCell} />
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
