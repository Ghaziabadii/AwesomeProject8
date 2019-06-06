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
import firebase from "react-native-firebase";
import AwesomeAlert from "react-native-awesome-alerts";

export default class Cart extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-bowtie" style={{ color: tintColor }} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      totalAmount: 0,
      showAlert: false
    };
  }

  componentDidMount = async () => {
    let itemList = await AsyncStorage.getItem("CardScreen");
    if (itemList) {
      let itemArray = JSON.parse(itemList);
      let totalAmount = 0;
      for (let product of itemArray) {
        totalAmount += product["price"];
      }

      this.setState({
        cart: itemArray,
        totalAmount: totalAmount
      });
    }
  };

  checkOut = async () => {
    this.showAlert();
    try {
      let orderID = new Date().getTime();
      await firebase
        .firestore()
        .collection("Orders")
        .doc(String(orderID))
        .set(
          {
            cart: this.state.cart,
            totalAmount: this.state.totalAmount,
            uid: firebase.auth().currentUser.uid,
            orderID: orderID
          },
          {
            merge: true
          }
        );
      this.hideAlert();
      AsyncStorage.clear();
      Alert.alert("Success", "Order placed successfully");
    } catch (e) {
      Alert.alert("Error", e);
      console.log(e);
    }
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const CardScreen = this.state.cart.map((value, index) => {
      return (
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
      );
    });

    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#eee" barStyle="dark-content" />
        <ScrollView>{CardScreen}</ScrollView>
        <Button block style={styles.button}>
          <Text style={styles.text2} onPress={() => this.checkOut()}>
            Checkout: Rs. {this.state.totalAmount}
          </Text>
        </Button>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          confirmButtonColor="#DD6B55"
        />
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
  },
  button: {
    margin: 15,
    backgroundColor: "#000000",
    borderRadius: 20
  },
  text2: {
    color: "gray"
  }
});
