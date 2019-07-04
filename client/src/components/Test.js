import React, { Component } from "react";
import { Checkbox, Grid } from "semantic-ui-react";

export default class Test extends Component {
  constructor() {
    super();
    this.state = {
      cars: [
        { plate: "WHI-263", active: false },
        { plate: "CKN-363", active: false }
      ]
    };
  }
  handleChange = (ind, e) => {
    let cars = this.state.cars;
    cars[ind].active = !cars[ind].active;
    // console.table(cars);
    this.setState({ cars });
  };
  render() {
    return this.state.cars.map((car, ind) => {
      return (
        <Grid.Column key={car.plate} width={12}>
          <Checkbox
            checked={car.active}
            onChange={this.handleChange.bind(this, ind)}
            label={<label style={{ color: "white" }}>{car.plate}</label>}
          />
        </Grid.Column>
      );
    });
  }
}
