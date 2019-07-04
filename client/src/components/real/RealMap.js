import React from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
const styles = {
  mapStyles: {
    width: "100%",
    height: "100%"
  }
};
const RealMap = props => {
  const { google, cars, mapLoaded } = props;

  const polys = cars.map((car, id) => {
    if (car.active) {
      return <Polyline key={id} path={car.records} />;
    }
  });
  const markers = cars.map((car, id) => {
    if (car.active) {
      return <Marker key={id} position={car.records[car.records.length - 1]} />;
    }
  });
  console.log(markers);

  return (
    <Map
      google={google}
      zoom={15}
      style={styles.mapStyles}
      initialCenter={{ lat: 11.196652155048742, lng: -74.22753810882568 }}
    >
      {markers}
      {polys}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDqV0nn953l7QAY_1GKVKcQO6Md2YW2W1o"
})(RealMap);
