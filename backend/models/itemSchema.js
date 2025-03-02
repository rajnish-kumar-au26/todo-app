module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  return Item;
};
