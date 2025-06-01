export interface User {
  id: number;
  username: string;
  email: string;
  image: string;
}

export interface UserData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface Cart {
  [gameName: string]: {
    items: CartItem[]; 
    metadata: CartMetadata; 
  };
}

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export interface CartMetadata {
  totalPrice: number;
  totalQuantity: number;
}
