import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
    token: '' as string | null,
    isAuthed: false,
    auth: (token: string) => {
    },
    logout: () => {
    },
})

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>('')
    const auth = async (token: string) => {
        setAuthToken(token)
        await AsyncStorage.setItem('token', token)
    }
    const logout = async () => {
        setAuthToken(null)
        await AsyncStorage.removeItem('token')
    }
    const value = {
        token: authToken,
        isAuthed: !!authToken,
        auth,
        logout,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
