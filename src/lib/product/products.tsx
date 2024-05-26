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
    'http://localhost:8080/product/list', 
    {cache: 'no-store'}
  );

  if (!res.ok) {
    alert("Failed to retrieve Promo Codes")
    return null;
  }
  return await res.json();  
}