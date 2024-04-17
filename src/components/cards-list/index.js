import BaseComponent from '../base-component.js';

import './card-list.css';

export default class CardsList extends BaseComponent {
  constructor ({
   CardComponent,
   data = []
 }) {
    super();

    this.CardComponent = CardComponent;
    this.data = data;
    this.render();
  }

  get template () {
    return `
      <div class="os-products-list" data-element="body">
        <!-- Cards list -->
      </div>
    `;
  }



  update (data = []) {
    this.data = data;
  }

  getCardsList (data = []) {
    return data.map(item => {
      const card = new this.CardComponent(item);

      return card.element;
    });
  }


}
