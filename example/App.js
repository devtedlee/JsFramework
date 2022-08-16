import Component from '../../lib/component.js';
import Items from './components/Items.js';
import ItemFilter from './components/ItemFilter.js';
import ItemAppender from './components/ItemAppender.js';
import { store } from './store.js';

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
    const { filter, items } = store.state;
    return items.filter(
      ({ active }) =>
        (filter === 1 && active) || (filter === 2 && !active) || filter === 0
    );
  }

  addItem(contents) {
    const { items } = store.state;
    const seq = Math.max(0, ...items.map(({ seq: s }) => s)) + 1;
    const active = false;
    store.commit('setItems', [...items, { seq, contents, active }]);
  }

  deleteItem(seq) {
    const items = [...store.state.items];
    items.splice(
      items.findIndex((i) => i.seq === seq),
      1
    );
    store.commit('setItems', items);
  }

  toggleItem(seq) {
    const items = [...store.state.items];
    const index = items.findIndex(({ seq: itemSeq }) => itemSeq === seq);
    items[index].active = !items[index].active;
    store.commit('setItems', items);
  }

  filterItem(filter) {
    store.commit('setFilter', filter);
  }
}
