import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import FlipAndMatch from './components/FlipAndMatch/FlipAndMatch.jsx'
import Home from './components/Home/Home.jsx'
import Snake1 from './components/Snake-canvas'
import Snake2 from './components/Snake-views'

const Stack = createNativeStackNavigator();

export default function App() {
	

  return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name="FlipAndMatch" component={FlipAndMatch} options={{
					headerShown:false, 
					gestureEnabled: false
				}}/>
				<Stack.Screen name="Snake-canvas" component={Snake1} options={{
					headerShown:false, 
					gestureEnabled: false
				}}/>
				<Stack.Screen name="Snake-views" component={Snake2} options={{
					headerShown:false, 
					gestureEnabled: false
				}}/>
			</Stack.Navigator>
		</NavigationContainer>
  );
}