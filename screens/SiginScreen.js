import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Platform, PixelRatio, View, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import CheckBox from '@react-native-community/checkbox';
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension'
import { RadioButton, } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from "react-native-firebase";
import firebaseAction from '../src/config/firebaseAction';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WToast } from "react-native-smart-tip";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-community/google-signin";
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
const SiginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signinflag, setSigninflag] = React.useState(true);
  const [isLoading, setisLoading] = useState(false);
  const handleChangeemail = (text) => {
    setEmail(text);
  };
  const handleChangepass = (text) => {
    setPassword(text);
  };

  useEffect(() => {
    if (email !== '' && password !== '')

      setSigninflag(false);

    else {

      setSigninflag(true);
    }
    //  console.log("useEffect", Firebase.auth().currentUser);
    return () => {

    }
  }, [email, password])

  const signin = async () => {
    setisLoading(true)
    await Firebase.auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((res) => {
        const authUser = res.user;
        //authUser.uid
        if (authUser.emailVerified) {
          firebaseAction.getUsers(authUser.uid, (res) => {
            console.log("res----------", res.val())
            if (res.val()) {
              console.log("email----------", authUser.uid)
              SaveData(authUser.uid, res.val())

            }
            else {
              console.log("The email and password you entered are not correct")
              const toastOpts = {

                data: 'The email and password you entered are not correct.',
                textColor: '#ffffff',
                backgroundColor: '#ff0000',
                width: '100%',
                duration: WToast.duration.LONG,
                position: WToast.position.TOP,
              };
              WToast.show(toastOpts);
              setisLoading(false)
            }

          });
        }
        else {
          console.log("please check your email & verify it")
          const toastOpts = {

            data: 'please check your email & verify it',
            textColor: '#ffffff',
            backgroundColor: '#ff0000',
            //  width: '100%',
            duration: WToast.duration.LONG,
            position: WToast.position.TOP,
          };
          WToast.show(toastOpts);
          setisLoading(false)
        }

      })
      .catch(error => {
        console.log(error + "    :::error")
        const toastOpts = {
          data: 'The email and password you entered are not correct.',
          textColor: '#ffffff',
          backgroundColor: '#ff0000',
          width: '100%',
          duration: WToast.duration.LONG,
          position: WToast.position.TOP,
        };
        WToast.show(toastOpts);
        setisLoading(false)
      })

  };

  const SaveData = async (value, userData) => {
    console.log("userData-------------", userData.email)
    await AsyncStorage.setItem('key', JSON.stringify(value));
    await AsyncStorage.setItem('userinfo', JSON.stringify(userData));
    navigation.navigate("Init")
    setisLoading(false)

  }

  const signinGoogle = async () => {
    // try {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfodata = await GoogleSignin.signIn();
            let flag = false;
            firebaseAction.getSocialUsers((res) => {
              res.forEach((element) => {
                let item = element.val();
      
                if (item.email === userInfodata.user.email) {
                  flag = true;
                  let asdas = {
                    name: userInfodata.user.name,
                    email: userInfodata.user.email,
                    photo: userInfodata.user.photo,
                    gen: '0',
                    registerType: 'google',
                  };
                  AsyncStorage.setItem("userinfo", JSON.stringify(asdas));
                  flag = true;
                  AsyncStorage.setItem("key", JSON.stringify({ keyName : element.key }));
                }
              });
              if (flag === true) {
                navigation.navigate("Init")
                // saveRemember(true);
                // saveRemember(true);
                // props.navigation.navigate('Discover', {screenflag: 'Discover'});               
                // saveCategory(true);
                // setRememberflag(false);
              } else {
                firebaseAction.pushSocialSignup({
                  name: userInfodata.user.name,
                  email: userInfodata.user.email,
                  pass: "",
                  gen: '0',
                  registerType: 'google',
                });
                let asdas = {
                  name: userInfodata.user.name,
                  email: userInfodata.user.email,
                  photo: userInfodata.user.photo,
                  gen: '0',
                  registerType: 'google',
                };
                AsyncStorage.setItem("userinfo", JSON.stringify(asdas));
                navigation.navigate("Init")
                // saveRemember(true);
                // props.navigation.navigate('Discover', {screenflag: 'Discover'});               
                // saveCategory(true);
                // setEmail("");
                // setPassword("");
                // setRememberflag(false);
              }
            });
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
              // alert('Cancel');
              ToastAndroid.show("Cancel ", ToastAndroid.SHORT);
              console.log("Cnacel");
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // alert('Signin in progress');
              ToastAndroid.show("Signin in progress=_ ", ToastAndroid.SHORT);
              console.log("Signin in progress");
              // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              //  alert('PLAY_SERVICES_NOT_AVAILABLE');
              ToastAndroid.show("PLAY_SERVICES_NOT_AVAILABLE", ToastAndroid.SHORT);
              console.log("PLAY_SERVICES_NOT_AVAILABLE");
              // play services not available or outdated
            } else {
              console.log("else", JSON.stringify(error));
              ToastAndroid.show(JSON.stringify(error), ToastAndroid.SHORT);
              // some other error happened
            }
          }
        };


 // siginwith facebook flow--------------------------------------------------------------------------------------------------------------

 const signinFacebook = () => {
  console.log("hiiiiiiiiiiiii--------------------")
  // if(Platform.OS ==="android")
  // {
  //   LoginManager.setLoginBehavior("web_only")
  // }
  LoginManager.logInWithPermissions(['public_profile','email'])
  .then((result) => {
    console.log("result-------------------",JSON.stringify(result));
      if (result.isCancelled) {
      //   saveRemember(true);
      } else {
          AccessToken.getCurrentAccessToken().then(
              (data) => {
                console.log('data',JSON.stringify(data));  
                const accessToken = data.accessToken.toString();
                console.log("_----------------------------",accessToken)
             GetInformationFromToken(accessToken);
              }
          )
      }
  })
  .catch(error => {
      console.log('logineroor',error);
  })
}

const GetInformationFromToken = (accessToken) => {
  console.log("accessToken--------------------",accessToken)
  const parameters = {
      fields: {
          string: 'id, name, first_name, email, picture.type(large), quotes',
      },
  };
  const myProfileRequest = new GraphRequest(
      '/me',
      { accessToken, parameters: parameters },
      (error, myProfileInfoResult) => {
          if (error) {
              console.log('login info has error: ' + error);
          } else {
              // alert(JSON.stringify(myProfileInfoResult));
              console.log("myProfileInfoResult",myProfileInfoResult, myProfileInfoResult.picture.url)
              var data = JSON.stringify(myProfileInfoResult)
              console.log("--------------",JSON.stringify(data))
              // saveRemember(true);
              // props.navigation.navigate('Discover', {screenflag: 'Discover'});               
              // saveCategory(true);
              // setEmail('');
              // setPassword('');
              // setRememberflag(false);
              let flag = false;
              firebaseAction.getSocialUsers((res) => {
                res.forEach((element) => {
                  let item = element.val();
        
                  if (item.email === myProfileInfoResult.email) {
                    flag = true;
                    let asdas = {
                      name: myProfileInfoResult.name,
                      email: myProfileInfoResult.email,
                      photo: myProfileInfoResult.picture.data.url,
                      gen: '0',
                    };
                    AsyncStorage.setItem("userinfo", JSON.stringify(asdas));
                    flag = true;
                    AsyncStorage.setItem("key", JSON.stringify({ keyName : element.key }));
                  }
                });
                if (flag === true) {
                  navigation.navigate("Init")
                  // saveRemember(true);
                  // saveRemember(true);
                  // props.navigation.navigate('Discover', {screenflag: 'Discover'});               
                  // saveCategory(true);
                  // setRememberflag(false);
                } else {
                  firebaseAction.pushSocialSignup({
                    name: myProfileInfoResult.name,
                    email: myProfileInfoResult.email,
                    pass: "",
                    gen: '0',
                    registerType: 'facebook',
                  });
                  let asdas = {
                    name: myProfileInfoResult.name,
                    email: myProfileInfoResult.email,
                    photo: myProfileInfoResult.picture.data.url,
                    gen: '0',
                    registerType: 'facebook',
                  };
                  AsyncStorage.setItem("userinfo", JSON.stringify(asdas));
                  navigation.navigate("Init")
                  // saveRemember(true);
                  // props.navigation.navigate('Discover', {screenflag: 'Discover'});               
                  // saveCategory(true);
                  // setEmail("");
                  // setPassword("");
                  // setRememberflag(false);
                }
              });
              
             
            }
      },
  );
  new GraphRequestManager().addRequest(myProfileRequest).start();
};


  return (
    <View style={styles.container}>

      <ScrollView>
        <View style={styles.scene}>
          {isLoading ?
            <View style={{ alignSelf: 'center', zIndex: 6, position: 'absolute', marginTop: 270 }}>
              <ActivityIndicator size="large" color="red" />
            </View>

            : null}
          <View style={styles.topDiv}>
            <View>
              <TouchableOpacity>
                <Text style={styles.tabTxtactive}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text style={styles.tabTxtdisable}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.tabDiv}>
            <View>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="E-mail"
                placeholderTextColor="#777777"
                autoCapitalize="none"
                style={styles.inputTxt}
                value={email}
                onChangeText={handleChangeemail}
              />
              <TextInput
                style={styles.inputTxt}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#777777"
                autoCapitalize="none"
                secureTextEntry={true}
                value={password}
                onChangeText={handleChangepass}
              />
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Forget');
                }}>
                <Text style={styles.forgetTxt}>Forget Password?</Text>
              </TouchableOpacity>
            </View>
            <View>
              <CheckBox
                // checked={rememberflag}
                containerStyle={styles.checkbox}
                title="Remember Me"
                onPress={() => {
                  // setRememberflag(!rememberflag);
                }}
              />
            </View>
            <View
              style={[styles.btnDiv, { marginVertical: actuatedNormalizeH(20) }]}>
              <TouchableOpacity
                style={styles.btnSignup}
                onPress={() => {
                  signin();
                }}
                disabled={signinflag}
              >
                <Text style={[styles.btnTxt, { color: '#fff' }]}>Sign In!</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnDiv}>
              <Text style={{ color: '#787C85', fontSize: actuatedNormalizeW(11) }}>
                -------------------- <Text style={{ color: '#C6C6CA' }}>OR</Text>{' '}
              --------------------
            </Text>
            </View>
            <View style={styles.bottomDiv}>
              <TouchableOpacity
                onPress={() => {
                  signinFacebook();
                }}>
                <Image
                  source={require('../screens/assets/images/facebookIcon.png')}
                  alt="facebook"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  signinGoogle();
                }}>
                <Image

                  source={require('../screens/assets/images/googleIcon.png')}
                  alt="google"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MobileSignin');
                }}>
                <Image
                  source={require('../screens/assets/images/mobileIcon.png')}
                  alt="mobile"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SiginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  scene: {
    flex: actuatedNormalizeW(0),
    flexDirection: 'column',
    width: width,
    height: height,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  topDiv: {
    flexDirection: 'row',
    width: wp('60%'),
    justifyContent: 'space-between',
    marginTop: actuatedNormalizeH(50),
    marginBottom: actuatedNormalizeH(30)
  },
  tabTxtactive: {
    fontFamily: 'Nunito',
    fontSize: actuatedNormalizeW(18),
    padding: 10,
    fontWeight: 'bold',
    color: '#787C85',
    borderBottomColor: '#E4234B',
    borderBottomWidth: 3
  },
  tabTxtdisable: {
    fontFamily: 'Nunito',
    fontSize: actuatedNormalizeW(18),
    padding: 10,
    fontWeight: 'bold',
    color: '#C6C6CA',
  },
  tabDiv: {
    width: wp('100%'),
    justifyContent: 'center',
    paddingHorizontal: actuatedNormalizeW(20),
  },
  inputTxt: {
    borderColor: '#787C85',
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: actuatedNormalizeH(10),
    paddingLeft: actuatedNormalizeW(20),
    color: 'grey'
  },
  forgetTxt: {
    color: '#E4234B',
    fontSize: actuatedNormalizeW(12),
    fontFamily: 'Nunito',
  },
  checkbox: {
    margin: 0,
    padding: 0,
    marginTop: actuatedNormalizeH(10),
    backgroundColor: 'white',
    borderWidth: 0,
    color: 'grey'
  },
  btnDiv: {
    width: wp('100%'),
    alignItems: 'center'
  },
  btnTxt: {
    fontFamily: 'Roboto',
    fontSize: actuatedNormalizeW(13),
    padding: 10,
  },
  bottomDiv: {
    flexDirection: 'row',
    width: wp('90%'),
    justifyContent: 'space-between',
    marginTop: actuatedNormalizeH(20)
  },
  btnSignup: {
    backgroundColor: '#E4234B',
    width: wp('60%'),
    borderRadius: 30,
    alignItems: 'center',
  },
});
