import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: '#fff'}} >Open up App.js to start working on your app!</Text>
      <Text style={{color: '#fff'}}>Open up App.js to start working on your app!</Text>
      <Text style={{color: '#FFFF00'}}>Open up App.js to start working on your app!</Text>
      <Text style={{color: '#FFFF00'}}>Open up App.js to start working on your app!</Text>
      <Text style={{color: '#FFFF00'}}>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
