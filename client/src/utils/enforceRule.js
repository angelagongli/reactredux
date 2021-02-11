export default {
    makeLegalMoveObject: function(piece, piecesAll) {
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
                legalMoveObject[piece.row + 1] = [piece.column];
                if (piece.row > 4) {
                    // Pawn Has Crossed the River
                    legalMoveObject[piece.row] = [piece.column + 1, piece.column - 1];
                }
            } else {
                legalMoveObject[piece.row - 1] = [piece.column];
                if (piece.row < 5) {
                    // Pawn Has Crossed the River
                    legalMoveObject[piece.row] = [piece.column + 1, piece.column - 1];
                }
            }
        } else if (piece.type === "Cannon") {
            // First determine the middle piece required for the cannon to jump,
            // Then the legal move/piece to take based on the cannon's jump:

            // Rest of Cannon's Movement is Based on Rook's Movement
        } else if (piece.type === "Rook") {

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
            if (piece.side === "Dad") {
                // Check palace/board boundary
                // Check obstruction
                if (piece.row === 1) {
                    legalMoveObject[0] = [3, 5];
                    legalMoveObject[2] = [3, 5];
                } else {
                    legalMoveObject[1] = [4];
                }
            } else {
                if (piece.row === 8) {
                    legalMoveObject[7] = [3, 5];
                    legalMoveObject[9] = [3, 5];
                } else {
                    legalMoveObject[8] = [4];
                }
            }
        } else if (piece.type === "King") {
            // Keeping the boundary of the "palace" where the King is confined in mind
        }

        // Special Rule:
        // King must not directly face King

        // Rule Governing Endgame:
        // Cap on Perpetual Chasing/Checking

        return legalMoveObject;
    },
    verifyMoveLegality: function(chosenPiece, chosenDestination, piecesAll) {
        // Let the entire rule logic of verifyMoveLegality depend on the legalMoveObject
        // Determined in makeLegalMoveObject above
        let legalMoveObject = this.makeLegalMoveObject(chosenPiece, piecesAll);
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
