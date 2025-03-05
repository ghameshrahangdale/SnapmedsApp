import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Image } from "react-native";
import { Card, Button, IconButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BrowseMedicines() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  const medicines = [
    { id: "1", name: "Paracetamol", price: "₹20", description: "For fever and pain relief" },
    { id: "2", name: "Ibuprofen", price: "₹30", description: "Anti-inflammatory and pain relief" },
    { id: "3", name: "Cetirizine", price: "₹15", description: "For allergy relief" },
    { id: "4", name: "Amoxicillin", price: "₹50", description: "Antibiotic for infections" },
  ];

  const addToCart = (item) => {
    if (!cart.includes(item.id)) {
      setCart([...cart, item.id]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Location and Profile Section */}
      <View style={styles.locationContainer}>
        <View style={styles.locationWrapper}>
          <MaterialIcons name="location-on" size={22} color="#1E88E5" />
          <Text style={styles.locationText}>Chhatrapati Square, Nagpur</Text>
        </View>

        <View style={styles.iconContainer}>
          <IconButton icon="cart" size={26} onPress={()=>navigation.navigate("Cart")} iconColor="#1E88E5" />
          <Image source={require("../../Assets/Images/background.jpg")} style={styles.profileImage} />
        </View>
      </View>

      {/* Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={22} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search Medicine Ex Paracetamol"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Text style={styles.medicineLabel}>Medicines</Text>

      {/* Medicine List */}
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.medicineName}>{item.name}</Text>
            <Text style={styles.medicineDescription}>{item.description}</Text>
            <Text style={styles.medicinePrice}>{item.price}</Text>
            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={() => addToCart(item)} color="#033c6b">
                {cart.includes(item.id) ? "Added to Packet" : "Add to Packet"}
              </Button>
              <Button style={styles.orderButton} mode="contained" color="#033c6b">
                Order Now
              </Button>
            </View>
          </Card>
        )}
      />

      {/* Upload Prescription Section */}
      <View style={styles.uploadContainer}>
        <Button mode="contained" color="#033c6b" style={styles.uploadButton} onPress={() => navigation.navigate("OrderByPrescription")}>
          Order By Prescription
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 16,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "black",
    fontWeight: "bold",
    marginLeft: 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
  },
  medicineLabel: {
    paddingBottom: 10,
    color: "#033c6b",
  },
  card: {
    width: "100%",
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  medicineDescription: {
    fontSize: 14,
    color: "#757575",
  },
  medicinePrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  uploadContainer: {
    width: "100%",
    marginTop: 24,
    backgroundColor: "#fff",
    padding: 16,
    alignItems: "center",
  },
  uploadButton: {
    width: "100%",
    backgroundColor: "#033c6b",
  },
  orderButton: {
    backgroundColor: "#38b6ff",
  },
});


