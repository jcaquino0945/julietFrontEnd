export class Orders {
  products: [
    {
      imageUrl: string;
      name: string;
      description: string;
      price: number;
      category: string;
      quantity: number;
      size: string;
      totalPrice: number;
    }
  ];
  datePurchased: Date;
  totalPrice: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  street: string;
  province: string;
  ctiy: string;
  region: string;
  postalCode: string;
  _id: string;
  shippingMethod: string;
  paymentMethod:string;
  orderId: string;
  status: string;
}
