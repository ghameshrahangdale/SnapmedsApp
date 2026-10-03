import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import medicines from './Medicine'; 

const Inventory = () => {
  const [medical, setMedical] = React.useState("Aadhaar Medical Store");

  return (
    <View style={styles.container}>
      {/* Top app bar */}
      <View style={styles.appBar}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="local-hospital" size={22} color="#fff" style={styles.icon} />
          <Text style={styles.title}>{medical}</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Stock Card */}
        <View style={styles.stockCard}>
          <MaterialIcons name="inventory" size={26} color="#117A65" />
          <View style={styles.stockTextContainer}>
            <Text style={styles.stockTitle}>Stocks</Text>
            <Text style={styles.stockSubtitle}>{medicines.length} Medicines Available</Text>
          </View>
        </View>

        {/* Inventory Actions */}
        <View style={styles.inventoryContainer}>
          <Text style={styles.sectionTitle}>Inventory</Text>

          {/* Action Cards */}
          <View style={styles.cardRow}>
            <TouchableOpacity style={styles.card}>
              <MaterialIcons name="file-upload" size={30} color="#117A65" />
              <Text style={styles.cardText}>Import Inventory</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
              <MaterialIcons name="add-circle-outline" size={30} color="#117A65" />
              <Text style={styles.cardText}>Add a Medicine</Text>
            </TouchableOpacity>
          </View>

          {/* Medicine List */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Available Medicines</Text>
          {medicines.map((med, index) => (
            <View key={index} style={styles.medicineCard}>
              <Text style={styles.medName}>{med.medicineName}</Text>
              <Text style={styles.medDetail}>Formula: {med.formula}</Text>
              <Text style={styles.medDetail}>Manufacturer: {med.manufacturer}</Text>
              <Text style={styles.medDetail}>Available Stocks: {med.availableStocks}</Text>
              <Text style={styles.medDetail}>Price: ₹{med.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    width:'100%',
  },
  appBar: {
    height: 60,
    backgroundColor: '#117A65',
    justifyContent: 'center',
    paddingHorizontal: 20,
    elevation: 4,
    zIndex: 10,
    
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#FFF',
  },
  stockCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  stockTextContainer: {
    marginLeft: 10,
  },
  stockTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  stockSubtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#757575',
  },
  inventoryContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#333',
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    textAlign: 'center',
  },
  medicineCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  medName: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
    color: '#117A65',
    marginBottom: 5,
  },
  medDetail: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },
});

export default Inventory;
