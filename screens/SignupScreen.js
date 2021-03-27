import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Platform, PixelRatio, View, Image, TouchableOpacity, Text, TextInput, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import CheckBox from '@react-native-community/checkbox';
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension'
import { ScrollView } from 'react-native-gesture-handler';
import { WToast } from "react-native-smart-tip";
import Firebase from "react-native-firebase";
import firebaseAction from "../src/config/firebaseAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-community/google-signin";
import { AuthContext } from '../Components/Context';
const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState("");
    const [rpass, setRpass] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [disabled, setdisabled] = useState(false)
    const [isLoading, setisLoading] = useState(false);
    const { validation } = React.useContext(AuthContext);
    const handleChangeemail = (text) => {
        setEmail(text);
    };
    const handleChangepass = (text) => {
        setPass(text);
    };
    const handlechangeusername = (text) => {
        setUsername(text);
    };

    const handlechangerpass = (text) => {
        setRpass(text);
    };
    useEffect(() => {
        console.log("useEffect", Firebase.auth().currentUser);

        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
                '602536565162-he5v62ojaih51jea0qr3fhj9uo6p0c7q.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });

        return () => {

        }
    }, [])


    const signin = async () => {
        setisLoading(true)
        if (pass !== rpass) {
            console.log("pass", pass, rpass)
            const toastOpts = {
                data: "The email and password you entered are not correct.",
                textColor: "#ffffff",
                backgroundColor: "#FF0000",
                width: '100%',
                duration: WToast.duration.LONG,
                position: WToast.position.TOP,
            };
            WToast.show(toastOpts);
            setisLoading(false)
        } else {
            await Firebase.auth()
                .createUserWithEmailAndPassword(email.trim(), pass)
                .then((res) => {
                    const user = res.user;
                    console.log(' createUserWithEmailAndPassword authUser :: ', user);
                    firebaseAction.pushSignup(user.uid, {
                        //   userid: user.uid,
                        name: username,
                        email: user.email,
                        pass: pass,
                        gen: '0',
                        registerType: 'email',
                       
                    });
                    const toastOpts = {
                        data: "success signup",
                        textColor: "#ffffff",
                        backgroundColor: "black",
                        width: "100%",
                        duration: WToast.duration.LONG,
                        position: WToast.position.TOP,
                    };

                    user.sendEmailVerification().then(function () {
                        console.log("sendEmailVerification   :: ", 'sendEmailVerification');
                        WToast.show(toastOpts);
                        Firebase.auth().signOut().then(() => {
                            AsyncStorage.clear().then(() => {
                                setdisabled(false);
                                setisLoading(false)
                                navigation.navigate("Signin");

                            });
                        });
                        // Email sent.
                    }, function (error) {
                        // An error happened.
                        console.log("sendEmailVerification error :: ", error);
                        ToastAndroid.showWithGravityAndOffset(
                            error.message,
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            50
                        );
                        setisLoading(false)
                    });
                })
                .catch((error) => {
                    setdisabled(false);
                    Firebase.auth().signOut();
                    console.log("createUserWithEmailAndPassword error 1:: ", error);
                    ToastAndroid.showWithGravityAndOffset(
                        error.message,
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        50
                    );
                    setisLoading(false)
                });
        }
    }


    // siginwith facebook flow--------------------------------------------------------------------------------------------------------------

    const signinFacebook = () => {
        console.log("hiiiiiiiiiiiii--------------------")
        // if(Platform.OS ==="android")
        // {
        //   LoginManager.setLoginBehavior("web_only")
        // }
        LoginManager.logInWithPermissions(['public_profile', 'email'])
            .then((result) => {
                console.log("result-------------------", JSON.stringify(result));
                if (result.isCancelled) {
                    //   saveRemember(true);
                } else {
                    AccessToken.getCurrentAccessToken().then(
                        (data) => {
                            console.log('data', JSON.stringify(data));
                            const accessToken = data.accessToken.toString();
                            console.log("_----------------------------", accessToken)
                            GetInformationFromToken(accessToken);
                        }
                    )
                }
            })
            .catch(error => {
                console.log('logineroor', error);
            })
    }

    const GetInformationFromToken = (accessToken) => {
        console.log("accessToken--------------------", accessToken)
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
                    console.log("myProfileInfoResult", myProfileInfoResult, myProfileInfoResult.picture.url)
                    var data = JSON.stringify(myProfileInfoResult)
                    console.log("--------------", JSON.stringify(data))
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
                                AsyncStorage.setItem("key", JSON.stringify({ keyName: element.key }));
                            }
                        });
                        if (flag === true) {
                            validation(true)
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
                            validation(true)
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

    // siginwith google flow--------------------------------------------------------------------------------------------------------------

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
                        AsyncStorage.setItem("key", JSON.stringify({ keyName: element.key }));
                    }
                });
                if (flag === true) {
                    validation(true)
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
                    validation(true)
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
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Signin');
                                }}>
                                <Text style={styles.tabTxtdisable}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity>

                                <Text style={styles.tabTxtactive}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tabDiv}>
                        <View>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="User Name"
                                placeholderTextColor="#777777"
                                autoCapitalize="none"
                                style={styles.inputTxt}
                                value={username}
                                onChangeText={handlechangeusername}
                            />
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
                                value={pass}
                                onChangeText={handleChangepass}
                            />
                            <TextInput
                                style={styles.inputTxt}
                                underlineColorAndroid="transparent"
                                placeholder="Confirm Password"
                                placeholderTextColor="#777777"
                                autoCapitalize="none"
                                secureTextEntry={true}
                                value={rpass}
                                onChangeText={handlechangerpass}
                            />
                        </View>

                        <View
                            style={[styles.btnDiv, { marginVertical: actuatedNormalizeH(20) }]}>
                            <TouchableOpacity
                                style={styles.btnSignup}
                                onPress={() => {
                                    signin();
                                }}
                                disabled={disabled}
                            // disabled={signinflag}
                            >
                                <Text style={[styles.btnTxt, { color: '#fff' }]}>Sign Up!</Text>
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

export default SignupScreen;

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
