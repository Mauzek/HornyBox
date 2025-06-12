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
  image: string;
}

export interface Game {
  id: number;
  title: string;
  image: string;
  rectangle: boolean;
}

export interface Banner {
  id: number;
  title: string;
  imagePc: string;
  imageMobile: string;
  gameName: string;
  description: BannerDescription | null;
  badge: string | null;
  link: string | null;
}

export interface BannerDescription {
  header: string;
  body: string;
}

export interface Assets {
  articles: Article[];
  videos: Video[];
  availableInBot: AvailableInBot[];
  games: Game[];
  banners: Banner[];
}

export interface Currency {
  USD: number;
  KZT: number;
  RUB: number;
}


