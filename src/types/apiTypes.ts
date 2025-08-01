import type { FlagName } from "../assets";

export interface Article {
  id: number;
  title: string;
  image: string;
  uploadDate: Date;
  gameName: string;
  author: string;
}

export interface Video {
  id: number;
  title: string;
  image: string;
  uploadDate: Date;
  contentUrl: string;
}

export interface AvailableInBot {
  id: number;
  title: string;
  imagePC: string;
  imageMobile: string;
  link: string;
  type: string;
}

export interface Game {
  id: number;
  title: string;
  imagePC: string;
  imageMobile: string;
  link: string;
  type: string;
}

export interface Banner {
  id: number;
  title: string;
  imagePC: string;
  imageMobile: string;
  gameName: string;
  description: BannerDescription | null;
  badge: string | null;
  link: string;
  type: string;
}

export interface BannerDescription {
  header: string;
  body: string;
}

export interface Assets {
  articles: Article[];
  popular: Game[];
  videos: Video[];
  availableInBot: AvailableInBot[];
  games: Game[];
  banners: Banner[];
  services: Service[];
}

export interface Service{
  id: number;
  title: string;
  imagePC: string;
  imageMobile: string;
  link: string;
  type: string;
}

export interface Category{
  id: number;
  name: string;
  description: string;
  link: string;
}

export interface Type {
  id: number;
  flag?: FlagName;
  name: string;
  link: string;
}

export interface Product {
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
}


export interface FAQ {
  id: number;
  question: string;
  answer: string;
}
export interface GameProducts {
  name: string;
  image: string;
  category?: Category[];
  type?: Type[];
  products: Product[];
  description: string;
  faq: FAQ[];
  payments: Payments
}

export interface Payments{
  type:  'uid' | 'email';
  methods: Payment[];
}

export interface Payment {
  id: number;
  name: string;
  icon: string;
}

export interface Currency {
  USD: number;
  KZT: number;
  RUB: number;
}

export interface FirebaseConfigType {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}


