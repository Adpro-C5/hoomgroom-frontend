import React from 'react'
import { notFound } from 'next/navigation';

import Link from 'next/link';
import { getProducts, Product } from '@/lib/product/products';
import ProductEditForm from '@/components/product/ProductEditForm';

export default async function editForm({ params } : { params: {ProductId: String } }) {
  const products: Product[] = await getProducts();
  const { ProductId } = params

  if (!products.find(Product => Product.id === ProductId)) {
    return notFound()
  } 
  const targetProduct = products.find(Product => Product.id === ProductId) as Product
  const filePath = targetProduct.imagePath  

  return (
    <main className='bg-sky-50 h-auto p-5'>
      <h1 className='p-4'>Product Edit Form Page</h1>
      <div>
        <ProductEditForm id={ProductId} filePath={filePath} />
      </div>
      <div className='bg-slate-100 p-2'>
        <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200' href='/product/'> Go Back </Link>
      </div>
    </main>
  )
}
