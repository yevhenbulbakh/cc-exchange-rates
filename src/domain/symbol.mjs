export class Symbol {
  #name;
  #ask;
  #bid;

  get name() {
    return this.#name;
  }

  get ask() {
    return this.#ask;
  }

  get bid() {
    return this.#bid;
  }

  constructor(name, ask, bid) {
    this.#name = name;
    this.#ask = ask + ask * 0.05;
    this.#bid = bid - bid * 0.05;
  }
}
