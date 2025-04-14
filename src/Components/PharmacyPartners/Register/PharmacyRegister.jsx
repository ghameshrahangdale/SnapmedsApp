import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import api from '../../../api/axios';

const PharmacyRegister = ({ navigation }) => {
  const navigate = useNavigation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pharmacyName: '',
    pharmacyType: '',
    isOpen: '',
    licenceNumber: '',
    gstNumber: '',
    fullAddress: '',
    city: '',
    state: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
  });

 

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  //Register handler
  const handleRegister = async () => {
    try {
      const response = await api.post('/api/pharmacy/register', formData);
      console.log('✅ API response:', response.data);
  
      if (response.status === 200 || response.status === 201) {
        alert('Registered Successfully! Heading to Login');
        navigation.navigate('Pharmacy/Login');
      } else {
        alert(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('❌ API Error:', error);
  
      if (error.response) {
        console.log('🔴 Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Request failed'}`);
      } else if (error.request) {
        console.log('🔴 No response from server');
        alert('Server not responding. Check backend or internet connection.');
      } else {
        console.log('🔴 Error setting up request:', error.message);
        alert('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0B3D2E', '#117A65']}
        style={styles.textContainer}>
        <Image
          source={require('../../../Assets/Images/flash.png')}
          style={styles.logo}
        />
        <Text style={styles.heading}>Register Your Pharmacy</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Pharmacy/Login')}>
          <Text style={styles.loginText}>Already Registered? Login here</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.mainContainer}>
        {step === 1 && (
          <>
            <Text style={styles.subheading}>Owner's Details</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={text => handleChange('firstName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={text => handleChange('lastName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={text => handleChange('email', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={formData.phone}
              onChangeText={text => handleChange('phone', text)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Text style={styles.subheading}>Pharmacy's Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Pharmacy Name"
              value={formData.pharmacyName}
              onChangeText={text => handleChange('pharmacyName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Pharmacy Licence Number"
              value={formData.licenceNumber}
              onChangeText={text => handleChange('licenceNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="GST Number"
              value={formData.gstNumber}
              onChangeText={text => handleChange('gstNumber', text)}
            />
          </>
        )}
        {step === 3 && (
          <>
            <Text style={styles.subheading}>Pharmacy's Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Address"
              value={formData.fullAddress}
              onChangeText={text => handleChange('fullAddress', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={formData.city}
              onChangeText={text => handleChange('city', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={formData.state}
              onChangeText={text => handleChange('state', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={formData.postalCode}
              onChangeText={text => handleChange('postalCode', text)}
            />
          </>
        )}
        {step === 4 && (
          <>
            <Text style={styles.subheading}>Create Strong Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              editable={false}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={formData.password}
              onChangeText={text => handleChange('password', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={text => handleChange('confirmPassword', text)}
            />
          </>
        )}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity style={styles.button} onPress={handleBack}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}

          {/* Register button */}
          <TouchableOpacity style={styles.button} onPress={step === 4 ? handleRegister : handleNext}>
            <Text style={styles.buttonText}>
              {step === 4 ? 'Register' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: { backgroundColor: '#000', flex: 1 },
  textContainer: { padding: 32, height: 263 },
  mainContainer: { padding: 32, backgroundColor: '#fff', height: '100%' },
  heading: { fontSize: 32, color: '#fff', fontFamily: 'Poppins-Bold' },
  subheading: {
    fontSize: 20,
    color: '#117A65',
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  logo: { width: 30, height: 30, marginTop: 20, marginBottom: 20 },
  loginText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 12
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#117A65',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
};

export default PharmacyRegister;
