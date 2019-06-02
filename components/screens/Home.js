import React from "react";
import { Button, Form, Label, Item, Input } from "native-base";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import firebase from "react-native-firebase";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: ""
    };
  }

  onValueChange(value, prop) {
    this.setState({
      [prop]: value
    });
  }

  createUser = async () => {
    //To create a user
    try {
      let user = await firebase
        .auth()
        .signInWithEmailAndPassword(
          this.state.Username,
          String(this.state.Password)
        );
      this.props.navigation.navigate("AddItem");
    } catch (e) {
      Alert.alert("Error", String(e));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/airbnb-logo.png")}
          style={styles.logo}
        />

        <Text style={styles.signUp}>Login</Text>

        <Form>
          <Item floatingLabel style={styles.inputstyle}>
            <Label>Email-ID</Label>
            <Input
              onChangeText={text => this.onValueChange(text, "Username")}
            />
          </Item>
          <Item floatingLabel last style={styles.inputstyle}>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              onChangeText={text => this.onValueChange(text, "Password")}
            />
          </Item>
        </Form>

        <Button block style={styles.button} onPress={() => this.createUser()}>
          <Text style={styles.text}> Login </Text>
        </Button>

        <View />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  logo: {
    backgroundColor: "black",
    width: 75,
    height: 75,
    marginTop: 50,
    marginBottom: 40,
    borderRadius: 7
  },

  signUp: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    color: "black",
    paddingBottom: 10
  },

  inputstyle: {
    fontSize: 10,
    padding: 10,
    left: 0,
    alignSelf: "center",
    borderRadius: 20
  },

  button: {
    marginTop: 30,
    margin: 10,
    backgroundColor: "#000000",
    borderRadius: 20,
    marginBottom: 200
  },

  text: {
    color: "#FFF"
  }
});
