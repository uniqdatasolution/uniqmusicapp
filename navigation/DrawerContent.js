import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import {

    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Image,
    Text,
    TouchableRipple,

  
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-community/async-storage';
import {useTheme} from '../Components/themes/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Components/Context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Switch } from "../Components/Switch";
// import { color } from 'react-native-reanimated';
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension';
function DrawerContent(props) {

    const { validation, toggleTheme } = React.useContext(AuthContext);

    const [photo, setphoto] = React.useState('');
    const [firstName, setfirstName] = React.useState('');
    const [email, setemail] = React.useState('');
    const {setScheme, isDark} = useTheme();

    useEffect(() => {
        (async function () {
            var UserDataString = JSON.parse(await AsyncStorage.getItem('userinfo'))
            console.log("-------------------", UserDataString)

            setfirstName(UserDataString.name)
            setemail(UserDataString.email)
            setphoto(UserDataString.photo)
        })()
    }, [firstName, email, photo])

    const toggleScheme = () => {
        /*
        * setScheme will change the state of the context
        * thus will cause childrens inside the context provider to re-render
        * with the new color scheme
        */
        isDark ? setScheme('light') : setScheme('dark');
    }


    const signOut = async () => {

        try {

            await AsyncStorage.clear();

        } catch (e) {
            console.log(e);
        }
        Alert.alert('DO YOU WANT TO SINGOUT ', 'Thank you for using our App.', [
            { text: "OK", onPress: () => validation(false) },
            { text: "cancel", onPress: () => console.log('cancel') }
        ]);
    }


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ marginTop: 25, alignSelf: 'center', justifyContent: "center", alignItems: 'center' }}>

                            <Avatar.Image style={{ backgroundColor: '#FFFFFF' }}

                             source={photo === null || photo === undefined || photo === "" ? require('../screens/assets/images/profile.png') : { uri: photo }}
                                size={100}

                            />

                            <TouchableOpacity style={styles.addPictureIcon}
                            // onPress={
                            //     chooseImage
                            // }
                            >
                                <Avatar.Image
                                    size={40}
                                    opacity={0.6}
                                   
                                    source={
                                        require('../screens/assets/images/camera.jpeg')} //else show random
                                />
                             
                            </TouchableOpacity>



                            <View style={{ alignItems: 'center', alignSelf: "center", justifyContent: "center" }}>
                                <Title style={styles.title}>{firstName}</Title>
                                <Caption style={styles.caption}>{email}</Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem style={styles.DrawerItem}

                            label="Profile"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('Customers')}}
                        />

                        <DrawerItem style={styles.DrawerItem}

                            label="Songs"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('DailyCollect')}}
                        />
                        <DrawerItem style={styles.DrawerItem}

                            label="Artists"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('DailyCollect')}}
                        />
                        <DrawerItem style={styles.DrawerItem}

                            label="Videos"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('DailyCollect')}}
                        />
                        <DrawerItem style={styles.DrawerItem}

                            label="Radio"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('DailyCollect')}}
                        />
                        <DrawerItem style={styles.DrawerItem}

                            label="Downloads"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('DailyCollect')}}
                        />
                        <DrawerItem style={styles.DrawerItem}

                            label="News"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('DailyCollect')}}
                        />
                        <DrawerItem style={styles.DrawerItem1}

                            label="FAQ"
                            labelStyle={{ fontSize: 18, color: "#000000" }}
                        // onPress={() => {props.navigation.navigate('DailyCollect')}}
                        />
                         
                           
                    </Drawer.Section>
                   <Drawer.Section>
                
        <View style={{flexDirection:'row', justifyContent:'space-around', color: "#000",padding: 5}}>
            <Text  style={styles.itemInner}>
              Dark Mode  
            </Text>
            <Switch />
        </View> 

                  </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <View style={{ height: 40, marginTop: 10, backgroundColor: '#E4234B', borderRadius: 10 }}>
                    <TouchableOpacity onPress={() => { signOut() }}>
                        <View style={{
                            height: 30, flexDirection: 'row', marginTop: 5,
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 20, color: "#FFFFFF", marginRight: 5, textAlign: 'center', }}>LOGOUT</Text>
                            <Icon name="exit-to-app" color="#FFFFFF" size={30} marginRight={5}></Icon>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <Switch value={isDark} onValueChange={toggleScheme}/> */}
                
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,


    },
    userInfoSection: {
        paddingLeft: 25,
        height: 220,
        backgroundColor: '#E4234B',
        marginTop: 0,
        top: 0
    },
    title: {
        fontSize: 18,
        marginTop: 3,
        //   fontWeight: 'bold',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center'

    },
    DrawerItem: {
        borderBottomWidth: 0.2, padding: 5, borderColor: 'grey'
    },
    DrawerItem1: {
        padding: 10,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'white',

    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 2,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 2
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomDrawerSection1: {
        marginBottom: 1,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 2,
        alignItems: 'center',

    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    addPictureIcon: {
        height: 30,
        width: 30,
        backgroundColor: "white",
        borderRadius: 50,
        position: 'absolute',
        right: 60,
        top: 70,
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',

    },
    itemInner: {
        fontFamily: "normal",
        fontSize: actuatedNormalizeW(15),
        paddingTop: actuatedNormalizeH(5),
        paddingBottom: actuatedNormalizeH(8),
        color: "#000",
        flexDirection: 'row',
        borderBottomWidth: 0,
        borderBottomColor: "#212227",
      },
});

export default DrawerContent;