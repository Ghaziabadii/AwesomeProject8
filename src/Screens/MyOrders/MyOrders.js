import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import firebase from "react-native-firebase";
import { Card, CardItem, Body, Left, Icon, Button, Header } from "native-base";
import { ScrollView } from "react-native-gesture-handler";

export default class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount = async () => {
    let orders = await firebase
      .firestore()
      .collection("Orders")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get();
    let ordersArray = [];
    for (let order of orders.docs) {
      ordersArray.push(order.data());
    }
    this.setState({
      orders: ordersArray
    });
  };

  render() {
    const ordersHistory = this.state.orders.map((value, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            this.props.navigation.navigate("OrderDetails", {
              cart: value.cart,
              totalAmount: value.totalAmount
            })
          }
        >
          <Card style={{ width: "100%" }} key={index}>
            <CardItem>
              <Text>Total Amount: {value.totalAmount}</Text>
            </CardItem>
            <CardItem>
              <Text>UserID: {value.uid}</Text>
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <ScrollView>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {ordersHistory}
        </View>
      </ScrollView>
    );
  }
}
