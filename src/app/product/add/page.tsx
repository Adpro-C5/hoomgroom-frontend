import ProductAddForm from '@/components/product/ProductAddForm'
import Link from 'next/link'
import React from 'react'

export default function ProductAddPage() {
  return (
    <main className='bg-sky-50 h-auto p-5'>
      <div className='p-2'>Product Create Form Page</div>
      <div>
        <ProductAddForm/>
      </div>
      <div className='bg-slate-100 p-2'>
        <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200' href='/product/'> Go Back </Link>
      </div>
    </main>
  )
}