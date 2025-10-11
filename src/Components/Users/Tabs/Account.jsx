import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '../../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppBar from '../../../Common/AppBar';

const { width } = Dimensions.get('window');

const UserAccount = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);

  const handleCardPress = async (title) => {
    if (title === 'Logout') {
      try {
        await auth().signOut();
        Toast.show({
          type: 'success',
          text1: 'Logout Successful',
          text2: 'You have been logged out 👋',
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Logout Failed',
          text2: error.message,
        });
      }
    } else {
      Toast.show({
        type: 'info',
        text1: `${title}`,
        text2: 'Feature coming soon!',
      });
    }
  };

  const accountOptions = [
    { title: 'Your Profile', icon: 'person' },
    { title: 'Your Orders', icon: 'cart' },
    { title: 'Your Address', icon: 'location' },
    { title: 'Payment Details', icon: 'card' },
    { title: 'Settings', icon: 'settings' },
    { title: 'Logout', icon: 'exit' },
  ];

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD']}
      style={styles.container}
    >
      <AppBar />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri:
                user?.photoURL ||
                'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>
              {user?.displayName || 'Guest User'}
            </Text>
            <Text style={styles.profileEmail}>
              {user?.email || 'Not logged in'}
            </Text>
          </View>
        </View>

        {/* Account Options */}
        <View style={styles.cardContainer}>
          {accountOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardPress(option.title)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <Icon name={option.icon} size={20} color="#1E88E5" />
              </View>
              <Text style={styles.cardText}>{option.title}</Text>
              <Icon name="chevron-forward" size={20} color="#757575" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    gap: 24,
  },
  profileContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    alignItems: 'center',
   
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#1E88E5',
  },
  profileEmail: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },
  cardContainer: {
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
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
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#033c6b',
    flex: 1,
  },
});

export default UserAccount;
