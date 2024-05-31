import PromoAddForm from '@/components/promo-code/PromoAddForm'
import Link from 'next/link'
import React from 'react'

export default function Promo() {
  return (
    <main className='bg-sky-50 h-auto p-5'>
      <div className='p-2'>Promo Code Create Form Page</div>
      <div>
        <PromoAddForm/>
      </div>
      <div className='bg-slate-100 p-2'>
        <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200' href='/promo-code/'> Go Back </Link>
      </div>
    </main>
  )
}


