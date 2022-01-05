import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Blank from './components/Blank.jsx'
import Home from './components/Home.jsx'

const Stack = createNativeStackNavigator();

export default function App() {


  return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown:false}}>
				<Stack.Screen name='Home' component={Home} initialParams={{p:2, b:0}}/>
				<Stack.Screen name='Blank' component={Blank}/>
			</Stack.Navigator>
		</NavigationContainer>
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
