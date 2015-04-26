'use strict';

import IngredientProcessor from '../src/js/processor.js';

describe('IngredientProcessor', function() {
  const simpleRecipe = `
    1 1/2 cups all-purpose flour
    1 1/2 teaspoons baking powder
    pinch of salt
    2/3 cup sugar

    6 tablespoons soft butter
    2 eggs, beaten
    3 bananas, mashed
    2 tablespoons slivered almonds`;

  const fractions = `
    1 1/2 cups flour
    2 tsp radish
    3/4 orange`;

  const decimals = `
    2 cups flour
    1.5 tbsp vinegar
    3.0 tsp orange juice`;

  let processor;

  beforeEach(() => {
    processor = new IngredientProcessor();
  });

  it('parses a recipe list', function() {
    let result = processor.parse(simpleRecipe);
    expect(result.length).toBe(8);
  });

  it('parses fractions', function() {
    let result = processor.parse(fractions);
    
    let flour = result[0];
    expect(flour.amount).toBe(1.5);
    expect(flour.unit).toBe('cups');
    expect(flour.name).toBe('flour');
  });

  it('parses decimal numbers', function() {
    let result = processor.parse(decimals);

    expect(result[0].amount).toBe(2);
    expect(result[0].unit).toBe('cups');
    expect(result[0].name).toBe('flour');

    expect(result[1].amount).toBe(1.5);
    expect(result[1].unit).toBe('tbsp');
    expect(result[1].name).toBe('vinegar');

    expect(result[2].amount).toBe(3);
    expect(result[2].unit).toBe('tbsp');
    expect(result[2].name).toBe('orange juice');

  });
});
