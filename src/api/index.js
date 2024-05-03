const BACKEND_URL = `${process.env.BACKEND_URL}api/`;

export default class RequestBuilder {
  constructor(url = "") {
    this.url = new URL(url, BACKEND_URL);
  }

  toString() {
    return this.url.toString();
  }

  addPagination(start, end) {
    this.url.searchParams.set("pagination[page]", start);
    this.url.searchParams.set("pagination[pageSize]", end);
    this.url.searchParams.set("populate", "*");

    return this;
  }

  addSort(sort, order) {
    this.url.searchParams.set("sort", `${sort}:${order}`);
    return this;
  }

  addSearch(title_like) {
    this.url.searchParams.set("filters[title][$contains]", title_like);
    this.url.searchParams.set("populate", "*");

    return this;
  }

  resetSearchParams() {
    const keys = [...this.url.searchParams.keys()];

    for (const key of keys) {
      this.url.searchParams.delete(key);
    }

    return this;
  }
}
