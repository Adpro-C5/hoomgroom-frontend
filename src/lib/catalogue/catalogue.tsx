// export interface Catalogue {
//     id: string,
//     productName: string,
//     categories: string[],
//     description: string,
//     imagePath: string,
//     price: string,
//     discountedPrice: string,
//     sales: Number,
//   }

// export const getCatalogue = async () => {
//     const res = await fetch(
//       'http://34.87.141.138/product/catalogue', 
//       {cache: 'no-store'}
//     );
  
//     if (!res.ok) {
//       alert("Failed to retrieve Promo Codes")
//       return null;
//     }
//     return await res.json();  
//   }