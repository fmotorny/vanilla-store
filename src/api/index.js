const BACKEND_URL = `${process.env.BACKEND_URL}api/`;

export default class RequestBuilder {
  constructor (url = '') {
    this.url = new URL(url, BACKEND_URL);
  }

  addPagination (start, end) {
    this.url.searchParams.set('pagination[page]', start);
    this.url.searchParams.set('pagination[pageSize]', end);
    this.url.searchParams.set('populate', '*');

    return this;
  }

  toString () {
    return this.url.toString();
  }

  resetSearchParams () {
    const keys = [...this.url.searchParams.keys()];

    for (const key of keys) {
      this.url.searchParams.delete(key);
    }

    return this;
  }
}
