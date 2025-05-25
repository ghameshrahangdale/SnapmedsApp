import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const recentSearches = ['paracetamol', 'vitamin c', 'crocin'];
  const popularSearches = ['cough syrup', 'fever', 'pain relief', 'antibiotics', 'vitamin d3', 'blood pressure'];
  
  const trendingMedicines = [
    {
      name: 'Dolo 650mg',
      brand: 'Micro Labs Ltd',
      price: 28.5,
      originalPrice: 35,
      discount: '19%',
    },
    {
      name: 'Crocin Advance',
      brand: 'GSK Pharma',
      price: 32.5,
      originalPrice: 40,
      discount: '19%',
    },
    {
      name: 'Shelcal 500mg',
      brand: 'Torrent Pharma',
      price: 109.25,
      originalPrice: 125,
      discount: '13%',
    },
    {
      name: 'Azithral 500mg',
      brand: 'Alembic Pharma',
      price: 95.6,
      originalPrice: 120,
      discount: '20%',
    },
  ];

  const filteredMedicines = trendingMedicines.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient
      colors={['#1E88E5', '#E3F2FD', '#E3F2FD', '#E3F2FD']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Search Medicines</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <TextInput
            placeholder="Search for medicines, health products..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.tagContainer}>
            {recentSearches.map((item, index) => (
              <Text key={index} style={styles.tag}>
                {item}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.tagContainer}>
            {popularSearches.map((item, index) => (
              <Text key={index} style={[styles.tag, styles.popularTag]}>
                {item}
              </Text>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Trending Medicines</Text>
          <View style={styles.medicineGrid}>
            {filteredMedicines.map((item, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>{item.discount} OFF</Text>
                </View>
                <Text style={styles.medName}>{item.name}</Text>
                <Text style={styles.brand}>{item.brand}</Text>
                <Text style={styles.price}>
                  ₹{item.price} <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>+  Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  appBarTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginLeft: 8,
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    marginTop: 16,
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginRight: 8,
    marginBottom: 8,
  },
  popularTag: {
    backgroundColor: '#FFEBEE',
  },
  medicineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    marginBottom: 16,
  },
  discountTag: {
    backgroundColor: '#EF5350',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
  },
  medName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  brand: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#777',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: '#F3E5F5',
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#5E35B1',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

export default Categories;
