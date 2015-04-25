'use strict';

var IngredientProcessor = require('../src/js/processor.js');

describe("IngredientProcessor", function() {
  it("parses a recipe list", function() {
    var processor = new IngredientProcessor();
    var result = processor.parse("Hallo!");
    expect(result).toBe("Hallo?");
  });

  it("does fail sometimes", function() {
    expect(1).toBe(1);
  });
});
