module.exports = function(sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
        // We can name the game, e.g. "Dad plays me with handicap on Saturday":
        name: DataTypes.STRING,
        startDate: DataTypes.DATE,
        isOngoing: DataTypes.BOOLEAN,
        winner: DataTypes.ENUM("Dad", "Me"),
        loser: DataTypes.ENUM("Dad", "Me")
    });

    Game.associate = function(models) {
        // Game essentially consists of the set of its Moves
        Game.hasMany(models.Move, {
            onDelete: "cascade"
        });
    };

    return Game;
};
