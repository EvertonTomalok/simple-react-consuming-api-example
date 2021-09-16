import axios from "axios";
import React, { Component } from "react";

class SearchStateCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      message: "",
      error: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(`https://viacep.com.br/ws/${this.state.value}/json/`)
      .then((response) => {
        const data = response.data;

        this.setState({
          value: "",
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          message: "Found",
          error: false,
        });
      })
      .catch((err) => {
        this.setState({
          value: "",
          street: "",
          neighborhood: "",
          city: "",
          state: "",
          message: "Couldn't found an address",
          error: true,
        });
      });
  }

  render() {
    const Form = (
      <form onSubmit={this.handleSubmit} class="form-inline mb-2">
        <div class="form-group mx-sm-3 mb-2">
          <label for="cep" class="sr-only">
            CEP
          </label>
          <input
            type="text"
            placeholder="CEP"
            value={this.state.value}
            onChange={this.handleChange}
            name="cep"
            id="cep"
          />
        </div>
        <button type="submit" class="btn btn-primary mb-2">
          Enviar
        </button>
      </form>
    );
    if (this.state.state !== "") {
      return (
        <div>
          <div className="row">{Form}</div>

          <div className="row">
            <div class="card col-6">
              <div class="card-header">Street</div>
              <div class="card-body">{this.state.street || '-'}</div>
            </div>
            <div class="card col-6">
              <div class="card-header">Neighborhood</div>
              <div class="card-body">{this.state.neighborhood || '-'}</div>
            </div>
            <div class="card col-6">
              <div class="card-header">City</div>
              <div class="card-body">{this.state.city}</div>
            </div>
            <div class="card col-6">
              <div class="card-header">State</div>
              <div class="card-body">{this.state.state}</div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.error === true && this.state.message !== "") {
      return (
        <div>
          <div
            class="alert alert-danger"
            role="alert"
          >
            {this.state.message}
          </div>
          <div className="row">{Form}</div>
        </div>
      );
    }

    return <div className="row">{Form}</div>;
  }
}

export default SearchStateCode;
