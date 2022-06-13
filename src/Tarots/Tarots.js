import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import EachTartot from './EachTartot'
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
  withDelay
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

const cards = [
  {
    source: require("./assets/death.png"),
  },
  {
    source: require("./assets/chariot.png"),
  },
  {
    source: require("./assets/high-priestess.png"),
  },
  {
    source: require("./assets/justice.png"),
  },
  {
    source: require("./assets/lover.png"),
  },
  // {
  //   source: require("./assets/pendu.png"),
  // },
  // {
  //   source: require("./assets/tower.png"),
  // },
  // {
  //   source: require("./assets/strength.png"),
  // },
];

const Tarots = () => {
  const shuffleBack = useSharedValue(false);
  const cardsLength = useSharedValue(cards.length)

  const [top, setTop] = useState(cards.length)

  const topChangeHandler =()=>{
    setTop(prev=> prev - 1)
  }

  const setTopHandler =()=>{
    setTop(cards.length)
  }


  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
      {cards.map((each, index)=><EachTartot key={index} cardsLength={cardsLength} shuffleBack={shuffleBack} setTopHandler={setTopHandler} topChangeHandler={topChangeHandler} top={top} index={index} source={each.source} />)}
      </GestureHandlerRootView>
    </View>
  )
}

export default Tarots

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "lightblue",
    justifyContent:'center',
    
  },
})