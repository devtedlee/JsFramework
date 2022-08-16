import { observe } from './observer.js';

export default class Component {
  state;
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
  }

  setup() {
    observe(() => {
      this.render();
      this.setEvent();
      this.mounted();
    });
  }

  mounted() {
    console.log('mounted');
  }

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  setEvent() {
    console.log('set event');
  }

  addEvent(eventType, selector, callback) {
    const child = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      child.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (e) => {
      if (!isTarget(e.target)) {
        return;
      }

      callback(e);
    });
  }
}
