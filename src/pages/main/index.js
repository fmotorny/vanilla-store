import BaseComponent from "../../components/base-component";

import './main.css';
import connectToStore from "../../core/store/connect";


class OnlineStorePage extends BaseComponent {
  subscriptions = [];
  subElements = [];
  components = {};
  pageSize = 10;
  products = [];

  constructor(match, store, observer) {
    super();

    this.store = store;
    this.observer = observer;
    
  }

  async loadData() {
    return;
  }

  get template() {
    return `
      <div class="page-container">

      </div>
    `;
  }




  destroy() {
    super.destroy();

    for (const component of Object.values(this.components)) {
      if (component.destroy) {
        component.destroy();
      }
    }

    this.subscriptions = [];
  }
}

export default connectToStore();
