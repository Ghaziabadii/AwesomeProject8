import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity
} from "react-native";

import { Card, CardItem, Body, Left, Icon } from "native-base";
import firebase from "react-native-firebase";

export default class Feed extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount = async () => {
    //calling collection products
    //console.log("YEET3");
    try {
      let collection = await firebase
        .firestore()
        .collection("products")
        .get();
      //console.log("YEET");
      let productsArray = collection.docs;
      let products = [];
      for (let productDoc of productsArray) {
        products.push(productDoc.data());
        console.log(collection);
      }
      this.setState({
        products: products
      });
    } catch (e) {
      console.warn("Error" + e);
      //console.log("YEET2");
    }
  };

  render() {
    const { products } = this.state;
    const productsListing = products.map((value, index) => {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("CardScreen", {
              pageData: value
            });
          }}
          key={index}
        >
          <Card style={styles.card} key={index}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.text}>{value.caption}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{ uri: value.imageURL }} style={styles.Image} />
            </CardItem>
          </Card>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#eee" barStyle="dark-content" />
        <ScrollView>{productsListing}</ScrollView>
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
    fontSize: 15,
    textAlign: "center"
  }
});
