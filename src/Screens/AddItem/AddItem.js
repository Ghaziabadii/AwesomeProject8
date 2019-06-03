import React from "react";
import { Button, Form, Label, Item, Input } from "native-base";
import { View, Text, StyleSheet, Alert } from "react-native";
import firebase from "react-native-firebase";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Name: "",
      Email_ID: "",
      DOB: "",
      Phone_number: "",
      firebaseData: "Loading..."
    };
  }

  onValueChange(value, prop) {
    this.setState({
      [prop]: value
    });
  }

  componentDidMount = async () => {
    //calling firebase data
    try {
      firebase
        .firestore()
        .collection("users")
        .doc("LdFgKEqjlsr9J2COztK3")
        .onSnapshot(doc =>
          this.setState({
            firebaseData: doc.data()["Email_ID"]
          })
        );
    } catch (e) {
      console.warn("ERROR" + e);
    }
  };

  addItem = async () => {
    //pushing firebase data
    try {
      let user = await firebase
        .firestore()
        .collection("users")
        .add({
          DOB: this.state.DOB,
          Email_ID: this.state.Email_ID,
          Name: this.state.Name,
          PhoneNumber: this.state.Phone_number
        });
      Alert.alert("Dope bitch", "submited");
      this.props.navigation.navigate("Dashboard");
    } catch (e) {
      Alert.alert("Error", String(e));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signUp}>Add Info</Text>

        <Form>
          <Item floatingLabel style={styles.inputstyle}>
            <Label>Name</Label>
            <Input onChangeText={text => this.onValueChange(text, "Name")} />
          </Item>
          <Item floatingLabel style={styles.inputstyle}>
            <Label>Email - ID</Label>
            <Input
              onChangeText={text => this.onValueChange(text, "Email_ID")}
              value={this.state.firebaseData}
            />
          </Item>
          <Item floatingLabel style={styles.inputstyle}>
            <Label>Date of birth</Label>
            <Input onChangeText={text => this.onValueChange(text, "DOB")} />
          </Item>
          <Item floatingLabel last style={styles.inputstyle}>
            <Label>Phone-number</Label>
            <Input
              onChangeText={text => this.onValueChange(text, "Phone_number")}
            />
          </Item>
        </Form>

        <Button block style={styles.button} onPress={() => this.addItem()}>
          <Text style={{ color: "#FFF" }}> Submit</Text>
        </Button>
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
    marginBottom: 70
  }
});
