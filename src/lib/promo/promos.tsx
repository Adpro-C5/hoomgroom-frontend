import { toast } from "react-toastify";

export interface PromoCode {
  id: string,
  name: String,
  description: String,
  expiredDate: String,
  minimumPurchase: Number,
}

export const getPromos = async () => {
  const res = await fetch(
    'http://34.87.141.138/promo_code/list', 
    {cache: 'no-store'}
  );

  if (!res.ok) {
    toast.error("Failed to retrieve Promo Codes")
    return null;
  }
  return await res.json();  
}
