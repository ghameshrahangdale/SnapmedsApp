import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const CategoriesSection = () => {
  const categories = [
    { name: 'Pain Relief' },
    { name: 'Cold & Cough' },
    { name: 'Diabetes' },
    { name: 'Heart Care' },
    { name: 'Vitamins' },
    { name: 'Skin Care' },
    { name: 'Weight Management' },
    { name: 'Immunity Boosters' },
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
        backgroundColor: '#fff',
        borderRadius: 10,
      },
      categoriesTitle: {
        fontSize: 12,
        marginBottom: 12,
        fontFamily: "Poppins-Bold"
      },
      categoriesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      categoryItem: {
        width: '23%',
        height: 120,
        aspectRatio: 1, // Ensures the item is square
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
        fontFamily: "Poppins-Regular"
      },
    
}