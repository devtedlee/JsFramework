import { createStore } from '../lib/ReduxStore.js';
import { VuexStore } from '../lib/VuexStore.js';

export const vuexStore = new VuexStore({
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

// redux state section
export const initState = {
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
};

export const SET_ITEMS = 'SET_ITEMS';
export const SET_FILTER = 'SET_FILTER';

export const reduxStore = createStore((state = initState, action = {}) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
});

export const setItems = (payload) => ({ type: SET_ITEMS, payload });
export const setFilter = (payload) => ({ type: SET_FILTER, payload });
