import { getPromos, PromoCode } from '@/lib/promo/promos'
import Link from 'next/link';
import React from 'react'
import PromoDeleteButton from './PromoDeleteButton';

const PromoCodes = async () => {
  const promos: PromoCode[] = await getPromos();

  return (
    <table className='border border-opacity-20 p-4 m-2 overflow-x-auto'>
      <thead>
        <tr>
          <th className='border border-sky-950'>Promo Id</th>
          <th className='border border-sky-950'>Name</th>
          <th className='border border-sky-950'>Description</th>
          <th className='border border-sky-950'>Minimum Purchase</th>
          <th className='border border-sky-950'>Expired Date</th>
          <th className='border border-sky-950'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {promos.map(
          PromoCode => <tr key={PromoCode.id}>
            <td className='p-2 border border-sky-950'>{PromoCode.id}</td>
            <td className='p-2 border border-sky-950'>{PromoCode.name}</td>
            <td className='p-2 border border-sky-950'>{PromoCode.description}</td>
            <td className='p-2 border border-sky-950'>{PromoCode.minimumPurchase.toString()}</td>
            <td className='p-2 border border-sky-950'>{PromoCode.expiredDate}</td>
            <td className='p-2 border border-sky-950'>
              <div className='p-2 mb-2 border rounded-lg border-spacing-2 bg-amber-100'>
                <Link href={`/promo-code/edit/${PromoCode.id}`}>Edit</Link>
              </div>
              <div className='p-2 border rounded-lg border-spacing-2 bg-rose-100'>
                <PromoDeleteButton id={PromoCode.id} />
              </div>
            </td>
          </tr>
        )}
      </tbody>  
    </table>
  )
}

export default PromoCodes