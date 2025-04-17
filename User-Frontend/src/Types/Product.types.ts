
  
  export interface Product {
    _id: string;
    id: number;
    documentId: string;
    name: string;
    originalPrice: number;
    rating: number;
    description: string;
    discount: number;
    color: string;
    size: string;
    stock: number;
    brand: string;
    isFeatured: boolean;
    productUrl: string[];
    new: boolean;
    review: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  };
  
  
 export interface ProductResponse  {
  statusCode:Number
    data: Product[];
    message:string,
    success : boolean
  };

  export interface ApiError{
    message:string
  }
  