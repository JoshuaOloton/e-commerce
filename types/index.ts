export type Language = "en" | "yo" | "ig" | "ha";

export interface objectSchema {
  en: Language;
  yo: Language;
  ig: Language;
  ha: Language;
  [key: string]: string; 
}

export interface ProductType {
  _id: string;
  name: objectSchema;
  price: number;
  image: string;
  category: string;
  desc: objectSchema;
  dealAccepted?: boolean;
  dealPrice?: number;
  offers: OfferType[];
}

export interface OfferType {
  _id: string;
  product: string;
  price: number;
  status: string;
  buyer: UserType;
}

interface UserType {
  _id: string;
  name: string;
  email: string;
}

export interface NotificationType {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  linkUrl: string;
  createdAt: string;
}
