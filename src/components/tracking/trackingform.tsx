"use client"
import React from 'react'
import { useState } from 'react';
import TrackingResult from '@/components/tracking/trackingresult'

const trackingform = () => {
  const[status,setStatus] = useState("");

  const checkShipment = async (e: any) => {
    e.preventDefault();
    const trackingNumber = e.target.trackingNumber.value;
    const shipment = await getShipment(trackingNumber);
    if (shipment === "No Order Found") {
      setStatus(shipment);
      return;
    } else{
      if (shipment.status === "MENUNGGU_VERIFIKASI") {
        setStatus("MENUNGGU VERIFIKASI");
      } else {
        setStatus(shipment.status);
      }
      console.log(shipment);
    }
  }

  const getShipment = async (trackingNumber: string) => {
    const response = await fetch(`http://localhost:8080/shipment/get-by-order-id/${trackingNumber}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return "No Order Found";
    }
    return response.json();
  }

  return (
    <div>
      <title>Tracking Form</title>
      <h2>Track Your Order Here</h2>
      <form onSubmit={checkShipment}>
        <div className='flex flex-col py-10 px-20 border-gray-500 border-2 items-center'>
          <label className=' text-center'>Order Id:</label>
          <br></br>
          <input className=' h-12 w-[550px] bg-gray-200 rounded-xl border border-black border-opacity-50 px-2 text-sm' 
          type="text" id="trackingNumber" name="trackingNumber" required placeholder='Contoh : ceaf99ff-dafe-47d2-b6f7-efdab07c6eb8'></input>
          <br></br>
          <button className=' bg-blue-300 rounded-full h-10 w-[100px] text-white font-medium' type="submit">Track</button>
        </div>
      </form>
      <TrackingResult result={status}/>
    </div>
  )
}

export default trackingform
