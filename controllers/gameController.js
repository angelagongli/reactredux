const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Game.findAll({
            order: [['createdAt', 'DESC']]
        }).then(dbGamesAll => {
            res.json(dbGamesAll);
        });
    },
    create: function(req, res) {
        db.Game.create(req.body)
        .then(dbGame => {
            res.json(dbGame);
        });
    },
    update: function(req, res) {
        db.Game.update(req.body, {
            where: { id: req.params.id }
        }).then(dbGame => {
            res.json(dbGame);
        }).catch(err => {
            res.status(422).json(err);
        });
    }
}
