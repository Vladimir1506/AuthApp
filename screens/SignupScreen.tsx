import AuthContent from '../components/Auth/AuthContent';
import {auth} from '../util/auth';
import {useContext, useState} from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';

function SignupScreen() {
    const [isAuthing, setIsAuthing] = useState(false)
    const authCtx = useContext(AuthContext)
    const authHandler = async ({email, password}: { email: string, password: string }) => {
        setIsAuthing(true)
        try {
            authCtx.auth(await auth('signUp', email, password))
        } catch (e: any) {
            Alert.alert('Authentication failed!', JSON.stringify(e.response?.data?.error?.message))
        }
        setIsAuthing(false)
    }
    return isAuthing ? <LoadingOverlay message={'Creating user...'}/> : <AuthContent onAuthenticate={authHandler}/>;
}

export default SignupScreen;
