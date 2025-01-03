import { StyleSheet, Text, View } from "react-native"


export default function Conta() {
    return (
        <View style={styles.container}>
            <Text> Pagina Conta</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})