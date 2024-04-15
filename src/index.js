import BaseComponent from './components/base-component.js';
import connectToStore from "./core/store/connect";


const navigationConfig = [
  {
    url: '/',
    html: `<i class="bi bi-shop"></i><span>Items</span>`,
    attributes: {
      class: 'link-unstyled'
    }
  }
];



class App extends BaseComponent {
  subElements = {};

  constructor(store) {
    super();
  }

  get template() {
    return `<div class="os-container">
      <main class="os-products">
        <aside class="sidebar">
          <h2 class="sidebar__title" data-element="title">
            <!-- Title -->
          </h2>
          <ul class="sidebar__nav" data-element="navigation">
            <!-- Navigation -->
          </ul>
        </aside>

        <section id="page-content">
          <!-- Page content -->
        </section>
      </main>
    </div>`;
  }


  initializeRouter() {
    this.router
      .addRoute(/^$/, 'main')
      .addRoute(/404\/?$/, 'error404')
      .listen();
  }

}


const ConnectedApp = connectToStore(App);
const app = new ConnectedApp();

document.body.append(app.element);

app.initializeRouter();


