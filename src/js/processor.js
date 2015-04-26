import Ingredient from './ingredient.js';

class IngredientProcessor {
  parse(ingredients) {
  	return ingredients
  		.split("\n")
  		.filter(x => /\S+/.test(x))
  		.map(line => this.parseIngredient(line));
  }

  parseIngredient(line) {
  	return new Ingredient(1.5, "tbsp", "Dieter");
  }
}

module.exports = IngredientProcessor;
