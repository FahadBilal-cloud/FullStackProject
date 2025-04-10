export interface CartResponse {
    statuscode:number,
    data:Cart,
    success:boolean,
    message:string,
}

export interface Cart{
    _id: string;
  user: string;
  items: Item[];
  totalAmount: number;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  __v: number;
}

export interface Item{
    product: Product
      price: number;
      quantity: number;
      totalPrice: number;
      _id: string;
}

export interface Product{
    id:number,
    title:string,
    imageUrl:string,
    price:number | null
}

export interface ApiError{
    message:string
}