'use strict';

import units from '../src/js/units.js';

describe('units', function() {
  it('should find ml by singular', function() {
    let ml = units.bySingular('ml');
    expect(ml).toBeDefined();
  });
});
