import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Dimensions,
  Pressable,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from './Icon.jsx'
import * as Font from 'expo-font'
import Status from '../../modules/Status'
import Menu from '../../modules/Status/menu.jsx'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlipCard from "../../modules/FlipCard.jsx"

// const coverImage = require("../FlipAndMatch/img/cover.png")
// const cardImage = [
//   { src: require("../FlipAndMatch/img/chrome.png"), id: 0 },
//   { src: require("../FlipAndMatch/img/edge.png"), id: 1 },
//   { src: require("../FlipAndMatch/img/firefox.png"), id: 2 },
//   { src: require("../FlipAndMatch/img/ie.png"), id: 3 },
//   { src: require("../FlipAndMatch/img/opera.png"), id: 4 },
//   { src: require("../FlipAndMatch/img/safari.png"), id: 5 },
// ];

const iconNames = [
	'airplane',
	'american-football',
	'star',
	'basketball',
	'bug',
	'bulb',
]

function FrontSide({card, onPress}) {
	if (!card.isShown) return null;
	return (
		<View style={styles.card_flipped_first_layer}>
			<View style={styles.card_flipped_second_layer}>
				<Ionicons name={card.name} size={40} color='#f7cf5c' />
			</View>
		</View>
	)
}

function BackSide({card, onPress}) {
	if (!card.isShown) return null;
	return (
		<TouchableOpacity 
		style={styles.card_first_layer} 
		onPress={onPress}
		>
			<View style={styles.card_second_layer}></View>
		</TouchableOpacity>
	)
}



function Item({ card, onPress }) {
  return (
		<FlipCard 
		side={card.isFlipped?1:0}
		style={styles.item}
		rotate='Y'
		front={<FrontSide card={card} onPress={onPress}/>}
		back={<BackSide card={card} onPress={onPress}/>}
		/>
  );
}

export default function FlipAndMatch({ navigation }) {
	const [turns, setTurns] = React.useState(0);
	const [cards, setCards] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [score, setScore] = React.useState({value: 0, count: 0});
	const [animation_value, setAnimation_Value] = React.useState(null);
	const animation = React.useRef(null)
	const gameOver = React.useRef(null)
	const [time, setTime] = React.useState(0);
	

	React.useEffect(() => {
		if (Platform.OS === 'ios') 
			StatusBar.setHidden(true)
		else {
			StatusBar.setBackgroundColor('#FF573300'); 
			StatusBar.setTranslucent(true)
		}
		shuffle()
		Font.loadAsync({'test': require('./assets/icomoon.ttf')}).then(setIsLoading(false))
	}, [])

	React.useEffect(() => {
		if (!animation_value) return;
		animation.current();
	}, [animation_value])

	React.useEffect(() => {
		if (score.count == 0) return;
		setAnimation_Value({score:10**(score.count)})
	}, [score])

	const shuffle= () => {
    const shuffled = [...iconNames, ...iconNames]
			.map((name, i) => ({name:name, isShown:true, isFlipped: false, id: i}))
			.sort(() => 0.5 - Math.random())
    setCards(shuffled);
		setTurns(0);
		setScore({value: 0, count: 0});
  	};

	const [cardOne, setCardOne] = React.useState(null)
	const [cardTwo, setCardTwo] = React.useState(null)
  
	const handleClick = (card) => {
		if (cardOne && cardTwo || (cardOne && cardOne.id == card.id)) return;
		cardOne ? setCardTwo(card) : setCardOne(card)
		card.isFlipped = true;
	}
  
	React.useEffect(() => {
		setTimeout(() =>{
			if(cardOne && cardTwo) {
				if(cardOne.name === cardTwo.name && cardOne.id != cardTwo.id) {
					setCards((cards) => {
						const newCards = [...cards];
						for (let i = 0; i < newCards.length; i++) {
							if (newCards[i].name === cardOne.name){
								newCards[i].isShown = false;
							}
						}
						setScore(s => ({value: s.value + 10**(s.count+1), count: s.count+1}));
						return newCards;
					})
					resetChoice();
				} else {
					setScore(s => ({...s, count: 0}))
					resetChoice();
				}
				setTurns(e => e + 1)
				for (let i = 0; i < cards.length; i++) {
					if (cards[i].isShown) return;
				}
				gameOver.current();
			}
		}, 500);
	}, [cardOne, cardTwo])
	  
	const resetChoice = () => {
		setCardOne(null)
		setCardTwo(null)
		setCards(cards => cards.map(card => ({...card, isFlipped: false})))
	}

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111", alignItems: 'center'}}>
			<SafeAreaView style={{width: "100%", height: 250, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={styles.titleText}>Flip And Match</Text>
				<Pressable style={styles.button} onPress={() => {
					setScore(s => ({value: s.value + 10**(s.count+1), count: s.count+1}));
				}}>
					<Text style={styles.buttonText}>Add 100 points</Text>
				</Pressable>
				{/* {!isLoading && <Icon name='Freesample' color='#fff' size={60}/>} */}
				{/* {!isLoading && <Icon name='ie' color='#fff' size={60}/>} */}
			</SafeAreaView>
		<SafeAreaView style={[styles.text, {flexDirection: 'row'}]}>
			<Text style={[styles.text, {width: 150, color: turns<=10?'white':'red'}]}>Turns: {turns}</Text>
		</SafeAreaView	>
		<SafeAreaView style={styles.container}>
			{cards.map((e, i) => (
			<Item
				key={i}
				card={e}
				onPress={() => {
					handleClick(e);
				}}
			/>
			))}
      	</SafeAreaView>
	  <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
					<Text style={styles.buttonText}>Back</Text>
				</Pressable>
			<Status 
			name='Score'
			value={score.value} 
			color={'white'} 
			replay={shuffle} 
			menu={<Menu/>} 
			animation={animation}
			animation_value={animation_value}
			gameOver={gameOver}
			gameOver_list={[
				"TITLEGame Over",
				`INT/Points:/${score.value}`,
				`INT/Turns:/${turns} -> ${(10 - turns)**3}`,
				"/",
				`INT/Final Score:/${score.value + (10 - turns)**3}`,
			]}
			/>
   </SafeAreaView>
  );
}

const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
		width: "100%",
		height: 300,
    	alignItems: "center",
    	justifyContent: "center",
    	flexWrap: "wrap",
		margin: width/50,
		flexDirection: 'row',
  	},
 	titleText: {
    	fontSize: 30,
			fontFamily: 'Bomb',
    	fontWeight: "bold",
    	alignSelf: "center",
    	alignItems: "center",
    	justifyContent: "center",
		color: 'white',
		padding: 20,
  	},
  	item: {
    	width: (width * 6) / 25,
    	height: (width * 6) / 25,
    	justifyContent: "center",
    	alignItems: "center",
  	},
 	card_first_layer: {
    	width: 60,
    	height: 60,
    	borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8ac97a'
  	},
  	card_second_layer: {
    	width: 45,
    	height: 45,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#589b42'
  	},
	card_flipped_first_layer: {
    	width: 60,
    	height: 60,
    	borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#e8e8e8'
	},
	card_flipped_second_layer: {
		position: 'absolute',
		top:-4,
		left:-4,
    	width: 60,
    	height: 60,
		borderRadius: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f26262'
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		paddingHorizontal: 32,
		borderRadius: 5,
		elevation: 3,
		backgroundColor: 'white',
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontFamily: 'Bomb',
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'black',
	},
	text: {
		fontSize: 20,
    	fontWeight: "bold",
    	alignSelf: "flex-start",
    	alignItems: "flex-start",
		fontFamily: 'Bomb',
		color: 'white',
		padding: 20,
	},
});
