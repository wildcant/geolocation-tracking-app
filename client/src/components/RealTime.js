import React, { Component } from "react";
import NavBar from "./navegation/NavBar";
import RealMap from "./real/RealMap";
import CheckCars from "./real/CheckCars";
import { Grid, Container, Segment } from "semantic-ui-react";
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
      currentPos: null,
      path: [],
      mess: "Loading",
      cars: [],
      plates: [],
      userLoaded: false
    };
  }
  async componentDidMount() {
    // setInterval(async () => {
    //   await this.getLastPosition();
    // }, 5000);
    // await this.getLastPosition();
    await this.getUser();
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
        cars = [...cars, { plate: car.plate, active: true }];
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
    let plates = [];
    cars[ind].active = !cars[ind].active;
    cars.forEach(car => {
      if (car.active) {
        plates = [...plates, car.plate];
      }
    });
    console.table(plates);
    // console.table(cars);
    this.setState({ cars, plates });
  };
  getCurrentPosition = async () => {
    const reqBody = { email: "will.canti2697@gmail.com", plate: "CKN-363" };
    const req = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" }
    };
    try {
      const res = await fetch("http://192.168.1.8:5000/track/api/lastPos", req);
      const coords = await res.json();
      let actPos = { lat: coords.latitud, lng: coords.longitud };
      this.setState({
        currentPos: actPos,
        path: [...this.state.path, actPos],
        loaded: true
      });
    } catch (error) {
      this.setState({ mess: "Was not able to connect to the dataBase" });
      console.log(error.message);
    }
  };
  render() {
    const { currentPos, path, loaded, mess, cars, userLoaded } = this.state;
    console.log(this.state.plates);
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
            {loaded ? (
              <Segment color="black" inverted style={styles.mapContainer}>
                <RealMap currentPos={currentPos} path={path} />
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
