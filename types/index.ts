export interface ProductSchema {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    desc: string;
    dealAccepted?: boolean;
    dealPrice?: number;
}