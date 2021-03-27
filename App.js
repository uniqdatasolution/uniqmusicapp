
// import React, { useEffect,useState } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { 
//   NavigationContainer, 
//   DefaultTheme as NavigationDefaultTheme,
//   DarkTheme as NavigationDarkTheme
// } from '@react-navigation/native';


// import { 
//   Provider as PaperProvider, 
//   DefaultTheme as PaperDefaultTheme,
//   DarkTheme as PaperDarkTheme 
// } from 'react-native-paper';
// // import{ AuthContext } from './Components/Context';
// // import DrawerContent from './Screens/DrawerContent'
// import RootStackScreen from './navigation/RootStackScreen'




// const App = ({navigation}) => {

//   return (
//     <PaperProvider>
//     {/* <AuthContext.Provider value={authContext}> */}
//        <NavigationContainer >

//           <RootStackScreen/>

//         </NavigationContainer>
//         {/* </AuthContext.Provider> */}
//         </PaperProvider>



//     // homescreen navigTION-------------------------



//       );
//     }

//     export default App;





import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { AuthContext } from './Components/Context';
import DrawerContent from './navigation/DrawerContent'
import { createDrawerNavigator } from '@react-navigation/drawer';

import RootStackScreen from './navigation/RootStackScreen'

import MainTabScreen from './navigation/MainTabScreen'

import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from './Components/themes/ThemeProvider';

const Drawer = createDrawerNavigator();

const App = ({ navigation }) => {
  const [isvalidate, setisvalidate] = useState(false)
  const [theme, settheme] = React.useState('dark');
   const authContext = React.useMemo(() => ({
    validation: async (validate) => {
      setisvalidate(validate)

      console.log("validate-----------", validate)

    },
  }))

 

  useEffect(() => {
    (async function () {
      await  AsyncStorage.getItem("isDark").then((isDarkValue) => {
        global.colorScheme = isDarkValue;
        settheme(global.colorScheme)
      })
    })()
  }, [])
  return (
    
    <AppearanceProvider>
    <ThemeProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer >
          {isvalidate == true ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            </Drawer.Navigator>

          )
            :
            <RootStackScreen />

          }
        </NavigationContainer>
      </AuthContext.Provider>
      </ThemeProvider>
    </AppearanceProvider>
   



    // homescreen navigTION-------------------------



  );
}

export default App;
