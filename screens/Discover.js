import React from 'react';
import { View, Text, Button, StyleSheet ,style,Image,TouchableOpacity} from 'react-native';
import Footer from './Footer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { actuatedNormalizeH, scaleW, actuatedNormalizeW, scaleH, width, height } from '../screens/assets/layout/Dimension';
import {useTheme} from '../Components/themes/ThemeProvider';
const Discover = (props) => {
    const {colors, isDark} = useTheme();

    return (
        <View style={styles.container}>

            <View style={{ width: wp('100%'),
        height: hp('100%'),
        borderBottomWidth: 0.2,
        borderBottomColor: "grey",
        backgroundColor:colors.background,
}}>
               


            </View>

            <View style={styles.Footer}>
                <Footer flag={'discover'} navigation={props.navigation} />
            </View>

        </View>
    );
};


export default Discover;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
        // alignItems: 'center', 
        // justifyContent: 'center'

    },
    Footer: {
        backgroundColor: 'white',
        bottom: 0,
        opacity: 1,
        alignSelf: 'flex-end',
        flexDirection: 'column',
        position: 'absolute',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft: 10,
        marginRight: 10
    },

    articleDiv: {
       
    },
   
});




