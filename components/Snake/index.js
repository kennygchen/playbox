import React, { Component } from 'react';
import { Button, Dimensions, View} from 'react-native'
import Canvas from 'react-native-canvas'; // 0.1.20

export default function Snake({navigation}) {
	const [snake, setSnake] = React.useState([{x:0,y:0}]);
	const [food, setFood] = React.useState([]);
	const [direction, setDirection] = React.useState({x:1, y:0})
	

	React.useEffect(() => {
		const id = setInterval(() => {
			update();
		}, 500)
		return () => clearInterval(id);
	}, []);

	const update = () => {
		setSnake(snake => {
			const temp = [...snake];
			temp.push({
				x:snake[snake.length - 1].x + direction.x * 20, 
				y:snake[snake.length - 1].y + direction.y * 20, 
			});
			temp.shift();
			return temp;
		})
	}
	
	const draw = (board) => {
		board.fillStyle = 'purple';
		board.fillRect(0,0,300,300)
		for (let i = 0; i < snake.length; i++) {
			board.fillStyle = 'grey';
			board.fillRect(snake[i].x, snake[i].y, 20, 20)
		}

	}

	const {height, width} = Dimensions.get('screen')
  const handleCanvas = (canvas) => {
		if (canvas == null) return;
		canvas.width = 300;
		canvas.height = 300;
    draw(canvas.getContext('2d'))
  }

	return (
		<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
			<View style={{width: 320, height: 320, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000'}}>
				<Canvas ref={handleCanvas}/> 
			</View>
			<Button title="Back" onPress={() => navigation.navigate("Home")}></Button>
		</View>
	)
}