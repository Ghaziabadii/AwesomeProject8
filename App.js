import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { Platform } from "react-native";
import { Icon } from "native-base";

import Home from "./src/Screens/Home/Home";

// we will use these screens later in our AppNavigator
import AddItem from "./src/Screens/AddItem/AddItem";

// we will use these screens later in our DashboardTabNavigator
import Feed from "./src/Screens/Feed/Feed";
import Profile from "./src/Screens/Profile/Profile";
import Settings from "./src/Screens/Settings/Settings";

// CardScreen
import CardScreen from "./src/Components/CardScreen";

const FeedStack = createStackNavigator({
  Feed: {
    screen: Feed,
    /*
    navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    )
  };
    */
    navigationOptions: ({ navigation }) => {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" style={{ color: tintColor }} />
      );
      return {
        headerTitle: "Feed",
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  },
  CardScreen: {
    screen: CardScreen
  }
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Profile",
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,

    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Settings",

        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    ProfileStack,
    SettingsStack
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        ...Platform.select({
          android: {
            backgroundColor: "white"
          }
        })
      },
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      showLabel: true,
      showIcon: true
    },
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: { screen: DashboardStackNavigator },
    FeedStack,
    ProfileStack,
    SettingsStack
  },
  {
    initialRouteName: "Dashboard"
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Home,
    AddItem,
    AppDrawerNavigator
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
