import BaseComponent from "../../components/base-component";

import './main.css';
import connectToStore from "../../core/store/connect";
import connectToObserver from "../../core/observer/connect";
import NotificationManager from "../../components/notification/notification-manager";
import CardsList from "../../components/cards-list";


class OnlineStorePage extends BaseComponent {
  subscriptions = [];
  subElements = [];
  components = {};
  page = 1;
  pageCount = null;
  // Кол-во загружаемых элементов за 1 раз
  pageSize = 9;
  total = null;
  products = [];

  constructor(match, store, observer) {
    super();

    this.store = store;
    this.observer = observer;

    this.renderComponents();
    this.initComponents();

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


  initListComponent(mode = "") {
    const currentMode = mode;

    const modes = {
      grid: () =>
        new CardsList({
          data: this.products,
          CardComponent: null,
        })
    };

    return null;
  }

  initComponents() {
    const mode = this.getMode();
    const list = this.initListComponent(mode);
    const search = new Search();

    // NOTE: destroy component manually
    this.notificationManager = new NotificationManager({ stackLimit: 3 });

    this.components = {
      list,
      search,
    };
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

  renderComponents () {
    for (const componentName of Object.keys(this.components)) {
      const root = this.subElements[componentName];
      const { element } = this.components[componentName];

      root.append(element);
    }
  }
}

export default connectToStore(connectToObserver(OnlineStorePage));
