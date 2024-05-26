"use client"
import { stat } from 'fs';
import React from 'react'
import { useState } from 'react';

const trackingform = () => {
  const[status,setStatus] = useState("");
  const[error,setError] = useState(false);

  const checkShipment = async (e: any) => {
    e.preventDefault();
    const trackingNumber = e.target.trackingNumber.value;
    const shipment = await getShipment(trackingNumber);
    if (shipment === "No Order Found") {
      setError(true);
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
    setError(false);
    setStatus("");
    const response = await fetch(`http://34.143.167.93/shipment/get-by-order-id/${trackingNumber}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      return "No Order Found";
    }
    return response.json();
  }

  return (
    <div>
      <div className='flex flex-col py-10 px-20 items-center'>
        <form onSubmit={checkShipment}>
          <div className='flex flex-col py-10 px-20border-2 items-center'>
            <label className=' text-center font-sans font-semibold text-xl text-cyan-700'>The Order/Transaction Id that You Want to Track</label>
            <br></br>
            <input className=' h-12 w-[550px] bg-gray-200 rounded-2xl border border-gray-300 border-opacity-50 px-2 text-sm' 
            type="text" id="trackingNumber" name="trackingNumber" required placeholder='ex : ceaf99ff-dafe-47d2-b6f7-efdab07c6eb8'></input>
            <br></br>
            <button className='bg-cyan-700 rounded-full h-10 w-[100px] text-white font-medium text-sm font-sans' type="submit">Track</button>
          </div>
        </form>
        {status && !error &&(
          <div className='
          bg-amber-400 font-sans text-white flex flex-col my-12 py-5 px-10 w-[300px]
          text-center rounded-2xl' 
          > 
            <p className='font-semibold'>Your Order is Currently: </p>
            <p>{status}</p>
          </div>
        )}

        {error && status && (
          <div className='
          bg-red-600 font-sans text-white flex flex-col my-12 py-5 px-10 w-[300px]
          text-center rounded-2xl' 
          > 
            <p className='font-semibold'>Error:</p>
            <p>{status}</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default trackingform
