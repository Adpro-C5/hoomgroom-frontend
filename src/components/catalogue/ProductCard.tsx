// import React from 'react';
// import Link from 'next/link';
// import { Catalogue } from '@/lib/catalogue/catalogue';

// interface ProductCardProps {
//   product: Catalogue;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   return (
//     <Link href={`/catalogue/${product.id}`}>
//       <a className='block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
//         <img src={product.imagePath} alt={product.productName} className='w-full h-48 object-cover rounded-lg' />
//         <h2 className='mt-2 text-lg font-bold text-gray-900'>{product.productName}</h2>
//         <p className='mt-1 text-gray-600'>{product.description}</p>
//         <p className='mt-2 text-cyan-900 font-bold'>${product.price}</p>
//         {product.discountedPrice && (
//           <p className='text-red-600 font-bold'>Discounted: ${product.discountedPrice}</p>
//         )}
//       </a>
//     </Link>
//   );
// };

// export default ProductCard;
