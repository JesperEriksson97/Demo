import { formatErrors } from '../../utils/formatErrors';

export default {
  Address: {},

  Mutation: {
    addAddress: async (_, args, { db, user }) => {
      try {
        const addressExists = await db.Address.findOne({
          where: { userId: user.id },
        });

        if (addressExists) {
          return {
            success: false,
            errors: [
              {
                path: 'address',
                message: 'You already have an address',
              },
            ],
          };
        }

        const address = await db.Address.create({ ...args, userId: user.id });

        return {
          success: address ? true : false,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
    addOrgAddress: async (_, args, { db, user }) => {
      try {
        const userData = await db.User.findOne({
          where: { id: user.id },
          include: db.Organisation,
        });

        const address = await db.Address.create({
          ...args,
          organisationId: userData.organisation.id,
        });

        return {
          success: address ? true : false,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
    updateAddress: async (_, args, { db, user }) => {
      try {
        let currentAddress = await db.Address.findOne({
          where: { userId: user.id },
        });

        currentAddress = await currentAddress.update({ ...args });

        return {
          success: currentAddress ? true : false,
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
