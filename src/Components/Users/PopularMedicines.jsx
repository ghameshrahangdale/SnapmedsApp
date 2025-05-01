import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const medicines = [
  {
    id: '1',
    name: 'Dolo 650mg',
    company: 'Micro Labs Ltd',
    price: 28.5,
    originalPrice: 35,
    discount: '19% OFF',
  },
  {
    id: '2',
    name: 'Crocin Advance',
    company: 'GSK Pharma',
    price: 32.5,
    originalPrice: 40,
    discount: '19% OFF',
  },
  {
    id: '3',
    name: 'Shelcal 500mg',
    company: 'Torrent Pharma',
    price: 109.25,
    originalPrice: 125,
    discount: '13% OFF',
  },
  {
    id: '4',
    name: 'Azithral 500mg',
    company: 'Alembic Pharma',
    price: 95.6,
    originalPrice: 120,
    discount: '20% OFF',
  },
];

const PopularMedicines = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Popular Medicines</Text>
      <FlatList
        data={medicines}
        keyExtractor={item => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.company}>{item.company}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default PopularMedicines;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,

  },
  header: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    color: '#212121',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#EB5757',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginTop: 30, // space for image if added later
    color: '#212121',
  },
  company: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#7d7d7d',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000',
  },
  originalPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#9B51E0',
    borderRadius: 6,
    paddingVertical: 4,
    marginTop: 10,
    alignItems: 'center',
  },
  addText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: '#9B51E0',
  },
});
