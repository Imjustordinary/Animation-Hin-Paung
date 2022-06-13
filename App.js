import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ObjAni from './src/ObjectAnimation';
import GrapAndMove from './src/navigtors/grapAndMove';
import BottomSheet from './src/BottomSheet/BottomSheet';
import EachTartot from './src/Tarots/EachTartot';
import Tarots from './src/Tarots/Tarots';
import DarkAndLight from './src/SwipAndDelete/DarkAndLight';


export default function App() {
  
  return (
    <>
    {/* <GrapAndMove /> */}
    {/* <BottomSheet /> */}
    <Tarots />
    {/* <DarkAndLight /> */}
    {/* <ObjAni /> */}
    </>
  );
}

const styles = StyleSheet.create({
  
});