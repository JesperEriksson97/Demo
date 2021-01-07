import { categories } from '../../config/categories';

export default {
  Category: {},
  Query: {
    categories: async () => categories,
  },
};
