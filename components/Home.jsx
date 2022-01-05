import * as React from 'react'
import { Text, View} from 'react-native'



export default function Home({p, b}) {
	return (
		<Text>{p} props {b}</Text>
	)
}