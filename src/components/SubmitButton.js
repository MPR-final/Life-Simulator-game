import { Text, Pressable, StyleSheet, View } from "react-native";

function SubmitButton({ title, onPress }){
    return(<View>
        <Pressable style={({pressed}) =>[styles.container, pressed ? styles.pressedBtn : null]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    </View>);
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFB732',
        width: 150,
        height: 60,
         alignSelf: 'center',
         borderRadius: 35,
         justifyContent: 'center',
         alignItems: 'center',
         borderWidth: 4,
         borderColor: 'white',
         elevation: 7
    },
    text:{
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold'
    },
    pressedBtn:{
        opacity: 0.75
    }
});

export default SubmitButton;