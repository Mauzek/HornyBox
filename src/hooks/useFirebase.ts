import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type AuthError,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../config/firebase";
import { useState, useEffect } from "react";

interface UseFirebaseReturn {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<User | null>;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithGithub: () => Promise<User | null>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<void>;
  
  clearError: () => void;
}

export const useFirebase = (): UseFirebaseReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const clearError = () => {
    setError(null);
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error as AuthError);
    } else {
      setError(new Error('Unknown error') as AuthError);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      console.log(result.user)
      return result.user;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGithub = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await signInWithPopup(auth, githubProvider);
      setUser(result.user);
      console.log(result.user)
      return result.user;
    } catch (error) {
      handleError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };


  const signOutAuth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayName = async (displayName: string) => {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await updateProfile(auth.currentUser, { displayName });
      setUser({ ...auth.currentUser, displayName });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signInWithGithub,
    signOut: signOutAuth,
    resetPassword,
    updateDisplayName,
    
    clearError,
  };
};