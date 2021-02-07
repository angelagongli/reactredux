const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Move.findAll({
            order: [['createdAt', 'DESC']]
        }).then(dbMovesAll => {
            res.json(dbMovesAll);
        });
    },
    findAllByGame: function(req, res) {
        db.Move.findAll({
            where: { GameId: req.params.id },
            order: [['createdAt', 'DESC']]
        }).then(dbMovesInGameAll => {
            res.json(dbMovesInGameAll);
        });
    },
    create: function(req, res) {
        db.Move.create(req.body)
        .then(dbMove => {
            res.json(dbMove);
        });
    }
}
