export default (sequelize, DataTypes) => {
  const Organisation = sequelize.define('organisation', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require('sequelize').UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'The name can only contain letters and numbers',
        },
      },
    },
    org_nr: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          args: true,
          msg: 'The organisation number is required',
        },
        isNumeric: {
          args: true,
          msg: 'The organisation number can only contain numbers',
        },
        len: {
          args: [10, 13],
          msg: 'Not a valid organisation number',
        },
      },
    },
  });

  Organisation.associate = (models) => {
    Organisation.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return Organisation;
};
