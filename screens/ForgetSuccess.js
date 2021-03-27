import React from 'react';
import {View, Text, TouchableOpacity, Image,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import CheckBox from '@react-native-community/checkbox';
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension'

const ForgetSuccess = ({navigation}) => {
    return (
      <View style={styles.container}>
          <ScrollView>
        <View style={styles.mainView}>
        <View style={styles.tabDiv}>
          <View style={styles.success}>
            <Image source={require('../screens/assets/images/successIcon.png')} />
          </View>
          <View>
            <Text style={styles.forgotTxt}>
              Please check your email for password reset 
            </Text>
          </View>
          <View style={styles.btnDiv}>
            <TouchableOpacity
              style={styles.btnSignup}
              onPress={() => {
                navigation.navigate('Signin');
              }}>
              <Text style={[styles.btnTxt, {color: '#fff'}]}>Login Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
      </View>
    );
};

export default ForgetSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
   
  },
  mainView: {
    flexDirection: 'column',
    width: width,
    height: height,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center'
},
tabDiv: {
    width: wp('100%'),
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalizeW(20),
},
success: {
    alignItems: 'center',
    marginBottom: actuatedNormalizeH(50)
},
btnDiv: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: actuatedNormalizeH(50)
},
btnTxt: {
    fontFamily: 'Roboto',
    fontSize: actuatedNormalizeW(11),
    padding: 10,
},
btnSignup: {
    backgroundColor: '#E4234B',
    width: wp('60%'),
    borderRadius: 30,
    alignItems: 'center',
},
forgotTxt: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: actuatedNormalizeW(12),
    color: 'black',
    textAlign: 'center'
}
});
