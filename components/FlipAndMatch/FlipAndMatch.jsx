import * as React from 'react'
import { StyleSheet, Button, Text, SafeAreaView, View, Image } from 'react-native'

const cardImage = [
	{"src": "../img/chrome.png"},
	{"src": "../img/edge.png"},
	{"src": "../img/firefox.png"},
	{"src": "../img/ie.png"},
	{"src": "../img/opera.png"},
	{"src": "../img/safari.png"},
]

export default function FlipAndMatch({navigation}) {
	const [flip, setFlip] = React.useState(0)
	const [cards, setCards] = React.useState([])

	const shuffle = () =>{
		const shuffled = [...cardImage, ...cardImage]
			.sort(() => 0.5 - Math.random())
			.map((card) => ({...card, id: Math.random()}))

		setCards(shuffled)
		setFlip(0)
	}

	console.log(cards, flip)

	return (
		<SafeAreaView style={style.container}>
			<Text style={style.titleText}>Flip And Match</Text>
			<Button title='New Game' onPress={shuffle}></Button>
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