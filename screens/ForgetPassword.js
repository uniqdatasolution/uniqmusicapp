import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Firebase from "react-native-firebase";
import firebaseAction from '../src/config/firebaseAction';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WToast } from "react-native-smart-tip";

const ForgetPassword = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [passconfirm, setPassconfirm] = React.useState('');
    const [btnflag, setBtnflag] = React.useState(true);


    useEffect(() => {
        // if (email !== '' && pass !== '' && passconfirm !== '')
        if (email !== '')
            setBtnflag(false);
        else
            setBtnflag(true);
    }, [email, pass, passconfirm]);


    //   const reauthenticate = (currentPassword) => {

    //     var user = Firebase.auth().currentUser;
    // //     console.log(",currentPassword------------",currentPassword)
    // //   console.log("________",user)
    //     var cred = Firebase.auth.EmailAuthProvider.credential(user.email.trim(), currentPassword);
    //     console.log("___cred_____",cred)
    //     return user.reauthenticateWithCredential(cred);
    //   }

    const handleChangepass = () => {





        if (email == '') {
            const toastOpts = {
                data: 'The email and password you entered are not correct.',
                textColor: '#ffffff',
                backgroundColor: '#ff0000',
                width: '100%',
                duration: WToast.duration.LONG,
                position: WToast.position.TOP,
            };
            WToast.show(toastOpts);
        } else {
            let flag = false;
            let key = '';
            let currentPass = '';
            firebaseAction.getSocialUsers((res) => {

                res.forEach((element) => {

                    if (element.val().email.trim() === email.trim()) {
                        console.log(",element.val().email.key------------", element.val().email)
                        key = element.key;
                        flag = true;
                        currentPass = element.val().pass;
                    }
                });
            });
            if (flag) {
                console.log(flag)
                Firebase.auth().sendPasswordResetEmail(email.trim())
                    .then(function (user) {
                        // Alert.alert('Please check your email...')
                        navigation.navigate('ForgetSucess')
                    }).catch(function (e) {
                        console.log(e)
                    })

            } else {
                const toastOpts = {
                    data: 'The email you entered is not a registered user.',
                    textColor: '#ffffff',
                    backgroundColor: '#ff0000',
                    width: '100%',
                    duration: WToast.duration.LONG,
                    position: WToast.position.TOP,
                };
                WToast.show(toastOpts);
            }
        }
    };




    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.mainView}>
                    <View style={styles.topDiv}>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Signup');
                                }}>
                                <Image
                                    source={require('../screens/assets/images/leftIcon.png')}
                                    style={styles.leftIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.forgotTxt}>Forgot Password?</Text>
                        </View>
                    </View>
                    <View style={styles.tabDiv}>
                        <View>
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Your Email Adress"
                                placeholderTextColor="#777777"
                                autoCapitalize="none"
                                style={styles.inputTxt}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                }}
                            />

                        </View>

                        <View style={styles.btnDiv}>
                            <TouchableOpacity
                                style={styles.btnSignup}
                                onPress={() => {
                                    handleChangepass();
                                }}
                                disabled={btnflag}
                            >
                                <Text style={[styles.btnTxt, { color: 'white' }]}>
                                    Forgot My Password!
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    );
};

export default ForgetPassword;

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
    },
    topDiv: {
        flexDirection: 'row',
        width: wp('80%'),
        marginTop: actuatedNormalizeH(70),
        marginBottom: actuatedNormalizeH(50),
        alignItems: 'center',
    },
    leftIcon: {
        marginRight: actuatedNormalizeW(40),
    },
    forgetTxt: {
        color: '#E4234B',
        fontSize: actuatedNormalizeW(14),
        fontFamily: 'Nunito',
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
        marginVertical: actuatedNormalizeH(15),
        paddingHorizontal: actuatedNormalizeH(15),
        color: 'grey'
    },
    btnDiv: {
        width: wp('100%'),
        alignItems: 'center',
        marginTop: actuatedNormalizeH(50),
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
});
