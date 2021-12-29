import { MaterialIcons } from "@expo/vector-icons"
import { Auth, DataStore } from "aws-amplify"
import React, { useState } from "react"
import {View, Text, StyleSheet, Pressable} from "react-native"
import { User } from "../src/models"

const Test = () => {
  const [user, setUser] = useState <User|undefined> (undefined);
  const fetchUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser()
    const loggedInUser = await DataStore.query(User, authUser.attributes.sub)
    setUser(loggedInUser)
}

const logOut = async () => {
  await DataStore.clear();
  Auth.signOut();
};

React.useEffect(() => {
   fetchUser();
},[user])


  const onPress = async () => {
    if(!user) {
      return
    }
    if(user.name !== "Joseph Micheal") {
      await DataStore.save(User.copyOf(user, (updated) => {
        updated.name = "Joseph Michael";
      }));
      console.log("Test name:", user.name)
    }

    else {
      await DataStore.save(User.copyOf(user, (updated) => {
        updated.name = "John Adam"
      }));

      console.log("New Name is:", user.name)
    }

  }
  return (

    <View style={styles.container}>

      <View style={[styles.button, {backgroundColor: "#4A4D55", }]}>
      <Text style={[styles.title ,{marginBottom: 10,}]}>
        Data pulled from backend before local change 👇: 
      </Text>

      <Text style={styles.text}>
        {user?.name}
      </Text>
      </View>

      <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.title}>
        Click to update data 
      </Text>
      </Pressable>


      <View style={{ marginTop: 20, alignItems:"center"}}>
      <Pressable onPress={logOut} style={{backgroundColor: "red", height: 50, width: 300, flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: 15, marginBottom: 10,}}>
      
      <MaterialIcons name="logout" size={24} color="white" />
      <Text style={{color:"white", fontWeight: "bold",}}> Logout </Text>
        
      </Pressable>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  title: {
    fontSize: 20,
    color: "white",
    
    
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  button: {
    backgroundColor: "#79DB75",
    padding: 15,
    borderRadius : 15,
    marginBottom: 20,
    justifyContent: "center",
  },
});




export default Test;