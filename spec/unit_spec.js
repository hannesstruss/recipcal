import Unit from '../src/js/Unit';
import UnitSystem from '../src/js/UnitSystem';

describe('Unit', function() {
  it('should return all variants', function() {
    let unit = new Unit(UnitSystem.US, 'tbsp', 'tbsps', ['tablespoon', 'tablespoons']);
    expect(unit.variants).toEqual(['tablespoon', 'tablespoons', 'tbsp', 'tbsps']);
  });
});
