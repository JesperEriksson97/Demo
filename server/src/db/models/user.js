import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require('sequelize').UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The username can only contain letters and numbers',
          },
          len: {
            args: [3, 25],
            msg: 'The username needs to be between 3 to 25 characters long.',
          },
        },
      },
      firstname: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[A-ZÅÄÖ.-]*$/i,
            msg:
              'First names can only contain Swedish letters, dots and dashes',
          },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /^[A-ZÅÄÖ .-]*$/i,
            msg:
              'Last names can only contain Swedish letters, spaces, dots and dashes',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email.',
          },
        },
        set(value) {
          this.setDataValue('email', value.toLowerCase());
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [7, 255],
            msg: 'The password needs to be between 7 and 100 characters long',
          },
        },
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'producer', 'admin'],
        defaultValue: 'user',
        allowNull: false,
      },
      reset_psw_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reset_psw_exp: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.get('password'), 12);

          user.password = hashedPassword;
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const hashedPassword = await bcrypt.hash(user.get('password'), 12);

            user.password = hashedPassword;
          }
        },
      },
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Organisation);
  };

  return User;
};
