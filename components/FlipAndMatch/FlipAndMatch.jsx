import * as React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Button, Dimensions } from 'react-native'

const cardImage = [
	{src: require('../FlipAndMatch/img/chrome.png'), id: 0},
	{src: require('../FlipAndMatch/img/edge.png'), id: 1},
	{src: require('../FlipAndMatch/img/firefox.png'), id: 2},
	{src: require('../FlipAndMatch/img/ie.png'), id: 3},
	{src: require('../FlipAndMatch/img/opera.png'), id: 4},
	{src: require('../FlipAndMatch/img/safari.png'), id: 5},
]

function Item({source, addFlip}) {
	return (
		<View style={styles.item}>
			<TouchableOpacity  onPress={addFlip} >
      			<Image style={styles.card} source={source} />
    		</TouchableOpacity>
		</View>
	)
}

export default function FlipAndMatch({navigation}) {
	const [flip, setFlip] = React.useState(0)
	const [cards, setCards] = React.useState([])

	const shuffle = () =>{
		const shuffled = [...cardImage, ...cardImage]
			.sort(() => 0.5 - Math.random())
		setCards(shuffled)
		setFlip(0)
	}

	console.log(cards, flip)

	return (
		<SafeAreaView style={{flex:1, backgroundColor:'#d6efff'}}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.titleText}>Flip And Match</Text>
				<Button title='New Game' onPress={shuffle}></Button>
				{
					cards.map((e, i) =>
							<Item key={i} source={e.src} id={e.id} addFlip={() => {
								setFlip(e => e + 1);
								console.log('hey');
							}}/>
					)
				}
				<Button title='Back' onPress={() => navigation.navigate('Home')}></Button>
			</SafeAreaView>
		</SafeAreaView>
	)
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d6efff',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
	  },
	titleText:{
		fontSize: 30,
		fontWeight: "bold",
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	item: {
		width: width*7/25,
		height: width*7/25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: 60,
		height: 60,
		borderRadius: 20,
		backgroundColor: '#000',
  	},
});