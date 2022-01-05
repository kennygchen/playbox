import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Blank from './components/Blank.jsx'
import Home from './components/Home.jsx'

const Stack = createNativeStackNavigator();

export default function App() {
	const [p, setP] = React.useState(2)
	const [b, setB] = React.useState(0)
	

  return (
		// <NavigationContainer>
		// 	<Stack.Navigator screenOptions={{headerShown:true}}>
		// 		<Stack.Screen name='Home' component={Home} initialParams={{p:p, b:b}} />
		// 		<Stack.Screen name='Blank' component={Blank}/>
		// 	</Stack.Navigator>
		// </NavigationContainer>
		<SafeAreaView style={styles.container}>
			<Text>{p}</Text>
			<Text>{b}</Text>
			<Button title='addP' onPress={() => setP(p + 1)}></Button>
			<Button title='addB' onPress={() => setB(b + 1)}></Button>
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
