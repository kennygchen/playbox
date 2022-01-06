import * as React from 'react'
import { Image, TouchableOpacity, StyleSheet, Text, View, SafeAreaView, Button, Dimensions } from 'react-native';

function getIconPath(name) {
	return `../${name}/icon.png`
}

const Games = [
	'FlipAndMatch',
]

function Item({name, nav}) {
	return (
		<View style={styles.item}>
			{/* TODO: Put an Icon of the App instead of a Button */}
			{/* <Button title={name} onPress={() => nav.navigate(name)}></Button> */}
			<TouchableOpacity styles={styles.overlay} onPress={() => nav.navigate(name)} >
      	<Image style={styles.logo} source={require('../FlipAndMatch/icon.png')} />
    	</TouchableOpacity>
		</View>
	)
}


export default function Home({route, navigation}) {
	return (
		<SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
			<SafeAreaView style={styles.outContainer}>
				<SafeAreaView style={styles.container}>
					{
						Games.map((e, i) => {
							return (
								<Item name={e} key={i} nav={navigation}></Item>
							);
						})
					}
				</SafeAreaView>
			</SafeAreaView>
		</SafeAreaView>
	)
}

const {height, width} = Dimensions.get('screen');


const styles = StyleSheet.create({
	outContainer:{
		flex:1,
		margin: width/50,
	},
  container: {
		flex:1,
		flexDirection: 'row',
		flexWrap: 'wrap',
  },
	item: {
		width: width*6/25,
		height: width*6/25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#000'
  },
  overlay: {
    backgroundColor: '#000',
    borderRadius: 80,
  }
});