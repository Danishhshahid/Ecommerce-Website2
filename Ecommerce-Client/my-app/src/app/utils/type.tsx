export type Product  ={
 
  _id:string;
  productName: string; 
  imageUrl: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  size: string[];
  color: string[];
  qty: number;
  discount?: number;
  isBestSelling?: boolean;
  isGearUp?: boolean;
};
export type Cart = {
  ProductName: string;
  description: string;
  _id: number;
  title: string;
  img :string,
  slug: string;
  price: number;
  category: string; 
  size: string;
  qty: number;
  discount?: number;
  color: string;
  uuid : number | string | undefined
};
