import React from 'react';

export default class CreateForm extends React.Component {

  render() {
    const finishClass = this.props.showFinish
      ? 'finish button'
      : 'hidden';
    const locations = this.props.locations[0]
     ? this.props.locations.map(location => {
      const name = location.name.includes(',')
        ? location.name.split(',')[0]
        : location.name;
       return (
         <li className="trip-list-item" key={location.name}
           /* onClick={event => {
             if (event.target.className !== 'delete-poi button') {
               this.props.switchActiveLocation(location);
             }
           } */>
           <div className='list-item'>
             <div className="list-item-content">
               {name}
             </div>
           </div>
           {/* {listIcon}
           <div className={this.setDeleteClass(location.name)} id={location.name}>
             Delete {location.name.split(',')[0]}?
             <div>
               <button className='delete-poi button' onClick={() => {
                 this.deleteLocation(location.name);
                 this.setState({ isDeleting: false });
               }}>Delete</button>
               <button className='cancel button' onClick={() => this.setState({ isDeleting: false })}>Cancel</button>
             </div>
              </div> */}
         </li>
       );
     })
      : <li className = "trip-list-item">
        <div className='list-item'>
          <div className="list-item-content">
            No locations added yet.
          </div>
        </div>
      </li>;
    return (
      <div className="map-form">
        <h2 className='create-form-header'>New Itinerary</h2>
        <form onSubmit={() => this.props.handleSubmit()} autoComplete="off">
          <label className='create-form-label' htmlFor='trip-name'>Itinerary Name</label>
          <input className="name create-form-name" required="required" type="text" name="trip-name" placeholder="Give your trip a name." onChange={event => this.props.updateTripName(event)} />
          <input className={finishClass} type="submit" value="Finish Itinerary" />
        </form>
        <h3 className='create-form-subheader'>Add Locations</h3>
        <h3 className='create-form-subheader locations-subheader'>Locations</h3>
        <ul className="trip-list create-list">{locations}</ul>
      </div>
    );
  }
}
