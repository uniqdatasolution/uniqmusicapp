
import React, { useEffect,useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';


import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';
// import{ AuthContext } from './Components/Context';
// import DrawerContent from './Screens/DrawerContent'
import RootStackScreen from './navigation/RootStackScreen'




const App = ({navigation}) => {
  
  return (
    <PaperProvider>
    {/* <AuthContext.Provider value={authContext}> */}
       <NavigationContainer >

          <RootStackScreen/>
         
        </NavigationContainer>
        {/* </AuthContext.Provider> */}
        </PaperProvider>
    
    
    
    // homescreen navigTION-------------------------
    
    
    
      );
    }

    export default App;
