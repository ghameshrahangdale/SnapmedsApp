import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CategoriesSection = () => {
  const categories = [
    { name: 'Pain Relief', icon: 'healing' },
    { name: 'Cold & Cough', icon: 'air' },
    { name: 'Diabetes', icon: 'local-hospital' },
    { name: 'Heart Care', icon: 'favorite' },
    { name: 'Vitamins', icon: 'spa' },
    { name: 'Skin Care', icon: 'face' },
    { name: 'Weight Management', icon: 'fitness-center' },
    { name: 'Immunity Boosters', icon: 'shield' },
  ];

  return (
    <View style={styles.categoriesContainer}>
      <Text style={styles.categoriesTitle}>Search by Categories</Text>
      <View style={styles.categoriesList}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => console.log(`Selected: ${category.name}`)}
          >
            <MaterialIcons
              name={category.icon}
              size={30}
              color="#033c6b"  // icon color, you can adjust
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CategoriesSection;

const styles = {
  categoriesContainer: {
    padding: 16,
    backgroundColor: '#fff',  // white background gradient effect can be added if needed
    borderRadius: 10,
  },
  categoriesTitle: {
    fontSize: 12,
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '23%',
    height: 120,
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 9,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
};
