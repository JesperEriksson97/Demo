export default (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: require('sequelize').UUIDV4,
    },
    street: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'The street needs to be between 1 to 255 characters long.',
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 255],
          msg: 'The city needs to be between 1 to 255 characters long.',
        },
      },
    },
    zip: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^[1-9]\d{2} ?\d{2}$/,
          msg: 'The zip has to be in the format 1XX XX to 9XX XX',
        },
      },
    },
  });

  Address.associate = (models) => {
    Address.belongsTo(models.Organisation, {
      foreignKey: {
        name: 'organisationId',
        field: 'organisation_id',
      },
    });
    Address.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return Address;
};
