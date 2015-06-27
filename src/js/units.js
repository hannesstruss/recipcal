import Unit from './Unit';

function u(singular, plural, ...others) {
  return new Unit(singular, plural, others);
}

module.exports = [
  u('cup', 'cups'),
  u('tbsp', 'tbsps', 'tablespoon', 'tablespoons'),
  u('tsp', 'tsps', 'teaspoon', 'teaspoons'),
  u('pinch', 'pinches'),
  u('quart', 'quarts'),

  u('ml', 'mls', 'milliliter', 'milliliters'),
  u('l', 'l', 'liter', 'liters'),

  u('g', 'g', 'gram', 'grams'),
  u('kg', 'kg', 'kilo', 'kilos', 'kilogram', 'kilograms')
];
