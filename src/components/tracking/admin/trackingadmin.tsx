"use client"
import React, { useState, useEffect } from 'react';

const TrackingAdmin = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [transportationType, setTransportationType] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
      const storedToken = window.localStorage.getItem('token');
      if (storedToken) {
          setToken(storedToken);
      }
  }, []);

  const getShipment = async (trackingNumber:string) => {
    try {
      const response = await fetch(`http://34.143.167.93/shipment/get-by-order-id/${trackingNumber}`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        setError(true);
        return "No Order Found";
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching shipment:", error);
      setError(true);
      return "Error";
    }
  }

  const updateStatus = async (e:any) => {
    e.preventDefault();
    setStatusMessage("");
    setError(false);
    const trackingNumber = e.target.trackingNumber.value;
    const shipment = await getShipment(trackingNumber);

    if (shipment === "No Order Found") {
      setStatusMessage("No Order Found");
      return;
    } else if (shipment === "Error") {
      setStatusMessage("An error occurred while fetching the shipment.");
      return;
    } else if (shipment.status === "MENUNGGU_VERIFIKASI") {
      const response = await fetch(`http://34.143.167.93/shipment/update-status-order/${trackingNumber}/DIPROSES`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'key': 'Access-Control-Allow-Origin',
          'value': `process.env.NEXT_PUBLIC_APP_URL`,
        },
      });
      if (!response.ok) {
        setError(true);
        setStatusMessage("Failed to update status because " + await response.text());
        return;
      }
      setStatusMessage("Status updated to DIPROSES");
    } else if (shipment.status === "DIPROSES") {
      const response = await fetch(`http://34.143.167.93/shipment/update-status-order/${trackingNumber}/DIKIRIM`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'key': 'Access-Control-Allow-Origin',
          'value': `process.env.NEXT_PUBLIC_APP_URL`,
        },
      });
      if (!response.ok) {
        setError(true);
        setStatusMessage("Failed to update status because " + await response.text());
        return;
      }
      setOrderId(trackingNumber);
      setShowModal(true);
    } else if (shipment.status === "DIKIRIM") {
      const response = await fetch(`http://34.143.167.93/shipment/update-status-order/${trackingNumber}/TIBA`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'key': 'Access-Control-Allow-Origin',
          'value': `process.env.NEXT_PUBLIC_APP_URL`,
        },
      });
      if (!response.ok) {
        setError(true);
        setStatusMessage("Failed to update status because " + await response.text());
        return;
      }
      setStatusMessage("Status updated to TIBA");
    } else if (shipment.status === "TIBA") {
      const response = await fetch(`http://34.143.167.93/shipment/update-status-order/${trackingNumber}/SELESAI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'key': 'Access-Control-Allow-Origin',
          'value': `process.env.NEXT_PUBLIC_APP_URL`,
        },
      });
      if (!response.ok) {
        setError(true);
        setStatusMessage("Failed to update status because " + await response.text());
        return;
      }
      setStatusMessage("Shipment Done!");
    } else if (shipment.status === "SELESAI") {
      const response = await fetch(`http://34.143.167.93/shipment/update-status-order/${trackingNumber}/SELESAI`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'key': 'Access-Control-Allow-Origin',
          'value': `process.env.NEXT_PUBLIC_APP_URL`,
        },
      });
      if (!response.ok) {
        setError(true);
        setStatusMessage("Failed to update status because " + await response.text());
        return;
      }
      setStatusMessage("Shipment already done!");
    }
  }

  const updateTransportation = async (e:any) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://34.143.167.93/shipment/set-transportation-type-order/${orderId}/${transportationType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'key': 'Access-Control-Allow-Origin',
          'value': `process.env.NEXT_PUBLIC_APP_URL`,
        },
      });
  
      if (!response.ok) {
        setError(true);
        setStatusMessage("Failed to update transportation type because " + await response.text());
        setShowModal(false);
        throw new Error('Failed to update transportation type');
      }

      setShowModal(false);
      setStatusMessage("Status updated to DIKIRIM using " + transportationType);
    } catch (error) {
      console.error("Error updating transportation type:", error);
    }
  }


  return (
    <div>
      <title>Shipping Admin Page</title>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-1/3">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold font-sans">Choose Transportation Type</h2>
            </div>
            <div className="p-6">
              <form onSubmit={updateTransportation} method='POST'>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="transportation"
                      value="MOTOR"
                      className="form-radio text-cyan-600"
                      onChange={(e) => setTransportationType(e.target.value)}
                    />
                    <span className="ml-3 font-sans">Motor</span>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="transportation"
                      value="TRUK"
                      className="form-radio text-cyan-600"
                      onChange={(e) => setTransportationType(e.target.value)}
                    />
                    <span className="ml-3 font-sans">Truk</span>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="transportation"
                      value="PESAWAT"
                      className="form-radio text-cyan-600"
                      onChange={(e) => setTransportationType(e.target.value)}
                    />
                    <span className="ml-3 font-sans">Pesawat</span>
                  </label>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-amber-500 h-10 w-[80px] mx-1 my-2 text-white font-medium text-sm font-sans rounded-md"
                    onClick={() => setShowModal(false)}
                  > Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-cyan-700 h-10 w-[80px] mx-1 my-2 text-white font-medium text-sm font-sans rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={updateStatus} method='POST'>
        <div className='flex flex-col py-10 px-20 items-center'>
          <label className=' text-center font-sans font-semibold text-xl text-cyan-700'>Input Order/Transaction Id</label>
          <br></br>
          <input className=' h-12 w-[550px] bg-gray-200 rounded-2xl border border-gray-300 border-opacity-50 px-2 text-sm'
            type="text" id="trackingNumber" name="trackingNumber" required placeholder='ex : ceaf99ff-dafe-47d2-b6f7-efdab07c6eb8'></input>
          <br></br>
          <button className='bg-cyan-700 rounded-full h-10 w-[150px] text-white font-medium text-sm font-sans' type="submit">Update Status</button>
          <br></br>
          {statusMessage && !error && (
            <div className='
            bg-amber-400 font-sans text-white flex flex-col my-12 py-5 px-10 w-[300px]
            text-center rounded-2xl' 
            > 
              <p className='font-semibold'>Update Status:</p>
              <p>{statusMessage}</p>
            </div>
          )}

          {error && statusMessage && (
            <div className='
            bg-red-600 font-sans text-white flex flex-col my-12 py-5 px-10 w-[300px]
            text-center rounded-2xl' 
            > 
              <p className='font-semibold'>Error:</p>
              <p>{statusMessage}</p>
            </div>
          )}
        </div>
      </form>
      
            
    </div>
  )
}

export default TrackingAdmin;
