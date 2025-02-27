import React, {useContext} from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import AuthContext from "../../contexts/auth";
import { useAuth } from "../../contexts/auth";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
})

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth()


    function handleSignOut(){
        signOut()
    }

    return (
        <View style={styles.container}>
            <Text>{user ?.name}</Text>
            <Button title="Logout" onPress={handleSignOut}></Button>
        </View>
    )
}
export default Dashboard