export interface ProductType {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    desc: string;
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