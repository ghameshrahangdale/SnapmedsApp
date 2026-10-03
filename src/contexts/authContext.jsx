// contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // Fetch additional user data from Firestore
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchUserData = async (uid) => {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Email/Password Login
  const loginWithEmail = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Update Firestore user data
      await updateUserInFirestore(user);
      
      Toast.show({
        type: 'success',
        text1: 'Login Successful!',
        text2: `Welcome ${user.displayName || user.email}`,
      });

      return { success: true, user };
    } catch (error) {
      console.error('Login Error:', error);
      let errorMessage = 'Invalid credentials. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
      });

      return { success: false, error: errorMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // Google Sign-In
  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userSignin = await GoogleSignin.signIn();
      const idToken = userSignin.data.idToken;

      if (!idToken) throw new Error('No idToken from Google Sign-In');

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      const user = userCredential.user;

      // Update Firestore user data
      await updateUserInFirestore(user);

      Toast.show({
        type: 'success',
        text1: 'Welcome!',
        text2: 'You have successfully signed in with Google.',
      });

      return { success: true, user };
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Please try again',
      });
      return { success: false, error: 'Google sign-in failed' };
    } finally {
      setAuthLoading(false);
    }
  };

  // Sign Up with Email
  const signUpWithEmail = async (email, password, displayName) => {
    setAuthLoading(true);
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Update user profile
      await user.updateProfile({
        displayName: displayName,
      });

      // Create user in Firestore
      await createUserInFirestore(user, displayName);

      Toast.show({
        type: 'success',
        text1: 'Account Created!',
        text2: 'Welcome to our app!',
      });

      return { success: true, user };
    } catch (error) {
      console.error('Sign Up Error:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }
      
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: errorMessage,
      });

      return { success: false, error: errorMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null);
      setUserData(null);
      
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been successfully logged out.',
      });
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  // Update Firestore user data
  const updateUserInFirestore = async (user) => {
    try {
      const userRef = firestore().collection('users').doc(user.uid);
      const docSnap = await userRef.get();

      const userData = {
        uid: user.uid,
        displayName: user.displayName || '',
        email: user.email,
        photoURL: user.photoURL || '',
        lastLoginAt: firestore.FieldValue.serverTimestamp(),
      };

      if (!docSnap.exists) {
        // Create new user
        await userRef.set({
          ...userData,
          profileCompleted: false,
          accountStatus: "active",
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        // Update existing user
        await userRef.update({
          ...userData,
          accountStatus: "active",
        });
      }

      // Refresh user data
      await fetchUserData(user.uid);
    } catch (error) {
      console.warn('Firestore update failed:', error);
    }
  };

  // Create user in Firestore
  const createUserInFirestore = async (user, displayName) => {
    try {
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        displayName: displayName,
        email: user.email,
        photoURL: user.photoURL || '',
        profileCompleted: false,
        accountStatus: "active",
        createdAt: firestore.FieldValue.serverTimestamp(),
        lastLoginAt: firestore.FieldValue.serverTimestamp(),
      });

      await fetchUserData(user.uid);
    } catch (error) {
      console.warn('Firestore user creation failed:', error);
    }
  };

  const value = {
    user,
    userData,
    loading,
    authLoading,
    loginWithEmail,
    loginWithGoogle,
    signUpWithEmail,
    logout,
    refreshUserData: () => user && fetchUserData(user.uid),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};