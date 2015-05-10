import React from 'react';
import Processor from '../processor.js';
import UnitSystem from '../UnitSystem.js';

class RecipeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
        // 1 1/2 cups all-purpose flour
        // 1 1/2 teaspoons baking powder
        // pinch of salt
        // 2/3 cup sugar
        // 6 tablespoons soft butter
        // 2 eggs, beaten
        // 3 bananas, mashed
        // 2 tablespoons slivered almonds`.replace(/^\s+/gm, "").trim()
    }
  }

  componentDidMount() {
    this.props.onRecipeChanged(
      React.findDOMNode(this.refs.textarea).value);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
    this.props.onRecipeChanged(e.target.value);
  }

  render() {
    return <textarea 
      className="recipeInput initialInput"
      ref="textarea"
      placeholder="Paste an ingredient list..."
      onChange={this.onChange.bind(this)}
      value={this.state.value}/>
  }
}

class IngredientList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="ingredients-list">
        {this.props.ingredients.map((ingredient) => {
          return <li key={ingredient.name} className="ingredient">
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>;
        })}
        <li>
          <input type="text" className="recipeInput" placeholder="Add another ingredient..." />
        </li>
      </ul>
    );
  }
}

class ConverterSettings extends React.Component {
  onUnitSystemChanged(e) {
    this.props.onUnitSystemChanged(e.target.value);
  }

  onMultiplierChanged(e) {
    this.props.onMultiplierChanged(e.target.value);
  }

  render() {
    return (
      <div className="recipeConverter-controls">
        <ul>
          <li>
            <input name="units"
                   type="radio"
                   value={UnitSystem.EUROPE}
                   onChange={this.onUnitSystemChanged.bind(this)}
                   checked={this.props.unitSystem === UnitSystem.EUROPE}>
              <label>Europe</label>
            </input>
          </li>
          <li>
            <input name="units"
                   type="radio"
                   value={UnitSystem.US}
                   onChange={this.onUnitSystemChanged.bind(this)}
                   checked={this.props.unitSystem === UnitSystem.US}>
              <label>U.S.</label>
            </input>
          </li>
        </ul>

        <input type="text"
               value={this.props.multiplier}
               onChange={this.onMultiplierChanged.bind(this)} />
      </div>
    );
  }
}

class RecipeConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitSystem: UnitSystem.EUROPE,
      multiplier: "1"
    };
  }

  onUnitSystemChanged(unitSystem) {
    this.setState({
      unitSystem: unitSystem
    });
  }

  onMultiplierChanged(multiplier) {
    this.setState({
      multiplier: multiplier
    });
  }

  getTransformedIngredients() {
    let multiplier = parseFloat(this.state.multiplier.replace(",", "."), 10);
    if (isNaN(multiplier)) {
      multiplier = 1;
    }
    return this.props.ingredients.map(ingredient => {
      return ingredient.multiply(multiplier);
    });
  }

  render() {
    return (
      <div>
        <IngredientList ingredients={this.getTransformedIngredients()} />
        <ConverterSettings unitSystem={this.state.unitSystem}
                           multiplier={this.state.multiplier}
                           onUnitSystemChanged={this.onUnitSystemChanged.bind(this)}
                           onMultiplierChanged={this.onMultiplierChanged.bind(this)} />
      </div>
    );
  }
}

class RecipcalApp extends React.Component {
  constructor(props) {
    super(props);
    this.processor = new Processor();
    this.state = {
      ingredients: []
    };
  }

  onRecipeChanged(recipe) {
    var ingredients = this.processor.parse(recipe);
    this.setState({
      ingredients: ingredients
    });
  }

  render() {
    var input = this.state.ingredients.length == 0;

    return <div className="app">
      {input ? <RecipeInput onRecipeChanged={this.onRecipeChanged.bind(this)}/> : null}
      {!input ? <RecipeConverter ingredients={this.state.ingredients} /> : null}
    </div>;
  }
}

module.exports = function() {
  React.render(
    <RecipcalApp />,
    document.querySelector('.content')
  );
};
