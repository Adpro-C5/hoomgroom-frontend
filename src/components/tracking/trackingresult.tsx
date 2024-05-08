import React from 'react'

const trackingresult = ({ result }: { result: string }) => {
  return (
    <div>
      <p>Your Order is Currently :</p>
        <p>{result}</p>
    </div>
  )
}

export default trackingresult
