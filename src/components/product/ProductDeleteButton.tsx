"use client"
import { productdelete } from '@/lib/product/productdelete'
import React from 'react'

export default function ProductDeleteButton({ id }: any) {
  return (
    <button onClick={() => productdelete(id)}> Delete </button>
  )
}