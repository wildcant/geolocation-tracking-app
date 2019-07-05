import React, { Component } from "react";
import Map from "../common/Map";

class App extends Component {
  componentDidUpdate() {
    const { cars } = this.props;
    console.log(cars[0], cars[1]);
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
          zoom: 15
        }}
        onMapLoad={map => {
          this.markers = cars.map(car => {
            return new window.google.maps.Marker({
              position: car.records[car.records.length - 1],
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
