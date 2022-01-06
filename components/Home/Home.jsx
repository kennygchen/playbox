import * as React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Button, Dimensions } from 'react-native';


const Games = [
	{
		name:'FlipAndMatch',
		iconPath: require('../FlipAndMatch/icon.png')		
	},
]


function Item({game, nav}) {
	return (
		<View style={styles.item}>
			<TouchableOpacity  onPress={() => nav.navigate(game.name)} >
      			<Image style={styles.logo} source={game.iconPath} />
    		</TouchableOpacity>
			<Text style={styles.appName}>{game.name}</Text>
		</View>
	)
}


export default function Home({route, navigation}) {
	return (
		<SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
			<SafeAreaView style={styles.container}>
					{
						Games.map((e, i) => <Item game={e} key={i} nav={navigation}></Item>)
					}
			</SafeAreaView>
		</SafeAreaView>
	)
}

const {height, width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  	container: {
		flex:1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: width/50,
  	},
	item: {
		width: width*6/25,
		height: width*6/25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
		flexDirection:'column',
		width: 60,
		height: 60,
		borderRadius: 20,
		backgroundColor: '#000',
  	},
	appName:{
		alignSelf:'center',
		fontSize: 13,
		padding: 3,
	}
});
