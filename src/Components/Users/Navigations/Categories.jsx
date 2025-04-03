import React from 'react'
import { View, Text,  StyleSheet, } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

const Categories = () => {
  return (
    <LinearGradient
          colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
          style={styles.container}>
      <Text style={styles.text}>Browse Categories</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:"Poppins-Regular"
  },
  text:{
    fontSize: 14,
    fontFamily:'Poppins-Regular'
  }
})

export default Categories