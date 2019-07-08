import React, { Component } from "react";
import NavBar from "./navegation/NavBar";
import RealMap from "./real/RealMap";
import CheckCars from "./real/CheckCars";
import CarData from "./real/CarData";
import ChooseBar from "./real/ChooseBar";
import {
  Grid,
  Segment,
  Button,
  Icon,
  Image,
  Menu,
  Sidebar,
  Loader,
  Dimmer
} from "semantic-ui-react";
const styles = {
  text: {
    color: "white"
  },
  mapContainer: {
    height: "500px",
    padding: "0",
    margin: "0"
  },
  sidebar: {
    height: "450px",
    backgroundColor: "#121212",
    padding: "0",
    margin: "0"
  },
  btn: {
    fontSize: "20px",
    marginBottom: "22px"
  },
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
      mapLoaded: false,
      fitBounds: true,
      controlBoundMess: "Following",
      visible: false,
      chooseCarMess: "Choose cars to show"
    };
    this.btn = React.createRef();
  }

  toggleSideBar = () => {
    let { visible, chooseCarMess } = this.state;
    visible = !visible;
    if (visible) {
      chooseCarMess = "Hide";
    } else {
      chooseCarMess = "Choose cars to show";
    }
    this.setState({ visible, chooseCarMess });
  };

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
      let res = await fetch("http://3.83.109.19:5000/track/api/getUser", req);
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
        "http://3.83.109.19:5000/track/api/lastPosArr",
        req
      );
      const curPosArr = await res.json();
      curPosArr.map(async (curPos, i) => {
        const addressRes = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?&latlng=${
            curPos.latitud
          },${curPos.longitud}&key=AIzaSyDqV0nn953l7QAY_1GKVKcQO6Md2YW2W1o`
        );
        const address = await addressRes.json();
        if (address.results[2]) {
          cars[i].address = address.results[2].formatted_address;
        } else {
          cars[i].address = "not found";
        }
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

  handleBounds = () => {
    let { fitBounds, controlBoundMess } = this.state;
    fitBounds = !fitBounds;
    if (fitBounds) {
      controlBoundMess = "Don't follow";
    } else {
      controlBoundMess = "Follow";
    }
    this.setState({
      fitBounds,
      controlBoundMess
    });
  };
  render() {
    console.log("render");
    const {
      mapLoaded,
      cars,
      userLoaded,
      fitBounds,
      controlBoundMess,
      visible,
      chooseCarMess
    } = this.state;
    console.log(visible);
    return (
      <div>
        <NavBar />
        <Grid stackable columns={2} divided padded inverted>
          <Grid.Column width={4}>
            {userLoaded ? (
              <Segment inverted style={styles.sidebar}>
                <Button
                  inverted
                  color="blue"
                  fluid
                  compact
                  active={visible}
                  onClick={this.toggleSideBar}
                >
                  {chooseCarMess}
                </Button>
                <Sidebar.Pushable
                  style={{ backgroundColor: "rgb(1,1,1,0.9)" }}
                  as={Segment}
                >
                  <Sidebar
                    style={{ width: "100%" }}
                    as={Menu}
                    animation="overlay"
                    icon="labeled"
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={visible}
                    width="thin"
                  >
                    <CheckCars
                      cars={cars}
                      handleChange={this.handleChangeCheckCar}
                    />
                  </Sidebar>

                  <CarData cars={cars} />
                </Sidebar.Pushable>
                <Sidebar.Pusher dimmed={visible} />
              </Segment>
            ) : (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
                <Segment style={styles.sidebar} />
              </Segment>
            )}
          </Grid.Column>
          <Grid.Column width={12}>
            {mapLoaded ? (
              <Segment color="black" inverted style={styles.mapContainer}>
                <button
                  style={styles.btn}
                  ref={this.btn}
                  onClick={this.handleBounds}
                >
                  {controlBoundMess}
                </button>
                <RealMap cars={cars} btnBounds={this.btn} bounds={fitBounds} />
              </Segment>
            ) : (
              <Segment>
                <Dimmer active>
                  <Loader />
                </Dimmer>
                <Segment style={styles.mapContainer} />
              </Segment>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
