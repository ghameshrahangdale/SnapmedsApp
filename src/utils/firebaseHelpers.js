// utils/firebaseHelper.js
import { auth } from '../firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

class FirebaseHelper {
  

  static async updateProfile(updates) {
    try {
      const user = auth().currentUser;
      if (user) {
        await user.updateProfile(updates);
        return { success: true };
      }
      return { success: false, error: 'No user logged in' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==================== FIRESTORE USER METHODS ====================

  static async createUserDocument(user, additionalData = {}) {
    try {
      const userRef = firestore().collection('users').doc(user.uid);
      const userSnapshot = await userRef.get();

      if (!userSnapshot.exists) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          profileCompleted: false,
          accountStatus: 'active',
          createdAt: firestore.FieldValue.serverTimestamp(),
          lastLoginAt: firestore.FieldValue.serverTimestamp(),
          ...additionalData
        };

        await userRef.set(userData);
        return { success: true, data: userData };
      } else {
        // Update existing user
        await userRef.update({
          lastLoginAt: firestore.FieldValue.serverTimestamp(),
          accountStatus: 'active',
          displayName: user.displayName || userSnapshot.data().displayName,
          photoURL: user.photoURL || userSnapshot.data().photoURL,
        });
        
        const updatedData = await userRef.get();
        return { success: true, data: updatedData.data() };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserDocument(uid) {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        return { success: true, data: userDoc.data() };
      }
      return { success: false, error: 'User document not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateUserDocument(uid, updates) {
    try {
      const userRef = firestore().collection('users').doc(uid);
      await userRef.update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==================== MEDICINES COLLECTION ====================

  static async getMedicines(filters = {}) {
    try {
      let query = firestore().collection('medicines');
      
      // Apply filters
      if (filters.category) {
        query = query.where('category', '==', filters.category);
      }
      if (filters.searchTerm) {
        query = query.where('name', '>=', filters.searchTerm)
                    .where('name', '<=', filters.searchTerm + '\uf8ff');
      }
      if (filters.inStock !== undefined) {
        query = query.where('inStock', '==', filters.inStock);
      }

      const snapshot = await query.get();
      const medicines = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return { success: true, data: medicines };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getMedicineById(id) {
    try {
      const doc = await firestore().collection('medicines').doc(id).get();
      if (doc.exists) {
        return { success: true, data: { id: doc.id, ...doc.data() } };
      }
      return { success: false, error: 'Medicine not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==================== ORDERS COLLECTION ====================

  static async createOrder(orderData) {
    try {
      const orderRef = firestore().collection('orders').doc();
      const order = {
        id: orderRef.id,
        userId: auth().currentUser.uid,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
        ...orderData
      };

      await orderRef.set(order);
      return { success: true, data: order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async getUserOrders(userId) {
    try {
      const snapshot = await firestore()
        .collection('orders')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return { success: true, data: orders };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateOrderStatus(orderId, status) {
    try {
      await firestore()
        .collection('orders')
        .doc(orderId)
        .update({
          status,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==================== CART COLLECTION ====================

  static async getCart(userId) {
    try {
      const cartDoc = await firestore().collection('carts').doc(userId).get();
      if (cartDoc.exists) {
        return { success: true, data: cartDoc.data() };
      }
      return { success: true, data: { items: [], total: 0 } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async updateCart(userId, cartData) {
    try {
      await firestore()
        .collection('carts')
        .doc(userId)
        .set({
          ...cartData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==================== STORAGE METHODS ====================

  static async uploadImage(filePath, fileName, folder = 'images') {
    try {
      const reference = storage().ref(`${folder}/${fileName}`);
      await reference.putFile(filePath);
      const downloadURL = await reference.getDownloadURL();
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  static async deleteImage(imageUrl) {
    try {
      const imageRef = storage().refFromURL(imageUrl);
      await imageRef.delete();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==================== UTILITY METHODS ====================

  static getAuthErrorMessage(error) {
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/email-already-in-use':
        return 'Email already in use.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }

  static async checkNetworkConnection() {
    try {
      // Simple check by trying to read a document
      await firestore().collection('medicines').limit(1).get();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Real-time listeners
  static onAuthStateChanged(callback) {
    return auth().onAuthStateChanged(callback);
  }

  static onUserDocumentChange(uid, callback) {
    return firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          callback({ success: true, data: doc.data() });
        } else {
          callback({ success: false, error: 'Document not found' });
        }
      }, (error) => {
        callback({ success: false, error: error.message });
      });
  }

  static onMedicinesChange(callback, filters = {}) {
    let query = firestore().collection('medicines');
    
    if (filters.category) {
      query = query.where('category', '==', filters.category);
    }
    if (filters.inStock !== undefined) {
      query = query.where('inStock', '==', filters.inStock);
    }

    return query.onSnapshot(
      (snapshot) => {
        const medicines = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback({ success: true, data: medicines });
      },
      (error) => {
        callback({ success: false, error: error.message });
      }
    );
  }
}

export default FirebaseHelper;