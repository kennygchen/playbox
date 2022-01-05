import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Blank from './components/Blank.jsx'
import Home from './components/Home.jsx'

const Stack = createNativeStackNavigator();

export default function App() {


  return (
		// <NavigationContainer>
		// 	<Stack.Navigator>
		// 		<Stack.Screen name='Home' component={Home}/>
		// 		<Stack.Screen name='Blank' component={Blank}/>
		// 	</Stack.Navigator>
		// </NavigationContainer>
		<SafeAreaView style={styles.container}>
			<Home p={0} b={2}></Home>
		</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
