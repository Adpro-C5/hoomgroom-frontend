import { toast } from "react-toastify"

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
  
  const res = await fetch(`http://34.87.141.138/product/edit/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json
  })
  if (res.status === 200) {
    toast.success("Successfully edited product")
  } else {
    toast.error("Product failed to be edited")
  }
}

export default productadd