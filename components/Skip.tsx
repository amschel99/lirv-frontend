import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { boldtext, colors } from "../assets/constants";

const SkipOrHome = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("homescreen");
  };

  return (

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Skip to home</Text>
      </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  container: {

    height:5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:5
  },
  text: {
    fontSize: 10,
    marginBottom: 20,
  },
  button: {

    padding: 10,
    borderRadius: 5,


  },
  buttonText: {
    color: colors.navy_blue,
    fontSize: 14,
    textAlign:"center"
  },
});

export default SkipOrHome;
