export interface PromoCode {
  id: string,
  name: String,
  description: String,
  expiredDate: String,
  minimumPurchase: Number,
}

export const getPromos = async () => {
  const res = await fetch(
    'http://localhost:8080/promo_code/list', 
    {cache: 'no-store'}
  );

  if (!res.ok) {
    alert("Failed to retrieve Promo Codes")
    return null;
  }
  return await res.json();  
}
