import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Icon
import api from '../../../api/axios'; 

const DeliveryLogin = ({ navigation }) => {
  const [email, setEmail] = useState("ghamesh@gmail.com");
  const [password, setPassword] = useState("Ghamesh@123");

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/delivery/login", { email, password });

      if (response.status === 200) {
        alert("Login Successful!");
        navigation.navigate("DeliveryDashboard"); 
      } else {
        alert("Login failed", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#000", "#000"]} style={styles.textContainer}>
        <Image
          source={require('../../../Assets/Images/flash.png')}
          style={styles.logo}
        />
        <Text style={styles.heading}>Login as Delivery Partner</Text>

        <TouchableOpacity onPress={() => navigation.navigate('DeliveryRegister')}>
          <Text style={styles.loginText}>Want to Register as Delivery Partner? Register here</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.mainContainer}>
        {/* Email Input with Icon */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
          />
          <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
        </View>

        {/* Password Input with Icon */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
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
  loginText: {
    color: "#fff",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
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
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  forgotPassword: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#000",
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
};

export default DeliveryLogin;
