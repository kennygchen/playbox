import React, { Component } from 'react';
import { Pressable, Text, Button, Dimensions, View} from 'react-native'
import Canvas from 'react-native-canvas'; // 0.1.20

export default function Snake({navigation}) {
	const init_game = {
		snake: [{x: 0, y: 0}, {x : 0, y: 0}],
		food: [],
		foodCD: 0,
		direction: {x: 1, y: 0},
		gameOver: false,
	}
	const maxFoodCD = 5, blockWidth = 30, maxBlock = 10, maxWidth = blockWidth * maxBlock;
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
			if (game.gameOver) {
				return ({...game, gameOver: true, score: game.score })
			}

			
			// Calculate the new position
			const newPos = {
				x: (game.snake[game.snake.length - 1].x + game.direction.x * blockWidth + maxWidth) % maxWidth, 
				y: (game.snake[game.snake.length - 1].y + game.direction.y * blockWidth + maxWidth) % maxWidth , 
			}

			// Identify game ending
			for (let i = 0; i < game.snake.length - 4; i++) {
				if (game.snake[i].x == newPos.x && game.snake[i].y == newPos.y) {
					return ({...game, gameOver: true, score: game.snake.length })
				}
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
				direction: game.direction,
				gameOver: false
			}
		})
	}
	
	const draw = (board) => {
		if (game.gameOver) {
			board.fillStyle = 'black';
			board.fillRect(0,0,maxWidth, maxWidth);
			board.fillStyle = 'grey';
			board.textAlign = 'center'
			board.textBaseline = 'middle'
			board.font = 'bold 48px serif'
			board.fillText(`Score: ${game.score}`, maxWidth / 2, maxWidth / 2);
			return;
		}
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


	const [touch, setTouch] = React.useState(null);

	return (
		<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
			<Pressable 
			onPressIn={e => setTouch({x: e.nativeEvent.locationX, y: e.nativeEvent.locationY})} 
			onPressOut={e => {
				if (touch != null) {
					const newTouch = {x: e.nativeEvent.locationX, y: e.nativeEvent.locationY};
					const diff = { x:newTouch.x - touch.x, y:newTouch.y - touch.y };
					setGame(game => ({
						...game,
						direction: {
							x: Math.abs(diff.x) < Math.abs(diff.y) ? (diff.x < 0 ? -1 : 1) : 0,
							y: Math.abs(diff.x) >= Math.abs(diff.y) ? (diff.y < 0 ? -1 : 1) : 0,
						} 
					}))
				}
				setTouch(null)
			}}
			style={{width: maxWidth + 20, height: maxWidth + 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000'}}>
				<Canvas ref={handleCanvas} /> 
			</Pressable>
			<Button title="Back" onPress={() => navigation.navigate("Home")}></Button>
			<Button title="Restart" onPress={() => setGame(e => init_game)}></Button>
		</View>
	)
}