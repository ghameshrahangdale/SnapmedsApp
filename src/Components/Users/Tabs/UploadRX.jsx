import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const UploadRX = ({ setActiveTab }) => {
  const navigate = useNavigation()

  const handleBackPress = () => {
    setActiveTab('home')
  }

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
      style={styles.container}>

      {/* App Bar with Back Arrow */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Order by prescription</Text>
      </View>
      <View style={styles.mainContainer}>
      {/* Order with Prescription Card */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="cloud-upload" size={60} color="#033c6b" />
        </View>
        <Text style={styles.title}>Order with Prescription</Text>
        <Text style={styles.subtitle}>
          Upload prescription and we will deliver your medicines within 59 minutes
        </Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="cloud-upload-outline" size={24} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload Prescription</Text>
        </TouchableOpacity>
      </View>

      {/* How does this work? Card */}
      
        <View style={styles.card}>
          <Text style={styles.title}>How does this work?</Text>
          <View style={styles.stepContainer}>
            <Text style={styles.step}>1. Upload a photo of your prescription</Text>
            <Text style={styles.step}>2. Add delivery address and place the order</Text>
            <Text style={styles.step}>3. We will call you to confirm the medicines</Text>
            <Text style={styles.step}>4. Now, sit back! Your medicines will get delivered at your doorstep</Text>
          </View>
        </View>

        {/* Search your medicine Button */}
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.uploadButtonText}>Search your medicine</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  appBar: {
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 12,
  }, 
  mainContainer: {
    marginTop: 80, 
    width: '100%',
    alignItems: 'center',
    gap:16
  },
  card: {
    width:"90%",
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius:8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: '#033c6b',
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: '#38b6ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '90%',
    alignItems: 'center',
    
  },
  stepContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  step: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
})

export default UploadRX