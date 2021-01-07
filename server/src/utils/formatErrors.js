import { ValidationError } from 'sequelize';
import _ from 'lodash';

export const formatErrors = (e) => {
  if (e instanceof ValidationError) {
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};
