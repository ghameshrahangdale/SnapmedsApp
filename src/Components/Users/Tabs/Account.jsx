import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const UserAccount = ({ setActiveTab }) => {
  // Navigate to Home
  const handleBackPress = () => {
    setActiveTab('home')
  }

  // Handle Card Press (Placeholder for future navigation)
  const handleCardPress = (title) => {
    if (title === 'Logout') {
      Alert.alert('Logout Successful!', 'You have been logged out.')
      setActiveTab('LoginScreen')
    } else {
      Alert.alert(title, `Feature coming soon!`)
    }
  }

  // Card Data
  const accountOptions = [
    { title: 'Your Profile', icon: 'person' },
    { title: 'Your Orders', icon: 'cart' },
    { title: 'Your Address', icon: 'location' },
    { title: 'Payment Details', icon: 'card' },
    { title: 'Settings', icon: 'settings' },
    { title: 'Logout', icon: 'exit' },
  ]

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
      style={styles.container}>

      {/* App Bar with Back Button */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>My Account</Text>
      </View>

      {/* Main Content */}
      <View style={styles.mainContainer}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/80' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>Ghamesh Rahangdale</Text>
            <Text style={styles.profileEmail}>ghameshrahangdale83@gmail.com</Text>
          </View>
        </View>

        {/* Account Options Cards */}
        <View style={styles.cardContainer}>
          {accountOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardPress(option.title)}>
              <View style={styles.iconContainer}>
                <Icon name={option.icon} size={20} color="#1E88E5" />
              </View>
              <Text style={styles.cardText}>{option.title}</Text>
              <Icon name="chevron-forward" size={20} color="#757575" />
            </TouchableOpacity>
          ))}
        </View>
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
    paddingHorizontal: 16,
    flex: 1,
    gap: 16,
  },

  profileContainer: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#1E88E5',
  },
   profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    
  },
  profileEmail: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },

  cardContainer: {
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#033c6b',
    flex: 1,
  },
})

export default UserAccount
