import { rule, shield, and, or, not } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'admin';
  }
);

const isUser = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'user';
  }
);

const isProducer = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'producer';
  }
);

// Permissions
export const permissions = shield({
  Query: {
    getCurrencies: isAuthenticated,
  },
  Mutation: {
    addProduct: and(isAuthenticated, or(isProducer)),
    addOrganisation: isAuthenticated,
  },
});
