import * as React from 'react';
import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Pressable 
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons'
import Animated, { 
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import FinalScores from './FinalScores';

export default function Status({
  name, 
  value,
	animation,
	animation_value,
  color,
  replay,
  menu,
	gameOver,
	gameOver_list
}) {
  
  const [open, setOpen] = React.useState(false)
	const [closeButton, setCloseButton] = React.useState(false);

	// menu animation
	const progress = useSharedValue(0);
	const opacityProgress = useSharedValue(0);
	const rStyle_menu = useAnimatedStyle(() => (
		{
			opacity: opacityProgress.value,
			transform:[
				{ translateX: (1-progress.value)*500 },
				{ translateY: (1-progress.value)*-800 }
			]
		}	
	))

	// Score animation
	React.useEffect(() => {
		if (!animation) return;
		animation.current = () => {
			score_animation_progress.value = withTiming(1, null, () => score_animation_progress.value = withTiming(0));
		}
	}, [])
	const score_animation_progress = useSharedValue(0);
	const rStyle_score = useAnimatedStyle(() => (
		{
			opacity: score_animation_progress.value,
			transform:[
				{ translateY: ((0.5-score_animation_progress.value)*10)**2 },
			]
		}	
	))

	// End screen animation
	const [endScreen, setEndScreen] = React.useState(false);
	const [replayButton, setReplayButton] = React.useState(false);
	React.useEffect(() => {
		if (!gameOver) return;
		gameOver.current = () => {
			setEndScreen(true);
			setReplayButton(true);
			end_progress.value = withTiming(1);
		}
	}, [])
	const end_progress = useSharedValue(0);
	const rStyle_end = useAnimatedStyle(() => (
		{
			opacity: end_progress.value,
			transform: [
				{ translateX: (1-end_progress.value) * -500 }
			]
		}
	));

	const close_end_screen = () => {
		end_progress.value = 0;
		setEndScreen(false)
		setReplayButton(false);
		replay();
	}

  return (
		<>
      <View style={styles.container}>
        <View style={styles.status}>
          <View>
            <Text style={[styles.score, {color: color }]} >{name}: {value}</Text>
						<Animated.View style={rStyle_score}>
							<Text style={[styles.score, {color: color }]}>          +{animation_value && animation_value.score}</Text>
						</Animated.View>
          </View>
          <View style={{flexDirection: 'row'}}>
            {replay && 
              <TouchableOpacity onPress={replay}>
                <Ionicons name='reload' style={styles.replay} color={color} size={30} />
              </TouchableOpacity>
            }
            <TouchableOpacity onPress={() => { 
							progress.value = withSpring(1); 
							opacityProgress.value = withTiming(1); 
							setOpen(true);
							setCloseButton(true);
						}} >
              <Ionicons name='list' style={styles.menu_icon} color={color} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
				{open && (
						<View style={styles.fullscreen} >
							<View style={styles.outter}>
								<Animated.View style={[styles.menu_container, rStyle_menu]}>
									{menu}
								</Animated.View>
								{ closeButton &&
									<TouchableOpacity style={styles.close_icon} onPress={() => { 
										progress.value = 0;
										opacityProgress.value = 0;
										setOpen(false)
										setCloseButton(false);
									}}>
										<Text style={{color: color, fontFamily: 'Bomb', fontSize: 38}}>x</Text>
									</TouchableOpacity>
								}
							</View>
						</View>
					)}
				{ endScreen && (
						<View style={styles.fullscreen} >
							<View style={styles.outter}>
								<Animated.View style={[styles.menu_container, rStyle_end]}>
									<FinalScores list={gameOver_list} close={close_end_screen}/>
								</Animated.View>
							</View>
						</View>
					)}
			</>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
		top:0,
		left: 0,
    width: "100%",
    height: 100,
    paddingTop: 30,
  },
	container2: {
    position: "absolute",
		top:0,
		left: 0,
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  status: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    justifyContent: "space-between",
  },
  score: {
    color: 'white',
    fontFamily: 'Bomb',
    fontSize: 30,
  },
  replay: {
    paddingRight:10
  },
  menu_icon: {
    fontFamily: 'Bomb',
  },
  fullscreen: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
		backgroundColor: "#000a"
  },
  outter: {
    flex: 1,
  },
  menu_container: {
    flex: 1,
    marginTop: 120,
    marginBottom: 90,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    overflow: 'hidden'
  },
  close_icon: {
    position: 'absolute',
    top: 130,
    right: 30,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});