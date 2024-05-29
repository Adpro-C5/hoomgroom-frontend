import React from 'react'
import { getPromos, PromoCode } from '@/lib/promo/promos'
import { notFound } from 'next/navigation';
import PromoEditForm from '@/components/promo-code/PromoEditForm';
import Link from 'next/link';

export default async function editForm({ params } : { params: {PromoId: String } }) {
  const promos: PromoCode[] = await getPromos();
  const { PromoId } = params

  if (!promos.find(PromoCode => PromoCode.id === PromoId)) {
    return notFound()
  }

  return (
    <main className='bg-sky-50 h-auto p-5'>
      <h1 className='p-4'>Promo Code Edit Page</h1>
      <div>
        <PromoEditForm id={PromoId}/>
      </div>
      <div className='bg-slate-100 p-2'>
        <Link className='p-2 border rounded-lg border-spacing-2 bg-sky-200' href='/promo-code/'> Go Back </Link>
      </div>
    </main>
  )
}
