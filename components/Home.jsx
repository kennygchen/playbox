import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button, Dimensions } from 'react-native';

function Item({name, nav}) {
	return (
		<View style={styles.item}>
		{ // TODO: Replace Button with Icon }
			<Button title={name} onPress={() => nav.navigate('Blank')}></Button>
		</View>
	)
}


export default function Home({route, navigation}) {
	const arr = [1,2,3,4,5,6,7];
	return (
		<SafeAreaView style={{flex:1, backgroundColor: '#000'}}>
			<SafeAreaView style={styles.outContainer}>
				<SafeAreaView style={styles.container}>
					{
						arr.map((e, i) => {
							return (
								<Item name={e+''} key={i} nav={navigation}></Item>
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
		margin: width/26,
    backgroundColor: '#000',
	},
  container: {
		flex:1,
		flexDirection: 'row',
		flexWrap: 'wrap',
  },
	item: {
		width: width/13*3,
		height: width/13*3,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: '#ddd',
		borderWidth: 1,
	}
});
