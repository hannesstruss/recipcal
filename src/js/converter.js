import UnitSystem from './UnitSystem';
import units from './units';

const toTsp = {
  'tsp': 1,
  'tbsp': 3,
  'cup': 16 * 3,
  'quart': 16 * 3 * 4
};

const toMl = {
  'tsp': 4.93,
  'l': 1000
};

class Converter {
  convert(ingredient, toUnitSystem) {
    if (!ingredient.unit) {
      return ingredient;
    }

    let name = ingredient.unit.singular;

    if (name in toTsp && toUnitSystem == UnitSystem.EUROPE) {
      let teaspoons = ingredient.amount * toTsp[name];
      let ml = toMl['tsp'] * teaspoons;
      let converted = ingredient.clone();
      converted.unit = units.bySingular('ml');
      converted.amount = ml;
      return converted;
    }

    return ingredient;
  }
}

module.exports = Converter
