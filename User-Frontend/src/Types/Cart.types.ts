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
}

export interface Item{
    product: Product
      quantity: number;
      totalPrice: number;
      _id: string;
}

export interface Product{
    _id:string,
    name:string,
    productUrl:string,
    price:number | null
}

export interface ApiError{
    message:string
}