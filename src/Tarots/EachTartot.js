import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
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
  runOnJS
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

const EachTartot = ({source, index, top, topChangeHandler, cardsLength, shuffleBack, setTopHandler}) => {

  const offset = useSharedValue({ x: 0, y: 0, z:0 });
  const translateX = useSharedValue(0);
  const rotateX = useSharedValue(30);
  const setCards = useSharedValue(cardsLength.value)
  const translateY = useSharedValue(-CARD_HEIGHT-500);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const delay = index * DURATION;
  const theta = -10 + Math.random() * 20;
  // const theta = -Math.random() * 10;


  const cStyle = useAnimatedStyle(() => {
    offset.value.z = rotateZ.value
    return {
    transform: [
      { perspective: 1500 },
      { rotateX: 
        index == cardsLength.value -1 ? withSpring('15deg') : 
        "30deg" },
      { translateX: translateX.value },
      { translateY: translateY.value },
      // { rotateY: `${rotateZ.value / 10}deg` },
      { rotateZ:
         index == cardsLength.value -1 ? withSpring('0deg') :
         `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }
  });

  useLayoutEffect(()=>{
    const duration = 150 * index;
    translateY.value = withDelay(
      duration,
      withTiming(0));

    rotateZ.value = withDelay(
      duration,
      withTiming(
        index == cardsLength.value -1 ? 0 :
        theta)
    )
  },[])
  
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
   if(translateX.value > width/4 ){
    translateX.value = withSpring(width)
    
    cardsLength.value = cardsLength.value  - 1;
    console.log('set card ' + setCards.value)
    console.log(cardsLength.value)
    // console.log(top)
    if(index < 1){
      shuffleBack.value = true;
      console.log('shuffle pls')
    }
    
   }
   else if(translateX.value < -width/4){
    translateX.value = withSpring(-width)
    cardsLength.value = cardsLength.value - 1;
    if(index < 1){
      shuffleBack.value = true;
    }
   }
    //   if (distance < CIRCLE_RADIUS + SIZE / 2) {
    //     translateX.value = withSpring(0);
    //     translateY.value = withSpring(0);
    //   }
    },
  });

  useAnimatedReaction(
    () => shuffleBack.value,
    (v) => {
      if (v) {
        const duration = 150 * index;
        cardsLength.value = setCards.value;
        translateX.value = withDelay(
          duration,
          withSpring(0, {}, () => {
            shuffleBack.value = false;
          })
        );
        rotateZ.value = withDelay(duration, withSpring(theta));
      }
    }
  );

  return (
    <>
     <Animated.View style={styles.eachContainer}>
     <PanGestureHandler onBegan={()=>console.log('begin')} onGestureEvent={panGestureEvent}>
          
      <Animated.View onTouchStart={()=>console.log('run')} style={[styles.card,cStyle]}>
      <Animated.Image  
      resizeMode='contain'
      style={{width: IMAGE_WIDTH,
            height: IMAGE_WIDTH * aspectRatio,}} source={source} />
      </Animated.View>  
      </PanGestureHandler> 
        </Animated.View>
    </>
  )
}

export default EachTartot

const styles = StyleSheet.create({
  
  eachContainer:{
    
...StyleSheet.absoluteFillObject,
justifyContent:'center',
alignItems:'center',
  },
  card:{
  backgroundColor: "white",
  borderRadius: 10,
  width: CARD_WIDTH,
  height: CARD_HEIGHT,
  justifyContent: "center",
  alignItems: "center",
  borderColor:'#DDD',
  borderWidth:1,
  // shadowColor: "#000",
  // shadowOffset: {
  //   width: 0,
  //   height: 2,
  // },
  // shadowOpacity: 0.25,
  // shadowRadius: 3.84,
  // elevation: 1,
},
  
})