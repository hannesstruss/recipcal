'use strict';

import Converter from '../src/js/converter.js';
import Ingredient from '../src/js/ingredient.js';
import units from '../src/js/units.js';
import Unit from '../src/js/Unit.js';
import UnitSystem from '../src/js/UnitSystem.js';
import UnitType from '../src/js/UnitType.js';

describe('Converter', function() {
  let converter;

  beforeEach(() => {
    converter = new Converter();
  })

  it('should convert simple volumetric units (tbsp -> ml)', function() {
    let ingredient = new Ingredient(1, units.bySingular('tbsp'), 'Olive oil');
    let converted = converter.convert(ingredient, UnitSystem.EUROPE);

    expect(converted.unit).toBe(units.bySingular('ml'));
    expect(converted.amount).toBe(14.79);
  });

  it('should convert teaspoons to ml', function() {
    let ingredient = new Ingredient(1, units.find('tsp'), 'Port wine');
    let converted = converter.convert(ingredient, UnitSystem.EUROPE);
    expect(converted.unit).toBe(units.find('ml'));
    expect(converted.amount).toBe(4.93);
  });

  it('should convert ml to teaspoons', function() {
    let ingredient = new Ingredient(5, units.find('ml'), 'Marsala');
    let converted = converter.convert(ingredient, UnitSystem.US);
    expect(converted.unit).toBe(units.find('tsp'));
    expect(converted.amount).toBe(1);
  });

  it('should convert simple weight units (oz -> g)', function() {
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

  it('should not convert informal units', function() {
    let unit = new Unit(UnitType.INFORMAL, 'pinch', 'pinches');
    let ingredient = new Ingredient(1, unit, 'Salt');

    let converted = converter.convert(ingredient, UnitSystem.EUROPE);

    expect(converted.unit).toBe(unit);
  });
});

