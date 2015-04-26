import Ingredient from '../src/js/ingredient.js'

describe("Ingredient", function() {
	it("has a functioning constructor", function() {
		let ingredient = new Ingredient(1.5, "tbsp", "flour");
		expect(ingredient.amount).toBe(1.5);
		expect(ingredient.unit).toBe("tbsp");
		expect(ingredient.name).toBe("flour");
	});
});
