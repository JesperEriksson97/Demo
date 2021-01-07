import { tryLogin } from '../../auth/jwt';
import { formatErrors } from '../../utils/formatErrors';
import bcrypt from 'bcrypt';

export default {
  User: {
    address: async ({ id }, args, { db }) => {
      return db.Address.findOne({ where: { userId: id } });
    },
    organisation: async ({ id }, args, { db }) => {
      return db.Organisation.findOne({ where: { userId: id } });
    },
  },

  Query: {
    user: async (_, args, { db }) => {
      const user = await db.User.findOne();

      return user;
    },
    me: async (_, args, { db, user }) => {
      if (user) {
        return db.User.findOne({ where: { id: user.id } });
      }
    },
  },

  Mutation: {
    signUp: async (_, args, { db }) => {
      try {
        /* args = email, username och password */
        /* db = Kommer från src/index.js -> apolloServer -> context */
        const user = await db.User.create({ ...args });

        return {
          success: true,
          user,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
    signIn: async (_, { email, password }, { db }) => {
      return tryLogin(email, password, db);
    },
    updateUser: async (_, { currentPassword, ...rest }, { db, user }) => {
      try {
        let currentUser = await db.User.findOne({ where: { id: user.id } });

        const valid = await bcrypt.compare(
          currentPassword,
          currentUser.password
        );

        if (!valid) {
          return {
            success: false,
            errors: [{ path: 'password', message: 'Password is not correct' }],
          };
        }

        currentUser = await currentUser.update({ ...rest });

        return {
          success: true,
          user: currentUser,
        };
      } catch (err) {
        return {
          success: false,
          errors: formatErrors(err),
        };
      }
    },
    updatePassword: async (
      _,
      { currentPassword, newPassword },
      { db, user }
    ) => {
      try {
        let currentUser = await db.User.findOne({ where: { id: user.id } });

        const valid = await bcrypt.compare(
          currentPassword,
          currentUser.password
        );

        if (!valid) {
          return {
            success: false,
            errors: [{ path: 'password', message: 'Password is not correct' }],
          };
        }

        currentUser = await currentUser.update({ password: newPassword });

        return {
          success: true,
          user: currentUser,
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
