import Animated, {Easing, useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated';
import {StyleSheet, } from 'react-native';
import React from 'react';


const ReanimatedFlip = ({
                            perspective = 1200,
                            rotate = 'Y',
                            side,
                            front,
                            back,
                            style,
                        }) => {


    const rotateValue = useDerivedValue(() => {
        return withTiming(side==0?180:360, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
        });
    });

    const rotationFlip = useDerivedValue(() => {
        if (rotate === 'Y') {
            return {
                rotateY: `${rotateValue.value}deg`
            };
        }

        return {
            rotateX: `${rotateValue.value}deg`
        };
    }, [rotate, rotateValue]);

    const rotationFlipBack = useDerivedValue(() => {
        if (rotate === 'Y') {
            return {
                rotateY: '180deg'
            };
        }

        return {
            rotateX: '180deg'
        };
    }, [rotate]);

    const animatedStyleFront = useAnimatedStyle(() => {
        return {
            opacity: rotateValue.value <= 270 ? 0:1,
            transform: [
                {perspective},
                {...rotationFlip.value},
            ],
        };
    }, [rotate, side, rotationFlip]);

    const animatedStyleBack = useAnimatedStyle(() => {
        return {
            opacity: rotateValue.value <= 270 ? 1:0,
            transform: [
                {perspective},
                {...rotationFlipBack.value},
                {...rotationFlip.value},
            ],
        };
    }, [rotate, side]);

    return (
        <Animated.View style={StyleSheet.flatten([style, styles.container])}>
            <Animated.View
                style={[styles.side, animatedStyleFront]}
            >
                {front}
            </Animated.View>
            <Animated.View
                style={[styles.side, animatedStyleBack]}
            >
                {back}
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    side: {
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ReanimatedFlip;