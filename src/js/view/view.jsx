import React from 'react';
import Processor from '../processor.js'

class RecipeInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: `
				1 1/2 cups all-purpose flour
				1 1/2 teaspoons baking powder
				pinch of salt
				2/3 cup sugar
				6 tablespoons soft butter
				2 eggs, beaten
				3 bananas, mashed
				2 tablespoons slivered almonds`.replace(/^\s+/gm, "").trim()
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
			onChange={this.onChange.bind(this)}
			value={this.state.value}/>
	}
}

class IngredientList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var ingredientNodes = this.props.ingredients.map((ingredient) => {
			return (
				<ul className="ingredients-list">
					<li key={ingredient.name}>
						{ingredient.name} ({ingredient.unit}, {ingredient.amount})
					</li>
				</ul>
			);
		});

		return (
			<div>
				<div className="ingredientList">
				  {ingredientNodes}
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
		this.setState({
			ingredients: this.processor.parse(recipe)
		});
	}

	render() {
		return <div className="app">
			<RecipeInput onRecipeChanged={this.onRecipeChanged.bind(this)}/>
			<IngredientList ingredients={this.state.ingredients} />
		</div>;
	}
}

module.exports = function() {
	React.render(
	  <RecipcalApp />,
	  document.getElementById('content')
	);
};
