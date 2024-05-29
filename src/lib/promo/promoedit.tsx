import { toast } from "react-toastify"

const promoedit = async (id: string, name: string, description: string, expiredDate: string, minimumPurchase: string) => {
  const res = await fetch(`http://34.87.141.138/promo_code/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: name,
        description: description,
        expiredDate: expiredDate,
        minimumPurchase: 'DOUBLE',
      }).replace('DOUBLE', minimumPurchase)
    })
    if (res.status === 200) {
      toast.success("Successfully edited promo code")
    } else {
      toast.error("Edit failed, please check if name is not already used")
    }
}

export default promoedit