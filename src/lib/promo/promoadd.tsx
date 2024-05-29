import { toast } from 'react-toastify';
import { v4 } from 'uuid';

const promoadd = async (name: string, description: string, expiredDate: string, minimumPurchase: string) => {
  const json = JSON.stringify({
    id: v4(),
    name: name, 
    description: description, 
    expiredDate: expiredDate, 
    minimumPurchase: 'DOUBLE', 
  }).replace('DOUBLE', minimumPurchase)
  
  const res = await fetch('http://34.87.141.138/promo_code/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json
  })
  if (res.status === 201) {
    toast.success("Successfully created promo code")
  } else {
    toast.warning("Promo Code already exists")
  }
}

export default promoadd