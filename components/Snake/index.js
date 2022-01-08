import React, { Component } from 'react';
import { Text, Button, Dimensions, View} from 'react-native'
import Canvas from 'react-native-canvas'; // 0.1.20

export default function Snake({navigation}) {
	const init_game = {
		snake: [{x: 0, y: 0}, {x : 0, y: 0}],
		food: [],
		foodCD: 0,
		direction: {x: 1, y: 0},
	}
	const maxFoodCD = 2, blockWidth = 30, maxBlock = 10, maxWidth = blockWidth * maxBlock;
	const [game, setGame] = React.useState(init_game);


	React.useEffect(() => {
		const id = setInterval(() => {
			update();
		}, 500)
		return () => clearInterval(id);
	}, []);

	function getNewFood(snake) {
		let flag = true;
		let x,y;
		while (flag){
			x = Math.floor(Math.random() * maxBlock) * blockWidth;
			y = Math.floor(Math.random() * maxBlock) * blockWidth;
			flag = false;
			for (let i = 0; i < snake.length; i++) {
				flag = flag || (x == snake[i].x && y == snake[i].y)
			}
		}
		return ({x:x, y:y})
	}

	const update = () => {
		setGame(game => {
			// Calculate the new position
			const newPos = {
				x: (game.snake[game.snake.length - 1].x + game.direction.x * blockWidth + maxWidth) % maxWidth, 
				y: (game.snake[game.snake.length - 1].y + game.direction.y * blockWidth + maxWidth) % maxWidth , 
			}

			// Create new food according to foodCD
			const newFood = [...game.food];
			if (game.foodCD == maxFoodCD) {
				newFood.push(getNewFood(game.snake));
			} 

			// Identify any food being eaten
			let eat = false;
			for (let i = 0; i < newFood.length; i++) {
				if (newFood[i].x == newPos.x && newFood[i].y == newPos.y) {
					eat = true;
					newFood.splice(i, 1);
				}
			}

			// Build a new snake
			const newSnake = [...game.snake];
			newSnake.push(newPos)
			if (!eat) newSnake.shift();

			// return new game status
			return {
				snake: newSnake,
				food: newFood,
				foodCD: game.foodCD == maxFoodCD ? 0 : game.foodCD + 1,
				direction: game.direction
			}
		})
	}
	
	const draw = (board) => {
		board.fillStyle = 'purple';
		board.fillRect(0,0,maxWidth,maxWidth)
		for (let i = 0; i < game.snake.length; i++) {
			board.fillStyle = 'grey';
			board.fillRect(game.snake[i].x, game.snake[i].y, blockWidth, blockWidth)
			if (i == game.snake.length - 1) {
				board.fillStyle = 'pink'
				board.fillRect(game.snake[i].x + blockWidth/4, game.snake[i].y + blockWidth/4, blockWidth/2, blockWidth/2)
			}
		}
		for (let i = 0; i < game.food.length; i++) {
			board.fillStyle = 'red';
			board.fillRect(game.food[i].x, game.food[i].y, blockWidth,blockWidth);
		}
	}

	const {height, width} = Dimensions.get('screen')
  const handleCanvas = (canvas) => {
		if (canvas == null) return;
		canvas.width = maxWidth;
		canvas.height = maxWidth;
    draw(canvas.getContext('2d'))
  }

	return (
		<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
			<View style={{width: maxWidth + 20, height: maxWidth + 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000'}}>
				<Canvas ref={handleCanvas} /> 
			</View>
			<Button title="Up" onPress={() => setGame(e =>({...game, direction: {x:0, y:-1}}))}></Button>
			<View style={{flexDirection: 'row'}}>
				<Button title="Left" onPress={() => setGame(e => ({...game,direction: {x:-1,y:0}}))}></Button>
				<Text>          </Text>
				<Button title="Right" onPress={() => setGame(e => ({...game, direction: {x:1,y:0}}))}></Button>
			</View>
			<Button title="Down" onPress={() => setGame(e => ({...game, direction: {x:0,y:1}}))}></Button>
			<Button title="Back" onPress={() => navigation.navigate("Home")}></Button>
		</View>
	)
}