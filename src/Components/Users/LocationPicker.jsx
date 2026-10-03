import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LocationPicker({visible, onClose, onSelect}) {
  const [locationType, setLocationType] = useState('Home');
  const [address, setAddress] = useState('');
  const [floor, setFloor] = useState('');
  const [landmark, setLandmark] = useState('');

  const handleUpdate = () => {
    if (address.trim()) {
      const locationData = {
        locationType,
        address,
        floor,
        landmark,
      };
      onSelect(locationData);
      onClose(); // Close modal after updating
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.modalTitle}>Enter complete address</Text>

            {/* Receiver Details */}
            <View style={styles.receiverDetails}>
              <Ionicons name="person-outline" size={20} color="#1E88E5" />
              <Text style={styles.receiverText}>
                Ghamesh Rahangdale, 7264832848
              </Text>
            </View>

            {/* Tag Location */}
            <View style={styles.tagContainer}>
              {['Home', 'Work', 'Hotel', 'Other'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.tagButton,
                    locationType === type && styles.tagButtonSelected,
                  ]}
                  onPress={() => setLocationType(type)}>
                  <Text
                    style={[
                      styles.tagText,
                      locationType === type && styles.tagTextSelected,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

           
            {/* Address Fields */}
            <TextInput
              style={styles.input}
              placeholder="Complete Address *"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Floor (Optional)"
              value={floor}
              onChangeText={setFloor}
            />
            <TextInput
              style={styles.input}
              placeholder="Landmark (Optional)"
              value={landmark}
              onChangeText={setLandmark}
            />

            {/* Confirm Address Button */}
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleUpdate}>
              <Text style={styles.confirmButtonText}>Confirm address</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '65%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
  },
  receiverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
  },
  receiverText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tagButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  tagButtonSelected: {
    backgroundColor: '#1E88E5',
    borderColor: '#1E88E5',
  },
  tagText: {
    fontSize: 14,
    color: '#333',
  },
  tagTextSelected: {
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  changeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  changeButtonText: {
    color: '#1E88E5',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
