export default {
    makeLegalMoveObject: function(piece, piecesAllMatrix) {
        let legalMoveObject = {};

        // First analyze only the piece's own
        // Movement when completely unobstructed,
        // Then analyze the piece in relation to piecesAll

        // When the legal move path contains piece,
        // Piece can be taken/Piece is obstruction
        // Depending on the piece belonging to Dad/me
        // (Own piece is always obstruction)

        // Conventional (Movement-Based) Rule:
        if (piece.type === "Pawn") {
            if (piece.side === "Dad") {
                // Check board boundary
                // Check obstruction
                if (piece.row < 9) {
                    if (piecesAllMatrix[piece.row + 1][piece.column] &&
                        piecesAllMatrix[piece.row + 1][piece.column].side === piece.side) {
                        // Own Piece is Obstruction
                    } else {
                        legalMoveObject[piece.row + 1] = [piece.column];
                    }
                }
            } else {
                if (piece.row > 0) {
                    if (piecesAllMatrix[piece.row - 1][piece.column] &&
                        piecesAllMatrix[piece.row - 1][piece.column].side === piece.side) {
                        // Own Piece is Obstruction
                    } else {
                        legalMoveObject[piece.row - 1] = [piece.column];
                    }
                }
            }
            if ((piece.side === "Dad" && piece.row > 4) || 
            (piece.side === "Me" && piece.row < 5)) {
                // Pawn Has Crossed the River
                if (piece.column > 0) {
                    if (piecesAllMatrix[piece.row][piece.column - 1] &&
                        piecesAllMatrix[piece.row][piece.column - 1].side === piece.side) {
                        // Own Piece is Obstruction
                    } else {
                        legalMoveObject[piece.row] = [piece.column - 1];
                    }
                }
                if (piece.column < 8) {
                    if (piecesAllMatrix[piece.row][piece.column + 1] &&
                        piecesAllMatrix[piece.row][piece.column + 1].side === piece.side) {
                        // Own Piece is Obstruction
                    } else if (legalMoveObject[piece.row]) {
                        legalMoveObject[piece.row].push(piece.column + 1);
                    } else {
                        legalMoveObject[piece.row] = [piece.column + 1];
                    }
                }
            }
        } else if (piece.type === "Cannon") {
            // First determine the middle piece required for the cannon to jump,
            // Then the legal move/piece to take based on the cannon's jump:
            let lowerMiddlePieceFound = false;
            let upperMiddlePieceFound = false;
            let rightMiddlePieceFound = false;
            let leftMiddlePieceFound = false;

            // Rest of Cannon's Movement is Based on Rook's Movement
            for (let i = piece.row + 1; i < 10; i++) {
                if (lowerMiddlePieceFound) {
                    if (piecesAllMatrix[i][piece.column]) {
                        if (piecesAllMatrix[i][piece.column].side !== piece.side) {
                            // Piece Can Be Taken
                            legalMoveObject[i] = [piece.column];
                        }
                        break;
                    }
                } else if (piecesAllMatrix[i][piece.column]) {
                    // Middle Piece Allowing Cannon to Jump Has Been Found
                    lowerMiddlePieceFound = true;
                } else {
                    legalMoveObject[i] = [piece.column];
                }
            }
            for (let i = piece.row - 1; i >= 0; i--) {
                if (upperMiddlePieceFound) {
                    if (piecesAllMatrix[i][piece.column]) {
                        if (piecesAllMatrix[i][piece.column].side !== piece.side) {
                            // Piece Can Be Taken
                            legalMoveObject[i] = [piece.column];
                        }
                        break;
                    }
                } else if (piecesAllMatrix[i][piece.column]) {
                    // Middle Piece Allowing Cannon to Jump Has Been Found
                    upperMiddlePieceFound = true;
                } else {
                    legalMoveObject[i] = [piece.column];
                }
            }
            for (let i = piece.column + 1; i < 9; i++) {
                if (rightMiddlePieceFound) {
                    if (piecesAllMatrix[piece.row][i]) {
                        if (piecesAllMatrix[piece.row][i].side !== piece.side) {
                            // Piece Can Be Taken
                            if (legalMoveObject[piece.row]) {
                                legalMoveObject[piece.row].push(i);
                            } else {
                                legalMoveObject[piece.row] = [i];
                            }
                        }
                        break;
                    }
                } else if (piecesAllMatrix[piece.row][i]) {
                    // Middle Piece Allowing Cannon to Jump Has Been Found
                    rightMiddlePieceFound = true;
                } else if (legalMoveObject[piece.row]) {
                    legalMoveObject[piece.row].push(i);
                } else {
                    legalMoveObject[piece.row] = [i];
                }
            }
            for (let i = piece.column - 1; i >= 0; i--) {
                if (leftMiddlePieceFound) {
                    if (piecesAllMatrix[piece.row][i]) {
                        if (piecesAllMatrix[piece.row][i].side !== piece.side) {
                            // Piece Can Be Taken
                            if (legalMoveObject[piece.row]) {
                                legalMoveObject[piece.row].push(i);
                            } else {
                                legalMoveObject[piece.row] = [i];
                            }
                        }
                        break;
                    }
                } else if (piecesAllMatrix[piece.row][i]) {
                    // Middle Piece Allowing Cannon to Jump Has Been Found
                    leftMiddlePieceFound = true;
                } else if (legalMoveObject[piece.row]) {
                    legalMoveObject[piece.row].push(i);
                } else {
                    legalMoveObject[piece.row] = [i];
                }
            }
        } else if (piece.type === "Rook") {
            for (let i = piece.row + 1; i < 10; i++) {
                if (piecesAllMatrix[i][piece.column] &&
                    piecesAllMatrix[i][piece.column].side === piece.side) {
                    // Own Piece is Obstruction
                    break;
                }
                legalMoveObject[i] = [piece.column];
                if (piecesAllMatrix[i][piece.column]) {
                    // Legal Move Path Leads Up to the Piece to Be Taken
                    break;
                }
            }
            for (let i = piece.row - 1; i >= 0; i--) {
                if (piecesAllMatrix[i][piece.column] &&
                    piecesAllMatrix[i][piece.column].side === piece.side) {
                    // Own Piece is Obstruction
                    break;
                }
                legalMoveObject[i] = [piece.column];
                if (piecesAllMatrix[i][piece.column]) {
                    // Legal Move Path Leads Up to the Piece to Be Taken
                    break;
                }
            }
            for (let i = piece.column + 1; i < 9; i++) {
                if (piecesAllMatrix[piece.row][i] &&
                    piecesAllMatrix[piece.row][i].side === piece.side) {
                    // Own Piece is Obstruction
                    break;
                }
                if (legalMoveObject[piece.row]) {
                    legalMoveObject[piece.row].push(i);
                } else {
                    legalMoveObject[piece.row] = [i];
                }
                if (piecesAllMatrix[piece.row][i]) {
                    // Legal Move Path Leads Up to the Piece to Be Taken
                    break;
                }
            }
            for (let i = piece.column - 1; i >= 0; i--) {
                if (piecesAllMatrix[piece.row][i] &&
                    piecesAllMatrix[piece.row][i].side === piece.side) {
                    // Own Piece is Obstruction
                    break;
                }
                if (legalMoveObject[piece.row]) {
                    legalMoveObject[piece.row].push(i);
                } else {
                    legalMoveObject[piece.row] = [i];
                }
                if (piecesAllMatrix[piece.row][i]) {
                    // Legal Move Path Leads Up to the Piece to Be Taken
                    break;
                }
            }
        } else if (piece.type === "Knight") {
            // Check board boundary
            // Check obstruction
            for (let i = 0; i < 4; i++) {
                if (legalMoveObject[piece.row + 2*(-1)**i]) {
                    legalMoveObject[piece.row + 2*(-1)**i].push(piece.column + 1*(-1)**Math.ceil(i/2));
                } else {
                    legalMoveObject[piece.row + 2*(-1)**i] = [piece.column + 1*(-1)**Math.ceil(i/2)];
                }
                if (legalMoveObject[piece.row + 1*(-1)**i]) {
                    legalMoveObject[piece.row + 1*(-1)**i].push(piece.column + 2*(-1)**Math.ceil(i/2));
                } else {
                    legalMoveObject[piece.row + 1*(-1)**i] = [piece.column + 2*(-1)**Math.ceil(i/2)];
                }
            }
        } else if (piece.type === "Bishop") {
            // Keeping my piece's position relative to the river in mind,
            // Since the Elephant must always stay on its own side
            if (piece.side === "Dad") {
                // Check board boundary
                // Check obstruction
                legalMoveObject[piece.row - 2] = [piece.column - 2, piece.column + 2];
                if (piece.row < 4) {
                    // Elephant Has Space from Border of the River
                    legalMoveObject[piece.row + 2] = [piece.column - 2, piece.column + 2];
                }
            } else {
                legalMoveObject[piece.row + 2] = [piece.column - 2, piece.column + 2];
                if (piece.row > 5) {
                    // Elephant Has Space from Border of the River
                    legalMoveObject[piece.row - 2] = [piece.column - 2, piece.column + 2];
                }
            }
        } else if (piece.type === "Advisor") {
            // Keeping the boundary of the "palace" where the Advisor is confined in mind
            if (piece.side === "Dad" && piece.row !== 1) {
                // Check palace/board boundary
                // Check obstruction
                if (piecesAllMatrix[1][4] &&
                    piecesAllMatrix[1][4].side === piece.side) {
                    // Own Piece is Obstruction
                } else {
                    legalMoveObject[1] = [4];
                }
            } else if (piece.side === "Me" && piece.row !== 8) {
                if (piecesAllMatrix[8][4] &&
                    piecesAllMatrix[8][4].side === piece.side) {
                    // Own Piece is Obstruction
                } else {
                    legalMoveObject[8] = [4];
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    let row = piece.row + (-1)**i;
                    let column = piece.column + (-1)**Math.ceil(i/2);
                    if (piecesAllMatrix[row][column] &&
                        piecesAllMatrix[row][column].side === piece.side) {
                        // Own Piece is Obstruction
                    } else if (legalMoveObject[row]) {
                        legalMoveObject[row].push(column);
                    } else {
                        legalMoveObject[row] = [column];
                    }
                }
            }
        } else if (piece.type === "King") {
            // Keeping the boundary of the "palace" where the King is confined in mind
            for (let i = 0; i < 4; i++) {
                let row = piece.row + (i % 2)*(-1)**Math.ceil(i/2);
                let column = piece.column + ((i + 1) % 2)*(-1)**Math.ceil(i/2);
                if (((piece.side === "Dad" && row >= 0 && row < 3) ||
                (piece.side === "Me" && row > 6 && row < 10)) &&
                column > 2 && column < 6) {
                    if (piecesAllMatrix[row][column] &&
                        piecesAllMatrix[row][column].side === piece.side) {
                        // Own Piece is Obstruction
                    } else if (legalMoveObject[row]) {
                        legalMoveObject[row].push(column);
                    } else {
                        legalMoveObject[row] = [column];
                    }
                }
            }
        }

        // Special Rule:
        // King must not directly face King

        // Rule Governing Endgame:
        // Cap on Perpetual Chasing/Checking

        return legalMoveObject;
    },
    verifyMoveLegality: function(chosenPiece, chosenDestination, piecesAllMatrix) {
        // Let the entire rule logic of verifyMoveLegality depend on the legalMoveObject
        // Determined in makeLegalMoveObject above
        let legalMoveObject = this.makeLegalMoveObject(chosenPiece, piecesAllMatrix);
        if (legalMoveObject[chosenDestination.row] &&
            legalMoveObject[chosenDestination.row].includes(parseInt(chosenDestination.column))) {
            return true;
        } else {
            // Dad and I have the ability to choose the move's destination on the entire board,
            // So follow up verifyMoveLegality by explaining the rule making the move illegal
            return false;
        }
    }
};
