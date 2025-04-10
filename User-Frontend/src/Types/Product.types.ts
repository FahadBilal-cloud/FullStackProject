
  
  interface Image  {
    id: number;
    url: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  
  interface Category  {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isFeatured: boolean;
  };
  
  export interface Product  {
    id: number;
    documentId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    originalPrice: number;
    rating: number;
    description: string;
    discount: number;
    color: string;
    size: string;
    stock: string;
    brand: string;
    isFeatured: boolean;
    productUrl: Image[];
    category: Category;
    isNew:boolean,
    review:number
  };
  
  interface Pagination  {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  
 export interface ProductResponse  {
    data: Product[];
    meta: {
      pagination: Pagination;
    };
  };

  export interface ApiError{
    message:string
  }
  