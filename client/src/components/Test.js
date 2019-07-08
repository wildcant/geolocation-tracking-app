import React, { Component } from "react";
import './Test.css';
export default class Test extends Component {
  componentDidMount() {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 11.195199752631972, lng: -74.2275268554688 },
      zoom: 13
    });
    var marker = new window.google.maps.Marker({
      position: { lat: 11.195199752631972, lng: -74.22775268554688 },
      clickable: true,
      map:  map
    });
    let contentString = '<b>Hello Wolrd!</b>';
    let infowindow = new window.google.maps.InfoWindow({
      content: contentString
    })
    marker.addListener("dbclick", function() {
      infowindow.open(map, marker);
    });
  }
  render() {
    return <div style={{ width: "100%", height: "500px" }} id={"map"} />;
  }
}
