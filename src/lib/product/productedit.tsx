const productadd = async (id: string, name: string, description: string, categories: string[], 
  imagePath: string, price: string, discountedPrice: string
) => {
  const json = JSON.stringify({
    id: id,
    name: name, 
    description: description, 
    categories: categories,
    imagePath: imagePath, 
    price: 'FIRSTDOUBLE',
    discountedPrice: 'SECONDDOUBLE',
    sales: 0, 
  }).replace('FIRSTDOUBLE', price).replace('SECONDDOUBLE', discountedPrice)
  
  const res = await fetch(`http://localhost:8080/product/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json
  })
  if (res.status === 200) {
    alert("Successfully edited product")
  } else {
    alert("Product failed to be edited")
  }
}

export default productadd