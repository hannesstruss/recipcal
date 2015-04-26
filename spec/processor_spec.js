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
    expect(result[2].unit).toBe('tsp');
    expect(result[2].name).toBe('orange juice');
  });

  const literals = `
    one egg
    two cups of whisky
    three quarts of a hamburger`;

  it('parses literal numbers', function() {
    let result = processor.parse(literals);

    expect(result[0].amount).toBe(1);
    expect(result[0].unit).toBe(null);
    expect(result[0].name).toBe('egg');
    
    expect(result[1].amount).toBe(2);
    expect(result[1].unit).toBe('cups');
    expect(result[1].name).toBe('whisky');
    
    expect(result[2].amount).toBe(3);
    expect(result[2].unit).toBe('quarts');
    expect(result[2].name).toBe('hamburger');
  });

  it('parses indefinite amounts and units', function() {
    let result = processor.parse('some coffee')[0];

    expect(result.amount).toBe(null);
    expect(result.unit).toBe(null);
    expect(result.name).toBe('some coffee');
  });

  it('parses amounts', function() {
    expect(processor.parseAmount('1 cup').amount).toBe(1);
    expect(processor.parseAmount('1/2 cup').amount).toBe(0.5);
    expect(processor.parseAmount('1 1/2 cups').amount).toBe(1.5);
    expect(processor.parseAmount('1.5 cups').amount).toBe(1.5);
    expect(processor.parseAmount('two cups').amount).toBe(2);
  });

  it('doesn\'t parse units/amounts in the end', function() {
    let result = processor.parse('1 small shallot, minced (about 1 tablespoon)')[0];
    expect(result.amount).toBe(1);
    expect(result.unit).toBe(null);
    expect(result.name).toBe('small shallot, minced (about 1 tablespoon)');
  });
});
