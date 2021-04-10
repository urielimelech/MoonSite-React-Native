import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from '../Screens/WelcomeScreen';

export const Screens = {
    Welcome: 'WelcomeScreen'
}

export const Navigator = () => {
    const stackNavigator = createStackNavigator(
        {
            [Screens.Welcome]: { screen: WelcomeScreen }
        },
        {
            defaultNavigationOptions: {
                headerShown: true,
                header: null,
            },
        }
    )
    return (
        <NavigationContainer>
            {stackNavigator}
        </NavigationContainer>
    )
}
