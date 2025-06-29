import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AppBar from '../../../Common/AppBar'

const { width } = Dimensions.get('window')

const UploadRX = ({ setActiveTab }) => {
  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD']}
      style={styles.container}
    >
      <AppBar />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {/* Card 1 - Upload Prescription */}
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

          {/* Card 2 - How it works */}
          <View style={styles.card}>
            <Text style={styles.title}>How does this work?</Text>
            <View style={styles.stepContainer}>
              <Text style={styles.step}>1. Upload a photo of your prescription</Text>
              <Text style={styles.step}>2. Add delivery address and place the order</Text>
              <Text style={styles.step}>3. We will call you to confirm the medicines</Text>
              <Text style={styles.step}>4. Sit back! Medicines delivered at your doorstep</Text>
            </View>
          </View>

          {/* Button - Search Medicine */}
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.uploadButtonText}>Search your medicine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  mainContainer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,

    // 🌐 iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,

    // 🤖 Android elevation
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    color: '#033c6b',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  uploadButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: '#38b6ff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  stepContainer: {
    marginTop: 8,
  },
  step: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
    marginBottom: 6,
    lineHeight: 22,
  },
})

export default UploadRX
