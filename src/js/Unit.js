class Unit {
  constructor(singular, plural, others = []) {
    this.singular = singular;
    this.plural = plural;
    this.others = others;
  }
}

module.exports = Unit;
