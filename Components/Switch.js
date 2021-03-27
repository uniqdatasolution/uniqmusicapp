import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from 'react';
import {Switch as RNSwitch} from 'react-native';
import {useTheme} from '../Components/themes/ThemeProvider';


export const Switch =    ()  => {
    const {setScheme, isDark} =  useTheme();

    const toggleScheme =  async (value) => {
       
        const stri  =  value ? 'dark': 'light';
    
         AsyncStorage.setItem("isDark", stri).then((value) => {
            isDark ? setScheme('light') : setScheme('dark');
            AsyncStorage.getItem("isDark").then((isDarkValue) => {
                global.colorScheme = isDarkValue;
                
               // setScheme(isDarkValue);
            }) 
         });
         
    }
          
    return (
        <>
        <RNSwitch value={isDark} onValueChange={toggleScheme}/>
        </>
        
    );
}