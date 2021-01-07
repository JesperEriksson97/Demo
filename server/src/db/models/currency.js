export default (sequelize, DataTypes) => {
  const Currency = sequelize.define('currency', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require('sequelize').UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'The currency name can only contain of letters',
        },
      },
    },
    multiplier: {
      type: DataTypes.FLOAT,
    },
  });

  return Currency;
};
