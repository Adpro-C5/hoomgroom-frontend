import { getBestProducts, Product } from '@/lib/product/bestproducts';
import Image from 'next/image';
import React from 'react'
import { Button } from '@headlessui/react';


const ProductsBest = async () => {
  const products: Product[] = await getBestProducts();

  return (
    <table className='border border-opacity-20 p-4 m-2 overflow-x-auto'>
      <thead>
        <tr>
          <th className='border border-sky-950'>Image</th>
          <th className='border border-sky-950'>Product Id</th>
          <th className='border border-sky-950'>Name</th>
          <th className='border border-sky-950'>Description</th>
          <th className='border border-sky-950'>Categories</th>
          <th className='border border-sky-950'>Price</th>
          <th className='border border-sky-950'>Discount Price</th>
          <th className='border border-sky-950'>Sales</th>
        </tr>
      </thead>
      <tbody>
        {products.map(
          Product => <tr key={Product.id}>
            <td className='p-2 border border-sky-950'>
              <Image
                src={'/uploads/' + Product.imagePath}
                width={200}
                height={200}
                alt='Product Picture'
              />
            </td>
            <td className='p-2 border border-sky-950'>{Product.id}</td>
            <td className='p-2 border border-sky-950'>{Product.productName}</td>
            <td className='p-2 border border-sky-950'>{Product.description}</td>
            {Product.categories.map(
                category => <td key={category} className='p-2 border border-sky-950'> 
                <Button className="inline-flex items-center gap-2 rounded-md bg-cyan-500 py-1.5 px-3">
                  Save changes
                </Button>
                </td>
              )}
            <td className='p-2 border border-sky-950'>{Product.price}</td>
            <td className='p-2 border border-sky-950'>{Product.discountedPrice}</td>
            <td className='p-2 border border-sky-950'>{Product.sales.toString()}</td>
          </tr>
        )}
      </tbody>  
    </table>
  )
}

export default ProductsBest