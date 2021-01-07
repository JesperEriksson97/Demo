import { onSnapshot, types } from 'mobx-state-tree';
import { CartStore } from './CartStore';

const RootModel = types.model({
  cart: CartStore,
});

let initialState = { cart: { products: [] } };

if (localStorage.getItem('cart')) {
  const json = JSON.parse(localStorage.getItem('cart'));
  if (CartStore.is(json)) initialState = json;
}

export const rootStore = RootModel.create(initialState);

onSnapshot(rootStore, (snapshot) =>
  localStorage.setItem('cart', JSON.stringify(snapshot))
);
