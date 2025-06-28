import { Text } from 'react-native';


export default props =>
    <Text {...props} style={[{ fontFamily: 'Cairo',}, props.style]}>
        {props.children}
    </Text>
