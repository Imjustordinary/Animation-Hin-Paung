import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';


const {height} = Dimensions.get('window');

const BottomSheet = () => {
  const translateY = useSharedValue(0);
  const progress = useSharedValue(0);

  
  const butWidth = useSharedValue(65);
  const translateX = useSharedValue(-30);


  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = event.translationY + context.translateY;
      // if (translateY.value <= -height/2) {
      //   console.log('warning');
      //   translateY.value = -height/2;
      // } 
    },
    onEnd: () => {
      if (translateY.value <= -height/2) {
        console.log('warning');
        translateY.value = withSpring(-height/2);
      } 
      else if (translateY.value > -height/2) {
        console.log('warning');
        translateY.value = withSpring(-height/7);
      } 
     
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {

    const opacity = interpolate(
      translateY.value,
      [-height/7, -height/2],
      [0,1],
      Extrapolate.CLAMP
    )

    return {
      opacity
    };
  });

  const containerThemeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [1, 0],
      // ['#212121','#EEE'],
      ['#1E1E1E', '#F8F8F8']
    )
      console.log(backgroundColor)
    return {
      backgroundColor
    };
  });

  const butContainerThemeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [1, 0],
      // ['#212121','#EEE'],
      ['#393E46', '#DFDFDE']
    )
    return {
      backgroundColor
    };
  });

  const butThemeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [1, 0],
      // ['#212121','#EEE'],
      ['#050505', '#FFF']
    )
    return {
      backgroundColor
    };
  });

  useEffect(()=>{
    translateY.value = withSpring(-height/7,{stiffness:60})
  },[])



  const panGestureButEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      butWidth.value = withSpring(75);
      // if (translateX.value >= 50) {
      //   translateX.value = 50;
      //   // color.value = withSpring('#393E46')
      // } 
      if(translateX.value > 0){
        translateX.value = withSpring(25);
        progress.value = 1
      }
      else if(translateX.value < 0){
        translateX.value = withSpring(-25);
        progress.value = 0;
      }
      console.log('start')
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      if (translateX.value >= 25) {
        translateX.value = 25;
      } 
      else if (translateX.value <= -25) {
        translateX.value = -25;
      } 
    },
    onEnd: () => {
      console.log('end')
      console.log(translateX.value)
      butWidth.value = withSpring(65);
      if(translateX.value == 0){
        translateX.value = withSpring(30);
        progress.value = withTiming(1)
      }
      else if(translateX.value > 0){
        translateX.value = withSpring(30);
        progress.value = withTiming(1)
      }
      else if(translateX.value < 0){
        translateX.value = withSpring(-30);
        progress.value = withTiming(0)
      }
      
    },
  });

  const butStyle = useAnimatedStyle(() => {
    return {
      width: butWidth.value,
      transform:[{
        translateX:translateX.value
      },
      ],
      
    };
  });

  const botSheetThemeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#D9D9D9', '#111']
    )
    return {
      backgroundColor
    };
  });

  const botSheetTextThemeStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [1, 0],
      ['#EEE', '#111']
    )
    return {
      color
    };
  });

  const botSheetBarThemeStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#808080', '#FFF']
    )
    return {
      backgroundColor
    };
  });


  const onCanclledHandler =()=>{
    butWidth.value = withSpring(65);
      if(translateX.value > 0){
        translateX.value = withSpring(30);
        progress.value = withTiming(1)
      }
      else if(translateX.value < 0){
        translateX.value = withSpring(-30);
        progress.value = withTiming(0)
      }
  }

  const onTappedHandler =()=>{
     
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <DarkAndLight /> */}
      <Animated.View style={[styles.container, containerThemeStyle]}>
      {/* <View>
        <Text>

        </Text>
      </View> */}
      <Animated.View onTouchStart={onTappedHandler} style={[styles.buttonContainer, butContainerThemeStyle]}>
      <PanGestureHandler onFailed={onCanclledHandler} onGestureEvent={panGestureButEvent}>
          <Animated.View style={[styles.button,butStyle,butThemeStyle]}></Animated.View>
      </PanGestureHandler>
      </Animated.View>
    </Animated.View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.bottomSheet, rStyle, botSheetThemeStyle]}>
          <Animated.View style={[styles.bar, botSheetBarThemeStyle]} />
          <Animated.View style={textStyle}>
              <Animated.Text style={[styles.text, botSheetTextThemeStyle]}>
                  Surprise 🎉
              </Animated.Text>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
    text:{
        marginVertical:20,
        fontSize:26,
        // color:'#EEE',
        // color:'#111',
        textAlign:'center'
    },
  bottomSheet: {
    // backdropFilter: 'blur(10px)',
    height: height,
    width: '100%',
    // backgroundColor: '#D9D9D9',
    // backgroundColor:'#DFDFDE',
    opacity:0.75,
    position: 'absolute',
    top: height,
    
    borderTopLeftRadius:25,
    borderTopRightRadius:25
  },
  bar: {
    width: 95,
    height: 7,
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 6,
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
},
buttonContainer:{
    width:'33%',
    height:75,
    borderRadius:50,
    // backgroundColor:'#393E46',
    zIndex:50,
    // #DFDFDE
    justifyContent:'center',
    alignItems:'center'
    
},
button:{
  height:65,
  width:65,
  borderRadius:50,
  margin:5,
  // backgroundColor:'#050505',
  // #DFDFDE
  // #FFF
  shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.5,
shadowRadius: 2,
elevation: 6,
}
});
