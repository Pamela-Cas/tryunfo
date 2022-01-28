import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form className="form">
        <label htmlFor="name">
          Name
          <input data-testid="name-input" name="name" placeholder="Nome" />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea data-testid="description-input" />
        </label>
        <label htmlFor="attr1">
          Attr01
          <input type="number" data-testid="attr1-input" name="attr01" />
        </label>
        <label htmlFor="attr2">
          Attr02
          <input type="number" data-testid="attr2-input" name="attr02" />
        </label>
        <label htmlFor="attr3">
          Attr03
          <input type="number" data-testid="attr3-input" name="attr03" />
        </label>
        <label htmlFor="image">
          Imagem
          <input data-testid="image-input" name="imagem" />
        </label>
        <label htmlFor="raridade">
          Raridade
          <select data-testid="rare-input">
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          <input type="checkbox" data-testid="trunfo-input" />
          Super Trybe Trunfo
        </label>
        <button
          data-testid="save-button"
          type="submit"
          className="btn-submit"
        >
          Salvar

        </button>
      </form>
    );
  }
}

export default Form;
