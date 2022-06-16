import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ObjAni from './src/ObjectAnimation';
import GrapAndMove from './src/navigtors/grapAndMove';
import BottomSheet from './src/BottomSheet/BottomSheet';
import EachTartot from './src/Tarots/EachTartot';
import Tarots from './src/Tarots/Tarots';
import DarkAndLight from './src/SwipAndDelete/DarkAndLight';
import GreatWeather from './src/LottiePractice/GreatWeather';
import SkeletonContentScreen from './src/SkeletonContent/SkeletonContentScreen';

export default function App() {
  
  return (
    <>
    {/* <GrapAndMove /> */}
    {/* <BottomSheet /> */}
    {/* <GreatWeather /> */}
    {/* <DarkAndLight /> */}
    <Tarots />
    {/* <SkeletonContentScreen /> */}
    </>
  );
}

const styles = StyleSheet.create({
  
});