//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Login from './App/Auth/login';
import HomeScreen from './App/Home/index';
import { useSelector } from 'react-redux';
import NavigationService from './App/Service/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthService from './App/Service/AuthService';
import { setuser } from './App/Redux/reducer/User';
import { useDispatch } from 'react-redux';
import RNBootSplash from "react-native-bootsplash";

const Stack = createStackNavigator();

// create a component
const App = () => {
  const { login_status, userData } = useSelector(state => state.User);
  const dispatch = useDispatch();
  useEffect(()=>{
    RNBootSplash.hide()
    checkUser()
  },[])
  const checkUser = async () => {
    let account = await AuthService.getAccount()
    if (account) {
      console.log("account", account);
      dispatch(setuser(account))
    } 
  }
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <NavigationContainer
        ref={r => NavigationService.setTopLevelNavigator(r)}
      >
        <Stack.Navigator
          initialRouteName='AppStack'
          screenOptions={{
            headerShown: false,
          }}
        >
          {
            login_status ?
              <Stack.Screen name="AppStack" component={HomeScreen} />
              :
              <Stack.Screen name="AuthStack" component={Login} />
          }


        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default App;
