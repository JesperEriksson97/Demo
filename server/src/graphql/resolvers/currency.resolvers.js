import { formatErrors } from '../../utils/formatErrors';

export default {
  Currency: {},

  Query: {
    getCurrencyById: async (_, { id }, { db }) => {
      const currency = await db.Currency.findOne({ where: { id } });

      return currency;
    },
    getCurrencies: async (_, args, { db }) => {
      return db.Currency.findAll();
    },
  },

  Mutation: {
    addCurrency: async (_, args, { db }) => {
      try {
        const currency = await db.Currency.create({ ...args });

        return {
          success: currency ? true : false,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
    updateCurrency: async (_, args, { db }) => {
      try {
        const updatedCurrency = await db.Currency.update(
          { ...args },
          {
            where: { id: args.id },
            returning: true,
            plain: true,
          }
        );

        return {
          success: true,
          currency: updatedCurrency[1].dataValues,
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
