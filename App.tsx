import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from './constants/styles';
import {AuthContext, AuthContextProvider} from './store/auth-context';
import {useContext, useEffect, useState} from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync()

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: 'white',
                contentStyle: {backgroundColor: Colors.primary100},
            }}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useContext(AuthContext)
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.primary500},
                headerTintColor: 'white',
                contentStyle: {backgroundColor: Colors.primary100},
            }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
                headerRight: ({tintColor}) => <IconButton icon={'exit'} onPress={authCtx.logout} size={24}
                                                          color={tintColor || 'white'}/>
            }}/>
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useContext(AuthContext)
    return (
        <NavigationContainer>
            {authCtx.isAuthed ? <AuthenticatedStack/> : <AuthStack/>}
        </NavigationContainer>
    );
}

const Root = () => {
    const authCtx = useContext(AuthContext)

    const [isLogging, setIsLogging] = useState(true)
    useEffect(() => {
        AsyncStorage.getItem('token').then(async (token) => {
            token && authCtx.auth(token)
            setIsLogging(false)
            await SplashScreen.hideAsync()
        })
    }, []);
    return isLogging ? null : <Navigation/>

}

export default function App() {
    return (
        <>
            <StatusBar style="light"/>
            <AuthContextProvider>
                <Root/>
            </AuthContextProvider>
        </>
    );
}
