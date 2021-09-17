  
import React from 'react'
import Pet from './Pet'

class PetBrowser extends React.Component {
  renderAllPets = () => {
    const petsArray = [];
    this.props.pets.map(pet => {
      petsArray.push(<Pet pet={pet} onAdoptPet={this.props.onAdoptPet}/>);
    });
    return petsArray;
  }

  render() {
    return (
      <div className="ui cards">
        {this.renderAllPets()}
    </div>
    )
  }
}
export default PetBrowser
