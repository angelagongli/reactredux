module.exports = function(sequelize, DataTypes) {
    const Piece = sequelize.define("Piece", {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        side: DataTypes.ENUM("Dad", "Me"),
        row: DataTypes.INTEGER,
        column: DataTypes.INTEGER,
        isTaken: DataTypes.BOOLEAN
    });
    return Piece;
};
