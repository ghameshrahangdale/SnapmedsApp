import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast } from 'react-native-toast-message';

export const CustomToast = {
  success: (props) => (
    <BaseToast
      {...props}
      style={[styles.toast, { borderLeftColor: '#4CAF50' }]}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={[styles.toast, { borderLeftColor: '#F44336' }]}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={[styles.toast, { borderLeftColor: '#2196F3' }]}
      contentContainerStyle={styles.content}
      text1Style={styles.text1}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  toast: {
    borderLeftWidth: 6,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 4,
  },
  content: {
    paddingHorizontal: 15,
  },
  text1: {
    fontSize: 16,
    color: '#333',
    fontFamily:"Poppins-Bold"
  },
  text2: {
    fontSize: 13,
    color: '#666',
    fontFamily:"Poppins-Regular"
  },
});
