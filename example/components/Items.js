import Component from '../../lib/Component.js';

export default class Items extends Component {
  template() {
    const { filteredItems } = this.props;
    return `
      <ul>
        ${filteredItems
          .map(
            ({ seq, contents, active }) => `
            <li data-seq="${seq}">
              ${contents}
              <button class="toggleBtn" style="color: ${
                active ? 'red' : 'blue'
              }">
                ${active ? 'active' : 'inactive'}
              </button>
              <button class="deleteBtn">Delete</button>
            </li>
          `
          )
          .join('')}
      </ul>
    `;
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.props;

    this.addEvent('click', '.deleteBtn', ({ target }) => {
      deleteItem(Number(target.closest('[data-seq]').dataset.seq));
    });

    this.addEvent('click', '.toggleBtn', ({ target }) => {
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });
  }
}
