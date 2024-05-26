const promoedit = async (id: string, name: string, description: string, expiredDate: string, minimumPurchase: string) => {
  const res = await fetch(`http://localhost:8080/promo_code/edit/${id}`, {
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
      alert("Successfully edited promo code")
    } else {
      alert("Edit failed, please check if name is not already used")
    }
}

export default promoedit