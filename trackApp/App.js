import React, { Component } from "react";
import {
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import Header from "./components/Header";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      location: "waiting",
      lat: null,
      lon: null,
      granted: null,
      email: "will.canti2697@gmail.com",
      number: "CKN-363",
      success: null,
      send: false,
      mess: "Send geolocation"
    };
  }

  async componentDidMount() {
    await this.requestLocationPermision();
  }

  
  handleEmail = email => {
    this.setState({ email });
  };
  handleNumber = number => {
    this.setState({ number });
  };
  startSend = () => {
    this.interval = setInterval(() => {
      this.getLocation();
      this.sendLocation();
    }, 2000);
    this.setState({ send: !this.state.send });
  };
  stopSend = () => {
    clearInterval(this.interval);
    this.setState({ send: !this.state.send });
  };
  getLocation = () => {
    if ("geolocation" in navigator) {
      console.log("geolocation available");
      navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
        this.setState({ lat, lon });
      });
    } else {
      this.setState({ lat: "not available", lon: "not available" });
    }
  };
  sendLocation = () => {
    let { email, number, lat, lon } = this.state;
    console.log(email, number)
    req = {
      email: email,
      plate: number,
      lat: lat,
      lon: lon,
      rpm: 180
    };

    options = {
      method: "POST",
      body: JSON.stringify(req),
      headers: { "Content-Type": "application/json" }
    };
    fetch("http://3.83.109.19:5000/track/api/rec", options)
      .then(res => res.text())
      .then(data => {
        if (data !== "not found") {
          console.log(data);
          this.setState({ success: "Location has been sent" });
        }
      })
      .catch(err => console.log(err));
  };
  requestLocationPermision = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Track location",
          message: "Track App needs access to your location",
          buttonNeutral: "Ask me later",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTE) {
        this.setState({ granted });
      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.container}>
          <View>
            <Text style={textStyle.title}>Latitude</Text>
            <Text style={textStyle.sub}>{this.state.lat}</Text>
          </View>
          <View>
            <Text style={textStyle.title}>Longitude</Text>
            <Text style={textStyle.sub}>{this.state.lon}</Text>
          </View>
          <TextInput
            style={textStyle.title}
            placeholderTextColor="#fff"
            placeholder="Email"
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={textStyle.title}
            placeholderTextColor="#fff"
            placeholder="License"
            onChangeText={this.handleNumber}
          />
          <View>
            <Button
              onPress={this.startSend}
              disabled={this.state.send}
              title="Start sending"
            />
            <Button
              onPress={this.stopSend}
              disabled={!this.state.send}
              title="Stop sending"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: "#3a3a3a",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
const textStyle = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 25,
    margin: "auto",
    fontWeight: "bold",
    fontFamily: "sans-serif-light"
  },
  sub: {
    color: "#fff",
    fontSize: 15,
    paddingTop: 0,
    marginTop: 0,
    margin: "auto",
    fontWeight: "bold",
    fontFamily: "sans-serif-light",
    textAlign: "center"
  }
});
