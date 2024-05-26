import PromoCodes from '@/components/promo-code/PromoCode'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-20 sm:w-full sm:max-w-sm'>
        <h1 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Promo Code Page</h1>
        <div className=''>
          <PromoCodes/>
        </div>
        <div className='mt-10 justify-items-center flex-auto'>
          <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200' href='/'>Go Back</Link>
          <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200 mx-2' href='/promo-code/add'>Create Promo</Link>
        </div>
      </div>
    </div>
  )
}

export default page