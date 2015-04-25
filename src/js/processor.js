function IngredientProcessor() {

}

IngredientProcessor.prototype.process = function() {
  var ns = [1, 2, 3];
  console.log(ns.map(x => x * 2));
};

module.exports = IngredientProcessor;
