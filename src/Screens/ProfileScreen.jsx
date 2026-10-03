import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppBar from '../Common/AppBar';
import { useAuth } from '../contexts/authContext';
import FirebaseHelper from '../utils/firebaseHelpers';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, userData, updateProfile } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        displayName: userData.displayName || '',
        email: userData.email || user?.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        dateOfBirth: userData.dateOfBirth || '',
      });
    }
  }, [userData, user]);

  const handleUpdateProfile = async () => {
    if (!formData.displayName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter your name',
      });
      return;
    }

    setLoading(true);
    try {
      const updates = {
        displayName: formData.displayName.trim(),
        ...(formData.phone && { phone: formData.phone.trim() }),
        ...(formData.address && { address: formData.address.trim() }),
        ...(formData.dateOfBirth && { dateOfBirth: formData.dateOfBirth.trim() }),
        profileCompleted: true,
      };

      const result = await updateProfile(updates);
      
      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Profile Updated',
          text2: 'Your profile has been updated successfully',
        });
        setEditing(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error.message || 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePhoto = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming Soon',
      text2: 'Photo upload feature will be available soon',
    });
  };

  const ProfileField = ({ label, value, editable, field, placeholder, keyboardType = 'default' }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {editing && editable ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => setFormData(prev => ({ ...prev, [field]: text }))}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor="#999"
        />
      ) : (
        <Text style={styles.fieldValue}>
          {value || `No ${label.toLowerCase()} added`}
        </Text>
      )}
    </View>
  );

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#FFFFFF']}
      style={styles.container}
    >
      <AppBar 
        title="My Profile" 
        rightComponent={
          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Text style={styles.editButton}>
              {editing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: userData?.photoURL || user?.photoURL || 
                     'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
              }}
              style={styles.profilePhoto}
            />
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={handleChangePhoto}
            >
              <Icon name="camera" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.photoText}>
            {editing ? 'Tap to change photo' : 'Profile Photo'}
          </Text>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.card}>
            <ProfileField
              label="Full Name"
              value={formData.displayName}
              editable={true}
              field="displayName"
              placeholder="Enter your full name"
            />
            
            <ProfileField
              label="Email"
              value={formData.email}
              editable={false}
              field="email"
            />
            
            <ProfileField
              label="Phone Number"
              value={formData.phone}
              editable={true}
              field="phone"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
            
            <ProfileField
              label="Date of Birth"
              value={formData.dateOfBirth}
              editable={true}
              field="dateOfBirth"
              placeholder="DD/MM/YYYY"
            />
            
            <ProfileField
              label="Address"
              value={formData.address}
              editable={true}
              field="address"
              placeholder="Enter your address"
            />
          </View>
        </View>

        {/* Account Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.card}>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Account ID</Text>
              <Text style={styles.fieldValue}>{user?.uid || 'N/A'}</Text>
            </View>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Account Status</Text>
              <View style={styles.statusBadge}>
                <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
                <Text style={[styles.fieldValue, { color: '#4CAF50' }]}>
                  {userData?.accountStatus === 'active' ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Profile Completion</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${userData?.profileCompleted ? 100 : 60}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {userData?.profileCompleted ? '100%' : '60%'}
                </Text>
              </View>
            </View>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Member Since</Text>
              <Text style={styles.fieldValue}>
                {userData?.createdAt?.toDate?.().toLocaleDateString() || 'Recently'}
              </Text>
            </View>
          </View>
        </View>

        {/* Update Button */}
        {editing && (
          <TouchableOpacity
            style={[styles.updateButton, loading && styles.disabledButton]}
            onPress={handleUpdateProfile}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Icon name="checkmark-circle" size={20} color="#FFF" />
                <Text style={styles.updateButtonText}>Update Profile</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="shield-checkmark" size={24} color="#4CAF50" />
              <Text style={styles.actionText}>Privacy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="document-text" size={24} color="#2196F3" />
              <Text style={styles.actionText}>Terms</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="help-circle" size={24} color="#FF9800" />
              <Text style={styles.actionText}>Help</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share-social" size={24} color="#9C27B0" />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 24,
  },
  editButton: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E88E5',
  },
  photoSection: {
    alignItems: 'center',
    gap: 12,
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#1E88E5',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E88E5',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  photoText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#033c6b',
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#033c6b',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#033c6b',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#666',
    minWidth: 30,
  },
  updateButton: {
    backgroundColor: '#1E88E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  updateButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFF',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
    padding: 12,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#666',
  },
});

export default ProfileScreen;