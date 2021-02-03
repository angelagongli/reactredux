module.exports = function(sequelize, DataTypes) {
    const Game = sequelize.define("Game", {
        // We can name the game, e.g. "Dad plays me with handicap on Saturday":
        name: DataTypes.STRING,
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        isOngoing: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        winner: DataTypes.ENUM("Dad", "Me"),
        loser: DataTypes.ENUM("Dad", "Me"),
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn('NOW')
        }
    });

    Game.associate = function(models) {
        // Game essentially consists of the set of its Moves
        Game.hasMany(models.Move, {
            onDelete: "cascade"
        });
    };

    return Game;
};
