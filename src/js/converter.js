class Converter {
  convert(ingredient, unitSystem) {
    console.log("Converting: " + ingredient + " into " + unitSystem);
    return ingredient.multiply(10);
  }
}

module.exports = Converter
