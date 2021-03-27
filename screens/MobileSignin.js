import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput, ToastAndroid,
  Platform,
  PixelRatio,
  Dimensions,
  StyleSheet
} from "react-native";
import { WToast } from "react-native-smart-tip";
import { Keyboard } from "react-native";
import Firebase from "react-native-firebase";
import firebaseAction from "../src/config/firebaseAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AuthContext } from '../Components/Context';
const MobileSignin = ({ navigation }) => {
  const [phonenumber, setPhonenumber] = React.useState('');
  const [phonenumberconfirm, setPhonenumberconfirm] = React.useState("");
  const [confirmResult, setconfirmResult] = React.useState('');
  const [changeflag, setChangeflag] = React.useState(true);
  const [code, setCode] = React.useState("");
  const [finalpin, setfinalpin] = React.useState('');
  const [buttonenable, setbuttonenable] = React.useState(false);
  const [seconds, setSeconds] = React.useState(60);
  const { validation } = React.useContext(AuthContext);

  useEffect(() => {
    if (changeflag === false) {

      const timer =
        seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timer);
    }

  }, [seconds, changeflag]);


  useEffect(() => {

    if (seconds < 1) {

      setbuttonenable(true)
    }

  }, [seconds]);

  const setMobileNo = (text) => {
    setPhonenumber(text);
  };

  const setConfirmMobile = (text) => {
    setPhonenumberconfirm(text);
  };

  const signin = () => {
    if (phonenumber.length === 0) {
      console.log("0--------------------------condition")
      const toastOpts = {
        data: "Please Enter Mobile",
        textColor: "#ffffff",
        backgroundColor: "#ff0000",
        width: "100%",
        duration: WToast.duration.LONG,
        position: WToast.position.TOP,
      };
      WToast.show(toastOpts);
    } else {
      console.log("+91" + phonenumber);
      console.log("0--------------------------else");
      
      Firebase
      .auth()
      
      .signInWithPhoneNumber(phonenumber)
      .then((confirmResult) => {
        console.log("confirmResult------------------------------------------",confirmResult.uid)
        setconfirmResult(confirmResult);
        setChangeflag(false);
      })
      .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(
          error.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
     });


    }
  }
  const VerifyOTp = () => {
    var otp = finalpin;
    console.log("otp------------------------------------------",otp)
    if (otp.length == 6) {
      confirmResult.confirm(otp)
      .then((user) => {
        console.log("_-----------------------------------",user)
        let flag = false;

        AsyncStorage.clear();
        firebaseAction.getSocialUsers((res) => {
          res.forEach((element) => {
            let item = element.val();          
            if (item.email === phonenumber){  
              
              AsyncStorage.setItem("key", JSON.stringify({ keyName : element.key }));
              // saveUserData(JSON.stringify(item));
              console.log("_-----------------------------------",JSON.stringify(item))
              let asdas = {
                name: item.name,
                email: item.email,
                photo: item.photo,
                gen: '0',
                registerType: 'mobile',
              };
              AsyncStorage.setItem("userinfo", JSON.stringify(asdas));
              flag = true;         
              
            }       
            });
            if(flag===true){
              console.log("_----------------true-------------------")
              validation(true)
            } 
            else {
              // here Email and Mobile no. are the same field as the Email Key inside the firebase database
              firebaseAction.pushSocialSignup({name: 'User Name ', email:phonenumber, pass: '', gen:'0', registerType: 'mobile',});            
              let asdas={name:'User Name' ,email:phonenumber,photo:'',gen:'0'} ;
              AsyncStorage.setItem('userinfo', JSON.stringify(asdas));
              // saveRemember(true);            
              validation(true)              
              // saveCategory(true);
           }
        });           
      })
      .catch((error) => {        
        const toastOpts = {
          data: error.Error,
          textColor: "#ffffff",
          backgroundColor: "#ff0000",
          width: "100%",
          duration: WToast.duration.LONG,
          position: WToast.position.TOP,
        };
        WToast.show(toastOpts);
        console.log("sadsadasdas", error);
      });
  } else {
    console.log("Please enter a 6 digit OTP code.");
  }
  }

  const resendotp = ()=>{
    console.log("+91" + phonenumber);
    console.log("0--------------------------else")
    Firebase
      .auth()
      .signInWithPhoneNumber(phonenumber)
      .then((confirmResult) => {
        console.log("confirmResult------------------------------------------",confirmResult)
   
        setconfirmResult(confirmResult);
        // props.navigation.navigate("OTP", {
        //   ConfirmationData: confirmResult,
        //   MobileNo: phonenumber,
        // });
        setChangeflag(false);
      })
      .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(
          error.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
     });
    }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.topDiv}>
            <View>
              {changeflag ? (
                <Text style={styles.tabTxtactive}>Mobile Number</Text>
              ) : (
                  <Text style={styles.headerText}>
                    Please check your phone number for OTP and enter below.
                  </Text>
                )}
            </View>
          </View>

          {changeflag ?
            (
              <View style={styles.tabDiv}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="+00-000-0000"
                  keyboardType="numeric"
                  maxLength={15}
                  placeholderTextColor="#777777"
                  style={styles.inputTxt}
                  value={phonenumber}
                  onChangeText={(text) =>
                    text.length == 1 ? setMobileNo('+', +text) : setMobileNo(text)
                  }
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="+00-000-0000"
                  keyboardType="numeric"
                  maxLength={15}
                  placeholderTextColor="#777777"
                  style={styles.inputTxt}
                  value={phonenumberconfirm}
                  // onChangeText={(text) => setConfirmMobile(text)}

                  onChangeText={(text) =>
                    text.length == 1 ? setConfirmMobile('+', +text) : setConfirmMobile(text)
                  }
                />
              </View>
            ) : (




              <OTPInputView
                style={{ width: '70%', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, fontSize: 50, alignSelf: 'center' }}
                pinCount={6}

                code={finalpin} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={code => { setfinalpin(code) }}
                autoFocusOnLoad

                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}

              />




              /* </View> */
            )

          }


          <TouchableOpacity style={styles.btnSignup} onPress={changeflag ? signin : VerifyOTp}>
            <Text style={[styles.btnTxt, { color: "#fff" }]}>Sign Up!</Text>
          </TouchableOpacity>


          {
            changeflag ?
              (<Text
                style={{ color: "#787C85", fontSize: actuatedNormalizeW(11), textAlign: 'center', margin: 20 }}>
                You will receive OTP which you need to enter in order to confirm
                your account.
              </Text>) :

              (
                buttonenable == true ?
                  <TouchableOpacity onPress={resendotp}>
                    <Text
                      //  disabled={isButtonDisabled}
                      style={{ color: "#787C85", fontSize: actuatedNormalizeW(11), textAlign: 'center', margin: 20 }}>
                      Resend OTP
          </Text>
                  </TouchableOpacity>

                  : <Text
                    //  disabled={isButtonDisabled}
                    style={{ color: "#787C85", fontSize: actuatedNormalizeW(11), textAlign: 'center', margin: 20 }}>
                    please wait {seconds}  seconds for OTP .
          </Text>

              )

          }

        </View>

      </ScrollView>
    </View>
  );
};

export default MobileSignin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flexDirection: "column",
    width: width,
    height: height,
    alignItems: "center",
    backgroundColor: "white",
  },
  topDiv: {
    flexDirection: "row",
    marginTop: actuatedNormalizeH(20),
    marginBottom: actuatedNormalizeH(40),
  },
  tabTxtactive: {
    fontFamily: "Nunito",
    fontSize: actuatedNormalizeW(15),
    padding: 10,
    color: "#787C85",
    borderBottomColor: "#E4234B",
    borderBottomWidth: 3,
  },
  headerText: {
    color: "grey",
    fontSize: 17,
    marginTop: 50,
    letterSpacing: 0.2,
    paddingVertical: 10,
    marginLeft: 30,
    marginRight: 30,
    alignSelf: "center",
    textAlign: "center",
  },
  tabDiv: {
    width: wp('100%'),
    justifyContent: "center",
    paddingHorizontal: actuatedNormalizeW(20),
  },
  inputTxt: {
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 7,
    marginVertical: actuatedNormalizeH(10),
    paddingLeft: actuatedNormalizeW(20),
    color: "grey",
  },
  underlineStyleBase: {
    width: 30,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 4,
    borderColor: "red",
    fontSize: 25,
    color: 'grey'
  },

  underlineStyleHighLighted: {
    borderColor: "red",
  },
  btnTxt: {
    fontFamily: "Roboto",
    fontSize: actuatedNormalizeW(11),
    padding: 10,
  },
  btnSignup: {
    backgroundColor: "#E4234B",
    width: wp('60%'),
    padding: 2,
    margin: 50,
    borderRadius: 30,
    alignItems: "center",
  },

});
