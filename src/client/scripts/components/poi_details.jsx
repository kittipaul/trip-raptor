import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// needs to dispatch to itinerary

import '../../styles/poi_details.scss';

// actions: ADD_TO_ITINERARY, REMOVE_FROM_ITINERARY, FETCH_POI_INFO

const mapStateToProps = state =>
  ({
    selectPOI: state.selectPOI,
  });

const mapDispatchToProps = dispatch =>
  ({
    // dispatch
  });

class POIDetails extends Component {
  // need a way to handle displaying different relevant data
  // (the data to display for hotels may be different than from restaurants)


  // todo add src tag to img.
  // current info within render is example data. change as needed
    // example src=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.props.photos[0].photo_reference}&key=AIzaSyC535s39VzBWKFSXSlMaOllvk5ocBGNh9E`
  render() {
    const selectedDetails = this.props.selectPOI[this.props.placeID];
    let poiDetails = null;
    if (selectedDetails.photos) {
      poiDetails = (
        <div>
          <div styleName="poiDetail">
            <img
              src={`${selectedDetails.photos[0].getUrl({ maxWidth: 250 })}`}
            />
            <h2>{selectedDetails.name}</h2>
            Rating: {selectedDetails.rating}
            <div>
              <ul>
                <li>Address: {selectedDetails.formatted_address}</li>
                <li>Phone Number: {selectedDetails.formatted_phone_number}</li>
                <li>International Phone Number: {selectedDetails.international_phone_number}</li>
              </ul>
            </div>
            {selectedDetails.website}
            <div>
              <button className="btn btn-primary">Add to List</button>
              <button className="btn btn-danger">Remove from List</button>
            </div>
          </div>
        </div>
      );
    } else {
      poiDetails = (
        <div>
          <div styleName="poiDetail">
            <h2>{selectedDetails.name}</h2>
            Rating: {selectedDetails.rating}
            <div>
              <ul>
                <li>Address: {selectedDetails.formatted_address}</li>
                <li>Phone Number: {selectedDetails.formatted_phone_number}</li>
                <li>International Phone Number: {selectedDetails.international_phone_number}</li>
              </ul>
            </div>
            {selectedDetails.website}
            <div>
              <button className="btn btn-primary">Add to List</button>
              <button className="btn btn-danger">Remove from List</button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        { poiDetails }
      </div>
    );
  }
}

POIDetails.propTypes = {
  // propname: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(POIDetails);
