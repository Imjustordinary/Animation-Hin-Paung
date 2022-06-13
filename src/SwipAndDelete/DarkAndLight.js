import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'

const callMyName =()=>{
  return {
    name:'cool'
  }
};

const myNewFunction = {...callMyName()};

const DarkAndLight = () => {

  useEffect(()=>{
    console.log(myNewFunction.name)
  },[])

  return (
    <View>
      <Text>DarkAndLight</Text>
    </View>
  )
}

export default DarkAndLight




const styles = StyleSheet.create({})