import React from "react";


const styles = {
  btn: {
    fontSize: "20px",
    marginBottom: '22px',
    opacity: 0,
  }
}
export default class Map extends React.Component {
  constructor(props){
    super(props);
    this.btn = React.createRef();
  }
  componentDidMount() {
    this.map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 41.0082, lng: 28.9784 },
      zoom: 8
    });
    this.map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(this.btn.current);
    this.btn.current.style.opacity = 1;
  }
  componentDidUpdate() {
    var NEW_ZEALAND_BOUNDS = {
      north: -34.36,
      south: -47.35,
      west: 166.28,
      east: -175.81
    };
    this.map.fitBounds(NEW_ZEALAND_BOUNDS);
    console.log(this.map);
  }
  handle = () => {
    this.setState({});
  };
  render() {
    console.log("render");
    return (
      <div>
        <div style={{ width: 500, height: 500 }} id="map" />
        <button style={styles.btn} ref={this.btn} onClick={this.handle}>click</button>
      </div>
    );
  }
}
