import React from "react";
import { Map, GoogleApiWrapper, Marker, Polyline } from "google-maps-react";
const styles = {
  mapStyles: {
    width: "100%",
    height: "100%",

  }
};
const RealMap = (props) => {
    const {google, currentPos, path} = props;
    return (
        <Map
          google={google}
          zoom={15}
          style={styles.mapStyles}
          initialCenter={currentPos}
        >
          <Marker position={currentPos} />
          <Polyline path={path}/>
        </Map>
    );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDqV0nn953l7QAY_1GKVKcQO6Md2YW2W1o"
})(RealMap);
