import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AppBar from '../../../Common/AppBar'

const Cart = ({ setActiveTab, navigation }) => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Paracetamol 500mg', price: 25, quantity: 1 },
    { id: 2, name: 'Azithromycin 250mg', price: 55, quantity: 2 },
    { id: 3, name: 'Vitamin D3 Tablets', price: 120, quantity: 1 },
  ])

  const handleBackPress = () => {
    setActiveTab('home')
  }

  const increaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartItems(updatedItems)
  }

  const decreaseQuantity = (id) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    setCartItems(updatedItems)
  }

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedItems)
  }

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is empty!', 'Please add medicines before proceeding.')
      return
    }

    const currentCart = [...cartItems] // store before clearing
    setCartItems([])
    navigation.navigate('Checkout', { cartItems: currentCart })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1E88E5', '#E3F2FD', '#E3F2FD']}
        style={styles.container}>
        
        <AppBar/>

        {/* Main Content */}
        <View style={styles.mainContainer}>
          {cartItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="shopping-cart" size={60} color="#033c6b" />
              <Text style={styles.emptyText}>Your cart is empty!</Text>
            </View>
          ) : (
            <>
              <FlatList
                contentContainerStyle={{ paddingBottom: 120 }}
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

              {/* Checkout Footer */}
              <View style={styles.footer}>
                <Text style={styles.totalText}>Total: ₹{getTotalPrice()}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  appBar: {
    width: '100%',
    height: 60,
    paddingTop: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    zIndex: 1,
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginLeft: 12,
  },

  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 10,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
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
