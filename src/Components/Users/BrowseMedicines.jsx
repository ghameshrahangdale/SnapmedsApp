import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, Button, IconButton, Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'; // Import Firebase Authentication

export default function BrowseMedicines() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false); // state for menu visibility

  const medicines = [
    {
      id: '1',
      name: 'Paracetamol',
      price: '20',
      description: 'For fever and pain relief',
    },
    {
      id: '2',
      name: 'Ibuprofen',
      price: '30',
      description: 'Anti-inflammatory and pain relief',
    },
    {
      id: '3',
      name: 'Cetirizine',
      price: '15',
      description: 'For allergy relief',
    },
    {
      id: '4',
      name: 'Amoxicillin',
      price: '50',
      description: 'Antibiotic for infections',
    },
  ];

  const addToCart = item => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('LoginScreen'); // Redirect to Login screen after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Location and Profile Section */}
      <Text style={{fontFamily: 'Poppins-Medium', fontSize: 12}}>
        Snapmeds in
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-ExtraBold',
          fontSize: 22,
          marginBottom: 0,
        }}>
        59 Minutes Delivery
      </Text>
      <View style={styles.locationContainer}>
        <View style={styles.locationWrapper}>
          <MaterialIcons name="location-on" size={22} color="#1E88E5" />
          <Text style={styles.locationText}>Sainath Square, Nagpur</Text>
        </View>

        <View style={styles.iconContainer}>
          <IconButton
            icon="cart"
            size={26}
            onPress={() => navigation.navigate('Cart', {cart})}
            iconColor="#1E88E5"
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Image
                  source={require('../../Assets/Images/background.jpg')}
                  style={styles.profileImage}
                />
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={() => navigation.navigate('MyProfile')}
              title="My Profile"
            />
            <Menu.Item
              onPress={() => navigation.navigate('Orders')}
              title="Orders"
            />
            <Menu.Item onPress={handleLogout} title="Logout" />
          </Menu>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={22}
          color="#757575"
          style={styles.searchIcon}
        />
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
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.medicineName}>{item.name}</Text>
            <Text style={styles.medicineDescription}>{item.description}</Text>
            <Text style={styles.medicinePrice}>{item.price} ₹</Text>
            <View style={styles.buttonContainer}>
              <Button
                mode="outlined"
                style={{borderRadius: 8}}
                labelStyle={{fontFamily: 'Poppins-Regular'}}
                onPress={() => addToCart(item)}>
                {cart.some(cartItem => cartItem.id === item.id)
                  ? 'Added to Packet'
                  : 'Add to Packet'}
              </Button>
              <Button
                style={styles.orderButton}
                mode="contained"
                labelStyle={{fontFamily: 'Poppins-Regular'}}
                color="#033c6b">
                Buy Now
              </Button>
            </View>
          </View>
        )}
      />

      {/* Upload Prescription Section */}
      <View style={styles.uploadContainer}>
        <Button
          mode="contained"
          color="#033c6b"
          labelStyle={{fontFamily: 'Poppins-Regular'}}
          style={styles.uploadButton}
          onPress={() => navigation.navigate('OrderByPrescription')}>
          Order By Prescription
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -16,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'black',
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  medicineLabel: {
    paddingBottom: 10,
    color: '#033c6b',
    fontFamily: 'Poppins-Regular',
  },
  card: {
    width: '100%',
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 0,
    elevation: 0,
  },
  medicineName: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  medicineDescription: {
    fontSize: 14,
    color: '#757575',
    fontFamily: 'Poppins-Regular',
  },
  medicinePrice: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: 'Poppins-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  uploadContainer: {
    width: '100%',
    marginTop: 24,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  uploadButton: {
    width: '100%',
    backgroundColor: '#033c6b',
    borderRadius: 8,
  },
  orderButton: {
    backgroundColor: '#38b6ff',
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
  },
});
