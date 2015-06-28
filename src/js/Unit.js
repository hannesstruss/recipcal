class Unit {
  constructor(singular, plural, others = []) {
    this.singular = singular;
    this.plural = plural;
    this.others = others;
  }

  toString() {
    return this.singular
  }
}

module.exports = Unit;
