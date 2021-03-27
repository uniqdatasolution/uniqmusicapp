

import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitScreen from '../screens/InitScreen';
import SiginScreen from '../screens/SiginScreen'
import SignupScreen from '../screens/SignupScreen';
import MobileSignin from '../screens/MobileSignin'
import ForgetPassword from '../screens/ForgetPassword'
import ForgetSuccess from '../screens/ForgetSuccess'
// import Discover from '../screens/Discover'
const RootStack = createStackNavigator();


const RootStackScreen = ({ navigation }) => {
    return (

        <RootStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#000000',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>

            <RootStack.Screen
                name="Init"
                component={InitScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="Signin"
                component={SiginScreen}
                options={{
                    headerShown: false,
                }}
            />
             <RootStack.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="MobileSignin"
                component={MobileSignin}
                options={{
                    headerShown: false,
                }}
            />
              <RootStack.Screen
                name="Forget"
                component={ForgetPassword}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="ForgetSucess"
                component={ForgetSuccess}
                options={{
                    headerShown: false,
                }}
            />
               {/* <RootStack.Screen
                name="Discover"
                component={Discover}
                // options={{
                //     headerShown: false,
                // }}
            /> */}
        </RootStack.Navigator>



    );
}




export default RootStackScreen;