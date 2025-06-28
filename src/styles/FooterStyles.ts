import { StyleSheet } from 'react-native';
import { colors } from '../components/Color';

const footerStyles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
    
        backgroundColor: 'white',
        paddingVertical: 25,
        paddingHorizontal:15,
        width:'100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 0 }, // Only shadow at the bottom
        shadowOpacity: 0.1,
        shadowRadius: 4,
    
        // Shadow for Android
        elevation: 5,
      },
      totalText:{
        color:colors.mainGreen,
        fontSize:18,
        fontFamily: 'Cairo-bold',
      }
});

export default footerStyles;
