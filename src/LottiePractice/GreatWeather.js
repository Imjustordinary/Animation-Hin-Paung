import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'

const GreatWeather = () => {
  return (
    <View style={{flex:1}}>
        <AnimatedLottieView autoPlay source={require('../../assets/lottie/great-weather.json')} />
    </View>
  )
}

export default GreatWeather

const styles = StyleSheet.create({})