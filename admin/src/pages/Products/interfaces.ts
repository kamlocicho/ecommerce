/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
    _id: string;
    title: string;
    inStock: boolean;
    description: string;
    media: any;
    price: number;
    status: string;
}
