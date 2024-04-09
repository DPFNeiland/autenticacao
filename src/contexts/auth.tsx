import React, { createContext, ReactNode, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as auth from '../../service/auth'
import api from '../../service/api'

interface User {
    name: string,
    email: string
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(): Promise<void>
    signOut(): void
    loading: boolean
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadStorageData() {
            const storageUser = await AsyncStorage.getItem('@RnAuth:user')
            const storageToken = await AsyncStorage.getItem('@RnAuth:token')

            if (storageUser && storageToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storageToken}`


                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
        }
        loadStorageData()
    }, [])

    async function signIn() {
        const response = await auth.signIn()

        const { token, user } = response;

        setUser(response.user)

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`

        await AsyncStorage.setItem('@RnAuth:user', JSON.stringify(response.user))
        await AsyncStorage.setItem('@RnAuth:token', response.token)
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null)
        })

    }



    return (
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

export function useAuth(){
    const context = useContext(AuthContext)

    return context
}