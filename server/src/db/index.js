import Sequelize from 'sequelize';
import envConfigs from '../config/db';

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

import User from './models/user';
import Organisation from './models/organisation';
import Address from './models/address';
import Product from './models/product';
import Currency from './models/currency';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  User: User(sequelize, Sequelize),
  Organisation: Organisation(sequelize, Sequelize),
  Address: Address(sequelize, Sequelize),
  Product: Product(sequelize, Sequelize),
  Currency: Currency(sequelize, Sequelize),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.op = Sequelize.Op;

export default db;
