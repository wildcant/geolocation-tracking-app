import React, { Component } from "react";
import Map from "../common/Map";

class App extends Component {
  componentDidUpdate() {
    const { cars } = this.props;
    cars.map((car, id) => {
      this.markers[id].setPosition(car.records[car.records.length - 1]);
      this.polys[id].setPath(car.records);
      if (!car.active) {
        this.markers[id].setVisible(false);
        this.polys[id].setVisible(false);
      } else {
        this.markers[id].setVisible(true);
        this.polys[id].setVisible(true);
      }
      if(this.marker[id].getVisible()){}
    });
  }

  render() {
    const { cars } = this.props;
    let lastPos = cars[1].records[cars[1].records.length - 1];
    return (
      <Map
        id="myMap"
        options={{
          center: lastPos,
          zoom: 16
        }}
        onMapLoad={map => {
          this.markers = cars.map(car => {
            return new window.google.maps.Marker({
              position: car.records[car.records.length - 1],
              icon:
                "data:image/png;base64,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",
              map: map
            });
          });
          this.polys = cars.map(car => {
            return new window.google.maps.Polyline({
              path: car.records,
              map: map
            });
          });
        }}
      />
    );
  }
}

export default App;
