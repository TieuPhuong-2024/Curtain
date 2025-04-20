'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  facebookProvider,
  signOut,
  onAuthStateChanged
} from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// Create context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Function to fetch user role from Firestore
  const fetchUserRole = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        setUserRole(userDoc.data().role || 'user');
        return userDoc.data().role || 'user';
      } else {
        // If user document doesn't exist, create one with default role 'user'
        await setDoc(userDocRef, { role: 'user' });
        setUserRole('user');
        return 'user';
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return 'user'; // Default to 'user' on error
    }
  };

  // Setup auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const role = await fetchUserRole(authUser.uid);
        
        // Redirect based on role
        if (window.location.pathname.startsWith('/admin') && role !== 'admin') {
          router.push('/'); // Redirect to home if trying to access admin without permission
        }
      } else {
        setUser(null);
        setUserRole(null);
        
        // Redirect away from admin routes if not authenticated
        if (window.location.pathname.startsWith('/admin')) {
          router.push('/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Login with email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const role = await fetchUserRole(userCredential.user.uid);
      
      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Register with email and password
  const register = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save user info in Firestore with default role
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        displayName,
        role: 'user',
        createdAt: new Date().toISOString()
      });
      
      setUserRole('user');
      router.push('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const uid = result.user.uid;
      
      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // First time login, create a user document
        await setDoc(userDocRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          role: 'user',
          createdAt: new Date().toISOString()
        });
        setUserRole('user');
        router.push('/');
      } else {
        // Existing user
        const role = userDoc.data().role;
        setUserRole(role);
        
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Login with Facebook
  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const uid = result.user.uid;
      
      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // First time login, create a user document
        await setDoc(userDocRef, {
          email: result.user.email,
          displayName: result.user.displayName,
          role: 'user',
          createdAt: new Date().toISOString()
        });
        setUserRole('user');
        router.push('/');
      } else {
        // Existing user
        const role = userDoc.data().role;
        setUserRole(role);
        
        if (role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    userRole,
    loading,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    isAdmin: userRole === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 