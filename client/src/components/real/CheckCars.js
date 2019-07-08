import React from "react";
import { Checkbox, Menu } from "semantic-ui-react";

export default function Test(props) {
  const { cars, handleChange } = props;
  return cars.map((car, ind) => {
    return (
      <Menu.Item key={car.plate}>
      <Checkbox
        checked={car.active}
        onChange={handleChange.bind(this, ind)}
        label={<label style={{ color: "white", fontSize:"16px" }}>{car.plate}</label>}
      />
      </Menu.Item>
    );
  });
}
