import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  Platform,
  PixelRatio,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension'
// import Toast from 'react-native-simple-toast';
// import { useTheme } from '../../themes/ThemeProvider';
// import StylesDark from './style';
// import StylesLight from './styleLight';


const App = (props) => {
//   const {colors, isDark} = useTheme()

//   const Styles = isDark ? StylesDark : StylesLight;


  return (
    <View style={Styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Main', {screenflag: 'Discover'});
        }}>
        <View style={Styles.subDiv}>
          <Image style={props.flag === 'discover' ? Styles.activeimage : Styles.image}source={require('../screens/assets/images/discoverIcon.png')} />
          <Text
            style={props.flag === 'discover' ? Styles.active : Styles.inactive}>
            Discover
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Main', {screenflag: 'Song'});
        }}>
        <View style={Styles.subDiv}>
          <Image style={Styles.image} source={require('../screens/assets/images/songIcon.png')} />
          <Text style={props.flag === 'song' ? Styles.active : Styles.inactive}>
            Songs
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Main', {screenflag: 'Video'});
        }}>
        <View style={Styles.subDiv}>
          <Image style={Styles.image} source={require('../screens/assets/images/videoIcon.png')} />
          <Text
            style={props.flag === 'video' ? Styles.active : Styles.inactive}>
            Videos
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('MainProfile');
        }}>
        <View style={Styles.subDiv}>
          <Image style={Styles.image} source={require('../screens/assets/images/UserIcon.png')} />
          <Text
            style={props.flag === 'MainProfile' ? Styles.active : Styles.inactive}>
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default App;


const Styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: actuatedNormalizeW(30),
        marginTop: actuatedNormalizeH(10),
        opacity:0.7
    },
    subDiv: {
        alignItems: 'center'
    },
    inactive: {
        color: 'black',
        marginTop: 5
    },
    active: {
        color: '#E4234B',
        marginTop: 5
    },
    image:{
       tintColor:"black"
    },
    activeimage: {
        tintColor: '#E4234B',
       
    },
});
