import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (event) => {
    this.setState({filters: {type: event.target.value}});
  }

  handleFetchPets = () => {
    const newPetsArray = [];
    let filter
    this.state.filters.type === 'all' ? filter = '' :  filter = `?type=${this.state.filters.type}`
    fetch(`/api/pets${filter}`)
    .then(res => res.json())
    .then(json => json.map(pet => {
      newPetsArray.push(
        {
          id: pet.id,
          type: pet.type,
          gender: pet.gender,
          age: pet.age,
          weight: pet.weight,
          name: pet.name,
          isAdopted: pet.isAdopted
        })
    }))
    .then(() => this.setState({pets: newPetsArray}));
  }

  handleAdoptPet = (id) => {
    const newPetsArray = [...this.state.pets];
    const petIndex = newPetsArray.findIndex((obj => obj.id === id));
    newPetsArray[petIndex].isAdopted = !newPetsArray[petIndex].isAdopted;
    this.setState({ 
      pets: newPetsArray
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App