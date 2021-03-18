import {Dimensions, StyleSheet, Platform, PixelRatio} from 'react-native';

const {height, width} = Dimensions.get("screen");
global.windowWidth = width;
global.windowHeight = height;
const scaleW = global.windowWidth / 320;
const scaleH = global.windowHeight / 480;


function actuatedNormalizeW(size) {
//   if (global.windowHeight < 700) global.windowHeight = global.windowHeight - 24;
  const newSize = size * scaleW;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
function actuatedNormalizeH(size) {
  const newSize = size * scaleH;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}


export {actuatedNormalizeH, actuatedNormalizeW,scaleH, scaleW, width, height }