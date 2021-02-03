module.exports = function(sequelize, DataTypes) {
    const Move = sequelize.define("Move", {
        pieceID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // (Mover is technically contained in pieceID:)
        mover: DataTypes.ENUM("Dad", "Me"),
        startRow: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startColumn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        destinationRow: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        destinationColumn: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pieceTaken: DataTypes.BOOLEAN,
        pieceTakenID: DataTypes.INTEGER,
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

    Move.associate = function(models) {
        // Move cannot be made without its Game
        Move.belongsTo(models.Game, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Move;
};
