import { v4 } from 'uuid';

const promoadd = async (name: string, description: string, expiredDate: string, minimumPurchase: string) => {
  const json = JSON.stringify({
    id: v4(),
    name: name, 
    description: description, 
    expiredDate: expiredDate, 
    minimumPurchase: 'DOUBLE', 
  }).replace('DOUBLE', minimumPurchase)
  
  const res = await fetch('http://localhost:8080/promo_code/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json
  })
  if (res.status === 201) {
    alert("Successfully created promo code")
  } else {
    alert("Promo Code already exists")
  }
}

export default promoadd