import * as React from 'react'
import { Text, View, SafeAreaView, Button } from 'react-native'



export default function Home({p, b, navigation}) {
	return (
		<SafeAreaView>
			<Text>{p} props {b}</Text>
			<Button title='Go to Blank' onPress={() => navigation.navigate('Blank')}></Button>
		</SafeAreaView>
	)
}