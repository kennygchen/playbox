import {View, Text} from 'react-native'
export default function Board({rows,cols,grid,gameOver,score}) {
	if(gameOver) {
		return (
			<View style={{flex:1, backgroundColor:'#fff', justifyContent:'center', alignItems:'center'}} >
				<Text>Score: {score}</Text>
			</View>
		)
	}
	return (
		<View style={{flex:1}}>
			{
				new Array(rows).fill(0).map((_, i) => 
					<Row key={i} cols={cols} row={i} grid={grid} />
				)
			}
		</View>
	)
}

function Row({cols, row, grid}) {
	const WHITE = "purple"
	const BLACK = "grey"
	const RED = "#f2b195"
	return (
		<View style={{flex:1, flexDirection:'row'}}>
			{new Array(cols).fill(0).map(
					(_, j) => (
						<Square key={row*10+j} bgc={grid[row][j]==0?WHITE:grid[row][j]==1?BLACK:RED} />
					)
			)}
		</View>
	)
}

function Square({bgc}) {
	return (
		<View style={{flex: 1, backgroundColor: bgc}}>
		</View>
	)
}
