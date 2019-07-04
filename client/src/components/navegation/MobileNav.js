import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};
const styles = {
  navItem: {
    padding: "0 10px 5px 10px",
    fontSize: "16px"
  },
  navItemToggle: {
    fontSize: "16px",
    padding: "26px",
    margin: "auto"
  },
  navBrand: {
    padding: "0 0 5px 0",
    margin: 0,
    fontSize: "20px"
  }
};
class MobileContainer extends Component {
  state = {
    username: "Wilmer",
    activeItem: "RealTime"
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  handleSidebarHide = () => this.setState({ sidebarOpened: false });
  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { sidebarOpened, username, activeItem } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
        style={{ overflow: "hidden" }}
      >
        <Sidebar
          as={Menu}
          animation="overlay"
          direction="bottom"
          inverted
          onHide={this.handleSidebarHide}
          visible={sidebarOpened}
          style={{ overflow: "hidden" }}
        >
          <Menu.Item
            as="a"
            style={styles.navItemToggle}
            name="RealTime"
            active={activeItem === "RealTime"}
            onClick={this.handleItemClick}
          >
            RealTime
          </Menu.Item>
          <Menu.Item
            as="a"
            style={styles.navItemToggle}
            name="Historical"
            active={activeItem === "Historical"}
            onClick={this.handleItemClick}
          >
            Historical
          </Menu.Item>
          <Menu.Item
            as="a"
            style={styles.navItemToggle}
            name="Historical"
            onClick={this.handleItemClick}
          >
            Log out
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment inverted textAlign="center" vertical>
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item style={styles.navBrand}>TrackApp</Menu.Item>
                <Menu.Menu position="right">
                  <Menu.Item as="a" active={false} style={styles.navItem}>
                    Welcome {username}
                  </Menu.Item>
                  <Menu.Item style={styles.navItem} onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
            </Container>
          </Segment>

        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

export default MobileContainer;
