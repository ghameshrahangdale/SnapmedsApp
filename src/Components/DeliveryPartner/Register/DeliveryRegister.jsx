import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from '../../../api/axios'; 

const DeliveryRegister = ({ navigation }) => {
  const [step, setStep] = useState(1);

  // Step 1 - Basic Info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 - Vehicle Info
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  // Step 3 - Document Upload
  const [drivingLicense, setDrivingLicense] = useState("");

  // Function to handle registration
  const handleRegister = async () => {
    if (!name || !email || !password || !vehicleType || !vehicleNumber || !drivingLicense) {
      Alert.alert('Validation Error', 'Please fill all fields before submitting.');
      return;
    }
  
    try {
      const response = await api.post('api/delivery/register', {
        name,
        email,
        password,
        vehicleType,
        vehicleNumber,
        drivingLicense
      });
  
      if (response.status === 201) {
        Alert.alert('Success', 'Registered successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Delivery/Login') },
        ]);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Registration failed');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#000", "#000"]} style={styles.textContainer}>
        <Image
          source={require("../../../Assets/Images/flash.png")}
          style={styles.logo}
        />
        <Text style={styles.heading}>Register as Delivery Partner</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Delivery/Login')}>
          <Text style={styles.loginText}>Already Registered? Login to Continue</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.mainContainer}>
        {step === 1 && (
          <>
            <Text style={styles.label}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#666"
                value={name}
                onChangeText={setName}
              />
              <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
            </View>

            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
              />
              <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
            </View>

            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setStep(2)}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.label}>Vehicle Type</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Bike / Scooter / Car"
                placeholderTextColor="#666"
                value={vehicleType}
                onChangeText={setVehicleType}
              />
              <Icon name="two-wheeler" size={20} color="#666" style={styles.inputIcon} />
            </View>

            <Text style={styles.label}>Vehicle Number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Vehicle Number"
                placeholderTextColor="#666"
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
              />
              <Icon name="confirmation-number" size={20} color="#666" style={styles.inputIcon} />
            </View>

            <View style={styles.stepButtonContainer}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(1)}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => setStep(3)}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.label}>Driving License</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Driving License Number"
                placeholderTextColor="#666"
                value={drivingLicense}
                onChangeText={setDrivingLicense}
              />
              <Icon name="insert-drive-file" size={20} color="#666" style={styles.inputIcon} />
            </View>

            <View style={styles.stepButtonContainer}>
              <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(2)}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  textContainer: {
    padding: 32,
    backgroundColor: "#fff",
    height: 263,
  },
  mainContainer: {
    padding: 32,
    backgroundColor: "#fff",
    height: "100%",
  },
  heading: {
    fontSize: 32,
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  logo: { width: 30, height: 30, marginTop: 20, marginBottom: 20 },
  label: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  loginText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  button: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  secondaryButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  stepButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

export default DeliveryRegister;
