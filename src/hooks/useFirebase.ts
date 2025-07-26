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
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading, clearUser } from "../store/slices/userSlice";
import type { AppDispatch } from "../store";
import type { User as UserState } from "../types";

interface UseFirebaseReturn {
  loading: boolean;
  error: AuthError | null;

  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<User | null>;
  signInWithEmail: (email: string, password: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithGithub: () => Promise<User | null>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<void>;

  clearError: () => void;
}

export const useFirebase = (): UseFirebaseReturn => {
  const [loading, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isMountedRef = useRef(true);

  const convertUser = (user: User | null): UserState | null => {
    if (!user) return null;

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
    };
  };

  useEffect(() => {
    isMountedRef.current = true;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!isMountedRef.current) return;

      dispatch(setUser(convertUser(user)));
      dispatch(setLoading(false));
    });

    return () => {
      isMountedRef.current = false;
      unsubscribe();
    };
  }, [dispatch]);

  const clearError = () => {
    setError(null);
  };

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error as AuthError);
    } else {
      setError(new Error("Unknown error") as AuthError);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    setLoadingState(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      if (isMountedRef.current) {
        dispatch(setUser(convertUser(userCredential.user)));
      }
      return userCredential.user;
    } catch (error) {
      if (isMountedRef.current) {
        handleError(error);
      }
      return null;
    } finally {
      if (isMountedRef.current) {
        setLoadingState(false);
      }
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoadingState(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (isMountedRef.current) {
        dispatch(setUser(convertUser(userCredential.user)));
      }
      return userCredential.user;
    } catch (error) {
      if (isMountedRef.current) {
        handleError(error);
      }
      return null;
    } finally {
      if (isMountedRef.current) {
        setLoadingState(false);
      }
    }
  };

  const signInWithGoogle = async () => {
    setLoadingState(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (isMountedRef.current) {
        dispatch(setUser(convertUser(result.user)));
      }
      return result.user;
    } catch (error) {
      if (isMountedRef.current) {
        handleError(error);
      }
      return null;
    } finally {
      if (isMountedRef.current) {
        setLoadingState(false);
      }
    }
  };

  const signInWithGithub = async () => {
    setLoadingState(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, githubProvider);
      if (isMountedRef.current) {
        dispatch(setUser(convertUser(result.user)));
      }
      return result.user;
    } catch (error) {
      if (isMountedRef.current) {
        handleError(error);
      }
      return null;
    } finally {
      if (isMountedRef.current) {
        setLoadingState(false);
      }
    }
  };

  const signOutAuth = async () => {
    setLoadingState(true);
    setError(null);

    try {
      await signOut(auth);
      if (isMountedRef.current) {
        dispatch(clearUser());
      }
    } catch (error) {
      if (isMountedRef.current) {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setLoadingState(false);
      }
    }
  };

  const resetPassword = async (email: string) => {
    setLoadingState(true);
    setError(null);

    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      if (isMountedRef.current) {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setLoadingState(false);
      }
    }
  };

  const updateDisplayName = async (displayName: string) => {
    if (!auth.currentUser) {
      if (isMountedRef.current) {
        handleError(new Error("No user is currently signed in"));
      }
      return;
    }

    setLoadingState(true);
    setError(null);

    try {
      await updateProfile(auth.currentUser, { displayName });
      if (isMountedRef.current) {
        dispatch(setUser(convertUser(auth.currentUser)));
      }
    } catch (error) {
      if (isMountedRef.current) {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setLoadingState(false);
      }
    }
  };

  return {
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
