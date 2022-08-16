import Component from '../../lib/Component.js';

export default class ItemAppender extends Component {
  template() {
    return `<input type="text" class="append-input" placeholder="please type item contents" />`;
  }

  setEvent() {
    const { addItem } = this.props;
    this.addEvent('keyup', '.append-input', ({ key, target }) => {
      if (key !== 'Enter') return;

      addItem(target.value);
      target.value = '';
    });
  }
}
