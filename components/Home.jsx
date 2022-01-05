import * as React from 'react'
import { Text, View, SafeAreaView, Button } from 'react-native'



export default function Home({route, navigation}) {
	return (
		
		<SafeAreaView>
			<Text>{route.params.p} props {route.params.b}</Text>
			<Button title='Go to Blank' onPress={() => navigation.navigate('Blank')}></Button>
		</SafeAreaView>
	)
}