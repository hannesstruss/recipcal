import React from 'react';
import Processor from '../processor.js';

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
      className="recipeInput"
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

class RecipeConverter extends React.Component {
  render() {
    return (
      <div>
        <IngredientList ingredients={this.props.ingredients} className="recipeConverter-ingredients" />
        <div className="recipeConverter-controls">
          Hallo
        </div>
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
