import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as POIInfo from '../actions/fetch_poi_info_action';
import AddButton from '../containers/addButton';
import RemoveButton from '../containers/removeButton';


// needs to dispatch to itinerary

import '../../styles/poi_details.scss';

// actions: FETCH_POI_INFO

const mapStateToProps = state =>
  ({
    currentCity: state.currentLocation.city,
    itinerary: state.itinerary,
    currentLocation: state.currentLocation,
  });

const mapDispatchToProps = dispatch =>
  ({
    fetchDetails: (placeId, index) => {
      dispatch(POIInfo.fetchPoiDetails(placeId, index));
    },
  });

class POIDetails extends Component {
  // need a way to handle displaying different relevant data
  // (the data to display for hotels may be different than from restaurants)
  componentWillMount() {
    this.props.fetchDetails(this.props.details.place_id, this.props.index);
  }

  // Checking unique id exists in itinerary
  isInsideItinerary(arr, poi) {
    for (let i = 0; i < arr.length; i++) {
      if (poi.place_id === arr[i].place_id) {
        return true;
      }
    }
    return false;
  }

  render() {
    const selectedDetails = this.props.details;
    const itinerary = this.props.itinerary.itinerary;
    let image = null;
    const cityArray = itinerary[this.props.currentCity] || [];
    let button = null;


    if (selectedDetails.photos) {
      image = (
        <div>
          {selectedDetails.photos.map(pic => (
            <img
              role="presentation"
              styleName="picDetail"
              src={`${pic.getUrl({ maxWidth: 250, maxHeight: 250 })}`}
            />
          ),
          )}
        </div>
      );
    } else {
      image = <div />;
    }

    if (cityArray && this.isInsideItinerary(cityArray, selectedDetails)) {
      button = <RemoveButton index={cityArray.indexOf(selectedDetails)} city={this.props.currentCity} details={selectedDetails} />;
    } else {
      button = <AddButton city={this.props.currentCity} details={selectedDetails} />;
    }

    return (
      <div>
        <div styleName="poiDetail">
          <div >
            { image }
            <h3>{selectedDetails.name}</h3>
            <h4>Rating: {selectedDetails.rating}</h4>
            <ul>
              <li>Address: {selectedDetails.formatted_address}</li>
              <li>Phone Number: {selectedDetails.formatted_phone_number}</li>
              <li>International Phone Number: {selectedDetails.international_phone_number}</li>
              <li>Website: <a target="_blank" rel="noopener noreferrer" href={selectedDetails.website} styleName="webDetailLink"> {selectedDetails.website} </a> </li>
            </ul>
            { button }
          </div>
        </div>
      </div>
    );
  }
}

POIDetails.propTypes = {
  // propname: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(POIDetails);
