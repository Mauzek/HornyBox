export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Cart {
  [productName: string]: {
    items: CartItem[]; 
    metadata: CartMetadata; 
  };
}

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  discountPrice: number;
  category: {
    id: number;
    name: string;
  };
  popupType: "none" | "bot" | "fullpack" | "explanation";
  popupData?: string;
  quantity: number;
}

export interface CartMetadata {
  totalPrice: number;
  totalQuantity: number;
}
