import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, ProgressBar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const PharmacyRegister = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);

  // Step 1: Basic Information
  const [pharmacyName, setPharmacyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Business Details
  const [licenseNumber, setLicenseNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [drugLicense, setDrugLicense] = useState(null);
  const [businessCertificate, setBusinessCertificate] = useState(null);

  // Step 3: Pharmacy Address
  const [shopAddress, setShopAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [mapLocation, setMapLocation] = useState('');

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.titleMedium}>
        Register Your Pharmacy
      </Text>
      <Text variant="headlineSmall" style={styles.title}>
        Step {step} of 3
      </Text>
      <ProgressBar progress={step / 3} color="#033c6b" style={styles.progressBar} />

      {step === 1 && (
        <>
          <TextInput label="Pharmacy Name" value={pharmacyName} onChangeText={setPharmacyName} style={styles.input} />
          <TextInput label="Owner's Full Name" value={ownerName} onChangeText={setOwnerName} style={styles.input} />
          <TextInput label="Email Address" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
          <TextInput label="Phone Number" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
          <TextInput label="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        </>
      )}

      {step === 2 && (
        <>
          <TextInput label="Pharmacy License Number" value={licenseNumber} onChangeText={setLicenseNumber} style={styles.input} />
          <TextInput label="GST Number (Optional)" value={gstNumber} onChangeText={setGstNumber} style={styles.input} />
          <Button mode="outlined" onPress={() => console.log('Upload Drug License')} style={styles.uploadButton}>
            Upload Drug License Certificate
          </Button>
          <Button mode="outlined" onPress={() => console.log('Upload Business Certificate')} style={styles.uploadButton}>
            Upload Business Registration Certificate
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <TextInput label="Shop Address" value={shopAddress} onChangeText={setShopAddress} style={styles.input} />
          <TextInput label="City" value={city} onChangeText={setCity} style={styles.input} />
          <TextInput label="State" value={state} onChangeText={setState} style={styles.input} />
          <TextInput label="Pincode" value={pincode} onChangeText={setPincode} style={styles.input} keyboardType="numeric" />
          <TextInput label="Google Map Location (Optional)" value={mapLocation} onChangeText={setMapLocation} style={styles.input} />
        </>
      )}

      <View style={styles.buttonContainer}>
        {step > 1 && <Button mode="contained" onPress={prevStep} style={styles.button}>Back</Button>}
        {step < 3 ? (
          <Button mode="contained" onPress={nextStep} style={styles.button}>Next</Button>
        ) : (
          <Button mode="contained" onPress={() => navigation.navigate('Pharmacy/Home')} style={styles.button}>
            Register
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecfcff',
  },
  titleMedium: {
    textAlign: 'center',
    color: "#38b6ff",
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18,
  },
  progressBar: {
    marginBottom: 20,
    height: 6,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  uploadButton: {
    marginBottom: 10,
    borderColor: '#033c6b',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#033c6b',
    borderRadius: 8,
    marginTop: 10,
  },
});

export default PharmacyRegister;
