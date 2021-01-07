import { formatErrors } from '../../utils/formatErrors';

export default {
  Organisation: {
    address: async ({ id }, args, { db }) => {
      const address = await db.Address.findAll({
        where: { organisationId: id },
      });

      return address;
    },
    products: async ({ id }, args, { db }) => {
      const products = await db.Product.findAll({
        where: { organisationId: id },
      });

      return products;
    },
  },

  Mutation: {
    addOrganisation: async (_, args, { db, user }) => {
      try {
        const userData = await db.User.findOne({
          where: { id: user.id },
          include: db.Organisation,
        });

        /* TODO: Check if org is active to prevent users from creating products after adding a org */
        if (userData.organisation) {
          return {
            success: false,
            errors: [
              {
                path: 'organisation',
                message: 'You already own an organization',
              },
            ],
          };
        }

        const organisation = await db.Organisation.create({
          ...args,
          userId: user.id,
        });

        await userData.update({ role: 'producer' });

        return {
          success: organisation ? true : false,
        };
      } catch (err) {
        console.log(err);
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};
