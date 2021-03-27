import React ,{useEffect} from 'react';
import { Dimensions, StyleSheet, Platform, PixelRatio, View, Image, TouchableOpacity, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH ,width, height  } from '../screens/assets/layout/Dimension';
import { AuthContext } from '../Components/Context'
const InitScreen = ({navigation}) => {
  const { validation } = React.useContext(AuthContext);
  useEffect(() => {
    (async function () {
    var UserDataString = JSON.parse(await AsyncStorage.getItem('userinfo')) 
    console.log("jSONdATA---------------------------", UserDataString)
    if(UserDataString)
    {
      validation(true)
    }
   else
   {
    validation(false)
   }
 
    })()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Image
          source={require('../screens/assets/images/1024X1024.png')}
          style={styles.logo}
        />
        <View style={[styles.btnDiv, { marginTop: actuatedNormalizeH(30) }]}>
          <View
            style={[styles.btnDiv, { marginVertical: actuatedNormalizeH(10) }]}>
            <TouchableOpacity
              style={styles.btnSignin}
             onPress={() => {
             navigation.navigate('Signin');
             }}
            >
              <Text style={[styles.btnTxt, { color: '#fff' }]}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[styles.btnDiv, { marginVertical: actuatedNormalizeH(20) }]}>
            <TouchableOpacity
              style={styles.btnSignup}
            onPress={() => {
              navigation.navigate('Signup');
            }}
            >
              <Text style={[styles.btnTxt, { color: '#fff' }]}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InitScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  screen: {
     flex: 1,
    flexDirection: 'column',
    width: width,
    height: height - 24,
    justifyContent: 'center',
    alignItems: 'center',
    
    // backgroundColor: '#1B1D26',
  },

  logo: {
    borderRadius: 80,
    width: 100,
    height: 100,

  },
  btnDiv: {
    width: wp('100%'),
    alignItems: 'center',
  },
  btnSignin: {
    backgroundColor: '#ff0000',
    width: wp('60%'),
    borderRadius: 30,
    alignItems: 'center',
  },
  btnSignup: {
    backgroundColor: '#ff0000',
    width: wp('60%'),
    borderRadius: 30,
    alignItems: 'center',
  },
  btnTxt: {
    fontFamily: 'Roboto',
    // fontSize: 17,
    fontSize: hp('2.3%'),
    padding: 10,
    fontWeight: 'bold',
  },
});
