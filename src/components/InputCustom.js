import { StyleSheet, TextInput, View } from "react-native";

function InputCustom(props){
    return(<View>
        <TextInput style={styles.container} {...props} ></TextInput>
    </View>);
}

const styles = StyleSheet.create({
    container:{
        height: 62,
        width: '95%',
        borderWidth: 1,
        marginVertical: 20,
        borderRadius: 35,
        paddingHorizontal: 20,
        fontSize: 17
    }
});

export default InputCustom;