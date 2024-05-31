// import getDetail from '@/lib/catalogue/productDetail';
//
// export default async function ProductDetailPage({params} : any) {
//     const {ProductId} = params
//     const detail = await getDetail(ProductId);
//
//     return (
//         <p>Hello World</p>
//     );
// }

'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
    id: string,
    productName: string,
    categories: string[],
    description: string,
    imagePath: string,
    price: string,
    discountedPrice: string,
    sales: Number,
  }

function ProductDetailPage({ params }: any) {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = params;
  console.log(productId)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://34.87.141.138/product/details/${productId}`);
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { id, productName, categories, description, imagePath, price, discountedPrice, sales } = product;

  return (
    <div className='bg-white min-h-screen'>
      <main className='mx-auto max-w-7xl py-4 my-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center'>
          <h1 className='text-3xl font-bold tracking-tight text-cyan-900 mb-4'>
            {productName}
          </h1>
          <img src={imagePath} alt={productName} className="w-full h-96 object-cover mb-4" />
          <p className='text-lg text-gray-700 mb-2'>Categories: {categories.join(', ')}</p>
          <p className='text-lg text-gray-700 mb-2'>Description: {description}</p>
          <p className='text-lg text-cyan-900 font-bold mb-2'>Price: Rp{price}</p>
          {discountedPrice && <p className='text-lg text-cyan-700 font-bold mb-2'>Discounted Price: Rp{discountedPrice}</p>}
          <p className='text-lg text-gray-700 mb-4'>Sales: {sales.toString()}</p>
          <Link href={`/transaction/buy/${id}`}>
            <a className="bg-cyan-700 text-white rounded-lg font-semibold px-8 py-4 hover:bg-cyan-600 focus:bg-cyan-900 focus:outline-none">
              Go to Another Page
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;
