import React from "react";
import { Card } from "semantic-ui-react";

const styles = {
  card: {
    background: "#121212",
    color: '#fff'
  },
  description:{
    color: '#fff'
  }
};
export default function CarData(props) {
  const { cars } = props;
  return cars.map((car, id) => {
    if (car.active) {
      return (
        <Card fluid key={id} color="grey">
          <Card.Content style={styles.card}>
            <Card.Header style={styles.description}>{car.plate}</Card.Header>
            <Card.Description style={styles.description}>
              <h5>Address</h5>
              <p>{car.address}</p>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    }
  });
}
