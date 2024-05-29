import Products from '@/components/product/Product'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <main className='bg-sky-50 h-auto p-5'>
      <h1 className='p-4'>Product Admin Page</h1>
      <div className='p-2'>
        <Products/>
      </div>
      <div className='p-4'>
        <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200' href='/'>Go Back</Link>
        <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200 mx-2' href='/product/add'>Create Product</Link>
      </div>
    </main>
  )
}

export default page