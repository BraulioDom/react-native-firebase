import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { View, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native'

import firebase from '../database/firebase'

const UserDetailScreen = (props) => {

    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }

    const [user, setUser] = useState({
        name: '', email: '', phone: '', id: ''
    })

    const [loader, setLoader] = useState(true)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get()
        const user = doc.data()
        setUser({
            ...user,
            id: doc.id
        })
        setLoader(false)
    }

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }

    const deleteUser = async () => {
        const dbRef = firebase.db.collection("users").doc(props.route.params.userId)
        await dbRef.delete()
        props.navigation.navigate('UserList')
    }

    const handleDelete = () => {
        Alert.alert('remove user', 'are u sure?', [
            {text: 'yes', onPress: () => deleteUser()},
            {text: 'no', onPress: () => console.log('ok')}
        ])
    }

    const handleUpdate = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id)
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        })
        setUser(initialState)
        props.navigation.navigate('UserList')
    }

    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    if(loader) {
        <View>
            <ActivityIndicator size="large" color="#9e9e9e" />
        </View>
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="name user"
                    onChangeText={(value) => handleChangeText('name', value)}
                    value={user.name}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="email user"
                    onChangeText={(value) => handleChangeText('email', value)}
                    value={user.email}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="phone user"
                    onChangeText={(value) => handleChangeText('phone', value)}
                    value={user.phone}
                />
            </View>

            <View>
                <Button title="update user" onPress={() => handleUpdate()} />
                <Button color="red" title="delete user" onPress={() => handleDelete()} />
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

export default UserDetailScreen
