import Component from '../../lib/component.js';

export default class ItemFilter extends Component {
  template() {
    return `
        <button class="filterBtn" data-filter="0">All</button>
        <button class="filterBtn" data-filter="1">Active Only</button>
        <button class="filterBtn" data-filter="2">Inactive Only</button>
    `;
  }

  setEvent() {
    const { filterItem } = this.props;
    this.addEvent('click', '.filterBtn', ({ target }) => {
      filterItem(Number(target.dataset.filter));
    });
  }
}
