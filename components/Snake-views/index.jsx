import React from 'react';
import { Pressable, Text, Button, Dimensions, View} from 'react-native'
import Board from './Board.jsx';

const ROWS = 10;
const COLS = 10;

export default function Snake({navigation}) {
	const init_game = {
		snake: [{x: 0, y: 0}, {x : 1, y: 0}],
		grid: new Array(ROWS).fill(0).map((_,i) => { 
			const a = new Array(COLS).fill(0); 
			if (i == 0) a[0] = a[1]= 1;
			return a
		}),
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
			x = Math.floor(Math.random() * COLS);
			y = Math.floor(Math.random() * ROWS);
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
				x: (game.snake[game.snake.length - 1].x + game.direction.x + COLS) % COLS, 
				y: (game.snake[game.snake.length - 1].y + game.direction.y + ROWS) % ROWS, 
			}

			// Identify game ending
			for (let i = 0; i < game.snake.length - 3; i++) {
				if (game.snake[i].x == newPos.x && game.snake[i].y == newPos.y) {
					return ({...game, gameOver: true, score: game.snake.length })
				}
			}

			// Create new food according to foodCD
			if (game.foodCD == maxFoodCD && game.food.length < 5) {
				const temp = getNewFood(game.snake);
				game.food.push(temp);
				game.grid[temp.y][temp.x] = 2;
			} 

			// Identify any food being eaten
			let eat = false;
			for (let i = 0; i < game.food.length; i++) {
				if (game.food[i].x == newPos.x && game.food[i].y == newPos.y) {
					eat = true;
					game.food.splice(i, 1);
				}
			}

			// Build a new snake
			game.snake.push(newPos)
			game.grid[newPos.y][newPos.x] = 1;
			if (!eat) {
				const a = game.snake.shift();
				game.grid[a.y][a.x] = 0;
			}

			// return new game status
			return {
				...game,
				foodCD: game.foodCD == maxFoodCD ? 0 : game.foodCD + 1,
			}
		})
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
							x: Math.abs(diff.x) > Math.abs(diff.y) ? (diff.x < 0 ? -1 : 1) : 0,
							y: Math.abs(diff.x) <= Math.abs(diff.y) ? (diff.y < 0 ? -1 : 1) : 0,
						} 
					}))
				}
				setTouch(null)
			}}
			style={{width: maxWidth + 20, height: maxWidth + 20, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000'}}>
				<View style={{width: maxWidth, height: maxWidth,}}>
					<Board rows={ROWS} cols={COLS} grid={game.grid} gameOver={game.gameOver} score={game.score}/>
				</View>
			</Pressable>
			<Button title="Back" onPress={() => navigation.navigate("Home")}></Button>
			<Button title="Restart" onPress={() => setGame(e => init_game)}></Button>
		</View>
	)
}