import React, { Component } from "react";
import { Checkbox, Grid } from "semantic-ui-react";

export default function Test(props) {
    const {cars, handleChange} = props;
    return cars.map((car, ind) => {
      return (
        <Grid.Column key={car.plate} width={12}>
          <Checkbox
            checked={car.active}
            onChange={handleChange.bind(this, ind)}
            label={<label style={{ color: "white" }}>{car.plate}</label>}
          />
        </Grid.Column>
      );
    });
}
