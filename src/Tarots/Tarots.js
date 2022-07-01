import { Button, StyleSheet, View, Text } from 'react-native'
import React,{useEffect, useState} from 'react'
import EachTartot from './EachTartot'
import {useSharedValue} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const cards = [
  {
    source: require("./assets/death.png"),
    vector: require("./vectors/death.png"),
    title:'Death',
    meaning:'Unlikely that this card actually represents a physical death. Typically it implies an end, possibly of a relationship or interest, and therefore implies an increased sense of self-awareness.'
  },
  {
    source: require("./assets/chariot.png"),
    vector: require("./vectors/chariot.png"),
    title:'Chariot',
    meaning:'The Chariot is a card about overcoming conflicts and moving forward in a positive direction. One needs to keep going on and through sheer hard work and commitment he will be victorious.'
  },
  {
    source: require("./assets/high-priestess.png"),
    vector: require("./vectors/high-priestess.png"),
    title:'High Priestess',
    meaning:'High Priestess is a card of mystery, stillness and passivity. This card suggests that it is time to retreat and reflect upon the situation and trust your inner instincts to guide you through it. Things around you are not what they appear to be right now.'
  },
  {
    source: require("./assets/justice.png"),
    vector: require("./vectors/justice.png"),
    title:'Justice',
    meaning:'The Justice card indicates that the fairest decision will be made. Justice is the sword that cuts through a situation, and will not be swayed by outer beauty when deciding what is fair and just.'
  },
  {
    source: require("./assets/lover.png"),
    vector: require("./vectors/lover.png"),
    title:'Lover',
    meaning:"The Lovers represent relationships and choices. Its appearance in a spread indicates some decision about an existing relationship, a temptation of the heart, or a choice of potential partners. Often an aspect of the querent's life will have to be sacrificed and a relationship gained (or vice versa), or one potential partner may be chosen while another is turned down."
  },
  {
    source: require("./assets/pendu.png"),
    vector: require("./vectors/pendu.png"),
    title:'Pendu',
    meaning:'The Hanged Man is the card that suggests ultimate surrender, sacrifice, or being suspended in time.'
  },
  {
    source: require("./assets/tower.png"),
    vector: require("./vectors/tower.png"),
    title:'Tower',
    meaning:'The Tower is commonly interpreted as meaning danger, crisis, destruction, and liberation. It is associated with sudden unforseen change.'
  },
  {
    source: require("./assets/strength.png"),
    vector: require("./vectors/strength.png"),
    title:'Strength',
    meaning:'Strength predicts the triumphant conclusion to a major life problem, situation or temptation through strength of character. It is a very happy card if you are fighting illness or recovering from injury.'
  },
  {
    source: require("./assets/devil.png"),
    vector: require("./vectors/devil.png"),
    title:'Devil',
    meaning:'It represents being seduced by the material world and physical pleasures. Also living in fear, domination and bondage, being caged by an overabundance of luxury, discretion should be used in personal and business matters.'
  },
  {
    source: require("./assets/fool.png"),
    vector: require("./vectors/fool.png"),
    title:'Fool',
    meaning:"The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe."
  },
  {
    source: require("./assets/judegment.png"),
    vector: require("./vectors/judgement.png"),
    title:'Judegment',
    meaning:'This card is referred to as a time of resurrection and awakening, a time when a period of our life comes to an absolute end making way for dynamic new beginnings.'
  },
  {
    source: require("./assets/moon.png"),
    vector: require("./vectors/moon.png"),
    title:'Moon',
    meaning:'The Moon is a card of illusion and deception, and therefore often suggests a time when something is not as it appears to be. Perhaps a misunderstanding on your part, or a truth you cannot admit to yourself.'
  },

];

const Tarots = () => {
  const shuffleBack = useSharedValue(false);
  const cardsLength = useSharedValue(cards.length)

  const [top, setTop] = useState(cards.length)
  const [shuffledCards, setShuffledCards] = useState()

  const topChangeHandler =()=>{
    setTop(prev=> prev - 1)
  }

  const setTopHandler =()=>{
    setTop(cards.length)
  }

  const shuffle=(array)=> {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  


  useEffect(()=>{
    shuffle(cards)
    // console.log(cards)
    setShuffledCards([...cards])
  },[])

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{flex: 1, justifyContent:'flex-end'}}>
      {shuffledCards && shuffledCards.map((each, index)=><EachTartot key={index} cardsLength={cardsLength} shuffleBack={shuffleBack} vector={each.vector} index={index} source={each.source} title={each.title} meaning={each.meaning} />)}
      {/* <View>
          <Text>
            Find my destiny
          </Text>
      </View> */}
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