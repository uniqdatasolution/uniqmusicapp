import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  Text,
  Button,
  Image,
  TouchableOpacity,
  View
 
  // ScrollView,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Discover from '../screens/Discover';


const DiscoverStack = createStackNavigator();

// const Tab = createMaterialBottomTabNavigator();

// const MainTabScreen = () => (
 
//     <Tab.Navigator style={{borderColor:'grey',borderRadius:10}}
//     initialRouteName="Discover"
//     activeColor="#808080"
//     backgroundColor="white"
//   >
//     <Tab.Screen
//       name="Discover"
//       component={DiscoverStackScreen}
//       options={{
//       tabBarLabel: <Text style={{color:"#581D56"}}>Discover</Text> ,
  
      
//          tabBarColor: '#FFFFFF',

        
//           activeTintColor:'white',
//         tabBarIcon: ({ color ,tintColor, focused }) => (
//           <Icon name="ios-home-outline" style={{ color: focused ? '#581D56' : 'grey' }} size={26} />
      
//         ),
//       }}
//     />
       
       
    
//     </Tab.Navigator>
    
// );

// export default MainTabScreen;

const DiscoverStackScreen = ({navigation}) => {

  return(
  


<DiscoverStack.Navigator screenOptions={{
        headerStyle: {
         
        backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
     
        <DiscoverStack.Screen name="Discover" component={Discover} options={{
     
     headerTitle: (props) => ( // App Logo
       
    
    <Text style={{textAlign:'center',fontSize:20,color:'#E4234B',marginLeft:0,marginTop:10,marginBottom:10,fontWeight:'bold',marginRight :50}}>Discover</Text>
        
      ),
    
        headerLeft: () => (
            // <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            <TouchableOpacity  style={{ width: 40, height: 40, marginLeft : 10 ,alignSelf:'center',marginTop:10}} onPress={() => navigation.openDrawer()} >
            <Image style={{tintColor:"#E4234B",height:20,width:30}}source={require('../screens/assets/images/menu.png')}/>
           </TouchableOpacity>
          
           ),
         
     
              
          
        }}
       

        
      />
 
      </DiscoverStack.Navigator>
      
      
      );
    };

       
    export default DiscoverStackScreen;