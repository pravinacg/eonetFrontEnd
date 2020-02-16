import React, { Component } from 'react';

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      selectedTeam: "",
     
    };
  }

  componentDidMount() {
    fetch("https://localhost:44308/api/events/EventCategories")
      .then((response) => {
        return response.json();
      })
      .then(data => {
        let teamsFromApi = data.map(cat => {
          return {value: cat.id, name: cat.title}
        });
        this.setState({
          countries: teamsFromApi,
          selectedTeam :''
        });
      }).catch(error => {
        console.log(error);
      });
  }


  componentDidMount1() {
    this.setState({
      countries: [             ]
    });
  }

  handleChange = (event) =>
  {
      let selectedValue = event.target.value;
      this.props.onSelectChange(selectedValue);
  }

  render () {
    const { countries } = this.state;

    let countriesList = countries.length > 0
    	&& countries.map((item, i) => {
      return (
      
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);

    return (
      
      <div>
      <select value={this.state.selectedTeam}
       onChange={this.handleChange}>
      {countriesList}
      </select>
    </div>
    );
  }
}

export default Countries;