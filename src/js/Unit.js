class Unit {
  constructor(type, singular, plural, others = []) {
    this.type = type;
    this.singular = singular;
    this.plural = plural;
    this.others = others;
  }

  toString() {
    return this.singular
  }
}

module.exports = Unit;
