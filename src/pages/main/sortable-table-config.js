export default [
  {
    id: 'image',
    title: 'Image',
    sortable: false,
    template: image => {
      return `
        <td class="col">
          <img class="sortable-table-image" alt="product image" src="${image}">
        </td>`;
    }
  },
  {
    id: 'rate',
    title: 'rating',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'title',
    title: 'Title',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'desc',
    title: 'Description',
    sortable: true,
    sortType: 'string',
    template: desc => {
      return `
        <td class="col">
          ${desc.slice(0, 50) + '...'}
        </td>`;
    }
  }
];
