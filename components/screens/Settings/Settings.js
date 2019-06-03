import React, { Component } from "react";
import { View, Text } from "react-native";
import { Icon } from "native-base";

export default class Settings extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-bowtie" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings</Text>
      </View>
    );
  }
}
