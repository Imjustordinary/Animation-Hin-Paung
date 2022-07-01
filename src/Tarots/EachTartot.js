import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedReaction,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const aspectRatio = 739 / 375;
const CARD_WIDTH = width - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;

const EachTartot = ({
  source,
  index,
  cardsLength,
  shuffleBack,
  title,
  meaning,
  vector,
}) => {
  const offset = useSharedValue({x: 0, y: 0, z: 0});
  const translateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const setCards = useSharedValue(cardsLength.value);
  const translateY = useSharedValue(-CARD_HEIGHT - 500);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const theta = -10 + Math.random() * 20;

  const cStyle = useAnimatedStyle(() => {
    offset.value.z = rotateZ.value;

    return {
      transform: [
        {perspective: 1500},
        {
          rotateX:
            index == cardsLength.value - 1 ? withSpring('15deg') : '30deg',
        },
        {translateX: translateX.value},
        {translateY: translateY.value},
        {rotateY: `${rotateY.value}deg`},
        {
          rotateZ:
            index == cardsLength.value - 1
              ? withSpring('0deg')
              : `${rotateZ.value}deg`,
        },
        {scale: scale.value},
      ],
    };
  });

  const imgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      rotateY.value,
      [0, 90],
      [1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      rotateY.value,
      [90, 180],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
    };
  });

  const infoTextStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: '180deg',
        },
      ],
    };
  });

  useLayoutEffect(() => {
    const duration = 200 * index;
    setTimeout(() => {
      translateY.value = withDelay(duration, withTiming(0));

      rotateZ.value = withDelay(
        duration,
        withTiming(index == cardsLength.value - 1 ? 0 : theta),
      );
    }, 400);
  }, []);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      if (translateX.value > width / 5) {
        translateX.value = withSpring(width);

        cardsLength.value = cardsLength.value - 1;
        if (index < 1) {
          shuffleBack.value = true;
        }
      } else if (translateX.value < -width / 5) {
        translateX.value = withSpring(-width);
        cardsLength.value = cardsLength.value - 1;
        if (index < 1) {
          shuffleBack.value = true;
        }
      }
    },
  });

  const destinyChecker = () => {
    if (rotateY.value === 180) {
      rotateY.value = withTiming(0, {
        duration: 700,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } else {
      rotateY.value = withTiming(180, {
        duration: 700,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
  };

  useAnimatedReaction(
    () => shuffleBack.value,
    v => {
      if (v) {
        const duration = 150 * index;
        cardsLength.value = setCards.value;
        translateY.value = withDelay(duration, withSpring(0));
        rotateY.value = withDelay(duration, withTiming(0, {
          duration: 700,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }));
        translateX.value = withDelay(
          duration,
          withSpring(0, {}, () => {
            shuffleBack.value = false;
          }),
        );
        rotateZ.value = withDelay(duration, withSpring(theta));
      }
    },
  );

  return (
    <>
      <Animated.View style={styles.eachContainer}>
        <PanGestureHandler
          onFailed={destinyChecker}
          onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.card, cStyle]}>
            <Animated.Image
              resizeMode="contain"
              style={[
                {
                  width: IMAGE_WIDTH,
                  height: IMAGE_WIDTH * aspectRatio,
                  position: 'absolute',
                },
                imgStyle,
              ]}
              source={source}
            />
            <Animated.View
              style={[
                {
                  margin: 17,
                  marginVertical: 25,
                  padding: 12,
                  paddingVertical:5,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flex: 1,
                  borderWidth: 2.5,
                  borderColor: '#393E46',
                  borderRadius: 7,
                },
                textStyle,
              ]}>
              <Animated.Image
                resizeMode="contain"
                style={[
                  {width: 150, height: 150, paddingVertical: 12},
                  infoTextStyle,
                ]}
                source={vector}
              />
              <Animated.Text
                style={[
                  {
                    textAlign: 'justify',
                    lineHeight: 17,
                    fontWeight: '400',
                    color: '#141E27',
                    fontSize:13
                  },
                  infoTextStyle,
                ]}>
                {meaning}
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

export default EachTartot;

const styles = StyleSheet.create({
  eachContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    marginTop: (IMAGE_WIDTH * aspectRatio) / 7,
    lineHeight: 17,
    padding: 20,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FAF5E4',
  },
});
