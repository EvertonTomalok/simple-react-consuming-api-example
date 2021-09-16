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
      <form onSubmit={this.handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Enviar" />
      </form>
    );
    if (this.state.state !== "") {
      return (
        <div>
          {Form}
          <p>street: {this.state.street}</p>
          <p>neighborhood: {this.state.neighborhood}</p>
          <p>city: {this.state.city}</p>
          <p>state: {this.state.state}</p>
        </div>
      );
    } else if (this.state.error === true && this.state.message !== "") {
      return (
        <div>
          {Form}
          <p>{this.state.message}</p>
        </div>
      );
    }

    return (
      <div>
        {Form}
      </div>
    );
  }
}

export default SearchStateCode;
