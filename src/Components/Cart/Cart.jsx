import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen({ route }) {
  const { cart } = route.params || { cart: [] };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Your Packet</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.medicineName}>{item.name}</Text>
              <Text style={styles.medicineDescription}>{item.description}</Text>
              <Text style={styles.medicinePrice}>{item.price} ₹</Text>
            </View>
          )}
        />
      )}

      <Button
        mode="contained"
        color="#033c6b"
        labelStyle={{ fontFamily: "Poppins-Regular" }}
        style={styles.checkoutButton}
        onPress={() => alert('Proceeding to Checkout')}>
        Proceed to Checkout
      </Button>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 16,
    elevation:0
  },
  cartTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: '#033c6b',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginTop: 20,
    color: '#757575',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 0,
  },
  medicineName: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
  medicineDescription: {
    fontSize: 14,
    color: '#757575',
    fontFamily: "Poppins-Regular",
  },
  medicinePrice: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: "Poppins-Bold",
  },
  checkoutButton: {
    marginTop: 16,
    borderRadius: 8,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
});
