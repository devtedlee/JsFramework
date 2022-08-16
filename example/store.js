import { Store } from '../lib/Store.js';

export const store = new Store({
  state: {
    filter: 0,
    items: [
      {
        seq: 1,
        contents: 'item1',
        active: false,
      },
      {
        seq: 2,
        contents: 'item2',
        active: true,
      },
    ],
  },

  mutations: {
    setItems(state, payload) {
      state.items = payload;
    },

    setFilter(state, payload) {
      state.filter = payload;
    },
  },
});
