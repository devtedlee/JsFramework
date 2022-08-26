import Component from '../../lib/component.js';
import Items from './components/Items.js';
import ItemFilter from './components/ItemFilter.js';
import ItemAppender from './components/ItemAppender.js';
import { vuexStore, reduxStore, setItems, setFilter } from './store.js';

export default class App extends Component {
  template() {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  mounted() {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector(
      '[data-component="item-appender"]'
    );
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector(
      '[data-component="item-filter"]'
    );

    new ItemAppender($itemAppender, { addItem: addItem.bind(this) });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, { filterItem: filterItem.bind(this) });
  }

  get filteredItems() {
    // const { filter, items } = vuexStore.state;
    const { filter, items } = reduxStore.getState();
    return items.filter(
      ({ active }) =>
        (filter === 1 && active) || (filter === 2 && !active) || filter === 0
    );
  }

  addItem(contents) {
    // const { items } = vuexStore.state;
    const { items } = reduxStore.getState();
    const seq = Math.max(0, ...items.map(({ seq: s }) => s)) + 1;
    const active = false;
    // vuexStore.commit('setItems', [...items, { seq, contents, active }]);
    reduxStore.dispatch(setItems([...items, { seq, contents, active }]));
  }

  deleteItem(seq) {
    // const items = [...vuexStore.state.items];
    const items = [...reduxStore.getState().items];
    items.splice(
      items.findIndex((i) => i.seq === seq),
      1
    );
    // vuexStore.commit('setItems', items);
    reduxStore.dispatch(setItems(items));
  }

  toggleItem(seq) {
    // const items = [...vuexStore.state.items];
    const items = [...reduxStore.getState().items];
    const index = items.findIndex(({ seq: itemSeq }) => itemSeq === seq);
    items[index].active = !items[index].active;
    // vuexStore.commit('setItems', items);
    reduxStore.dispatch(setItems(items));
  }

  filterItem(filter) {
    // vuexStore.commit('setFilter', filter);
    reduxStore.dispatch(setFilter(filter));
  }
}
