// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

class LocalStorageMock {
  private store = {};

  clear() {
    console.log('clearing');
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  key(index: number) {
    return this.store[Object.keys(this.store)[index]] || null;
  }

  get length() {
    return Object.keys(this.store).length;
  }
}
global.localStorage = new LocalStorageMock();
