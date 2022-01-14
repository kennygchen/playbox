import { StyleSheet, Text, View, SafeAreaView, Button, StatusBar} from 'react-native';
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import FlipAndMatch from './components/FlipAndMatch/FlipAndMatch.jsx'
import Home from './components/Home/Home.jsx'

import { useFonts } from 'expo-font';
const Stack = createNativeStackNavigator();

export default function App() {
	const [loaded] = useFonts({
    Bomb: require('./modules/Status/bomb.ttf'),
  });

	if (!loaded) return null;
  return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} />
					<Stack.Screen name="FlipAndMatch" component={FlipAndMatch} options={{
						headerShown:false, 
						gestureEnabled: false
					}}/>
			</Stack.Navigator>
		</NavigationContainer>
		
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
});
