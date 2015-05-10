import Ingredient from './ingredient.js';

const mixedFractionRe = /^(\d+)\s+(\d+)\/(\d+)\s+\w/;
const fractionRe = /^(\d+)\/(\d+)\s+\w/;
const numberRe = /^(\d+(\.(\d+))?)\s+\w/;

const numbers = {
	'one': 1,
	'two': 2,
	'three': 3,
	'four': 4,
	'five': 5,
	'six': 6,
	'seven': 7,
	'eight': 8,
	'nine': 9,
	'ten': 10,
	'eleven': 11,
	'twelve': 12
};
const literalRe = new RegExp("^(" + Object.keys(numbers).join("|") + ")\\s+\\w");

const units = [
	'cup', 'tbsp', 'tsp', 'l', 'liters', 'pinch', 'pinches', 'quart', 'tablespoon', 'teaspoon'
];
const unitRe = new RegExp("^(" + units.map(u => u + "s?").join("|") + ")");

const nameClutterRe = /^(of (an? )?)/;

class IngredientProcessor {
  parse(ingredients) {
  	return ingredients
  		.split("\n")
  		.filter(x => /\S+/.test(x))
  		.map(line => line.trim().toLowerCase())
  		.map(line => this.parseIngredient(line));
  }

  parseIngredient(line) {
  	let amountResult = this.parseAmount(line);
  	let amount = null;

  	if (amountResult) {
  		line = line.substr(amountResult.end - 1).trim();
  		amount = amountResult.amount;
  	}

  	let unitM = unitRe.exec(line);
  	let unit = null;
  	let name = line;
  	if (unitM) {
  		unit = unitM[1];
  		name = line.substr(unitM.index + unitM[0].length).trim();
  	}
  	return new Ingredient(amount, unit, this.sanitizeName(name));
  }

  parseAmount(line) {
  	let m = mixedFractionRe.exec(line);
  	if (m) {
  		return new Amount(
  			parseInt(m[1], 10) + parseInt(m[2], 10) / parseInt(m[3], 10),
  			m.index, m[0].length);
  	}

  	m = fractionRe.exec(line);
  	if (m) {
  		return new Amount(
  			parseInt(m[1], 10) / parseInt(m[2], 10),
  			m.index, m[0].length);
  	}

  	m = numberRe.exec(line);
  	if (m) {
  		return new Amount(parseFloat(m[1]), m.index, m[0].length);
  	}

  	m = literalRe.exec(line);
  	if (m) {
  		return new Amount(numbers[m[1]], m.index, m[0].length);
  	}
  }

  sanitizeName(name) {
  	return name.replace(nameClutterRe, "");
  }
}

class Amount {
	constructor(amount, start, length) {
		this.amount = amount;
		this.start = start;
		this.end = start + length;
	}
}

module.exports = IngredientProcessor;
