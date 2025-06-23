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
  flag?: string;
  name: string;
  link: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: Currency;
  discountPrice: number;
  category: {
    id: number;
    name: string;
  };
  poupType: "none" | "bot" | "fullpack" | "explanation";
  poupData?: string;
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
}

export interface Currency {
  USD: number;
  KZT: number;
  RUB: number;
}


