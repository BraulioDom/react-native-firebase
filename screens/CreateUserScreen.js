import React, { useState } from 'react'
import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native'

import firebase from "../database/firebase";

const createUserScreen = (props) => {

    const [state, setState] = useState({
        name: '', email: '', phone: ''
    })

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const handleSubmit = () => {
        if(state.name === ''){
            alert('Provide a name');
        } else {
            try{
                firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone,
                })
                props.navigation.navigate('UserList')
            } catch(error){
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="name user"
                    onChangeText={(value) => handleChangeText('name', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="email user"
                    onChangeText={(value) => handleChangeText('email', value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="phone user"
                    onChangeText={(value) => handleChangeText('phone', value)}
                />
            </View>

            <View>
                <Button title="save user" onPress={() => handleSubmit()} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 20,
        borderBottomWidth: 1.,
        borderBottomColor: "#cccccc"
    },
    container: {
        padding: 35,
        flex: 1
    }
})

export default createUserScreen
