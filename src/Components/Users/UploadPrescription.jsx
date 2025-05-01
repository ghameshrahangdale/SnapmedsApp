import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UploadPrescription = ({ navigation, setActiveTab}) => {
  return (
    <LinearGradient
        colors={['#002060', '#42A5F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardContainer}
      >
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Upload Prescription</Text>
          <Text style={styles.subText}>Get medicines delivered in 30 minutes</Text>

          <View style={styles.timeRow}>
            <Icon name="clock-time-four-outline" size={16} color="#fff" />
            <Text style={styles.timeText}> Deliver within 30 mins</Text>
          </View>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => setActiveTab('upload')}
          >
            <Icon name="upload" size={18} color="#000" />
            <Text style={styles.uploadButtonText}> Upload now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fadedOverlay}>
          <Text style={styles.prescriptionText}>Rx</Text>
        </View>
      </LinearGradient>
  );
};

export default UploadPrescription;

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 16,
      },
      textContainer: {
        flex: 1,
        maxWidth: '70%',
      },
      headerText: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#fff',
      },
      subText: {
        fontSize: 12,
        color: '#fff',
        marginTop: 4,
        fontFamily: 'Poppins-Regular',
      },
      timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      },
      timeText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
      },
      uploadButton: {
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
      },
      uploadButtonText: {
        color: '#000',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
      },
      fadedOverlay: {
        position: 'absolute',
        right: 12,
        top: 10,
        width: 60,
        height: 60,
        backgroundColor: '#ffffff30',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      prescriptionText: {
        fontSize: 10,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
      },
  });
  
