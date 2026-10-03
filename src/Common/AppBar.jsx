import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const AppBar = ({ onProfilePress, profileImageUrl }) => {
  const [userPhoto, setUserPhoto] = useState(null);
  const navigation = useNavigation(); // 👈 access navigation

  useEffect(() => {
    const user = auth().currentUser;
    if (user && user.photoURL) {
      setUserPhoto(user.photoURL);
    } else {
      setUserPhoto(profileImageUrl);
    }
  }, [profileImageUrl]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#FFFFFF" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfilePress}>
          <View style={styles.profileWrapper}>
            <Image
              source={{ uri: userPhoto || 'https://via.placeholder.com/150' }}
              style={styles.profileIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {},
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.015,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Medium',
    marginLeft: 2,
    color: '#FFFFFF',
  },
  profileWrapper: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
});

export default AppBar;
