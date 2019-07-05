import React, { Component } from "react";
import NavBar from "./navegation/NavBar";
import RealMap from "./real/RealMap";
import CheckCars from "./real/CheckCars";
import { Grid, Segment } from "semantic-ui-react";
const styles = {
  text: {
    color: "white"
  },
  mapContainer: {
    height: "500px",
    padding: "0",
    margin: "0"
  }
};

export default class RealTime extends Component {
  constructor() {
    super();
    this.state = {
      path: [],
      mess: "Loading",
      cars: [],
      plates: [],
      records: [],
      userLoaded: false,
      mapLoaded: false
    };
  }
  async componentDidMount() {
    await this.getUser();
    await this.getRecords();
  }
  componentDidUpdate() {
    if (this.state.mapLoaded) {
      console.log("update after map loaded");
      setTimeout(async () => await this.getRecords(), 2000);
    }
  }
  getUser = async () => {
    const reqBody = { email: "will.canti2697@gmail.com" };
    const req = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" }
    };
    try {
      let res = await fetch("http://192.168.1.8:5000/track/api/getUser", req);
      let data = await res.json();
      let cars = [];
      let plates = [];
      data.cars.forEach(car => {
        cars = [...cars, { plate: car.plate, active: true, records: [] }];
        plates = [...plates, car.plate];
      });
      this.setState({
        plates,
        cars,
        userLoaded: true
      });
    } catch (err) {
      console.log(err);
    }
  };
  handleChangeCheckCar = (ind, e) => {
    let cars = this.state.cars;
    cars[ind].active = !cars[ind].active;
    // console.table(cars);
    this.setState({ cars });
  };

  getRecords = async () => {
    const { cars, plates } = this.state;
    const reqBody = { email: "will.canti2697@gmail.com", plates: plates };
    const req = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" }
    };
    try {
      const res = await fetch(
        "http://192.168.1.8:5000/track/api/lastPosArr",
        req
      );
      const curPosArr = await res.json();
      curPosArr.map((curPos, i) => {
        cars[i].records = [
          ...cars[i].records,
          { lat: curPos.latitud, lng: curPos.longitud }
        ];
      });
      this.setState({ cars, mapLoaded: true });
    } catch (error) {
      this.setState({ mess: "Was not able to connect to the dataBase" });
      console.log(error.message);
    }
  };

  render() {
    console.log("render");
    const { mapLoaded, mess, cars, userLoaded } = this.state;
    return (
      <div>
        <NavBar />
        <Grid stackable columns={2} divided padded inverted>
          <Grid.Column width={4}>
            <Segment color="black" inverted>
              {userLoaded ? (
                <CheckCars
                  cars={cars}
                  handleChange={this.handleChangeCheckCar}
                />
              ) : (
                <div>Loading</div>
              )}
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            {mapLoaded ? (
              <Segment color="black" inverted style={styles.mapContainer}>
                <RealMap cars={cars} />
              </Segment>
            ) : (
              <div style={styles.text}>{mess}</div>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
