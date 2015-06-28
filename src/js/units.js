import Unit from './Unit';
import Type from './UnitType'

function u(type, singular, plural, ...others) {
  return new Unit(type, singular, plural, others);
}

const all = [
  u(Type.VOLUMETRIC, 'cup', 'cups'),
  u(Type.VOLUMETRIC, 'tbsp', 'tbsps', 'tablespoon', 'tablespoons'),
  u(Type.VOLUMETRIC, 'tsp', 'tsps', 'teaspoon', 'teaspoons'),
  u(Type.VOLUMETRIC, 'quart', 'quarts'),

  u(Type.INFORMAL, 'pinch', 'pinches'),

  u(Type.VOLUMETRIC, 'ml', 'mls', 'milliliter', 'milliliters'),
  u(Type.VOLUMETRIC, 'l', 'l', 'liter', 'liters'),

  u(Type.MASS, 'g', 'g', 'gram', 'grams'),
  u(Type.MASS, 'kg', 'kg', 'kilo', 'kilos', 'kilogram', 'kilograms')
];

const bySingular = {};
all.forEach(unit => {
  bySingular[unit.singular] = unit;
});

module.exports = {
  all: all,
  bySingular: (singular) => bySingular[singular]
};
