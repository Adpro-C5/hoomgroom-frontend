import { toast } from "react-toastify";

export interface Product {
  id: string,
  productName: string,
  categories: string[],
  description: string,
  imagePath: string,
  price: string,
  discountedPrice: string,
  sales: Number,
}

export const getProducts = async () => {
  const res = await fetch(
    'http://34.87.141.138/product/list', 
    {cache: 'no-store'}
  );

  if (!res.ok) {
    toast.warning("Failed to retrieve Promo Codes")
    return null;
  }
  return await res.json();  
}