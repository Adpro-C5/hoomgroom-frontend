import { toast } from "react-toastify"

const productadd = async (id: string, name: string, description: string, categories: string[], 
  imagePath: string, price: string, discountedPrice: string
) => {
  const json = JSON.stringify({
    id: id,
    productName: name, 
    description: description, 
    categories: categories,
    imagePath: imagePath, 
    price: 'FIRSTDOUBLE',
    discountedPrice: 'SECONDDOUBLE',
    sales: 0, 
  }).replace('FIRSTDOUBLE', price).replace('SECONDDOUBLE', discountedPrice)
  
  const res = await fetch('http://34.87.141.138/product/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json
  })
  if (res.status === 201) {
    toast.success("Successfully created product")
  } else {
    toast.warning("Product already exists")
  }
}

export default productadd