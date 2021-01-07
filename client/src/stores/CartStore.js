import { types, getSnapshot } from 'mobx-state-tree';
import { values } from 'mobx';
import { MAX_AMOUNT } from '../config/constants';

export const CartEntry = types
  .model('CartEntry', {
    id: types.optional(types.string, () => Math.random()),
    name: types.string,
    producer: types.optional(types.string, () => ''),
    amount: types.number,
    price: types.number,
    images: types.array(types.string),
    categories: types.array(types.string),
    format: types.string,
  })
  .actions((self) => ({
    incrementAmount() {
      self.amount += self.amount < MAX_AMOUNT ? 1 : 0;
    },
    decrementAmount() {
      self.amount -= self.amount > 1 ? 1 : 0;
    },
    changeAmount(amount) {
      if (Number(amount) && amount > 0 && amount <= MAX_AMOUNT) {
        self.amount = amount;
      }
    },
  }));

export const CartStore = types
  .model('CartStore', {
    products: types.array(CartEntry),
    delivery: types.optional(types.string, 'pickup'),
  })
  .views((self) => ({
    getProducts() {
      return values(self.products);
    },
    getPrice() {
      return self.products.reduce(
        (sum, product) => sum + product.price * product.amount,
        0
      );
    },
    purchase() {
      return {
        products: self.getProducts(),
        price: self.getPrice(),
        delivery: self.delivery,
      };
    },
  }))
  .actions((self) => ({
    addProduct(product) {
      self.products.push(product);
      getSnapshot(self.products);
    },
    removeProduct(productToRemove) {
      self.products = self.products.filter(
        (product) => productToRemove.id !== product.id
      );
      getSnapshot(self.products);
    },
    changeDelivery(deliveryMethod) {
      self.delivery = deliveryMethod;
    },
    emptyCart() {
      self.products = [];
      localStorage.removeItem('cart');
    },
  }));
