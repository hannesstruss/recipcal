'use strict';

import Converter from '../src/js/converter.js';
import Ingredient from '../src/js/ingredient.js';
import units from '../src/js/units.js';
import UnitSystem from '../src/js/UnitSystem.js';

describe('Converter', function() {
  let converter;

  beforeEach(() => {
    converter = new Converter();
  })

  it('should convert simple volumetric units', function() {
    let ingredient = new Ingredient(1, units.bySingular('tbsp'), 'Olive oil');
    let converted = converter.convert(ingredient, UnitSystem.EUROPE);

    expect(converted.unit).toBe(units.bySingular('ml'));
    expect(converted.amount).toBe(14.79);
  });

  it('should convert simple weight units', function() {
    let ingredient = new Ingredient(2, units.bySingular('oz'), 'Flour');
    let converted = converter.convert(ingredient, UnitSystem.EUROPE);

    expect(converted.unit).toBe(units.bySingular('g'));
    expect(converted.amount).toBe(28);
  });

  it('should not convert things without a unit', function() {
    let ingredient = new Ingredient(1, null, 'Apple');
    let converted = converter.convert(ingredient, UnitSystem.EUROPE);

    expect(converted.unit).toBeNull();
    expect(converted.amount).toBe(1);
  });
});

