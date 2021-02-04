const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Piece.findAll({
            // Filter piecesAll in Board.js, keeping your ability to pull piecesAll
            // where isTaken is true as well in Board.js:
            // where: { isTaken: false },
            order: [['row'], ['column']]
        }).then(dbPiecesAll => {
            res.json(dbPiecesAll);
        });
    },
    update: function(req, res) {
        db.Piece.update(req.body, {
            where: { id: req.params.id }
        }).then(dbPiece => {
            res.json(dbPiece);
        }).catch(err => {
            res.status(422).json(err);
        });
    },
    truncateTable: function(req, res) {
        db.Piece.destroy({
            truncate: true
        }).then(data => {
            res.json(data);
        });
    }
}
