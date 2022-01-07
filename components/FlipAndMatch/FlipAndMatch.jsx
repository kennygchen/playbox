import * as React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Dimensions,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Icon from './Icon.jsx'
import * as Font from 'expo-font'

const coverImage = require("../FlipAndMatch/img/cover.png")
const cardImage = [
  { src: require("../FlipAndMatch/img/chrome.png"), id: 0 },
  { src: require("../FlipAndMatch/img/edge.png"), id: 1 },
  { src: require("../FlipAndMatch/img/firefox.png"), id: 2 },
  { src: require("../FlipAndMatch/img/ie.png"), id: 3 },
  { src: require("../FlipAndMatch/img/opera.png"), id: 4 },
  { src: require("../FlipAndMatch/img/safari.png"), id: 5 },
];

const iconNames = [
	'airplane',
	'american-football',
	'star',
	'basketball',
	'bug',
	'bulb',
]

function Item2({ card, onPress }) {
  return (
    <View style={styles.item}>
      {card.isShown && <TouchableOpacity onPress={onPress}>
        <Image style={styles.card_first_layer} source={card.isFlipped? card.src : coverImage} />
      </TouchableOpacity>}
    </View>
  );
}

function Item({ card, onPress }) {
  return (
    <View style={styles.item}>
			<View>
				{
					card.isShown && 
					<TouchableOpacity 
					style={card.isFlipped?styles.card_flipped_first_layer:styles.card_first_layer} 
					onPress={() => { onPress(); card.isFlipped = !card.isFlipped; }}>
						<View style={card.isFlipped?styles.card_flipped_second_layer:styles.card_second_layer}>
							{card.isFlipped && <Ionicons name={card.name} size={40} color='#f7cf5c' />}
						</View>
					</TouchableOpacity>
				}
			</View>
    </View>
  );
}

export default function FlipAndMatch({ navigation }) {
  const [flip, setFlip] = React.useState(0);
  const [cards, setCards] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		shuffle()
		Font.loadAsync({'test': require('./assets/icomoon.ttf')}).then(setIsLoading(false))
	}, [])

  const shuffle2 = () => {
    const shuffled = [...cardImage, ...cardImage]
			.sort(() => 0.5 - Math.random())
			.map((card) => ({...card, isShown:true, isFlipped: false}))
    setCards(shuffled);
    setFlip(0);
  };

	const shuffle= () => {
    const shuffled = [...iconNames, ...iconNames]
			.map((name) => ({name:name, isShown:true, isFlipped: true}))
			.sort(() => 0.5 - Math.random())
    setCards(shuffled);
    setFlip(0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111", alignItems: 'center'}}>
			<SafeAreaView style={{width: "100%", height: 250, justifyContent: 'center', alignItems: 'center'}}>
				<Text style={styles.titleText}>Flip And Match</Text>
				<Button title="New Game" onPress={shuffle}></Button>
				{/* {!isLoading && <Icon name='Freesample' color='#fff' size={60}/>} */}
				{/* {!isLoading && <Icon name='ie' color='#fff' size={60}/>} */}
			</SafeAreaView>
      <SafeAreaView style={styles.container}>
        {cards.map((e, i) => (
          <Item
            key={i}
            card={e}
            onPress={() => {
              setFlip((e) => e + 1);
            }}
          />
        ))}
      </SafeAreaView>
      <Button title="Back" onPress={() => navigation.navigate("Home")}></Button>
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
    fontWeight: "bold",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
		color: 'white',
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
	}
});
