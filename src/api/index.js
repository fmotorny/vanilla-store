const BACKEND_URL = `${process.env.BACKEND_URL}api/rest/`;

export default class RequestBuilder {
  constructor (url = '') {
    this.url = new URL(url, BACKEND_URL);
  }

  toString () {
    return this.url.toString();
  }
}
