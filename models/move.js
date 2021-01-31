module.exports = function(sequelize, DataTypes) {
    const Move = sequelize.define("Move", {
        pieceID: DataTypes.INTEGER,
        // (Mover is technically contained in pieceID:)
        mover: DataTypes.ENUM("Dad", "Me"),
        startRow: DataTypes.INTEGER,
        startColumn: DataTypes.INTEGER,
        destinationRow: DataTypes.INTEGER,
        destinationColumn: DataTypes.INTEGER,
        pieceTaken: DataTypes.BOOLEAN,
        pieceTakenID: DataTypes.INTEGER
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
