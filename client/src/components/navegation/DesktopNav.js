import React, { Component } from "react";
import { Menu, Responsive, Segment } from "semantic-ui-react";
const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

const styles = {
  navItem: {
    padding: "0 20px 5px 20px",
    fontSize: "16px"
  },
  navBrand: {
    padding: "0 0 5px 0",
    margin: 0,
    fontSize: "20px"
  }
};
class DesktopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "RealTime",
      username: "Wilmer"
    };
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, username } = this.state;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Segment inverted>
          <Menu inverted pointing secondary>
            <Menu.Item as="h3" style={styles.navBrand}>TrackApp</Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item as="p" style={styles.navItem}>
                Welcome {username}
              </Menu.Item>
              <Menu.Item
                as="a"
                style={styles.navItem}
                name="RealTime"
                active={activeItem === "RealTime"}
                onClick={this.handleItemClick}
              >
                RealTime
              </Menu.Item>
              <Menu.Item
                as="a"
                style={styles.navItem}
                name="Historical"
                active={activeItem === "Historical"}
                onClick={this.handleItemClick}
              >
                Historical
              </Menu.Item>
              <Menu.Item as="a" style={styles.navItem}>
                Log out
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Segment>
      </Responsive>
    );
  }
}
export default DesktopNav;
