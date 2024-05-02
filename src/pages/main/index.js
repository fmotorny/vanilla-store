import BaseComponent from "../../components/base-component.js";
import Search from "../../components/search/index.js";
import CardsList from "../../components/cards-list/index.js";
import NotificationManager from "../../components/notification/notification-manager/index.js";
import InfinityList from "../../components/infinity-list/index.js";
import SortableTable from "../../components/sortable-table/index.js";
import headerConfig from "./sortable-table-config.js";

import Card from "../../components/card";
import httpRequest from "../../core/request/index.js";
import connectToObserver from "../../core/observer/connect.js";

import connectToStore from "../../core/store/connect.js";
import RequestBuilder from "../../api/index.js";

import SyncStorage from "../../core/storage/sync-storage.js";

import "./main.css";

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

    this.url = new RequestBuilder("products");
    this.storage = new SyncStorage().create("local");

    this.initComponents();
    this.render();
    this.renderComponents();
    this.initEventListeners();

    // const start = this.page;
    // const end = start + this.pageSize;

    this.url.addPagination(this.page, this.pageSize);

    this.add();
  }

  async loadData() {
    return await httpRequest.get(this.url);
  }

  get template() {
    return `
      <div class="page-container">
        <h1 class="page-title">Products</h1>

        <div class="filters-panel">
          <div data-element="search">
            <!-- Search component -->
          </div>
          <div class="list-view-controls">
            <i class="bi bi-list ${this.getMode() === "table" ? "active" : ""}" data-element="listBtn"></i>
            <i class="bi bi-grid ${this.getMode() === "grid" ? "active" : ""}" data-element="gridBtn"></i>
          </div>
        </div>

        <div data-element="list">
          <!-- Cards List component -->
        </div>
      </div>
    `;
  }

  getMode() {
    const defaultMode = "grid";

    return this.storage.get("mode") || defaultMode;
  }

  setMode(mode = "") {
    return this.storage.add("mode", mode);
  }

  initListComponent(mode = "") {
    const currentMode = mode;

    const modes = {
      grid: () =>
        new CardsList({
          data: this.products,
          CardComponent: Card,
        }),
      table: () => new SortableTable(headerConfig, { data: this.products }),
    };

    return new InfinityList(modes[currentMode](), { step: this.pageSize });
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

  renderComponents() {
    for (const componentName of Object.keys(this.components)) {
      const root = this.subElements[componentName];
      const { element } = this.components[componentName];

      root.append(element);
    }
  }

  async add() {
    const res = await this.loadData();

    const { page, pageCount, pageSize, total } = res.meta.pagination;

    this.page = page;
    this.pageCount = pageCount;
    this.pageSize = pageSize;
    this.total = total;

    this.products.push(...res.data);

    this.components.list.add(res.data);
  }

  async update() {
    const res = await this.loadData();

    this.products = [...res.data];

    this.components.list.update(res.data);
  }

  // NOTE: Pattern. Facade
  registerObserverEvent(type, callback) {
    const handler = this.observer.subscribe(type, callback);

    this.subscriptions.push(handler);
  }

  registerStoreEvent(type, callback) {
    const handler = this.store.subscribe(type, callback);

    this.subscriptions.push(handler);
  }

  initEventListeners() {
    this.registerObserverEvent("load-data", () => {
      if (this.products.length >= this.total) {
        return;
      }

      this.url.addPagination(this.page + 1, this.pageSize);

      this.add();
    });

    this.registerObserverEvent("add-to-wishlist", (payload) => {
      const { status, product } = payload;
      const { title } = product;
      const action = status ? "added" : "removed";

      const message = `Product "${title}" was successfully ${action} to wishlist`;
      const type = status ? "success" : "info";

      this.notificationManager.show(message, type);
    });

    this.registerObserverEvent("add-to-cart", (payload) => {
      const { status, product } = payload;
      const { title } = product;
      const action = status ? "added" : "removed";

      const message = `Product "${title}" was successfully ${action} to cart`;
      const type = status ? "success" : "info";

      this.notificationManager.show(message, type);
    });

    this.registerObserverEvent("search-filter", (searchString) => {
      // NOTE: поиск осуществляется только по полю title
      this.url.resetSearchParams().addSearch(searchString);

      this.update();
    });

    this.registerObserverEvent("range-selected", (payload) => {
      const { from, to } = payload;
      // this.url.resetSearchParams().addFilter(from, to);
      this.url.resetSearchParams().addFilter(from, to);

      this.update();
    });

    this.registerObserverEvent("sort-table", (payload) => {
      const { id, order } = payload;
      // reset page query param
      this.page = 1;
      this.url.addPagination(this.page, this.pageSize).addSort(id, order);

      this.update();
    });

    // TODO: make refactoring
    this.subElements.gridBtn.addEventListener("pointerdown", () => {
      this.subElements.listBtn.classList.remove("active");
      this.subElements.gridBtn.classList.add("active");

      this.components.list.remove();
      this.setMode("grid");
      this.components.list = this.initListComponent("grid");

      this.subElements.list.innerHTML = "";
      this.subElements.list.append(this.components.list.element);
    });

    // TODO: make refactoring
    this.subElements.listBtn.addEventListener("pointerdown", () => {
      this.subElements.gridBtn.classList.remove("active");
      this.subElements.listBtn.classList.add("active");

      this.components.list.remove();
      this.setMode("table");
      this.components.list = this.initListComponent("table");

      this.subElements.list.innerHTML = "";
      this.subElements.list.append(this.components.list.element);
    });
  }

  destroy() {
    super.destroy();

    for (const component of Object.values(this.components)) {
      if (component.destroy) {
        component.destroy();
      }
    }

    // NOTE: destroy component manually
    this.notificationManager.destroy();

    this.subscriptions = [];
  }
}

export default connectToStore(connectToObserver(OnlineStorePage));
