"use client"
import promoadd from '@/lib/promo/promoadd';
import { redirect, RedirectType } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function PromoAddForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [minimumPurchase, setMinimumPurchase] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [errors, setErrors] = useState({} as any);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, description, minimumPurchase]);

  const validateForm = () => {
    let errors: any = {};

    if (!name) {
      errors.name = 'Name is required'
    } else if (!/[A-Z0-9]/.test(name)) {
      errors.name = 'Name have to be alphanumeric with capital letters'
    }

    if (!description) {
      errors.description = 'Description is required'
    }

    if (!minimumPurchase) {
      errors.minimumPurchase = 'Minimum Purchase is required'
    } else if (!/[0-9]+\.+[0-9]/.test(minimumPurchase)) {
      errors.minimumPurchase = 'Minimum Purchase have to be a float'
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0)
  }

  const handleSubmit = () => {
    if (!isFormValid) {
      alert("Form content is invalid")
    } else {
      promoadd(name, description, expiredDate, minimumPurchase);
      redirect("/promo-code/", RedirectType.push)
    }
  }

  return (
    <div className='bg-slate-100'>
      <form action={handleSubmit} method="post">
        <div className='p-2'>
          <label htmlFor="name">Promo Code Name :</label>
          <input type="text" id='name' placeholder='  Name'
          value={name} onChange={(e) => setName(e.target.value)}/>
          {errors.name && <p className='text-red-300' >{errors.name}</p>}
        </div>
        <div className='p-2'>
          <label htmlFor="description">Promo Code Description :</label>
          <input type="text" id='description' placeholder='  Description' 
          value={description} onChange={(e) => setDescription(e.target.value)}/>
          {errors.description && <p className='text-red-300' >{errors.description}</p>}
        </div>
        <div className='p-2'>
          <label htmlFor="minimumPurchase">Promo Minimum Purchase :</label>
          <input type="text" id='minimumPurchase' placeholder='  Minimum Purchase' 
          value={minimumPurchase} onChange={(e) => setMinimumPurchase(e.target.value)}/>
          {errors.minimumPurchase && <p className='text-red-300' >{errors.minimumPurchase}</p>}
        </div>
        <div className='p-2'>
          <label htmlFor="expiredDate"></label>
          <input type="date" id="expiredDate" value={expiredDate} 
          onChange={(e) => setExpiredDate(e.target.value)}/>
        </div>
        <div className='p-2'>
          <button className='p-2 border rounded-lg border-spacing-2 bg-sky-200' type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}