import React from 'react'
import TrackingForm from '@/components/tracking/trackingform'

export default function page() {
  return (
    <div>
      <title>Track your Shipping</title>
      <h1
      className='
      font-bold text-4xl font-center
      text-center text-blue-900 py-10'
      >📦 Track Your Shipping Here!</h1>
      <TrackingForm/>
    </div>
  )
}
