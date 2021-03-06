class Ingredient {
	constructor(amount, unit, name) {
		this.amount = amount;
		this.unit = unit;
		this.name = name;
	}

  multiply(multiplier) {
    return new Ingredient(this.amount * multiplier, this.unit, this.name);
  }
}

module.exports = Ingredient;
