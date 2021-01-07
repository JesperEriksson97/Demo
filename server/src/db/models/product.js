let slugify = require('slugify');

export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: require('sequelize').UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 30],
            msg: 'The name can only be between 2 to 30 characters long.',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 50],
            msg: 'The slug can only be between 2 to 50 characters long.',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [2, 255],
            msg:
              'The description can only be between 2 to 255 characters long.',
          },
        },
      },
      categories: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      stock: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            args: true,
            msg: 'The value can only contain a number',
          },
        },
      },
      format: {
        type: DataTypes.ENUM,
        values: ['st', 'kg', 'l'],
        defaultValue: 'st',
        allowNull: false,
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            args: true,
            msg: 'The value can only contain a number',
          },
        },
      },
    },
    {
      hooks: {
        afterValidate: async (product) => {
          const slugName = slugify(product.name, { lower: true });
          product.slug = slugName;
        },
      },
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Organisation, {
      foreignKey: {
        name: 'organisationId',
        field: 'organisation_id',
      },
    });
    Product.belongsTo(models.Currency, {
      foreignKey: {
        name: 'currencyId',
        field: 'currency_id',
      },
    });
  };

  return Product;
};
