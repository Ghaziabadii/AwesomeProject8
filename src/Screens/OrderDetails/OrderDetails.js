import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  getItem
} from "react-native";
import { Card, CardItem, Body, Left, Icon, Button, Header } from "native-base";

export default class OrderDetails extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-bowtie" style={{ color: tintColor }} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      cart: props.navigation.getParam("cart"),
      totalAmount: props.navigation.getParam("totalAmount")
    };
  }

  render() {
    const CardScreen = this.state.cart.map((value, index) => {
      return (
        <Card style={styles.card} key={index}>
          <CardItem>
            <Left>
              <Body>
                <Text style={styles.text2}>{value.caption}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: value.imageURL }} style={styles.Image} />
          </CardItem>
        </Card>
      );
    });

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#eee" barStyle="dark-content" />
        <Text style={styles.text}>Total Amount: {this.state.totalAmount}</Text>
        <ScrollView>{CardScreen}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  card: { paddingBottom: 30, paddingLeft: 30, paddingRight: 30 },

  Image: {
    height: 200,
    width: null,
    flex: 1,
    borderRadius: 5
  },

  text: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center"
  },
  button: {
    margin: 15,
    backgroundColor: "#000000",
    borderRadius: 20
  },
  text2: {
    color: "#000000",
    fontSize: 15,
    textAlign: "center"
  }
});
