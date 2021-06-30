import React, { useEffect, useState } from 'react'
import { ScrollView, Text, Button } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

import firebase from '../database/firebase'

const UserList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {

            const users = []

            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data()
                users.push({
                    name, email, phone, id: doc.id
                })
            })

            setUsers(users)
        })
    }, [])

    return (
        <ScrollView>
            <Button
                color="green"
                title="create user"
                onPress={() => props.navigation.navigate("CreateUserScreen")}
            />

            {users.map(user => {
                return (
                    <ListItem
                        key={user.id}
                        bottomDivider
                        onPress={
                            () => props.navigation.navigate(
                                "UserDetailScreen",
                                { userId: user.id }
                            )}
                    >
                        <ListItem.Chevron />
                        <Avatar
                            rounded
                            source={{
                                uri:
                                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    )
}

export default UserList
