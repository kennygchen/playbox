import * as React from 'react'
import { Button, Text, SafeAreaView } from 'react-native'

export default function FlipAndMatch({navigation}) {
	return (
		<SafeAreaView style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Yah !!</Text>
			<Text>Card flipping game!!!</Text>
			<Button title='Back' onPress={() => navigation.navigate('Home')}></Button>
		</SafeAreaView>
	)
}