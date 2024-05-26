"use client"
import { promodelete } from '@/lib/promo/promodelete'
import React from 'react'

export default function PromoDeleteButton({ id }: any) {
  return (
    <button onClick={() => promodelete(id)}> Delete </button>
  )
}