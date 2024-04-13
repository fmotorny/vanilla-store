import BaseComponent from './components/base-component.js';


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

}


