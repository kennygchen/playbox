import * as React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';



export default function Home({route, navigation}) {
	return (
		<SafeAreaView style={styles.container}>
			<Text>{route.params.p} props {route.params.b}</Text>
			<Button title='Go to Blank' onPress={() => navigation.navigate('Blank')}></Button>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});