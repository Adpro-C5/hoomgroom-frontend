import { getProducts, Product } from '@/lib/product/products';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductDeleteButton from './ProductDeleteButton';
import { Button } from '@headlessui/react';


const Products = async () => {
  const products: Product[] = await getProducts();

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
          <th className='border border-sky-950'>Actions</th>
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
            <td className='p-2 border border-sky-950'>
              <div className='p-2 mb-2 border rounded-lg border-spacing-2 bg-amber-100'>
                <Link href={`/product/edit/${Product.id}`}>Edit</Link>
              </div>
              <div className='p-2 border rounded-lg border-spacing-2 bg-rose-100'>
                <ProductDeleteButton id={Product.id} />
              </div>
            </td>
          </tr>
        )}
      </tbody>  
    </table>
  )
}

export default Products