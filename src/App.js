import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      image: '',
      attr1: '',
      attr2: '',
      attr3: '',
      rare: 'normal',
      superTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      box: [],
      searchName: '',
      searchRare: 'todas',
    };
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const {
      name,
      description,
      image,
      attr1,
      attr2,
      attr3,
      rare,
      superTrunfo,
      hasTrunfo } = this.state;
    const card = {
      name,
      description,
      image,
      attr1,
      attr2,
      attr3,
      rare,
      superTrunfo,
    };
    this.setState((prevState) => ({
      box: [...prevState.box, card],
    }));
    this.setState({
      name: '',
      description: '',
      image: '',
      attr1: '0',
      attr2: '0',
      attr3: '0',
      rare: 'normal',
      hasTrunfo: hasTrunfo || superTrunfo,
    });
  };

  removeCard = (name) => {
    this.setState((prevState) => ({
      box: prevState.box.filter((card) => card.name !== name),
      hasTrunfo: !prevState.box.find((card) => card.name === name).superTrunfo,
    }));
  };

  isValidAttribute = (attribute) => {
    const minValue = 0;
    const maxValue = 90;
    const attributeAsInt = parseInt(attribute, 10);
    return attributeAsInt >= minValue && attributeAsInt <= maxValue;
  };

  validateAttributeSum = () => {
    const maxAttributeAllowed = 210;
    const { attr1, attr2, attr3 } = this.state;
    const sum = parseInt(attr1, 10) + parseInt(attr2, 10) + parseInt(attr3, 10);
    return sum <= maxAttributeAllowed;
  };

  validateFillForm = () => {
    const { name, description, image, attr1, attr2, attr3 } = this.state;
    const isValid = name
      && description
      && image
      && this.isValidAttribute(attr1)
      && this.isValidAttribute(attr2)
      && this.isValidAttribute(attr3)
      && this.validateAttributeSum();
    this.setState({
      isSaveButtonDisabled: !isValid,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value }), this.validateFillForm);
  };

  applyFilter = () => {
    const { searchName, searchRare, box } = this.state;
    let cards = box;
    cards = searchName ? cards.filter((card) => card.name.includes(searchName)) : cards;
    cards = searchRare && searchRare !== 'todas'
      ? cards.filter((card) => card.rare === searchRare)
      : cards;
    return cards;
  };

  render() {
    // renderiza os estados na tela
    const {
      name,
      description,
      image,
      attr1,
      attr2,
      attr3,
      rare,
      superTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      // box,
      searchName,
      searchRare,
    } = this.state;
    const cards = this.applyFilter();
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardRare={ rare }
          cardTrunfo={ superTrunfo }
          cardImage={ image }
          hasTrunfo={ hasTrunfo }
          onInputChange={ this.handleChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr1 }
          cardAttr2={ attr2 }
          cardAttr3={ attr3 }
          cardRare={ rare }
          cardTrunfo={ superTrunfo }
          cardImage={ image }
        />
        <section>
          <input
            data-testid="name-filter"
            type="text"
            onChange={ this.handleChange }
            name="searchName"
            value={ searchName }
          />
          <label htmlFor="rare">
            Raridade
            <select
              name="searchRare"
              data-testid="rare-filter"
              value={ searchRare }
              onChange={ this.handleChange }
            >
              <option value="todas" selected>
                todas
              </option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          {cards.map((card) => (
            <>
              <Card
                key={ card.name }
                cardName={ card.name }
                cardDescription={ card.description }
                cardAttr1={ card.attr1 }
                cardAttr2={ card.attr2 }
                cardAttr3={ card.attr3 }
                cardRare={ card.rare }
                cardTrunfo={ card.superTrunfo }
                cardImage={ card.image }
              />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.removeCard(card.name) }
              >
                Excluir
              </button>
            </>
          ))}
        </section>
      </div>
    );
  }
}
export default App;
