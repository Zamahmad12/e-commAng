export interface SignUp {
    name: string;
    email: string;
    password: string;
}
export interface Login {
    Email: string;
    Password: string;
}
export interface Product {
ImageUrl: string;
    Name: string;
    Price: string;
    Color: string;
    Discryption: string;
    Category: string;
    id: number;
    quantity: undefined|number;
    productId: number|undefined;
}   
export interface Cart {
    ImageUrl: string;
    Name: string;
    Price: string;
    Color: string;
    Discryption: string;
    Category: string;
    id: number|undefined;
    quantity: undefined|number;
    userId: number;
    productId: number;
}
export interface Order {
    price: number;
    discount:number;
    tax:number;
    delivery:number;
    total:number;
}
export interface OrderData {
    email: string;
    contact: string;
    address: string;
    total: number;
    userId: number;
    id:number|undefined
    image: string|undefined;
    productId: number|undefined;
    Name: string|undefined;  
}