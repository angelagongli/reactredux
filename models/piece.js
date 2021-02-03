module.exports = function(sequelize, DataTypes) {
    const Piece = sequelize.define("Piece", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        side: {
            type: DataTypes.ENUM("Dad", "Me"),
            allowNull: false
        },
        row: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        column: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isTaken: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
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
    return Piece;
};
