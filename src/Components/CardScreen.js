import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  AsyncStorage
} from "react-native";
import { Button } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import AwesomeAlert from "react-native-awesome-alerts";

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
      caption: pageData.caption,
      price: pageData.price,
      showAlert: false
    };
  }

  addToCart = async () => {
    let currentProduct = {
      details: this.state.details,
      imageURL: this.state.imageURL,
      caption: this.state.caption,
      price: this.state.price
    };

    let productArr = [];

    let pressProductArr = JSON.parse(await AsyncStorage.getItem("CardScreen"));

    if (pressProductArr != null && pressProductArr.length > 0) {
      productArr = pressProductArr;
    }

    productArr.push(currentProduct);

    try {
      await AsyncStorage.setItem("CardScreen", JSON.stringify(productArr));
      Alert.alert("Success", "Item has been added to cart");
    } catch (e) {
      Alert.alert("Error", String(e));
    }
  };

  clearCart = async () => {
    await AsyncStorage.clear();
  };

  showCart = () => {
    this.props.navigation.navigate("Cart");
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
    const { showAlert } = this.state;
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: this.state.imageURL }} style={styles.Image} />

          <Text style={styles.text1}>{this.state.caption}</Text>
          <Text style={styles.subText}>{this.state.details}</Text>

          <Button block style={styles.button} onPress={() => this.addToCart()}>
            <Text style={styles.text2}> Add Item </Text>
          </Button>
          <Button block style={styles.button} onPress={() => this.clearCart()}>
            <Text style={styles.text2}> Clear Cart </Text>
          </Button>
          <Button block style={styles.button} onPress={() => this.showCart()}>
            <Text style={styles.text2}> Show Cart </Text>
          </Button>
          <Button block style={styles.button} onPress={() => this.showAlert()}>
            <Text style={styles.text2}> Alert </Text>
          </Button>
          <AwesomeAlert
            show={showAlert}
            showProgress={true}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            confirmButtonColor="#DD6B55"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  },

  Image: {
    height: 200,
    width: "100%"
  },

  text1: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20
  },

  subText: {
    fontSize: 15,
    marginTop: 10,
    padding: 10
  },
  button: {
    marginTop: 5,
    backgroundColor: "#afeeee",
    borderRadius: 20
  },
  text2: {
    color: "gray"
  }
});
