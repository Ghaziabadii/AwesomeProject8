import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class CardScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("pageData").caption
    };
  };

  constructor(props) {
    super(props);
    const pageData = props.navigation.getParam("pageData");
    //console.log(pageData);
    //console.log(props);
    this.state = {
      details: pageData.details,
      imageURL: pageData.imageURL,
      caption: pageData.caption
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: this.state.imageURL }} style={styles.Image} />
        <Text style={styles.text}>{this.state.caption}</Text>
        <Text style={styles.subText}>{this.state.details}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Image: {
    height: 200,
    width: "100%"
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },

  subText: {
    fontSize: 15,
    marginTop: 10,
    padding: 10
  }
});
