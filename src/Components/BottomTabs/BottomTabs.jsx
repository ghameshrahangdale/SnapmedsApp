import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomTabs = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconMap = {
          home: 'home',
          search: 'search',
          upload: 'file-upload',
          cart: 'shopping-cart',
          account: 'person',
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            style={styles.navItem}
            onPress={onPress}>
            <MaterialIcons
              name={iconMap[route.name]}
              size={26}
              color={isFocused ? '#1E88E5' : '#fff'}
            />
            <Text
              style={[
                styles.labelText,
                {color: isFocused ? '#1E88E5' : '#fff'},
              ]}>
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#033c6b',
    height: 65,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
    marginTop: 2,
  },
});

export default BottomTabs;
