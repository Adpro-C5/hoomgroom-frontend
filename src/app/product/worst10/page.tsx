import ProductsWorst from '@/components/product/ProductWorst'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <main className='bg-sky-50 h-auto p-5'>
      <h1 className='p-4'>Product Worst 10 Page</h1>
      <div className='p-2'>
        <ProductsWorst/>
      </div>
      <div className='p-4'>
        <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200' href='/product'>Go Back</Link>
      </div>
    </main>
  )
}

export default page