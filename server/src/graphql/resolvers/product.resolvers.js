import { formatErrors } from '../../utils/formatErrors';

export default {
  Product: {
    currency: async ({ currencyId }, args, { db }) => {
      const currency = await db.Currency.findOne({
        where: { id: currencyId },
      });

      return currency;
    },
    organisation: async ({ organisationId }, args, { db }) => {
      const organisation = await db.Organisation.findOne({
        where: { id: organisationId },
      });

      return organisation;
    },

  },

  Query: {
    getAllProducts: async (_, args, { db }) => {
      const allProducts = await db.Product.findAll();

      return allProducts;
    },
    getProduct: async (_, { id }, { db }) => {
      const product = await db.Product.findOne({ where: { id } });

      return product;
    },
    getProductsByCategory: async (_, { category, offset = 0 }, { db }) => {
      try {
        const { count, rows } = await db.Product.findAndCountAll({
          where: { categories: { [db.op.overlap]: category } },
          order: [['createdAt', 'DESC']],
          limit: 15,
          offset,
        });

        return {
          products: rows,
          total: count,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    addProduct: async (_, args, { db, user }) => {
      try {
        /* const currencyData = await db.Currency.findOne({
          where: { id: args.currencyId },
        }); */

        /* Ta bort när vi har tillgång till currencies i klienten */
        const currencyData = await db.Currency.findOne();

        const userData = await db.User.findOne({
          where: { id: user.id },
          include: db.Organisation,
        });

        if (!userData.organisation) {
          return {
            success: false,
            errors: [
              {
                path: 'toast-error',
                message:
                  'You need to belong to an organization to create a product.',
              },
            ],
          };
        }

        if (!currencyData) {
          return {
            success: false,
            errors: [
              {
                path: 'toast-error',
                message: 'You need to select a valid currency.',
              },
            ],
          };
        }

        const product = await db.Product.create({
          ...args,
          organisationId: userData.organisation.id,
          currencyId: currencyData.id,
        });


        return {
          success: product ? true : false,
          product: product ? product.dataValues : null
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
    updateProduct: async (_, args, { db }) => {
      try {
        const updatedProduct = await db.Product.update(
          { ...args },
          {
            where: { id: args.id },
            returning: true,
            plain: true,
          }
        );

        return {
          success: true,
          product: updatedProduct[1].dataValues,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },

    removeProduct: async (_, { id }, { db }) => {
      try {
        const product = await db.Product.destroy({ where: { id: id } });

        return {
          success: product ? true : false,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },

    // THIS FUNCTION IS ONLY FOR TESTING
    _removeAllProducts: async (_, args, { db }) => {
      try {
        const product = await db.Product.destroy({ where: {} });

        return {
          success: product ? true : false,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};
