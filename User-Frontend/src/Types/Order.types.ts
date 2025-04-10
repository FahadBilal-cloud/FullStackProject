

export interface OrderFormData {
    firstName: string;
    streetAddress: string;
    apartment: string;
    city: string;
    phoneNo: string;
    emailAddress: string;
    paymentMethod: string;
    saveInfo: boolean;
}
// Update your interfaces to match the actual response
export interface OrderResponse {
    statusCode: number;  
    success: boolean;
    message: string;
    data: {              
      _id: string;
      user: string;
      orderItems: any[]; 
      orderStatus: string;
      paymentMethod: string;
      totalAmount: number;
      userInfo: {
        firstName: string;
        streetAddress: string;
        apartment: string;
        city: string;
        phoneNo: string;
      };
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  }

export interface ApiError {
    message: string
}
