import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const Cart = ({ setActiveTab }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Paracetamol 500mg', price: 25, quantity: 1 },
    { id: 2, name: 'Azithromycin 250mg', price: 55, quantity: 2 },
    { id: 3, name: 'Vitamin D3 Tablets', price: 120, quantity: 1 },
  ])

  // Navigate to Home
  const handleBackPress = () => {
    setActiveTab('home')
  }

  // Increase Quantity
  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartItems(updatedItems)
  }

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    )
    setCartItems(updatedItems)
  }

  // Remove Item from Cart
  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
  }

  // Calculate Total Price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  }

  // Handle Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty!', 'Please add medicines before proceeding.')
      return
    }
    Alert.alert('Order Placed!', 'Your medicines will be delivered within 59 minutes.')
    setCartItems([]) // Clear cart after order
  }

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
      style={styles.container}>
      
      {/* App Bar with Back Button */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Your Cart</Text>
      </View>

      {/* Cart Items List */}
      <View style={styles.mainContainer}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="shopping-cart" size={60} color="#033c6b" />
            <Text style={styles.emptyText}>Your cart is empty!</Text>
          </View>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price} / unit</Text>
                </View>
                <View style={styles.actionContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <Icon name="remove-circle-outline" size={24} color="#1E88E5" />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <Icon name="add-circle-outline" size={24} color="#1E88E5" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeItem(item.id)}>
                    <MaterialIcons name="delete" size={24} color="#FF3D00" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}

        {/* Total Price and Checkout Button */}
        {cartItems.length > 0 && (
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  appBar: {
    width: '100%',
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 12,
  },

  mainContainer: {
    marginTop: 80,
    width: '100%',
    paddingHorizontal: 16,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    color: '#757575',
    marginTop: 12,
    fontFamily: 'Poppins-Regular',
  },

  cartItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#033c6b',
  },
  itemPrice: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },

  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 8,
  },

  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    
  },
  totalText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#033c6b',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
  },
})

export default Cart
