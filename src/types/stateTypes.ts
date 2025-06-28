export interface User {
  id: number;
  username: string;
  email: string;
  image: string;
  referal: number | null;
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
