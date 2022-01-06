import * as React from 'react'
import { StyleSheet, Button, Text, SafeAreaView, View } from 'react-native'

export default function FlipAndMatch({navigation}) {
	return (
		<SafeAreaView style={style.container}>
			<Text style={style.titleText}>Flip And Match</Text>
			<Text>Card flipping game!!!</Text>
			<Button title='Back' onPress={() => navigation.navigate('Home')}></Button>
		</SafeAreaView>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	titleText:{
		fontSize: 30,
		fontWeight: "bold",
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
});