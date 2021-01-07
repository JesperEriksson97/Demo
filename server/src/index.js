import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';

import typeDefs from './graphql/types';
import resolvers from './graphql/resolvers';
import cors from 'cors';
import db from './db';
import checkAuth from './auth/checkAuth';
import { permissions } from './utils/permissions';

const createServer = async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    uploads: false,
  });

  const app = express();

  app.use('/static', express.static('public'));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../server/build')));
    app.use('*', express.static(path.join(__dirname, '../../server/build')));
  }

  app.use(cors('*'));
  app.use(checkAuth);

  const apolloServer = new ApolloServer({
    schema: applyMiddleware(schema, permissions),
    introspection: process.env.NODE_ENV === 'development',

    context: ({ req, res }) => ({
      db,
      url: req ? `${req.protocol}://${req.get('host')}` : '',
      user: req.user,
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/',
  });

  const PORT = process.env.PORT || 3000;

  db.sequelize.sync().then(() =>
    app.listen(PORT, (err) => {
      if (err) {
        console.error(err);
      }

      console.log(`GraphQL server running on port ${PORT}.`);
    })
  );
};

createServer();
