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
                let rowA = piece.row + 2*(-1)**i;
                let columnA = piece.column + 1*(-1)**Math.ceil(i/2);
                if (rowA >= 0 && rowA < 10 && columnA >= 0 && columnA < 9) {
                    if (piecesAllMatrix[piece.row + (-1)**i][piece.column]) {
                        // Piece in Knight's Path is Obstructing "Knight's Leg"/蹩马腿
                    } else if (piecesAllMatrix[rowA][columnA] &&
                        piecesAllMatrix[rowA][columnA].side === piece.side) {
                        // Own Piece is Obstruction
                    } else if (legalMoveObject[rowA]) {
                        legalMoveObject[rowA].push(columnA);
                    } else {
                        legalMoveObject[rowA] = [columnA];
                    }
                }
                let rowB = piece.row + 1*(-1)**i;
                let columnB = piece.column + 2*(-1)**Math.ceil(i/2);
                if (rowB >= 0 && rowB < 10 && columnB >= 0 && columnB < 9) {
                    if (piecesAllMatrix[piece.row][piece.column + (-1)**Math.ceil(i/2)]) {
                        // Piece in Knight's Path is Obstructing "Knight's Leg"/蹩马腿
                    } else if (piecesAllMatrix[rowB][columnB] &&
                        piecesAllMatrix[rowB][columnB].side === piece.side) {
                        // Own Piece is Obstruction
                    } else if (legalMoveObject[rowB]) {
                        legalMoveObject[rowB].push(columnB);
                    } else {
                        legalMoveObject[rowB] = [columnB];
                    }
                }
            }
        } else if (piece.type === "Bishop") {
            // Keeping my piece's position relative to the river in mind,
            // Since the Elephant must always stay on its own side
            for (let i = 0; i < 4; i++) {
                let row = piece.row + 2*(-1)**i;
                let column = piece.column + 2*(-1)**Math.ceil(i/2);
                // Check board boundary
                // Check obstruction
                if (((piece.side === "Dad" && row >= 0 && row < 5) ||
                (piece.side === "Me" && row > 4 && row < 10))
                // Elephant Has Space from Border of the River
                && column >= 0 && column < 9) {
                    if (piecesAllMatrix[piece.row + (-1)**i][piece.column + (-1)**Math.ceil(i/2)]) {
                        // Piece in Elephant's Path is "Blocking the Elephant's Eye"/塞象眼
                    } else if (piecesAllMatrix[row][column] &&
                        piecesAllMatrix[row][column].side === piece.side) {
                        // Own Piece is Obstruction
                    } else if (legalMoveObject[row]) {
                        legalMoveObject[row].push(column);
                    } else {
                        legalMoveObject[row] = [column];
                    }
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

        // The special situation can only arise when King moves into the opposing
        // King's column/King faces the opposing King and their only middle piece
        // Moves horizontally/diagonally, clearing the path for the King to directly
        // Face the opposing King
        if (piece.type === "King") {
            // Check: Am I moving into the opposing King's column/directly facing the opposing King?
            let opposingKing = null;
            for (let i = (piece.side === "Dad" ? 7 : 0);
                i < (piece.side === "Dad" ? 10 : 3);
                i++) {
                for (let j = 3; j < 6; j++) {
                    if (piecesAllMatrix[i][j] && piecesAllMatrix[i][j].type === "King") {
                        opposingKing = piecesAllMatrix[i][j];
                        break;
                    }
                }
            }
            console.log("Opposing King: " + JSON.stringify(opposingKing));
            for (const legalMoveRow in legalMoveObject) {
                if (legalMoveObject[legalMoveRow].includes(opposingKing.column)) {
                    // Based on the King's defined movement of one orthogonal step,
                    // Only one move in the King's legalMoveObject can ever be
                    // Moving into the opposing King's column
                    let middlePieceCount = 0;
                    for (let i = (piece.side === "Dad" ? parseInt(legalMoveRow) + 1 : opposingKing.row + 1);
                        i < (piece.side === "Dad" ? opposingKing.row : parseInt(legalMoveRow));
                        i++) {
                        if (piecesAllMatrix[i][opposingKing.column]) {
                            middlePieceCount++;
                            break;
                        }
                    }
                    if (middlePieceCount === 0) {
                        // Move leads to situation where King is directly facing King =>
                        // Splice just the move in the row of the King's legalMoveObject
                        // Leading to the special situation
                        let opposingKingColumnIndex = legalMoveObject[legalMoveRow].indexOf(opposingKing.column);
                        legalMoveObject[legalMoveRow].splice(opposingKingColumnIndex, 1);
                    }
                    break;
                }
            }
        } else {
            // Pull Dad's/my King's column to check for situation of King facing King,
            // Then their only middle piece's horizontal/diagonal move
            // Opening up the board and leading to King directly facing King
            let DadKing = null;
            let myKing = null;
            for (let i = 0; i < piecesAllMatrix.length; i++) {
                if (i > 2 && i < 7) {
                    // Row Does Not Intersect with Dad's/My "Palace"
                    continue;
                }
                for (let j = 3; j < 6; j++) {
                    if (piecesAllMatrix[i][j] && piecesAllMatrix[i][j].type === "King") {
                        if (piecesAllMatrix[i][j].side === "Dad") {
                            DadKing = piecesAllMatrix[i][j];
                        } else {
                            myKing = piecesAllMatrix[i][j];
                        }
                        break;
                    }
                }
            }
            // Does King Face King/Is Piece in the Middle of King's Column?
            if (piece.column === DadKing.column && DadKing.column === myKing.column &&
                piece.row > DadKing.row && piece.row < myKing.row) {
                let middlePieceCount = 0;
                for (let i = DadKing.row + 1; i < myKing.row; i++) {
                    if (piecesAllMatrix[i][DadKing.column]) {
                        middlePieceCount++;
                    }
                    if (middlePieceCount > 1) {
                        break;
                    }
                }
                if (middlePieceCount === 1) {
                    // Piece is the only middle piece between Dad's King and my King =>
                    // Piece must stay in the King's column
                    for (const legalMoveRow in legalMoveObject) {
                        if (legalMoveObject[legalMoveRow].includes(DadKing.column)) {
                            legalMoveObject[legalMoveRow] = [DadKing.column];
                        } else {
                            delete legalMoveObject[legalMoveRow];
                        }
                    }
                }
            }
        }

        // Rule Governing Endgame:
        // Cap on Perpetual Chasing/Checking

        // Let the endgame rule be completely up to Dad and me, since perpetual
        // Chasing/checking does not depend on the current state of the board but
        // Comes from Dad's/my combined move history, and "perpetual" is up to us to define

        // Once defined, our endgame rule will have to be implemented in backward-looking part of
        // Dad's idea of forward-looking 象棋/Elephant Chess engine based on Own King Safety Index.

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
    },
    returnRuleExplanation: function(chosenPiece, chosenDestination, piecesAllMatrix) {
        // ReturnRuleExplanation is wholly based on the logic of makeLegalMoveObject,
        // Adding chosenDestination into the logic to determine the rule making the move illegal,
        // Covering when rule is broken and returning the broken rule/explanation of the rule
        const chosenDestinationRow = parseInt(chosenDestination.row);
        const chosenDestinationColumn = parseInt(chosenDestination.column);

        // Be careful to always return only the most relevant rule making the move illegal:
        // Based on the move being analyzed, one rule always beats the rest

        // On Special Rule Keeping King from Facing King:
        // Does piece in King's column move horizontally/diagonally to clear the
        // King's column so King directly faces King/Does King's horizontal
        // Move into the opposing King's column break the special rule?

        // Conventional (Movement-Based) Rule:
        if (chosenPiece.type === "Pawn") {
            if (chosenPiece.side === "Dad") {
                if (chosenPiece.row > 4) {
                    // Pawn Has Crossed the River
                    if ((chosenDestinationRow === chosenPiece.row &&
                        (chosenDestinationColumn === chosenPiece.column - 1 ||
                        chosenDestinationColumn === chosenPiece.column + 1)) ||
                        (chosenDestinationRow === chosenPiece.row + 1 &&
                        chosenDestinationColumn === chosenPiece.column)) {
                        if (piecesAllMatrix[chosenDestinationRow][chosenDestinationColumn]) {
                            return "Own Piece is Obstruction";
                        } else {
                            return "Pawn Must Stay in King's Column Because King Must Not Directly Face King";
                        }
                    } else {
                        return "Pawn Can Only Move One Step Forward/One Step Horizontally Once Having Crossed the River";
                    }
                } else {
                    if (chosenDestinationRow === chosenPiece.row + 1 &&
                        chosenDestinationColumn === chosenPiece.column) {
                        return "Own Piece is Obstruction";
                    } else {
                        return "Pawn Can Only Move One Step Forward Before Crossing the River";
                    }
                }
            } else if (chosenPiece.side === "Me") {
                if (chosenPiece.row < 5) {
                    // Pawn Has Crossed the River
                    if ((chosenDestinationRow === chosenPiece.row &&
                        (chosenDestinationColumn === chosenPiece.column - 1 ||
                        chosenDestinationColumn === chosenPiece.column + 1)) ||
                        (chosenDestinationRow === chosenPiece.row - 1 &&
                        chosenDestinationColumn === chosenPiece.column)) {
                        if (piecesAllMatrix[chosenDestinationRow][chosenDestinationColumn]) {
                            return "Own Piece is Obstruction";
                        } else {
                            return "Pawn Must Stay in King's Column Because King Must Not Directly Face King";
                        }
                    } else {
                        return "Pawn Can Only Move One Step Forward/One Step Horizontally Once Having Crossed the River";
                    }
                } else {
                    if (chosenDestinationRow === chosenPiece.row - 1 &&
                        chosenDestinationColumn === chosenPiece.column) {
                        return "Own Piece is Obstruction";
                    } else {
                        return "Pawn Can Only Move One Step Forward Before Crossing the River";
                    }
                }
            }
        } else if (chosenPiece.type === "Cannon") {
            if (chosenDestinationRow !== chosenPiece.row &&
                chosenDestinationColumn !== chosenPiece.column) {
                return "Cannon Can Only Move/Take Piece Orthogonally";
            } else if (chosenDestinationColumn === chosenPiece.column) {
                if (chosenDestinationRow > chosenPiece.row) {
                    let lowerMiddlePieceFound = false;
                    for (let i = chosenPiece.row + 1; i < 10; i++) {
                        if (lowerMiddlePieceFound) {
                            if (chosenDestinationRow === i) {
                                if (piecesAllMatrix[i][chosenPiece.column]) {
                                    if (piecesAllMatrix[i][chosenPiece.column].side === chosenPiece.side) {
                                        return "Own Piece is Obstruction";
                                    } else {
                                        return "Cannon Can Only Take Piece Having Jumped Only One Middle Piece";
                                    }
                                } else {
                                    return "Cannon Can Only Jump Middle Piece When Taking Piece";
                                }
                            }
                        } else if (piecesAllMatrix[i][chosenPiece.column]) {
                            // Middle Piece Allowing Cannon to Jump Has Been Found
                            if (chosenDestinationRow === i) {
                                if (piecesAllMatrix[i][chosenPiece.column].side === chosenPiece.side) {
                                    return "Own Piece is Obstruction";
                                } else {
                                    return "Cannon Must Only Take Piece Having Jumped Middle Piece";
                                }
                            }
                            lowerMiddlePieceFound = true;
                        }
                    }
                } else {
                    let upperMiddlePieceFound = false;
                    for (let i = chosenPiece.row - 1; i >= 0; i--) {
                        if (upperMiddlePieceFound) {
                            if (chosenDestinationRow === i) {
                                if (piecesAllMatrix[i][chosenPiece.column]) {
                                    if (piecesAllMatrix[i][chosenPiece.column].side === chosenPiece.side) {
                                        return "Own Piece is Obstruction";
                                    } else {
                                        return "Cannon Can Only Take Piece Having Jumped Only One Middle Piece";
                                    }
                                } else {
                                    return "Cannon Can Only Jump Middle Piece When Taking Piece";
                                }
                            }
                        } else if (piecesAllMatrix[i][chosenPiece.column]) {
                            // Middle Piece Allowing Cannon to Jump Has Been Found
                            if (chosenDestinationRow === i) {
                                if (piecesAllMatrix[i][chosenPiece.column].side === chosenPiece.side) {
                                    return "Own Piece is Obstruction";
                                } else {
                                    return "Cannon Must Only Take Piece Having Jumped Middle Piece";
                                }
                            }
                            upperMiddlePieceFound = true;
                        }
                    }
                }
            } else if (chosenDestinationRow === chosenPiece.row) {
                if (chosenDestinationColumn > chosenPiece.column) {
                    let rightMiddlePieceFound = false;
                    for (let i = chosenPiece.column + 1; i < 9; i++) {
                        if (rightMiddlePieceFound) {
                            if (chosenDestinationColumn === i) {
                                if (piecesAllMatrix[chosenPiece.row][i]) {
                                    if (piecesAllMatrix[chosenPiece.row][i].side === chosenPiece.side) {
                                        return "Own Piece is Obstruction";
                                    } else {
                                        if (isSpecialRuleBroken()) {
                                            return "Cannon Must Stay in King's Column Because King Must Not Directly Face King";
                                        }
                                        return "Cannon Can Only Take Piece Having Jumped Only One Middle Piece";
                                    }
                                } else {
                                    if (isSpecialRuleBroken()) {
                                        return "Cannon Must Stay in King's Column Because King Must Not Directly Face King";
                                    }
                                    return "Cannon Can Only Jump Middle Piece When Taking Piece";
                                }
                            }
                        } else if (piecesAllMatrix[chosenPiece.row][i]) {
                            // Middle Piece Allowing Cannon to Jump Has Been Found
                            if (chosenDestinationColumn === i) {
                                if (piecesAllMatrix[chosenPiece.row][i].side === chosenPiece.side) {
                                    return "Own Piece is Obstruction";
                                } else {
                                    return "Cannon Must Only Take Piece Having Jumped Middle Piece";
                                }
                            }
                            rightMiddlePieceFound = true;
                        }
                    }
                } else {
                    let leftMiddlePieceFound = false;
                    for (let i = chosenPiece.column - 1; i >= 0; i--) {
                        if (leftMiddlePieceFound) {
                            if (chosenDestinationColumn === i) {
                                if (piecesAllMatrix[chosenPiece.row][i]) {
                                    if (piecesAllMatrix[chosenPiece.row][i].side === chosenPiece.side) {
                                        return "Own Piece is Obstruction";
                                    } else {
                                        if (isSpecialRuleBroken()) {
                                            return "Cannon Must Stay in King's Column Because King Must Not Directly Face King";
                                        }
                                        return "Cannon Can Only Take Piece Having Jumped Only One Middle Piece";
                                    }
                                } else {
                                    if (isSpecialRuleBroken()) {
                                        return "Cannon Must Stay in King's Column Because King Must Not Directly Face King";
                                    }
                                    return "Cannon Can Only Jump Middle Piece When Taking Piece";
                                }
                            }
                        } else if (piecesAllMatrix[chosenPiece.row][i]) {
                            // Middle Piece Allowing Cannon to Jump Has Been Found
                            if (chosenDestinationColumn === i) {
                                if (piecesAllMatrix[chosenPiece.row][i].side === chosenPiece.side) {
                                    return "Own Piece is Obstruction";
                                } else {
                                    return "Cannon Must Only Take Piece Having Jumped Middle Piece";
                                }
                            }
                            leftMiddlePieceFound = true;
                        }
                    }
                }
                if (isSpecialRuleBroken()) {
                    return "Cannon Must Stay in King's Column Because King Must Not Directly Face King";
                }
            }
        } else if (chosenPiece.type === "Rook") {
            if (chosenDestinationRow !== chosenPiece.row &&
                chosenDestinationColumn !== chosenPiece.column) {
                return "Rook Can Only Move Orthogonally";
            } else if (chosenDestinationColumn === chosenPiece.column) {
                if (chosenDestinationRow > chosenPiece.row) {
                    for (let i = chosenPiece.row + 1; i < 10; i++) {
                        if (piecesAllMatrix[i][chosenPiece.column]) {
                            if (chosenDestinationRow === i) {
                                // Closest Piece in Rook's Vertical Path Being the
                                // Chosen Destination in Illegal Move Must Be Own Piece
                                return "Own Piece is Obstruction";
                            } else {
                                return "Rook Cannot Jump";
                            }
                        }
                    }
                } else {
                    for (let i = chosenPiece.row - 1; i >= 0; i--) {
                        if (piecesAllMatrix[i][chosenPiece.column]) {
                            if (chosenDestinationRow === i) {
                                // Closest Piece in Rook's Vertical Path Being the
                                // Chosen Destination in Illegal Move Must Be Own Piece
                                return "Own Piece is Obstruction";
                            } else {
                                return "Rook Cannot Jump";
                            }
                        }
                    }
                }
            } else if (chosenDestinationRow === chosenPiece.row) {
                if (chosenDestinationColumn > chosenPiece.column) {
                    for (let i = chosenPiece.column + 1; i < 9; i++) {
                        if (piecesAllMatrix[chosenPiece.row][i]) {
                            if (chosenDestinationColumn === i) {
                                // Closest Piece in Rook's Horizontal Path Being the
                                // Chosen Destination in Illegal Move Must Break Special Rule/Be Own Piece
                                if (piecesAllMatrix[chosenPiece.row][i].side === chosenPiece.side) {
                                    return "Own Piece is Obstruction";
                                } else {
                                    // Rook's Horizontal Move Clears Path of King's Column
                                    // Leading to King Directly Facing King
                                    return "Rook Must Stay in King's Column Because King Must Not Directly Face King";
                                }
                            } else {
                                if (isSpecialRuleBroken()) {
                                    return "Rook Must Stay in King's Column Because King Must Not Directly Face King";
                                } else {
                                    return "Rook Cannot Jump";
                                }
                            }
                        }
                    }
                } else {
                    for (let i = chosenPiece.column - 1; i >= 0; i--) {
                        if (piecesAllMatrix[chosenPiece.row][i]) {
                            if (chosenDestinationColumn === i) {
                                // Closest Piece in Rook's Horizontal Path Being the
                                // Chosen Destination in Illegal Move Must Break Special Rule/Be Own Piece
                                if (piecesAllMatrix[chosenPiece.row][i].side === chosenPiece.side) {
                                    return "Own Piece is Obstruction";
                                } else {
                                    // Rook's Horizontal Move Clears Path of King's Column
                                    // Leading to King Directly Facing King
                                    return "Rook Must Stay in King's Column Because King Must Not Directly Face King";
                                }
                            } else {
                                if (isSpecialRuleBroken()) {
                                    return "Rook Must Stay in King's Column Because King Must Not Directly Face King";
                                } else {
                                    return "Rook Cannot Jump";
                                }
                            }
                        }
                    }
                }
                if (isSpecialRuleBroken()) {
                    return "Rook Must Stay in King's Column Because King Must Not Directly Face King";
                }
            }
        } else if (chosenPiece.type === "Knight") {
            for (let i = 0; i < 4; i++) {
                let rowA = chosenPiece.row + 2*(-1)**i;
                let columnA = chosenPiece.column + 1*(-1)**Math.ceil(i/2);
                if (rowA >= 0 && rowA < 10 && columnA >= 0 && columnA < 9) {
                    if (chosenDestinationRow === rowA &&
                        chosenDestinationColumn === columnA) {
                        if (piecesAllMatrix[chosenPiece.row + (-1)**i][chosenPiece.column]) {
                            return "Piece in Knight's Path is Obstructing \"Knight's Leg\"/蹩马腿";
                        } else {
                            // Computed Unobstructed RowA/ColumnA Inside Board Boundary Being the
                            // Chosen Destination in Illegal Move Must Break Special Rule/Contain Own Piece
                            if (piecesAllMatrix[rowA][columnA] &&
                                piecesAllMatrix[rowA][columnA].side === chosenPiece.side) {
                                return "Own Piece is Obstruction";
                            } else {
                                return "Knight Must Stay in King's Column Because King Must Not Directly Face King";
                            }
                        }
                    }
                }
                let rowB = chosenPiece.row + 1*(-1)**i;
                let columnB = chosenPiece.column + 2*(-1)**Math.ceil(i/2);
                if (rowB >= 0 && rowB < 10 && columnB >= 0 && columnB < 9) {
                    if (chosenDestinationRow === rowB &&
                        chosenDestinationColumn === columnB) {
                        if (piecesAllMatrix[chosenPiece.row][chosenPiece.column + (-1)**Math.ceil(i/2)]) {
                            return "Piece in Knight's Path is Obstructing \"Knight's Leg\"/蹩马腿";
                        } else {
                            // Computed Unobstructed RowB/ColumnB Inside Board Boundary Being the
                            // Chosen Destination in Illegal Move Must Break Special Rule/Contain Own Piece
                            if (piecesAllMatrix[rowB][columnB] &&
                                piecesAllMatrix[rowB][columnB].side === chosenPiece.side) {
                                return "Own Piece is Obstruction";
                            } else {
                                return "Knight Must Stay in King's Column Because King Must Not Directly Face King";
                            }
                        }
                    }
                }
            }
            return "Knight Can Only Move in \"日\"/Sun Shape";
        } else if (chosenPiece.type === "Bishop") {
            // Keeping my chosen piece's position relative to the river in mind,
            // Since the Elephant must always stay on its own side
            for (let i = 0; i < 4; i++) {
                let row = chosenPiece.row + 2*(-1)**i;
                let column = chosenPiece.column + 2*(-1)**Math.ceil(i/2);
                if (row >= 0 && row < 10 && column >= 0 && column < 9) {
                    if (chosenDestinationRow === row &&
                        chosenDestinationColumn === column) {
                        if ((chosenPiece.side === "Dad" && row > 4) ||
                        (chosenPiece.side === "Me" && row < 5)) {
                            return "Elephant Must Always Stay on Its Own Side of the River";
                        } else if (piecesAllMatrix[chosenPiece.row + (-1)**i][chosenPiece.column + (-1)**Math.ceil(i/2)]) {
                            return "Piece in Elephant's Path is \"Blocking the Elephant's Eye\"/塞象眼";
                        } else {
                            // Computed Unobstructed Row/Column Inside Board Boundary
                            // On Elephant's Own Side of the River Being the
                            // Chosen Destination in Illegal Move Must Break Special Rule/Contain Own Piece
                            if (piecesAllMatrix[row][column] &&
                                piecesAllMatrix[row][column].side === chosenPiece.side) {
                                return "Own Piece is Obstruction";
                            } else {
                                return "Elephant Must Stay in King's Column Because King Must Not Directly Face King";
                            }
                        }
                    }
                }
            }
            return "Elephant Can Only Move in \"田\"/Field Shape";
        } else if (chosenPiece.type === "Advisor") {
            // Keeping the boundary of the "palace" where the Advisor is confined in mind
            for (let i = 0; i < 4; i++) {
                let row = chosenPiece.row + (-1)**i;
                let column = chosenPiece.column + (-1)**Math.ceil(i/2);
                if (chosenDestinationRow === row &&
                    chosenDestinationColumn === column) {
                    if (chosenPiece.side === "Dad") {
                        if (chosenPiece.row === 1 ||
                            // Chosen Piece is in Central Space in the "Palace" =>
                            // Computed Row/Column Being the Chosen Destination in
                            // Illegal Move Must Break Special Rule/Contain Own Piece
                            (chosenDestinationRow === 1 &&
                            chosenDestinationColumn === 4)
                            // Central Space in the "Palace" Being the Chosen Destination in
                            // Illegal Move Must Break Special Rule/Contain Own Piece
                            ) {
                            if (piecesAllMatrix[row][column] &&
                                piecesAllMatrix[row][column].side === chosenPiece.side) {
                                return "Own Piece is Obstruction";
                            } else {
                                return "Advisor Must Stay in King's Column Because King Must Not Directly Face King";
                            }
                        } else {
                            // Chosen Piece That is Not in the Central Space in the "Palace" and
                            // Computed Non-Central Row/Column Being the Chosen Destination in Illegal Move =>
                            // Chosen Destination Must Not Be Inside the "Palace" Boundary
                            return "Advisor Must Always Stay in the \"Palace\"";
                        }
                    } else {
                        if (chosenPiece.row === 8 ||
                            // Chosen Piece is in Central Space in the "Palace" =>
                            // Computed Row/Column Being the Chosen Destination in
                            // Illegal Move Must Break Special Rule/Contain Own Piece
                            (chosenDestinationRow === 8 &&
                            chosenDestinationColumn === 4)
                            // Central Space in the "Palace" Being the Chosen Destination in
                            // Illegal Move Must Break Special Rule/Contain Own Piece
                            ) {
                            if (piecesAllMatrix[row][column] &&
                                piecesAllMatrix[row][column].side === chosenPiece.side) {
                                return "Own Piece is Obstruction";
                            } else {
                                return "Advisor Must Stay in King's Column Because King Must Not Directly Face King";
                            }
                        } else {
                            // Chosen Piece That is Not in the Central Space in the "Palace" and
                            // Computed Non-Central Row/Column Being the Chosen Destination in Illegal Move =>
                            // Chosen Destination Must Not Be Inside the "Palace" Boundary
                            return "Advisor Must Always Stay in the \"Palace\"";
                        }
                    }
                }
            }
            return "Advisor Can Only Move One Step Diagonally";
        } else if (chosenPiece.type === "King") {
            // Keeping the boundary of the "palace" where the King is confined in mind
            for (let i = 0; i < 4; i++) {
                let row = chosenPiece.row + (i % 2)*(-1)**Math.ceil(i/2);
                let column = chosenPiece.column + ((i + 1) % 2)*(-1)**Math.ceil(i/2);
                if (chosenDestinationRow === row &&
                    chosenDestinationColumn === column) {
                    if (((chosenPiece.side === "Dad" && row >= 0 && row < 3) ||
                    (chosenPiece.side === "Me" && row > 6 && row < 10)) &&
                    column > 2 && column < 6) {
                        // Computed Row/Column Inside the "Palace" Boundary Being the
                        // Chosen Destination in Illegal Move Must Break Special Rule/Contain Own Piece
                        if (piecesAllMatrix[row][column] &&
                            piecesAllMatrix[row][column].side === chosenPiece.side) {
                            return "Own Piece is Obstruction";
                        } else {
                            return "King Must Not Directly Face King";
                        }
                    } else {
                        return "King Must Always Stay in the \"Palace\"";
                    }
                }
            }
            return "King Can Only Move One Step Orthogonally";
        }

        // Special Rule Check on Horizontal/Diagonal Move Clearing the King's Column:
        function isSpecialRuleBroken() {
            // Pull Dad's/my King's column to check for situation of King facing King,
            // Then their only middle piece's horizontal/diagonal move
            // Opening up the board and leading to King directly facing King
            let DadKing = null;
            let myKing = null;
            for (let i = 0; i < piecesAllMatrix.length; i++) {
                if (i > 2 && i < 7) {
                    // Row Does Not Intersect with Dad's/My "Palace"
                    continue;
                }
                for (let j = 3; j < 6; j++) {
                    if (piecesAllMatrix[i][j] && piecesAllMatrix[i][j].type === "King") {
                        if (piecesAllMatrix[i][j].side === "Dad") {
                            DadKing = piecesAllMatrix[i][j];
                        } else {
                            myKing = piecesAllMatrix[i][j];
                        }
                        break;
                    }
                }
            }
            // Does King Face King/Is Piece in the Middle of King's Column?
            if (chosenPiece.column === DadKing.column && DadKing.column === myKing.column &&
                chosenPiece.row > DadKing.row && chosenPiece.row < myKing.row &&
                chosenPiece.column !== chosenDestinationColumn) {
                // Piece in King's column is making horizontal/diagonal move from King's column =>
                // Check on piece being the only middle piece in the King's column
                let middlePieceCount = 0;
                for (let i = DadKing.row + 1; i < myKing.row; i++) {
                    if (piecesAllMatrix[i][DadKing.column]) {
                        middlePieceCount++;
                    }
                    if (middlePieceCount > 1) {
                        break;
                    }
                }
                if (middlePieceCount === 1) {
                    // Chosen piece is the only middle piece between Dad's King and my King =>
                    // Piece must stay in the King's column, so return the Special Rule in rule explanation
                    return true;
                }
            }
            return false;
        }
    }
};
